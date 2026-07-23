import NotFoundUI from "@/component/NotFoundUI";

function NotFound() {
  return (
    <>
      <NotFoundUI
        title="Page Not Found"
        subtitle="Sorry we couldn't find the requested page!"
        linkHref="/"
        linkText="Go Back Home"
      />
    </>
  );
}

export default NotFound;
