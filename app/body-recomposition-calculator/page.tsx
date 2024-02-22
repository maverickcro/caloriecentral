import React from "react";
import CalculatorComponent from "../components/BodyRecompositionCalculator";
import CalculatorCard from "../components/CalculatorCard";
import AboutMeSection from "../components/AboutMeSection";
import Link from "next/link";
import CustomButton from "../components/CustomButton";

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="font-bold text-gradient mb-0">
          Body Recomposition Calculator
        </h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Feb 22, 2024
        </span>
        <p className="text-black">
          Experience the power of transformation with our Body Recomposition
          Calculator, designed to help you simultaneously lose fat and build
          muscle. This tool is your ally in navigating the nuanced balance of
          diet and exercise, paving the way for you to achieve a leaner,
          stronger physique.
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm">References:</span>
        <ul className="text-sm">
          <li>
            <Link
              rel="nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/16004827/"
            >
              Manore MM. Exercise and the Institute of Medicine recommendations
              for nutrition. Curr Sports Med Rep. 2005 Aug;4(4):193-8. doi:
              10.1097/01.csmr.0000306206.72186.00. PMID: 16004827.
            </Link>
          </li>
        </ul>
      </section>
      <section className="mt-6 mx-auto px-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
          <CalculatorCard
            title="Macro Calculator"
            href="/macro-calculator"
            description="Optimize your protein, carbohydrate, and fat intake simultaneously for maximum muscle gain and fat loss."
            src="/macro-calculator.png"
            alt="Macro Calculator"
          />
          <CalculatorCard
            title="Cal Calc - TDEE Calculator"
            href="/tdee-calculator"
            description="Learn How Many Calories You Burn Every Day Just For Existing."
            src="/tdee-calculator.png"
            alt="Cal Calc - TDEE calculator"
          />
          <CalculatorCard
            title="Calorie Deficit Calculator"
            href="/calorie-deficit-calculator"
            description="Efficiently calculate your daily calorie needs for healthy weight management with our user-friendly Calorie Deficit Calculator."
            src="/calorie-deficit.png"
            alt="Calorie Deficit Calculator"
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
