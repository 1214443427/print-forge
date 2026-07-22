import React from "react";
import PaginationButton from "./PaginationButtons";

function PaginationControls({ totalPageNumber }: { totalPageNumber: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: totalPageNumber }).map((_, index) => (
        <PaginationButton key={index} pageNumber={index + 1} />
      ))}
    </div>
  );
}

export default PaginationControls;
