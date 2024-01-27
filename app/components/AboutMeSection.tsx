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
            Welcome! I&apos;m Marko, a former soccer enthusiast turned tech
            geek. Transitioning from sports to a tech career, I noticed the toll
            a sedentary lifestyle took on my health. After gaining unwanted
            weight, I delved into the world of nutrition, discovering the power
            of caloric balance. Losing 15 pounds and gaining muscle, I&apos;ve
            learned that effective dieting isn&apos;t about
            restrictions—it&apos;s about understanding and enjoying food. Join
            me as I share insights on smart eating without the guilt.
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
