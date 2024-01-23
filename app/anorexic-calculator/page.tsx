import React from "react";
import CalculatorComponent from "../components/AnorexicBMICalculator";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-0">
        Anorexia BMI Calculator
      </h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 22, 2024
      </span>
      <p className="text-base text-black">
        Accurately assess your health with our Anorexia BMI Calculator, a
        critical resource for identifying potential anorexia nervosa based on
        BMI. It&apos;s a vital first step towards awareness and seeking
        appropriate care.
      </p>

      <CalculatorComponent />
    </section>
  );
}
