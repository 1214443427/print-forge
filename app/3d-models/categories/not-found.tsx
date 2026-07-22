import NotFoundUI from "@/component/NotFoundUI";
import React from "react";

function NotFound() {
  return (
    <NotFoundUI
      title="Category Not Found"
      subtitle="We couldn't find the requested Category."
      linkHref="/3d-models"
      linkText="Back to All Category"
    />
  );
}

export default NotFound;
