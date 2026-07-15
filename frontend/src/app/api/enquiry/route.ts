import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EnquiryPayload = Record<string, unknown>;

type EmailAttachment = {
  filename: string;
  content: Buffer;
};

type NormalisedEnquiry = {
  formType: string;
  formLabel: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  consent: boolean;
  honeypot: string;
  pageUrl: string;
  fields: Record<string, string>;
};

const MAX_REQUEST_BYTES = 4_200_000;
const MAX_ATTACHMENT_COUNT = 4;
const MAX_ATTACHMENT_BYTES = 3_500_000;
const ALLOWED_ATTACHMENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORM_LABELS: Record<string, string> = {
  "home-valuation": "Homepage valuation request",
  "sales-valuation": "Sales valuation request",
  "property-alerts": "Property alerts registration",
  "property-viewing": "Property viewing request",
  "landlord-enquiry": "Landlord enquiry",
  "new-homes-registration": "New homes registration",
  "general-enquiry": "General enquiry",
};

const FIELD_LABELS: Record<string, string> = {
  area: "Preferred area or postcode",
  bedrooms: "Bedrooms",
  budget: "Maximum budget",
  details: "Property details",
  email: "Email",
  enquiry: "Enquiry",
  enquiryType: "Nature of enquiry",
  listingMode: "Listing type",
  location: "Preferred location",
  message: "Message",
  name: "Name",
  phone: "Telephone",
  position: "Buying position",
  postcode: "Postcode",
  preferredContact: "Preferred contact",
  property: "Property",
  service: "Service required",
  telephone: "Telephone",
  timescale: "Moving timescale",
  valuationType: "Valuation type",
};

const INTERNAL_FIELDS = new Set(["botField", "consent", "formType", "pageUrl"]);

function clean(value: unknown, maxLength = 5_000): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\0/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value !== "string") {
    return false;
  }

  return ["true", "1", "yes", "on", "accepted"].includes(
    value.trim().toLowerCase(),
  );
}

function firstValue(
  payload: EnquiryPayload,
  keys: string[],
  maxLength: number,
): string {
  for (const key of keys) {
    const value = clean(payload[key], maxLength);

    if (value) {
      return value;
    }
  }

  return "";
}

