"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function PaginationButton({
  pageNumber,
  currentPage,
  children,
}: {
  pageNumber: number;
  currentPage: number;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

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
      {children}
    </button>
  );
}

export default PaginationButton;
