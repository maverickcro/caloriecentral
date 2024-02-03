import React from "react";
import CalculatorComponent from "../components/FatCalculator";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";
import CalculatorCard from "../components/CalculatorCard";
import CustomButton from "../components/CustomButton";

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="font-bold text-gradient mb-0">Fat Intake Calculator</h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Feb 2, 2024
        </span>
        <p className="text-black">
          We will calculate how much fat you need per day or at least should be
          taking during weight loss, maintenance or weight gain.
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm">References:</span>
        <ul className="text-sm">
          <li>
            <Link
              rel="nofollow"
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5577766/"
            >
              Liu AG, Ford NA, Hu FB, Zelman KM, Mozaffarian D, Kris-Etherton
              PM. A healthy approach to dietary fats: understanding the science
              and taking action to reduce consumer confusion. Nutr J. 2017 Aug
              30;16(1):53. doi: 10.1186/s12937-017-0271-4. PMID: 28854932;
              PMCID: PMC5577766.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://medlineplus.gov/ency/patientinstructions/000838.htm"
            >
              A.D.A.M. Medical Encyclopedia [Internet]. Stefania Manetti, RD/N,
              CDCES, RYT200, My Vita Sana LLC - Nourish and heal through food,
              San Jose, CA. Review provided by VeriMed Healthcare Network. Also
              reviewed by David C. Dugdale, MD, Medical Director, Brenda
              Conaway, Editorial Director, and the A.D.A.M. Editorial team.
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
          <CalculatorCard
            title="Carbs Intake Calculator"
            href="/carbs-calculator"
            description="Calculate the optimal carbs intake wheter you are on a weight loss, maintain weight or want to gain weight."
            src="/carbs-calculator.png"
            alt="Carbs Intake Calculator"
          />
          <CalculatorCard
            title="Sugar Calculator"
            href="/sugar-calculator"
            description="
          How much sugar are you allowed to eat per day. This comes handy if you are on a weight loss."
            src="/sugar-calculator.png"
            alt="Sugar Calculator"
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
