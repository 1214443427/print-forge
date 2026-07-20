"use client";

import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

function NavLink({
  url,
  children,
  type,
  classname,
}: {
  url: string;
  children: React.ReactNode;
  type: "category" | "navbar";
  classname?: string;
}) {
  const pathname = usePathname();
  let active;
  if (type === "category") {
    active = pathname.endsWith(url);
  } else {
    active = pathname.startsWith(url);
  }

  const newClassName = classNames(
    "uppercase text-sm transition-colors hover:text-orange-400 whitespace-nowrap",
    classname,
    active ? "text-orange-400" : "text-gray-700",
  );

  return (
    <li>
      <Link href={url} className={newClassName}>
        {children}
      </Link>
    </li>
  );
}

export default NavLink;
