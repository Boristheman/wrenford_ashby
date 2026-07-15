import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        /*
         * The homepage owns a separate copy of the desktop header. Keep its
         * dropdown pointer overlapping the dark strip by one pixel so no
         * anti-aliased white gap appears.
         */
        svg[viewBox="0 0 28 15"][class~="top-[-15px]"] {
          top: -14px !important;
        }
      `}</style>

      {children}
    </>
  );
}
