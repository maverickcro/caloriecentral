import React from "react";
import CalculatorComponent from "../components/FastingCalculator";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";

export const metadata = {
  title: "Fasting Calculator - Plan Intermittent Fasting",
  description:
    "Plan and monitor your fasting schedule with our intuitive Fasting Calculator. Ideal for intermittent fasting, weight loss, and health improvement.",
  keywords: [
    "fasting calculator",
    "intermittent fasting planner",
    "fasting schedule tracker",
    "IF calculator",
    "weight loss fasting tool",
    "health fasting guide",
    "fasting hours calculator",
    "fasting time tracker",
    "fasting for health",
    "intermittent fasting calculator",
  ],
};

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="font-bold text-gradient mb-0">
        Intermittent Fasting Calculator
      </h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 20, 2024
      </span>
      <p className="text-black">
        Intermittent fasting has become increasingly popular for various
        reasons, and people fast for different goals. Weight loss, health
        benefits and much more. Let&apos;s calculate the calories behind it.
      </p>

      <CalculatorComponent />
      <span className="font-bold text-sm">References:</span>
      <ul className="text-sm">
        <li>
          <Link
            rel="nofollow"
            href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7021351/"
          >
            National Library of Medicine - Welton S, Minty R, O&apos;Driscoll T,
            Willms H, Poirier D, Madden S, Kelly L. Intermittent fasting and
            weight loss: Systematic review. Can Fam Physician. 2020
            Feb;66(2):117-125. PMID: 32060194; PMCID: PMC7021351.
          </Link>
        </li>
        <li>
          <Link
            rel="nofollow"
            href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10098946/"
          >
            National Library of Medicine - Elortegui Pascual P, Rolands MR,
            Eldridge AL, Kassis A, Mainardi F, Lê KA, Karagounis LG, Gut P,
            Varady KA. A meta-analysis comparing the effectiveness of alternate
            day fasting, the 5:2 diet, and time-restricted eating for weight
            loss. Obesity (Silver Spring). 2023 Feb;31 Suppl 1(Suppl 1):9-21.
            doi: 10.1002/oby.23568. Epub 2022 Nov 8. PMID: 36349432; PMCID:
            PMC10098946.
          </Link>
        </li>
        <li>
          <Link rel="nofollow" href="https://pubmed.ncbi.nlm.nih.gov/34633860/">
            National Library of Medicine - EVarady, K. A., Cienfuegos, S.,
            Ezpeleta, M., & Gabel, K. (2021). Cardiometabolic benefits of
            intermittent fasting. Annual Review of Nutrition, 41, 333-361
          </Link>
        </li>
      </ul>
      <AboutMeSection />
    </section>
  );
}