function humanise(key: string): string {
  if (FIELD_LABELS[key]) {
    return FIELD_LABELS[key];
  }

  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function normalise(payload: EnquiryPayload): NormalisedEnquiry {
  const requestedFormType = clean(payload.formType, 80).toLowerCase();

  const formType = requestedFormType || "general-enquiry";

  const fields: Record<string, string> = {};

  for (const [key, rawValue] of Object.entries(payload)) {
    if (INTERNAL_FIELDS.has(key)) {
      continue;
    }

    const value = clean(rawValue);

    if (value) {
      fields[key] = value;
    }
  }

  return {
    formType,
    formLabel: FORM_LABELS[formType] || humanise(formType),
    name: firstValue(payload, ["fullName", "name"], 140),
    phone: firstValue(payload, ["phone", "telephone"], 40),
    email: clean(payload.email, 254).toLowerCase(),
    postcode: firstValue(payload, ["postcode", "postCode"], 16).toUpperCase(),
    consent: toBoolean(payload.consent),
    honeypot: clean(payload.botField, 200),
    pageUrl: clean(payload.pageUrl, 1_000),
    fields,
  };
}

function requireValue(errors: string[], value: string, message: string) {
  if (!value) {
    errors.push(message);
  }
}

function validate(enquiry: NormalisedEnquiry): string[] {
  const errors: string[] = [];

  const requireEmail = () => {
    if (!EMAIL_PATTERN.test(enquiry.email)) {
      errors.push("Please enter a valid email address.");
    }
  };

  const requirePhone = () => {
    if (enquiry.phone.replace(/\D/g, "").length < 7) {
      errors.push("Please enter a valid telephone number.");
    }
  };

  switch (enquiry.formType) {
    case "property-alerts":
      requireEmail();
      break;

    case "property-viewing":
      requireValue(errors, enquiry.name, "Please enter your name.");
      requirePhone();
      requireValue(
        errors,
        enquiry.fields.property || "",
        "Please choose a property.",
      );
      break;

    case "home-valuation":
      requireValue(errors, enquiry.name, "Please enter your name.");
      requirePhone();
      requireEmail();
      requireValue(
        errors,
        enquiry.postcode,
        "Please enter the property postcode.",
      );
      requireValue(
        errors,
        enquiry.fields.valuationType || "",
        "Please choose the type of valuation.",
      );
      break;

    case "sales-valuation":
      requireValue(errors, enquiry.name, "Please enter your name.");
      requirePhone();
      requireEmail();
      requireValue(
        errors,
        enquiry.postcode,
        "Please enter the property postcode.",
      );

      if (!enquiry.consent) {
        errors.push(
          "Please confirm that we may respond to your valuation request.",
        );
      }
      break;

    case "landlord-enquiry":
      requireValue(errors, enquiry.name, "Please enter your name.");
      requirePhone();
      requireEmail();
      requireValue(
        errors,
        enquiry.postcode,
        "Please enter the property postcode.",
      );
      requireValue(
        errors,
        enquiry.fields.service || "",
        "Please choose the service required.",
      );
      break;

    case "new-homes-registration":
      requireValue(errors, enquiry.name, "Please enter your name.");
      requirePhone();
      requireEmail();

      if (!enquiry.consent) {
        errors.push(
          "Please confirm that we may contact you about new-home releases.",
        );
      }
      break;

    case "general-enquiry":
    default:
      requireValue(errors, enquiry.name, "Please enter your name.");
      requirePhone();
      requireEmail();
      requireValue(
        errors,
        enquiry.fields.enquiryType || "",
        "Please choose the nature of your enquiry.",
      );
      requireValue(
        errors,
        enquiry.fields.message || "",
        "Please enter your message.",
      );

      if (!enquiry.consent) {
        errors.push("Please confirm that we may respond to your enquiry.");
      }
      break;
  }

  return [...new Set(errors)];
}

function escapeHtml(value: string): string {
  const replacements: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(
    /[&<>"']/g,
    (character) => replacements[character] ?? character,
  );
}

function buildRows(enquiry: NormalisedEnquiry): Array<[string, string]> {
  const rows = Object.entries(enquiry.fields).map(
    ([key, value]) => [humanise(key), value] as [string, string],
  );

  if (enquiry.consent) {
    rows.push(["Consent given", "Yes"]);
  }

  if (enquiry.pageUrl) {
    rows.push(["Submitted from", enquiry.pageUrl]);
  }

  rows.push([
    "Submitted at",
    new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    }),
  ]);

  return rows;
}

