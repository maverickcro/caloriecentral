import React from "react";
import CalculatorComponent from "../components/TdeeCalculator";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";
import CalculatorCard from "../components/CalculatorCard";
import CustomButton from "../components/CustomButton";

export const metadata = {
  title: "TDEE Calculator",
  description:
    "Accurately calculate your Total Daily Energy Expenditure to measure how many calories your burn per day based on your activity.",
  keywords: [
    "TDEE calculator",
    "daily calorie needs",
    "calorie burn calculator",
    "total daily energy expenditure",
    "diet planning tool",
    "calorie maintenance calculator",
    "weight management calculator",
    "calorie tracker for weight loss",
    "exercise calorie counter",
    "nutritional planning aid",
  ],
};

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="font-bold text-gradient mb-0">TDEE Calculator</h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Feb 1, 2024
        </span>
        <p className="text-black">
          TDEE, or Total Daily Energy Expenditure, is a measure of how many
          calories your body requires in a day to maintain its current weight,
          factoring in all physical activities and bodily functions. It&apos;s
          essential for creating a tailored diet plan, whether for weight loss,
          gain, or maintenance.
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm">References:</span>
        <ul className="text-sm">
          <li>
            <Link
              rel="nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/7942572/"
            >
              Schulz LO, Schoeller DA. A compilation of total daily energy
              expenditures and body weights in healthy adults. Am J Clin Nutr.
              1994 Nov;60(5):676-81. doi: 10.1093/ajcn/60.5.676. PMID: 7942572.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/8878356/"
            >
              Tappy L. Thermic effect of food and sympathetic nervous system
              activity in humans. Reprod Nutr Dev. 1996;36(4):391-7. doi:
              10.1051/rnd:19960405. PMID: 8878356.
            </Link>
          </li>
        </ul>
      </section>
      <section className="mt-6 mx-auto px-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
          {/* <CalculatorCard
            title="Macro Calculator"
            href="/macro-calculator"
            description="How much protein, carbohydrate, and fat is optimal for your goal."
            src="/macro-calculator.png"
            alt="Macro Calculator"
          /> */}
          <CalculatorCard
            title="Calorie Deficit Calculator"
            href="/calorie-deficit-calculator"
            description="Estimate how many calories you need to eat LESS per day to have your GOAL weight until a certain DATE."
            src="/calorie-deficit.png"
            alt="Calorie Deficit Calculator"
          />
          <CalculatorCard
            title="Body Recomposition Calculator"
            href="/body-recomposition-calculator"
            description="Did you know you can BUILD muscle and BURN fat at the same time? Calculate calories here!"
            src="/body-recomposition.png"
            alt="Body Recomposition Calculator"
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
