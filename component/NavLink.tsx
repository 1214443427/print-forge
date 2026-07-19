import Link from "next/link";
import React from "react";
import classNames from "classnames";

function NavLink({
  url,
  children,
  active,
  classname,
}: {
  url: string;
  children: React.ReactNode;
  active: boolean;
  classname?: string;
}) {
  const newClassName = classNames(
    "uppercase text-sm transition-colors hover:text-orange-400",
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
