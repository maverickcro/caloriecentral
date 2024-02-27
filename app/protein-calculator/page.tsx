import React from "react";
import CalculatorComponent from "../components/ProteinCalculator";
import CustomButton from "../components/CustomButton";
import Link from "next/link";
import AboutMeSection from "../components/AboutMeSection";
import CalculatorCard from "../components/CalculatorCard";

export const metadata = {
  title: "Protein Intake Calculator",
  description: "Proteins suck",
};

export default function Calculator() {
  return (
    <main>
      <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
        <h1 className="font-bold text-gradient mb-0">
          Protein Intake Calculator
        </h1>
        <span className="block pt-1 text-xs font-semibold text-gray-500">
          Updated: Feb 24, 2024
        </span>
        <p className="text-black">
          We will calculate how much protein you need per day or at least should
          be taking during weight loss, maintenance or muscle building.
        </p>

        <CalculatorComponent />
        <span className="font-bold text-sm">References:</span>
        <ul className="text-sm">
          <li>
            <Link
              rel="nofollow"
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6492513/"
            >
              Richter M, Baerlocher K, Bauer JM, Elmadfa I, Heseker H,
              Leschik-Bonnet E, Stangl G, Volkert D, Stehle P; on behalf of the
              German Nutrition Society (DGE). Revised Reference Values for the
              Intake of Protein. Ann Nutr Metab. 2019;74(3):242-250. doi:
              10.1159/000499374. Epub 2019 Mar 22. PMID: 30904906; PMCID:
              PMC6492513.
            </Link>
          </li>
          <li>
            <Link rel="nofollow" href="https://bjsm.bmj.com/content/52/6/376">
              Morton RW, Murphy KT, McKellar SR, et alA systematic review,
              meta-analysis and meta-regression of the effect of protein
              supplementation on resistance training-induced gains in muscle
              mass and strength in healthy adultsBritish Journal of Sports
              Medicine 2018;52:376-384.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://retractionwatch.com/2021/02/12/eleven-papers-corrected-after-nutrition-prof-fails-to-disclose-patent-company-ties/"
            >
              Eleven papers corrected after nutrition prof fails to disclose
              patent, company ties
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/28698222/"
            >
              2018 - Morton RW, Murphy KT, McKellar SR, Schoenfeld BJ,
              Henselmans M, Helms E, Aragon AA, Devries MC, Banfield L, Krieger
              JW, Phillips SM. A systematic review, meta-analysis and
              meta-regression of the effect of protein supplementation on
              resistance training-induced gains in muscle mass and strength in
              healthy adults. Br J Sports Med. 2018 Mar;52(6):376-384. doi:
              10.1136/bjsports-2017-097608. Epub 2017 Jul 11. Erratum in: Br J
              Sports Med. 2020 Oct;54(19):e7. PMID: 28698222; PMCID: PMC5867436.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/22150425/"
            >
              2011 - Phillips SM, Van Loon LJ. Dietary protein for athletes:
              from requirements to optimum adaptation. J Sports Sci. 2011;29
              Suppl 1:S29-38. doi: 10.1080/02640414.2011.619204. PMID: 22150425.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/17111010/"
            >
              Hartman JW, Moore DR, Phillips SM. Resistance training reduces
              whole-body protein turnover and improves net protein retention in
              untrained young males. Appl Physiol Nutr Metab. 2006
              Oct;31(5):557-64. doi: 10.1139/h06-031. PMID: 17111010.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/18577776/"
            >
              2007 - Phillips SM, Moore DR, Tang JE. A critical examination of
              dietary protein requirements, benefits, and excesses in athletes.
              Int J Sport Nutr Exerc Metab. 2007 Aug;17 Suppl:S58-76. doi:
              10.1123/ijsnem.17.s1.s58. PMID: 18577776.
            </Link>
          </li>
          <li>
            <Link
              rel="nofollow"
              href="https://pubmed.ncbi.nlm.nih.gov/15212752/"
            >
              2004 - Phillips SM. Protein requirements and supplementation in
              strength sports. Nutrition. 2004 Jul-Aug;20(7-8):689-95. doi:
              10.1016/j.nut.2004.04.009. PMID: 15212752.
            </Link>
          </li>
        </ul>
      </section>
      <section className="mt-6 mx-auto px-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
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
          <CalculatorCard
            title="Sugar Calculator"
            href="/sugar-calculator"
            description="How much sugar are you allowed to eat per day. This comes handy if you are on a weight loss."
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
