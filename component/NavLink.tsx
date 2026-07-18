import Link from "next/link";
import React from "react";
import classNames from "classnames";

function NavLink({
  url,
  children,
  classname,
}: {
  url: string;
  children: React.ReactNode;
  classname?: string;
}) {
  const newClassName = classNames(
    "uppercase text-gray-700 text-sm transition-colors hover:text-orange-400",
    classname,
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
