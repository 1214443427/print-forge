import Link from "next/link";
import React, { ReactElement } from "react";

function NavLink({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={url}
        className="uppercase text-gray-700 text-sm transition-colors hover:text-orange-400"
      >
        {children}
      </Link>
    </li>
  );
}

export default NavLink;
