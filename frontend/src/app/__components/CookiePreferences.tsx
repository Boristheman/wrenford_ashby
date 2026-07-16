"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "wrenford-ashby-cookie-preference";
const SESSION_DISMISSED_KEY =
  "wrenford-ashby-cookie-banner-dismissed";
const COOKIE_NAME = "wa_cookie_preference";
const OPEN_EVENT = "wa:open-cookie-settings";

type CookiePreference = "all" | "essential";
type PanelState = "checking" | "closed" | "open";

export function openCookieSettings() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(OPEN_EVENT));
}

export default function CookiePreferences() {
  const pathname = usePathname();
  const [panelState, setPanelState] =
    useState<PanelState>("checking");

  useEffect(() => {
    const handleOpen = () => {
      setPanelState("open");
    };

    const handleCookieSettingsClick = (
      event: MouseEvent,
    ) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const control = target.closest(
        "[data-cookie-settings], button, a, label",
      );

      if (!control) {
        return;
      }

      const explicitlyMarked = control.hasAttribute(
        "data-cookie-settings",
      );
      const controlText =
        control.textContent?.trim().toLowerCase() || "";
      const namedCookieSettings =
        controlText.includes("cookie settings");

      if (!explicitlyMarked && !namedCookieSettings) {
        return;
      }

      event.preventDefault();
      setPanelState("open");
    };

    window.addEventListener(OPEN_EVENT, handleOpen);
    document.addEventListener(
      "click",
      handleCookieSettingsClick,
    );

    return () => {
      window.removeEventListener(OPEN_EVENT, handleOpen);
      document.removeEventListener(
        "click",
        handleCookieSettingsClick,
      );
    };
  }, []);

  useEffect(() => {
    const savedPreference =
      window.localStorage.getItem(STORAGE_KEY);
    const dismissedForSession =
      window.sessionStorage.getItem(
        SESSION_DISMISSED_KEY,
      ) === "true";

    const consentIsNeeded =
      pathname === "/" &&
      !savedPreference &&
      !dismissedForSession;

    setPanelState(
      consentIsNeeded ? "open" : "closed",
    );
  }, [pathname]);

  const savePreference = (
    preference: CookiePreference,
  ) => {
    window.localStorage.setItem(
      STORAGE_KEY,
      preference,
    );
    window.sessionStorage.removeItem(
      SESSION_DISMISSED_KEY,
    );

    document.cookie = `${COOKIE_NAME}=${preference}; path=/; max-age=31536000; SameSite=Lax`;

    window.dispatchEvent(
      new CustomEvent("wa:cookie-preference-changed", {
        detail: preference,
      }),
    );

    setPanelState("closed");
  };

  const closeWithoutChanging = () => {
    window.sessionStorage.setItem(
      SESSION_DISMISSED_KEY,
      "true",
    );
    setPanelState("closed");
  };

  // Nothing is rendered during the storage check.
  // This prevents the banner flashing before consent state is known.
  if (panelState !== "open") {
    return null;
  }

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 z-[2000] border border-[#17383C]/14 bg-white p-4 text-[#17383C] shadow-[0_20px_60px_rgba(13,37,41,0.24)] sm:left-auto sm:w-[26rem]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#6B908D]">
            Cookie preferences
          </p>

          <p className="mt-2 text-sm leading-6 text-[#17383C]/62">
            Essential cookies keep the site working.
            Optional cookies help us understand how the
            site is used.
          </p>
        </div>

        <button
          type="button"
          onClick={closeWithoutChanging}
          aria-label="Close cookie preferences"
          className="text-2xl leading-none text-[#17383C]/48"
        >
          ×
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => savePreference("all")}
          className="min-h-11 bg-[#17383C] px-3 text-sm font-black text-white"
        >
          Accept all
        </button>

        <button
          type="button"
          onClick={() => savePreference("essential")}
          className="min-h-11 border border-[#17383C]/24 px-3 text-sm font-black text-[#17383C]"
        >
          Essential only
        </button>
      </div>
    </aside>
  );
}
