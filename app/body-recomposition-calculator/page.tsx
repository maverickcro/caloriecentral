import React from "react";
import CalculatorComponent from "../components/BodyRecompositionCalculator";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-0">
        Body Recomposition Calculator
      </h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 14, 2024
      </span>
      <p className="text-md text-black">
        Experience the power of transformation with our Body Recomposition
        Calculator, designed to help you simultaneously lose fat and build
        muscle. This tool is your ally in navigating the nuanced balance of diet
        and exercise, paving the way for you to achieve a leaner, stronger
        physique.
      </p>

      <CalculatorComponent />
    </section>
  );
}
