import { NextRequest, NextResponse } from "next/server";

type GeoapifyResult = {
  place_id?: string;
  name?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  formatted?: string;
};

type LocationSuggestion = {
  id: string;
  name: string;
  context: string;
  value: string;
};

const GEOAPIFY_AUTOCOMPLETE_URL =
  "https://api.geoapify.com/v1/geocode/autocomplete";

function uniqueParts(parts: Array<string | undefined>, excluded: string) {
  return parts.filter(
    (part, index, allParts): part is string =>
      Boolean(part) &&
      part?.toLowerCase() !== excluded.toLowerCase() &&
      allParts.findIndex(
        (candidate) => candidate?.toLowerCase() === part?.toLowerCase(),
      ) === index,
  );
}

function toSuggestion(
  result: GeoapifyResult,
  index: number,
): LocationSuggestion | null {
  const name = result.city || result.name;

  if (!name) return null;

  const contextParts = uniqueParts(
    [result.county, result.state, result.country],
    name,
  );
  const context = contextParts.join(", ") || "United Kingdom";
  const valueParts = uniqueParts([name, result.county], "");
  const value = valueParts.join(", ") || result.formatted || name;

  return {
    id: result.place_id || `${name}-${context}-${index}`,
    name,
    context,
    value,
  };
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.GEOAPIFY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { results: [], configured: false },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const params = new URLSearchParams({
    text: query,
    type: "city",
    filter: "countrycode:gb",
    bias: "proximity:0.4691,51.7356",
    lang: "en",
    limit: "6",
    format: "json",
    apiKey,
  });

  try {
    const response = await fetch(`${GEOAPIFY_AUTOCOMPLETE_URL}?${params}`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { results: [] },
        {
          status: 502,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const data = (await response.json()) as { results?: GeoapifyResult[] };
    const results = (data.results ?? [])
      .map(toSuggestion)
      .filter((result): result is LocationSuggestion => Boolean(result))
      .filter(
        (result, index, allResults) =>
          allResults.findIndex(
            (candidate) =>
              candidate.value.toLowerCase() === result.value.toLowerCase(),
          ) === index,
      )
      .slice(0, 6);

    return NextResponse.json(
      { results, configured: true },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { results: [] },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
