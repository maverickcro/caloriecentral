import React from "react";
import CalculatorComponent from "../components/CarbsCalculator";
import Link from "next/link";
import CalculatorCard from "../components/CalculatorCard";
import CustomButton from "../components/CustomButton";
import AboutMeSection from "../components/AboutMeSection";

export const metadata = {
  title: "Carbs Intake Calculator",
  description:
    "Easily manage carbohydrates for weight loss or gain with our calculator. Ideal for energy, health, and diabetes prevention.",
  keywords: [
    "carbs intake calculator",
    "carbohydrate calculator for diet",
    "manage carbs for weight loss",
    "carbs for weight gain",
    "daily carb requirement calculator",
    "carb counting tool",
    "nutritional carb calculator",
    "carbs for energy and health",
    "diabetes carb management",
    "optimal carbs intake guide",
  ],
};

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="font-bold text-gradient mb-0">
          Carbs Intake Calculator
        </h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Feb 5, 2024
        </span>
        <p className="text-black dark:text-white">
          We will calculate how much carbs you need per day or at least should
          be taking during weight loss, maintenance or weight gain.
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm text-black dark:text-white">
          References:
        </span>
        <ul className="text-sm">
          <li>
            <a
              target="_blank"
              className="text-black dark:text-white"
              rel="noopener noreferrer nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/16004827/"
            >
              Manore MM. Exercise and the Institute of Medicine recommendations
              for nutrition. Curr Sports Med Rep. 2005 Aug;4(4):193-8. doi:
              10.1097/01.csmr.0000306206.72186.00. PMID: 16004827.
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="text-black dark:text-white"
              rel="noopener noreferrer nofollow"
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4224210/"
            >
              Slavin J, Carlson J. Carbohydrates. Adv Nutr. 2014 Nov
              14;5(6):760-1. doi: 10.3945/an.114.006163. PMID: 25398736; PMCID:
              PMC4224210.
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="text-black dark:text-white"
              rel="noopener noreferrer nofollow"
              href="https://www.ncbi.nlm.nih.gov/books/NBK459280/"
            >
              Julie E. Holesh; Sanah Aslam; Andrew Martin. Physiology,
              Carbohydrates. 2023 May 12;
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
            title="Fat Intake Calculator"
            href="/fat-calculator"
            description="Calculate the optimal fat intake wheter you are on a weight loss, maintain weight or want to gain weight."
            src="/fat-calculator.png"
            alt="Fat Intake Calculator"
          />
          <CalculatorCard
            title="Sugar Calculator"
            href="/sugar-calculator"
            description="
      How much sugar are you allowed to eat per day. This comes handy if you are on a weight loss."
            src="/sugar-calculator.png"
            alt="Sugar Calculator"
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
