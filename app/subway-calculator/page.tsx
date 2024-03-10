import React from "react";
import CalculatorComponent from "../components/SubwayCalculator";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";
import { Metadata } from "next";
import CustomButton from "../components/CustomButton";
import CalculatorCard from "../components/CalculatorCard";

export const metadata: Metadata = {
  title: "Subway Sandwich Nutrition and Calorie Calculator 2024",
  description:
    "Calculate nutritional information and calories for your favorite Subway sandwiches and wraps with our 2024 updated tool.",
  keywords: [
    "Subway calorie calculator",
    "Subway nutrition facts",
    "Subway sandwich calories",
    "Subway menu calculator",
    "2024 Subway nutrition",
    "Subway meal planner",
    "Subway diet calculator",
    "Subway calories 2024",
    "Healthy Subway choices",
    "Subway nutrition calculator",
  ],
};

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="text-3xl font-bold text-gradient mb-0">
          Subway Calorie Calculator
        </h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Mar 9, 2024
        </span>
        <p className="text-black">
          We will show you important nutritional facts about your meal.
        </p>
        <CalculatorComponent />
        <span className="font-bold text-sm">Reference:</span>
        <ul className="text-sm">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://www.subway.com/en-ca/menunutrition/nutrition"
            >
              June 2023, Subway U.S Nutrition Information - Official PDF with
              nutritional values and calories in bread, protein, sauces and
              sides.
            </a>
          </li>
        </ul>
      </section>
      <section className="mt-6 mx-auto px-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
          <CalculatorCard
            title="Protein Intake Calculator"
            href="/protein-calculator"
            description="Calculate the optimal protein intake wheter you are on a weight loss, maintain weight or want to build muscle."
            src="/protein-calculator.png"
            alt="Protein Intake Calculator"
          />
          <CalculatorCard
            title="Carbs Intake Calculator"
            href="/carbs-calculator"
            description="Calculate the optimal carbs intake wheter you are on a weight loss, maintain weight or want to gain weight."
            src="/carbs-calculator.png"
            alt="Carbs Intake Calculator"
          />
          <CalculatorCard
            title="Fat Intake Calculator"
            href="/fat-calculator"
            description="Calculate the optimal fat intake wheter you are on a weight loss, maintain weight or want to gain weight."
            src="/fat-calculator.png"
            alt="Fat Intake Calculator"
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
