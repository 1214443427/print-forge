"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBrowser } from "./ModelsBrowserContext";

function SortButton({
  children,
  sortQuery,
}: {
  children: React.ReactNode;
  sortQuery: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("sort");
  const active = queryParam === sortQuery;

  const { startTransition } = useBrowser();

  function handleSort() {
    const queryParamURL = searchParams.toString();
    const newParams = new URLSearchParams(queryParamURL);
    newParams.delete("page");
    newParams.set("sort", sortQuery);
    const url = `${pathname}?${newParams.toString()}`;
    startTransition(() => {
      router.push(url);
    });
  }

  return (
    <button
      onClick={handleSort}
      className={`rounded-full cursor-pointer border ${active ? "bg-orange-400 text-white" : "hover:bg-gray-100"} border-gray-300 px-3 py-1.5 flex justify-center items-center`}
    >
      {children}
    </button>
  );
}

export default SortButton;
