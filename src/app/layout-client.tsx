"use client";

import { Sidebar } from "@/components/sidebar/sidebar";
import { Navbar } from "@/components/navbar/navbar";
import { ThemeProvider } from "@/lib/theme-provider";
import { useState, useEffect } from "react";
import { applyBrandingTheme, loadSavedTheme } from "@/lib/theme-utils";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadSavedTheme();

    const handleThemeChange = (event: CustomEvent) => {
      const theme = event.detail;
      applyBrandingTheme(theme.primary);
    };

    window.addEventListener("themeChange" as any, handleThemeChange);
    return () => window.removeEventListener("themeChange" as any, handleThemeChange);
  }, []);

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
          <main className="flex-1 overflow-y-auto bg-muted/30 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
