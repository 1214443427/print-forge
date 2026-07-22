import NotFoundUI from "@/component/NotFoundUI";
import React from "react";

function NotFound() {
  return (
    <NotFoundUI
      title="Model Not Found"
      subtitle="We couldn't find the requested model."
      linkHref="/3d-models"
      linkText="Back to Models"
    />
  );
}

export default NotFound;
