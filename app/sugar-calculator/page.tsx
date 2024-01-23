import React from "react";
import CalculatorComponent from "../components/SugarCalculator";
import Link from "next/link";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-0">
        Sugar Intake Calculator
      </h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 23, 2024
      </span>
      <p className="text-base text-black">
        Excessive sugar consumption is directly linked to health risks,
        including weight gain and heart disease. The American Heart
        Association&apos;s journal, &apos;Circulation&apos;*, cites a clear link
        between added sugars and a higher risk of cardiovascular issues.
      </p>
      <p className="text-base text-black">
        Limiting sugar is crucial for weight loss as it reduces calorie intake
        and deters fat accumulation from nutrient-poor foods. Those maintaining
        weight also need to monitor sugar to avoid unintended gain from caloric
        surplus.
      </p>
      <p className="text-base text-black">
        A sugar intake calculator is essential, aiding in measuring and managing
        sugar consumption, revealing hidden sugars in processed foods, and
        supporting informed dietary decisions.
      </p>

      <CalculatorComponent />
      <span className="text-sm">
        Reference:{" "}
        <Link
          rel="nofollow"
          href="https://www.ahajournals.org/doi/full/10.1161/01.cir.0000019552.77778.04"
        >
          2014 American Heart Association study on sugar intake - Sugar and
          Cardiovascular Disease
        </Link>
      </span>
    </section>
  );
}
