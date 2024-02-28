import React from "react";
import CalculatorComponent from "../components/AnorexicBMICalculator";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";

export const metadata = {
  title: "Anorexic BMI Calculator",
  description:
    "Use our calculator to safely understand BMI related to anorexia for better health management.",
  keywords: [
    "anorexic BMI calculator",
    "BMI for anorexia assessment",
    "health management BMI tool",
    "anorexia nervosa BMI guide",
    "underweight BMI calculator",
    "eating disorder BMI check",
    "BMI diagnostic tool for anorexia",
    "anorexia awareness BMI calculator",
    "BMI health assessment tool",
    "anorexia nervosa health management",
  ],
};

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="font-bold text-gradient mb-0">Anorexic BMI Calculator</h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 22, 2024
      </span>
      <p className=" text-black">
        Accurately assess your health with our Anorexia BMI Calculator, a
        critical resource for identifying potential anorexia nervosa based on
        BMI. It&apos;s a vital first step towards awareness and seeking
        appropriate care.
      </p>

      <CalculatorComponent />
      <span className="font-bold text-sm">References:</span>
      <ul className="text-sm">
        <li>
          <Link
            rel="nofollow"
            href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8837073/://www.ahajournals.org/doi/full/10.1161/01.cir.0000019552.77778.04"
          >
            Toppino, Federica, et al. &quot;Body Mass Index Specifiers in
            Anorexia Nervosa: Anything below the &apos;Extreme&apos;?&quot;
            Journal of Clinical Medicine, vol. 11, no. 3, 2022, p. 542.
          </Link>
        </li>
      </ul>
      <AboutMeSection />
    </section>
  );
}
