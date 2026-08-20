"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoid rendering theme-dependent icon/label until mounted, so the
  // server-rendered (dark-default) markup matches the first client render.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      {mounted ? (
        isLight ? (
          <Moon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
        ) : (
          <Sun className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
        )
      ) : (
        <Sun className="h-[1.15rem] w-[1.15rem] opacity-0" strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
