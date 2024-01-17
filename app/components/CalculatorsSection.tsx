import Link from "next/link";
import Image from "next/image";

type CalculatorSectionProps = {
  [x: string]: string;
};

export default function CalculatorsSection({
  title,
  description,
  src,
  alt,
  href,
}: CalculatorSectionProps) {
  return (
    <>
      <Link
        href={`${href}`}
        passHref
        key={`${href}`}
        className="group flex flex-col blog-post bg-transparent rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-[1.03]"
      >
        <div className="relative w-full h-48 cursor-pointer">
          <Image
            src={src}
            alt={`${alt}`}
            width={200}
            height={200}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="p-4 text-center flex flex-col justify-center items-center mx-auto w-full">
          <h2 className="text-2xl font-medium leading-tight">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </Link>
    </>
  );
}
