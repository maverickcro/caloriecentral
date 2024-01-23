import React from "react";
import CalculatorComponent from "../components/MacroCalculator";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-0">
        Macro Calculator
      </h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 15, 2024
      </span>
      <p className="text-base text-black">
        Fine-tune your diet for peak performance with our Macro Calculator,
        optimizing your intake of proteins, carbs, and fats for simultaneous
        muscle gain and fat loss.
      </p>

      <CalculatorComponent />
    </section>
  );
}
