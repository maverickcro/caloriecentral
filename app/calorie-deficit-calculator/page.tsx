import React from "react";
import CalculatorComponent from "../components/CalorieDeficitCalculator";
import Link from "next/link";
import CalculatorCard from "../components/CalculatorCard";
import CustomButton from "../components/CustomButton";
import AboutMeSection from "../components/AboutMeSection";

export const metadata = {
  title: "Calorie Deficit Calculator for Weight Loss Prediction",
  description:
    "Use our Calorie Deficit Calculator as your weight loss predictor. Find out how many calories to eat and an estimated date for reaching your goal weight. Know when will you reach your wanted weight!",
  keywords: [
    "calorie deficit calculator",
    "weight loss predictor",
    "calorie calculator for weight loss",
    "weight loss estimator",
    "calorie counting tool",
    "weight loss goal calculator",
    "calorie intake calculator",
    "diet planner calculator",
    "goal weight date estimator",
    "calorie deficit for weight loss",
  ],
};

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="font-bold text-gradient mb-0">
          Calorie Deficit Calculator
        </h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Feb 11, 2024
        </span>
        <p className="text-black">
          Calorie Deficit Calculator is here as a{" "}
          <strong>weight loss predictor</strong>, or{" "}
          <strong>weight loss estimator</strong>. This is one of the most useful
          tools out there to get that motivation and feel of certainity that you
          will reach your goals of losing weight.
        </p>
        <p>
          It will tell you <strong>how many calories</strong> to eat and an{" "}
          <strong>estimated date</strong> of reaching your goal weight based on
          your goals! :)
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm">References:</span>
        <ul className="text-sm">
          <li>
            <Link
              rel="nofollow"
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8017325/"
            >
              Kim JY. Optimal Diet Strategies for Weight Loss and Weight Loss
              Maintenance. J Obes Metab Syndr. 2021 Mar 30;30(1):20-31. doi:
              10.7570/jomes20065. PMID: 33107442; PMCID: PMC8017325.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3447534/"
            >
              Finkler E, Heymsfield SB, St-Onge MP. Rate of weight loss can be
              predicted by patient characteristics and intervention strategies.
              J Acad Nutr Diet. 2012 Jan;112(1):75-80. doi:
              10.1016/j.jada.2011.08.034. Epub 2011 Oct 27. PMID: 22717178;
              PMCID: PMC3447534.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://www.nih.gov/news-events/nih-research-matters/weight-loss-depends-less-calories-not-nutrient-mix"
            >
              National Institutes of Health(NIH). Weight Loss Depends on Less
              Calories, Not Nutrient Mix. March 2, 2009.
            </Link>
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
          {/* <CalculatorCard
            title="Macro Calculator"
            href="/macro-calculator"
            description="Optimize your protein, carbohydrate, and fat intake simultaneously for maximum muscle gain and fat loss."
            src="/macro-calculator.png"
            alt="Macro Calculator"
          /> */}
          <CalculatorCard
            title="Body Recomposition Calculator"
            href="/body-recomposition-calculator"
            description="Did you know you can BUILD muscle and BURN fat at the same time? Check calories and body recomposition macros here."
            src="/body-recomposition.png"
            alt="Body Recomposition Calculator"
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
