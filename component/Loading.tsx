import React from "react";

function Loading() {
  return (
    <div role="status" className="flex items-center justify-center gap-2 p-1">
      <span className="sr-only">Loading...</span>
      <div className="h-3 w-3 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 rounded-full bg-gray-500 animate-bounce"></div>
    </div>
  );
}

export default Loading;
