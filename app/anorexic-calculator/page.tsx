import React from "react";
import CalculatorComponent from "../components/AnorexicBMICalculator";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";
import CalculatorCard from "../components/CalculatorCard";
import CustomButton from "../components/CustomButton";

export const metadata = {
  title: "Anorexic BMI Calculator - CaloriePal",
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
    <main>
      <section className="mt-6 calculator-layout mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="font-bold text-gradient mb-0">
          Anorexic BMI Calculator
        </h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Apr 10, 2024
        </span>
        <p className="text-black dark:text-white">
          Get the idea of which BMI is anorexic, from physical aspect. Calculate
          your BMI in order to identify a potential anorexia nervosa with our
          Anorexic BMI Calculator.
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm text-black dark:text-white">
          References:
        </span>
        <ul className="text-sm">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer "
              className=" text-sm text-black dark:text-white"
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8837073/"
            >
              Toppino, Federica, et al. &quot;Body Mass Index Specifiers in
              Anorexia Nervosa: Anything below the &apos;Extreme&apos;?&quot;
              Journal of Clinical Medicine, vol. 11, no. 3, 2022, p. 542.
            </a>
          </li>
        </ul>
      </section>
      <section className="mt-6 mx-auto px-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
          <CalculatorCard
            title="Protein Intake Calculator"
            href="/protein-calculator"
            description="Calculate the optimal protein intake wheter you are on a weight loss, maintain weight or want to build muscle."
            src="/protein-calculator.jpg"
            alt="Protein Intake Calculator"
          />
          <CalculatorCard
            title="Carbs Intake Calculator"
            href="/carbs-calculator"
            description="Calculate the optimal carbs intake wheter you are on a weight loss, maintain weight or want to gain weight."
            src="/carbs-calculator.png"
            alt="Carbs Intake Calculator"
          />
          <CalculatorCard
            title="Fat Intake Calculator"
            href="/fat-calculator"
            description="Calculate the optimal fat intake wheter you are on a weight loss, maintain weight or want to gain weight."
            src="/fat-calculator.png"
            alt="Fat Intake Calculator"
          />
        </div>

        <div className="w-full flex justify-center pb-12">
          <Link href="/calculators">
            <CustomButton type={"gradient"} label="VIEW ALL CALCULATORS" />
          </Link>
        </div>
      </section>
      <AboutMeSection />
    </main>
  );
}
