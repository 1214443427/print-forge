import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/img/hero-image.png";
import mobileHeroImage from "@/public/img/hero-image-square.png";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center mx-auto justify-center md:flex-row md:gap-10 md:w-9/10">
      <div className="flex flex-col h-2/3 max-h-120 justify-between md:w-1/2 py-10 px-5 ">
        <section className="flex flex-col gap-5 ">
          <h3 className="hidden md:block uppercase font-medium">
            Your go-to platform for 3D printing files
          </h3>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold">
            Discover what’s possible with 3D printing
          </h1>
          <h2 className="text-2xl">
            Join our community of creators and explore a vast library of
            user-submitted models.
          </h2>
        </section>
        <Link
          className="text-[20px] font-semibold p-3 border-2 w-fit uppercase"
          href={"/3d-models"}
          role="button"
        >
          Browse models
        </Link>
      </div>
      <Image
        className="hidden md:block md:w-1/2"
        src={heroImage.src}
        width={heroImage.width}
        height={heroImage.height}
        alt="A collection of 3d printed models, including the US capital building, statue of Greek Philosopher, and more."
      />
      <Image
        className="mask-t-from-0% md:hidden"
        src={mobileHeroImage.src}
        width={mobileHeroImage.width}
        height={mobileHeroImage.height}
        alt="A collection of 3d printed models, including the US capital building, statue of Greek Philosopher, and more."
      />
    </div>
  );
}
