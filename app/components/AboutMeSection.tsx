import { FaLinkedin } from "react-icons/fa"; // Ensure you have `react-icons` installed
import Image from "next/image";
import Link from "next/link";
export default function AboutMeSection() {
  return (
    <section className="my-6 mx-auto max-w-4xl">
      <div className="mx-auto p-6">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/markan.png"
            alt="about-me"
            className="mb-4 w-30 h-30 rounded-full shadow-lg"
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
          />
          <h2 className="text-2xl font-semibold">Marko S.</h2>
          <p className="mt-3 mb-4">
            Hi👋, I&apos;m Marko. After starting corporate life, I never had
            time for anything. Every day was the same, I would work for 10
            hours, ate mostly junk food and fitness became a foreign word. I was
            too lazy to do anything about it because I felt I had more important
            things to do. After a couple of years, my sedentary lifestyle took a
            toll on my health. I haven&apos;t played many sports, had a terrible
            diet, and had no idea about healthy habits. I took matters into my
            own hands, started working out, and improved my diet. A good plan
            was all it took. I&apos;ve lost 15 pounds, gained some muscle and
            now I feel better than ever. I made it my addiction. As a software
            developer, I decided to make some essential calculators from the
            knowledge I learned through my journey, as well as some additional
            ones. I truly hope they will help you as well 🙏.
          </p>
          <div className="flex space-x-4 justify-center">
            <Link
              href="https://www.linkedin.com/in/marko-stjepanovic-163574151/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-3xl text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
