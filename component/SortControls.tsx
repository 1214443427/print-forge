import React, { TransitionStartFunction } from "react";
import SortButton from "./SortButton";

function SortControls({
  startTransition,
}: {
  startTransition: TransitionStartFunction;
}) {
  return (
    <div className="flex items-center gap-2 p-1">
      <p className="text-gray-600 font-medium text-sm">Sort by:</p>
      <SortButton startTransition={startTransition} sortQuery="alpha">
        A-Z
      </SortButton>
      <SortButton startTransition={startTransition} sortQuery="popular">
        Popular
      </SortButton>
      <SortButton startTransition={startTransition} sortQuery="recent">
        Recent
      </SortButton>
    </div>
  );
}

export default SortControls;
