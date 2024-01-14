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
      <div className="pt-12">
        <Link
          href={`${href}`}
          className="group bg-transparent rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-[1.03] flex flex-col sm:flex-row"
        >
          <div className="flex sm:flex-row items-center w-full h-full relative">
            <Image
              src={src}
              alt={`${alt}`}
              style={{ objectFit: "cover" }}
              className="rounded-l-xl w-full"
              height={200}
              width={200}
            />
          </div>
          <div className="p-4 text-center flex flex-col justify-center items-center mx-auto w-full">
            <h2 className="text-2xl font-medium leading-tight">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
