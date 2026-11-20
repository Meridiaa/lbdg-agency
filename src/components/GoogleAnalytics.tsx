import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
    if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return;

    if (!document.getElementById("lbdg-ga-script")) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", id, { send_page_view: false });

      const script = document.createElement("script");
      script.id = "lbdg-ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(script);
    }

    window.gtag?.("event", "page_view", {
      page_path: `${pathname}${search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}
