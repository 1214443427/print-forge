"use client";

import { createContext, useContext, TransitionStartFunction } from "react";

type BrowserContextValue = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

const BrowserContext = createContext<BrowserContextValue | null>(null);

export function useBrowser(): BrowserContextValue {
  const ctx = useContext(BrowserContext);
  if (ctx === null) {
    throw new Error("useBrowser must be used within <ModelsBrowser>");
  }
  return ctx;
}

export default BrowserContext;