function buildHtml(
  enquiry: NormalisedEnquiry,
  attachmentCount: number,
): string {
  const rows = buildRows(enquiry)
    .map(
      ([label, value]) => `
        <tr>
          <td style="width:190px;padding:11px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:11px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#eef2f0;font-family:Arial,Helvetica,sans-serif;color:#17383c;">
        <div style="max-width:760px;margin:0 auto;padding:32px 20px;">
          <div style="background:#0d2529;padding:24px 26px;color:#ffffff;">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.6px;text-transform:uppercase;color:#bfd3cd;font-weight:700;">
              Wrenford Ashby website
            </p>
            <h1 style="margin:0;font-size:27px;line-height:1.25;">
              ${escapeHtml(enquiry.formLabel)}
            </h1>
          </div>

          <div style="background:#ffffff;padding:12px 14px 20px;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.55;">
              ${rows}
              <tr>
                <td style="width:190px;padding:11px 12px;font-weight:700;vertical-align:top;">
                  Attachments
                </td>
                <td style="padding:11px 12px;">
                  ${attachmentCount}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildText(
  enquiry: NormalisedEnquiry,
  attachmentCount: number,
): string {
  return [
    `WRENFORD ASHBY — ${enquiry.formLabel.toUpperCase()}`,
    "",
    ...buildRows(enquiry).map(([label, value]) => `${label}: ${value}`),
    `Attachments: ${attachmentCount}`,
  ].join("\n");
}

async function readPayload(request: NextRequest): Promise<{
  payload: EnquiryPayload;
  attachments: EmailAttachment[];
}> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();
    const payloadEntries: Array<[string, string]> = [];
    const files: File[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        files.push(value);
        continue;
      }

      if (typeof value === "string") {
        payloadEntries.push([key, value]);
      }
    }

    if (files.length > MAX_ATTACHMENT_COUNT) {
      throw new Error(
        `Please attach no more than ${MAX_ATTACHMENT_COUNT} files.`,
      );
    }

    let totalBytes = 0;
    const attachments: EmailAttachment[] = [];

    for (const file of files) {
      if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
        throw new Error("Attachments must be JPG, PNG, WebP or PDF files.");
      }

      totalBytes += file.size;

      if (totalBytes > MAX_ATTACHMENT_BYTES) {
        throw new Error(
          "The attachments are too large. Please use fewer or smaller files.",
        );
      }

      attachments.push({
        filename:
          clean(file.name, 180) || `enquiry-file-${attachments.length + 1}`,
        content: Buffer.from(await file.arrayBuffer()),
      });
    }

    return {
      payload: Object.fromEntries(payloadEntries) as EnquiryPayload,
      attachments,
    };
  }

  return {
    payload: (await request.json()) as EnquiryPayload,
    attachments: [],
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? "0");

    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: "The enquiry is too large.",
        },
        { status: 413 },
      );
    }

    let payload: EnquiryPayload;
    let attachments: EmailAttachment[];

    try {
      const parsed = await readPayload(request);
      payload = parsed.payload;
      attachments = parsed.attachments;
    } catch (error) {
      return NextResponse.json(
        {
          ok: false,
          error:
            error instanceof Error
              ? error.message
              : "The enquiry could not be read.",
        },
        { status: 400 },
      );
    }

    const enquiry = normalise(payload);

    if (enquiry.honeypot) {
      return NextResponse.json({
        ok: true,
        message: "Thanks — your enquiry has been received.",
      });
    }

    const errors = validate(enquiry);

    if (errors.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: errors[0],
          errors,
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.ENQUIRY_TO_EMAIL;
    const fromEmail = process.env.ENQUIRY_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error(
        "Missing RESEND_API_KEY, ENQUIRY_TO_EMAIL or ENQUIRY_FROM_EMAIL.",
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "The enquiry service is not configured yet. Please call us instead.",
        },
        { status: 500 },
      );
    }

    const recipients = toEmail
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "The enquiry destination is not configured.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const subjectDetail =
      enquiry.postcode ||
      enquiry.fields.property ||
      enquiry.fields.location ||
      enquiry.fields.area ||
      "";

    const subject = ["New website enquiry", enquiry.formLabel, subjectDetail]
      .filter(Boolean)
      .join(" — ");

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      subject,
      html: buildHtml(enquiry, attachments.length),
      text: buildText(enquiry, attachments.length),
      ...(enquiry.email ? { replyTo: enquiry.email } : {}),
      ...(attachments.length > 0 ? { attachments } : {}),
      tags: [
        {
          name: "form_type",
          value: enquiry.formType.replace(/[^a-z0-9_-]/gi, "_"),
        },
      ],
    });

    if (error) {
      console.error("Resend enquiry error:", error);

      return NextResponse.json(
        {
          ok: false,
          error: "We could not send your enquiry. Please try again or call us.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message:
          "Thanks — your enquiry has been sent. We will be in touch shortly.",
        id: data?.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected enquiry route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong while sending your enquiry. Please try again.",
      },
      { status: 500 },
    );
  }
}

export function GET(): NextResponse {
  return NextResponse.json(
    {
      ok: true,
      endpoint: "/api/enquiry",
      method: "POST",
    },
    { status: 200 },
  );
}
