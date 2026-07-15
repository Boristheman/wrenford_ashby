"use client";

import { useState, type FormEvent } from "react";

export type EnquiryFormStatus = "idle" | "sending" | "success" | "error";

type EnquiryResponse = {
  ok?: boolean;
  message?: string;
  error?: string;
};

type UseEnquiryFormOptions = {
  resetOnSuccess?: boolean;
  onSuccess?: () => void;
};

export function useEnquiryForm(
  formType: string,
  options: UseEnquiryFormOptions = {},
) {
  const { resetOnSuccess = true, onSuccess } = options;
  const [status, setStatus] = useState<EnquiryFormStatus>("idle");
  const [message, setMessage] = useState("");

  const reset = () => {
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("formType", formType);
    formData.set("pageUrl", window.location.href);

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const result = (await response.json()) as EnquiryResponse;

      if (!response.ok || !result.ok) {
        throw new Error(
          result.error || "We could not send your enquiry. Please try again.",
        );
      }

      if (resetOnSuccess) form.reset();
      onSuccess?.();
      setStatus("success");
      setMessage(result.message || "Thanks — your enquiry has been sent.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry. Please try again.",
      );
    }
  };

  return {
    status,
    message,
    isSending: status === "sending",
    handleSubmit,
    reset,
  };
}
