import Image from "next/image";
import React from "react";
import mobileLogo from "@/public/img/printforge-logo-icon.svg";
import desktopLogo from "@/public/img/printforge-logo.svg";
import Link from "next/link";
import NavLink from "./NavLink";

function Navbar() {
  return (
    <nav className="flex justify-between px-5 md:px-10 py-1.5">
      <Link href={"/"}>
        <Image
          width={40}
          height={40}
          src={mobileLogo.src}
          alt="Printforge logo"
          className="block md:hidden"
        />
        <Image
          width={240}
          height={61}
          src={desktopLogo.src}
          alt="Printforge logo"
          className="hidden md:block"
        />
      </Link>
      <ul className="flex gap-10 items-center">
        <NavLink url="/3d-models">3D Models</NavLink>
        <NavLink url="/about">About</NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
