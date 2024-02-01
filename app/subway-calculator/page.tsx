import React from "react";
import CalculatorComponent from "../components/SubwayCalculator";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="text-3xl font-bold text-gradient mb-0">
        Subway Calorie Calculator
      </h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 14, 2024
      </span>
      <p className="text-black">
        We will show you important nutritional facts about your meal.
      </p>
      <CalculatorComponent />
      <span className="text-sm">
        Reference:{" "}
        <Link
          rel="nofollow"
          href="https://www.subway.com/en-us/-/media/northamerica/usa/nutrition/nutritiondocuments/us_nutrition_june2023"
        >
          June 2023, Subway U.S Nutrition Information - Official PDF with
          nutritional values and calories in bread, protein, sauces and sides.
        </Link>
      </span>
      <AboutMeSection />
    </section>
  );
}
