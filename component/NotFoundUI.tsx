import Link from "next/link";
import React from "react";

function NotFoundUI({
  title,
  subtitle,
  linkText,
  linkHref,
}: {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <div className="flex flex-col h-full w-full items-center gap-4">
      <p>🙈️</p>
      <h1 className="text-5xl font-semibold">{title}</h1>
      <h2>{subtitle}</h2>
      <Link
        href={linkHref}
        className="p-3 rounded-md border-2 border-orange-400 text-orange-400 font-semibold"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default NotFoundUI;
