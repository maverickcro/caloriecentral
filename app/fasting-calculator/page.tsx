import React from "react";
import CalculatorComponent from "../components/FastingCalculator";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-0">
        Intermittent Fasting Calculator
      </h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 20, 2024
      </span>
      <p className="text-base text-black">
        Intermittent fasting has become increasingly popular for various
        reasons, and people fast for different goals. Weight loss, health
        benefits and much more. Let&apos;s calculate the calories behind it.
      </p>

      <CalculatorComponent />
    </section>
  );
}
