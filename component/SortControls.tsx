import React, { TransitionStartFunction } from "react";
import SortButton from "./SortButton";

function SortControls() {
  return (
    <div className="flex items-center gap-2 p-1">
      <p className="text-gray-600 font-medium text-sm">Sort by:</p>
      <SortButton sortQuery="alpha">A-Z</SortButton>
      <SortButton sortQuery="popular">Popular</SortButton>
      <SortButton sortQuery="recent">Recent</SortButton>
    </div>
  );
}

export default SortControls;
