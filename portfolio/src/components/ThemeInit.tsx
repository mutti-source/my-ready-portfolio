"use client";

import React, { useEffect } from "react";

export default function ThemeInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute(
        "data-bs-theme",
        prefersDark ? "dark" : "light"
      );
    } catch (e) {
      console.warn("Theme init error:", e);
    }
  }, []);

  return null;
}
