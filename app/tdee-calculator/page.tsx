import React from "react";
import CalculatorComponent from "../components/TdeeCalculator";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-0">TDEE Calculator</h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 14, 2024
      </span>
      <p className="text-md text-black">
        TDEE, or Total Daily Energy Expenditure, is a measure of how many
        calories your body requires in a day to maintain its current weight,
        factoring in all physical activities and bodily functions. It&apos;s
        essential for creating a tailored diet plan, whether for weight loss,
        gain, or maintenance.
      </p>

      <CalculatorComponent />
    </section>
  );
}
