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
          When I was starting my fitness journey, this was the first thing that
          piqued my interest. <strong>Body recomp</strong> gave the best
          results. I was able to simultaneously{" "}
          <strong>lose fat and build muscle</strong>. This calculator will
          advise you on your macros, both training and rest days.
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm">References:</span>
        <ul className="text-sm">
          <li>
            <Link
              rel="nofollow"
              href="https://www.healthline.com/nutrition/body-recomposition"
            >
              Kubala, J. (2023, January 27). Body Recomposition: Lose Fat and
              Gain Muscle at the Same Time. Healthline.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://europepmc.org/article/med/35019903"
            >
              Ribeiro AS, Pereira LC, Schoenfeld BJ, et al. Moderate and Higher
              Protein Intakes Promote Superior Body Recomposition in Older Women
              Performing Resistance Training. Medicine and Science in Sports and
              Exercise. 2022 May;54(5):807-813. DOI:
              10.1249/mss.0000000000002855. PMID: 35019903.
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
