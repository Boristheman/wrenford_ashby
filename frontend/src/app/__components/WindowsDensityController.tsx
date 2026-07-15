"use client";

import { useLayoutEffect } from "react";

type DetectedPlatform = "windows" | "macos" | "other";

type NavigatorWithUAData = Navigator & {
  userAgentData?: {
    platform?: string;
  };
};

function detectPlatform(): DetectedPlatform {
  const navigatorWithUAData =
    navigator as NavigatorWithUAData;

  const userAgent = navigator.userAgent || "";
  const platform =
    navigatorWithUAData.userAgentData?.platform ||
    navigator.platform ||
    "";

  if (
    /windows|win32|win64|wow64/i.test(platform) ||
    /windows nt/i.test(userAgent)
  ) {
    return "windows";
  }

  if (
    /mac|macintosh|macintel/i.test(platform) ||
    /mac os x/i.test(userAgent)
  ) {
    return "macos";
  }

  return "other";
}

function clamp(
  value: number,
  minimum: number,
  maximum: number,
) {
  return Math.min(maximum, Math.max(minimum, value));
}

function densityForViewport(
  platform: DetectedPlatform,
  width: number,
  height: number,
  desktop: boolean,
) {
  if (!desktop) {
    return 1;
  }

  let scale = 1;

  if (platform === "windows") {
    if (height <= 760) {
      scale = 0.84;
    } else if (height <= 840) {
      scale = 0.87;
    } else if (height <= 920) {
      scale = 0.89;
    } else if (height <= 1080) {
      scale = 0.91;
    } else {
      scale = 0.94;
    }
  } else if (height <= 760) {
    scale = 0.9;
  } else if (height <= 840) {
    scale = 0.93;
  } else if (height <= 920) {
    scale = 0.96;
  }

  if (width < 1280) {
    scale -= 0.02;
  }

  if (width >= 2000 && height >= 1200) {
    scale += 0.02;
  }

  return clamp(
    Math.round(scale * 100) / 100,
    0.82,
    1,
  );
}

export default function WindowsDensityController() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia(
      "(pointer: fine)",
    );

    let animationFrame = 0;

    const applyDensity = () => {
      animationFrame = 0;

      const width = Math.round(window.innerWidth);
      const height = Math.round(window.innerHeight);
      const platform = detectPlatform();
      const desktop =
        width >= 1100 && finePointer.matches;

      const scale = densityForViewport(
        platform,
        width,
        height,
        desktop,
      );

      const compact =
        desktop && scale < 0.995;
      const shortDesktop =
        desktop && height <= 920;
      const wideDesktop =
        desktop && width >= 1800;

      root.classList.add("wa-density-ready");
      root.classList.toggle(
        "wa-density-active",
        desktop,
      );
      root.classList.toggle(
        "wa-compact-desktop",
        compact,
      );
      root.classList.toggle(
        "wa-windows-desktop",
        desktop && platform === "windows",
      );
      root.classList.toggle(
        "wa-macos-desktop",
        desktop && platform === "macos",
      );
      root.classList.toggle(
        "wa-short-desktop",
        shortDesktop,
      );
      root.classList.toggle(
        "wa-wide-desktop",
        wideDesktop,
      );

      root.dataset.waPlatform = platform;
      root.dataset.waCompact =
        compact ? "true" : "false";
      root.dataset.waViewport =
        `${width}x${height}`;
      root.dataset.waDensity =
        scale.toFixed(2);

      root.style.setProperty(
        "--wa-density-scale",
        scale.toFixed(2),
      );
      root.style.setProperty(
        "--wa-root-font-size",
        `${(16 * scale).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--wa-viewport-width",
        `${width}px`,
      );
      root.style.setProperty(
        "--wa-viewport-height",
        `${height}px`,
      );
    };

    const queueDensityUpdate = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame,
        );
      }

      animationFrame =
        window.requestAnimationFrame(
          applyDensity,
        );
    };

    applyDensity();

    window.addEventListener(
      "resize",
      queueDensityUpdate,
      { passive: true },
    );

    window.addEventListener(
      "orientationchange",
      queueDensityUpdate,
      { passive: true },
    );

    window.visualViewport?.addEventListener(
      "resize",
      queueDensityUpdate,
      { passive: true },
    );

    if ("addEventListener" in finePointer) {
      finePointer.addEventListener(
        "change",
        queueDensityUpdate,
      );
    }

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame,
        );
      }

      window.removeEventListener(
        "resize",
        queueDensityUpdate,
      );

      window.removeEventListener(
        "orientationchange",
        queueDensityUpdate,
      );

      window.visualViewport?.removeEventListener(
        "resize",
        queueDensityUpdate,
      );

      if ("removeEventListener" in finePointer) {
        finePointer.removeEventListener(
          "change",
          queueDensityUpdate,
        );
      }
    };
  }, []);

  return (
    <style jsx global>{`
      :root {
        --wa-density-scale: 1;
        --wa-root-font-size: 16px;
        --wa-viewport-width: 100vw;
        --wa-viewport-height: 100vh;
      }

      html {
        overflow-x: clip;
        text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      body {
        min-width: 320px;
        overflow-x: clip;
      }

      /*
       * Tailwind's normal spacing, type, gaps and most component
       * dimensions are rem-based. Changing the root size therefore
       * compacts the whole site without shrinking viewport-height
       * heroes or breaking fixed/sticky positioning.
       */
      html.wa-density-active {
        font-size: var(
          --wa-root-font-size
        ) !important;
      }

      /*
       * Keep form controls tied to the same responsive density rather
       * than allowing browser/OS defaults to make them look oversized.
       */
      html.wa-density-active
        :where(
          button,
          input,
          select,
          textarea
        ) {
        font-size: inherit;
      }

      /*
       * Avoid transitions firing simply because the controller changes
       * the root font size during the first layout pass.
       */
      html:not(.wa-density-ready) *,
      html:not(.wa-density-ready) *::before,
      html:not(.wa-density-ready) *::after {
        transition-duration: 0s !important;
      }

      @media (max-width: 1099px) {
        html {
          font-size: 16px !important;
        }
      }
    `}</style>
  );
}
