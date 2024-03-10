import React from "react";
import CalculatorComponent from "../components/SugarCalculator";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";
import CalculatorCard from "../components/CalculatorCard";
import CustomButton from "../components/CustomButton";

export const metadata = {
  title: "Sugar Intake Calculator",
  description:
    "Calculate how much sugar you need per day for weight loss or weight gain. Limit calories from sugars with our free tool.",
  keywords: [
    "sugar intake calculator",
    "daily sugar limit",
    "sugar consumption for weight loss",
    "limit calories from sugar",
    "sugar and health risks",
    "American Heart Association sugar guidelines",
    "sugar intake for weight gain",
    "monitor sugar consumption",
    "nutrient-poor foods and sugar",
    "caloric surplus and sugar",
  ],
};

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="font-bold text-gradient mb-0">
          Sugar Intake Calculator
        </h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Jan 30, 2024
        </span>
        <p className="text-black">
          Excessive sugar consumption is directly linked to health risks,
          including weight gain and heart disease. The American Heart
          Association&apos;s journal, &apos;Circulation&apos;*, cites a clear
          link between added sugars and a higher risk of cardiovascular issues.
        </p>
        <p className="text-black">
          Limiting sugar is crucial for weight loss as it reduces calorie intake
          and deters fat accumulation from nutrient-poor foods. Those
          maintaining weight also need to monitor sugar to avoid unintended gain
          from caloric surplus.
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm">References:</span>
        <ul className="text-sm">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://www.ahajournals.org/doi/full/10.1161/01.cir.0000019552.77778.04"
            >
              2014 American Heart Association study on sugar intake - Sugar and
              Cardiovascular Disease
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/how-much-sugar-is-too-much"
            >
              American Heart Association - How much sugar is too much?
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet#:~:text=Less%20than%2010%25%20of%20total%20energy%20intake%20from%20free%20sugars,additional%20health%20benefits%20(7)."
            >
              World Health Association (WHO) - Healthy diet
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
