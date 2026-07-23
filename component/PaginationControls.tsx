import React from "react";
import PaginationButton from "./PaginationButtons";

function PaginationControls({
  totalPageNumber,
  currentPage,
}: {
  totalPageNumber: number;
  currentPage: number;
}) {
  return (
    <div className="flex gap-1">
      {
        totalPageNumber > 1 && (
          <>
            {currentPage > 2 && (
              <PaginationButton pageNumber={1} currentPage={currentPage}>
                {"<<"}
              </PaginationButton>
            )}
            {currentPage > 1 && (
              <PaginationButton
                pageNumber={currentPage - 1}
                currentPage={currentPage}
              >
                {currentPage - 1}
              </PaginationButton>
            )}
            <PaginationButton
              pageNumber={currentPage}
              currentPage={currentPage}
            >
              {currentPage}
            </PaginationButton>
            {totalPageNumber - currentPage > 0 && (
              <PaginationButton
                pageNumber={currentPage + 1}
                currentPage={currentPage}
              >
                {currentPage + 1}
              </PaginationButton>
            )}
            {totalPageNumber - currentPage > 1 && (
              <PaginationButton
                pageNumber={totalPageNumber}
                currentPage={currentPage}
              >
                {">>"}
              </PaginationButton>
            )}
          </>
        )
        // <PaginationButton
        // key={index}
        // pageNumber={index + 1}
        // currentPage={currentPage}
        // />
      }
    </div>
  );
}

export default PaginationControls;
