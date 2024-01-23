import React from "react";
import CalculatorComponent from "../components/FatCalculator";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-0">
        Fat Intake Calculator
      </h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 17, 2024
      </span>
      <p className="text-base text-black">
        We will calculate how much fat you need per day or at least should be
        taking during weight loss, maintenance or weight gain.
      </p>

      <CalculatorComponent />
    </section>
  );
}
