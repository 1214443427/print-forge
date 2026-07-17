import React from "react";
import heroImage from "@/public/img/hero-image-square.png";
import Image from "next/image";
import modelsIcon from "@/public/img/layer.svg";
import globeIcon from "@/public/img/globe.svg";
import flagIcon from "@/public/img/flag.svg";

function page() {
  return (
    <div className="flex flex-col px-5 items-center">
      <div className="flex flex-col md:flex-row md:gap-20 md:p-10  md:w-9/10">
        <Image
          className="max-w-180 w-1/2"
          src={heroImage.src}
          width={heroImage.width}
          height={heroImage.height}
          alt="A collection of 3d printed models, including gear, dice, and human sculptures"
        />
        <section className="flex flex-col gap-5 my-5 w-1/2">
          <h1 className="uppercase text-sm font-medium">About printforge</h1>
          <h2 className="text-4xl font-montserrat font-bold">
            Empowering makers worldwide
          </h2>
          <p className="text-2xl">
            Founded in 2023, PrintForge has quickly become the go-to platform
            for 3D printing enthusiasts, makers, and professional designers to
            share and discover amazing STL files for 3D printing.
            <br className="mb-5" />
            Our mission is to foster a vibrant community where creativity meets
            technology, enabling anyone to bring their ideas to life through 3D
            printing.
          </p>
        </section>
      </div>
      <hr
        className="border-t-2 border-gray-200 w-screen -mx-5 my-5"
        aria-hidden
      />
      <div className="flex flex-col my-5 items-center">
        <section className="flex flex-col gap-12 md:flex-row md:p-10 md:w-9/10 items-center justify-center">
          <h2 id="key-features" className="sr-only">
            Key Features
          </h2>
          <article className="flex flex-col gap-4 flex-1">
            <div className="flex gap-3">
              <Image src={modelsIcon} alt="" className="w-8"></Image>
              <h2 className="text-2xl font-bold font-montserrat">
                100K+ Models
              </h2>
            </div>
            <p className="text-[20px]">
              Access our vast library of community-created 3D models, from
              practical tools to artistic creations.
            </p>
          </article>
          <hr
            className="hidden md:block border border-gray-300 h-35"
            aria-hidden
          ></hr>
          <article className="flex flex-col gap-4 flex-1">
            <div className="flex gap-3">
              <Image src={globeIcon} alt="" className="w-8"></Image>
              <h2 className="text-2xl font-bold font-montserrat">
                Active Community
              </h2>
            </div>
            <p className="text-[20px]">
              Join thousands of makers who share tips, provide feedback, and
              collaborate on projects.
            </p>
          </article>
          <hr
            className="hidden md:block border border-gray-300 h-35"
            aria-hidden
          ></hr>
          <article className="flex flex-col gap-4 flex-1">
            <div className="flex gap-3">
              <Image src={flagIcon} alt="" className="w-8"></Image>
              <h2 className="text-2xl font-bold font-montserrat">
                Free to Use
              </h2>
            </div>
            <p className="text-[20px]">
              Most models are free to download, with optional premium features
              for power users.
            </p>
          </article>
        </section>
        <hr
          className="border-t-2 border-gray-200 w-screen -mx-5 my-10"
          aria-hidden
        />
        <section className="flex flex-col gap-5 max-w-125">
          <h2 className="font-montserrat text-4xl font-bold">Our vision</h2>
          <p className="text-2xl">
            At PrintForge, we believe that 3D printing is revolutionizing the
            way we create, prototype, and manufacture. Our platform serves as a
            bridge between designers and makers, enabling the sharing of
            knowledge and creativity that pushes the boundaries of what's
            possible with 3D printing.
          </p>
          <hr className="border border-gray-400 w-2/3 self-center max-w-61.25" />
          <p className="text-2xl">
            Whether you're a hobbyist looking for your next weekend project, an
            educator seeking teaching materials, or a professional designer
            wanting to share your creations, PrintForge provides the tools and
            community to support your journey in 3D printing.
          </p>
        </section>
      </div>
    </div>
  );
}

export default page;
