import Link from "next/link";
import Image from "next/image";

type CalculatorCardProps = {
  [x: string]: string;
};

export default function CalculatorCard({
  title,
  description,
  src,
  alt,
  href,
}: CalculatorCardProps) {
  return (
    <>
      <Link
        href={`${href}`}
        passHref
        key={`${href}`}
        className="group flex flex-col blog-post bg-white dark:bg-slate-900 shadow-md dark:shadow-dark overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-[1.03]"
      >
        <div className="relative w-full h-64 cursor-pointer">
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
          <p className="mt-2">{description}</p>
        </div>
      </Link>
    </>
  );
}
