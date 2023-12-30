import React from "react";
import CalculatorComponent from "../components/Calculator";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient">
        Subway Calorie Calculator
      </h1>
      <p className="text-md text-black">
        We will show you important nutritional facts about your meal.
      </p>
      <CalculatorComponent />
    </section>
  );
}
