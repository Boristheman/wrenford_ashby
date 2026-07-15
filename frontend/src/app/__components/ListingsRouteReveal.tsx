"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PROPERTY_CARD_SELECTOR = ".property-card-enter";

function clearAnimationStyles(card: HTMLElement) {
  card.style.removeProperty("animation");
  card.style.removeProperty("opacity");
  card.style.removeProperty("transform");
  card.style.removeProperty("filter");
  card.style.removeProperty("will-change");
}

export default function ListingsRouteReveal({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(PROPERTY_CARD_SELECTOR),
    );

    if (cards.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    const runningAnimations: Animation[] = [];

    cards.forEach((card) => {
      card.getAnimations().forEach((animation) => animation.cancel());

      // Disable the old CSS animation so this route animation always replays.
      card.style.animation = "none";
      card.style.opacity = reducedMotion ? "1" : "0";
      card.style.transform = reducedMotion
        ? "none"
        : "translate3d(0, 42px, 0) scale(0.965)";
      card.style.filter = reducedMotion ? "none" : "blur(7px)";
      card.style.willChange = reducedMotion
        ? "auto"
        : "opacity, transform, filter";
    });

    if (!reducedMotion) {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          if (cancelled) return;

          cards.forEach((card, index) => {
            const horizontalOffset = index % 2 === 0 ? -14 : 14;
            const delay = 90 + Math.min(index, 15) * 76;

            const animation = card.animate(
              [
                {
                  opacity: 0,
                  transform: `translate3d(${horizontalOffset}px, 42px, 0) scale(0.965)`,
                  filter: "blur(7px)",
                },
                {
                  opacity: 1,
                  transform: "translate3d(0, -4px, 0) scale(1.006)",
                  filter: "blur(0px)",
                  offset: 0.74,
                },
                {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0) scale(1)",
                  filter: "blur(0px)",
                },
              ],
              {
                duration: 780,
                delay,
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                fill: "both",
              },
            );

            runningAnimations.push(animation);

            void animation.finished
              .then(() => {
                if (cancelled) return;

                // Keep the final state after the Web Animation finishes.
                card.style.animation = "none";
                card.style.opacity = "1";
                card.style.transform = "none";
                card.style.filter = "none";
                card.style.willChange = "auto";
              })
              .catch(() => {
                // Cancelling during route changes is expected.
              });
          });
        });
      });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      runningAnimations.forEach((animation) => animation.cancel());
      cards.forEach(clearAnimationStyles);
    };
  }, [pathname]);

  return (
    <div ref={rootRef} data-listings-route-reveal={pathname}>
      {children}
    </div>
  );
}
