import React from "react";

function TagPill({ tag }: { tag: string }) {
  return (
    <p className="border border-gray-300 w-fit px-2.5 py-0.5 rounded-full text-gray-700">
      {tag}
    </p>
  );
}

export default TagPill;
