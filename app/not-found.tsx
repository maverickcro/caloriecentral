import React from "react";
import Link from "next/link";
import CalculatorCard from "./components/CalculatorCard";
import CustomButton from "./components/CustomButton";

export const metadata = {
  title: "Oops - Page not found ",
  description:
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  keywords: "404 error, page not found, broken link",
};

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="text-gradient__orange">Did you type the wrong url?</h1>
        <p className="text-black dark:text-white">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <p className="text-black dark:text-white">
          You can{" "}
          <Link className="text-black dark:text-white" href="/">
            Return Home
          </Link>{" "}
          or check out these:
        </p>
      </section>
      <section className="mt-6 mx-auto px-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
          <CalculatorCard
            title="Subway Calorie Calculator"
            href="/subway-calculator"
            description="Calculate the nutrition of your favorite Subway sandwich."
            src="/subway-calculator.jpg"
            alt="Subway calorie nutrition calculator"
          />
          <CalculatorCard
            title="Weight Loss Calculator"
            href="/weight-loss-calculator"
            description="Estimate how many calories you need to eat LESS per day to have your GOAL weight until a certain DATE."
            src="/weight-loss-calculator.png"
            alt="Weight Loss Calculator"
          />
          <CalculatorCard
            title="Body Recomposition Calculator"
            href="/body-recomposition-calculator"
            description="Did you know you can BUILD muscle and BURN fat at the same time? Calculate calories here!"
            src="/body-recomposition-calculator.png"
            alt="Body Recomposition Calculator"
          />
        </div>
      </section>
    </main>
  );
}
