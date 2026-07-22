"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { TransitionStartFunction } from "react";

function PaginationButton({
  pageNumber,
  startTransition,
}: {
  pageNumber: number;
  startTransition: TransitionStartFunction;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const currentPage = params.get("page");

  const active =
    Number(currentPage) == pageNumber ||
    (currentPage == null && pageNumber == 1);

  function handleClick() {
    const searchParams = new URLSearchParams(params.toString());
    searchParams.set("page", pageNumber.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <button
      onClick={handleClick}
      className={`w-8 h-8 rounded-md border border-gray-300 text-gray-700 cursor-pointer ${active ? "bg-amber-600 text-white" : "hover:bg-gray-100"}`}
    >
      {pageNumber}
    </button>
  );
}

export default PaginationButton;
