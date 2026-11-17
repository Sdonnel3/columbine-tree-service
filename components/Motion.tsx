"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Fades each part of a section in as it scrolls into view, and counts the
// page view for the owner page. Content is fully visible without this.
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.94;
      document
        .querySelectorAll("[data-reveal]:not(.in),[data-grow]:not(.in)")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < limit) el.classList.add("in");
        });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    // Wait a beat so the page is fully live before anything is marked.
    const start = setTimeout(check, 60);
    // Safety net: never leave anything hidden.
    const net = setInterval(check, 1500);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    if (!path.startsWith("/admin")) {
      try {
        navigator.sendBeacon("/api/view", JSON.stringify({ path }));
      } catch {}
    }
    return () => {
      clearTimeout(start);
      clearInterval(net);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [path]);
  return null;
}
