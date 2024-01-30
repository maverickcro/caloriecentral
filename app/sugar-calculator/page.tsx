import React from "react";
import CalculatorComponent from "../components/SugarCalculator";
import Link from "next/link";

export default function Calculator() {
  return (
    <section className="mt-6 mx-auto px-6 prose  max-w-4xl prose-xl prose-slate">
      <h1 className="font-bold text-gradient mb-0">Sugar Intake Calculator</h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 30, 2024
      </span>
      <p className="text-black">
        Excessive sugar consumption is directly linked to health risks,
        including weight gain and heart disease. The American Heart
        Association&apos;s journal, &apos;Circulation&apos;*, cites a clear link
        between added sugars and a higher risk of cardiovascular issues.
      </p>
      <p className="text-black">
        Limiting sugar is crucial for weight loss as it reduces calorie intake
        and deters fat accumulation from nutrient-poor foods. Those maintaining
        weight also need to monitor sugar to avoid unintended gain from caloric
        surplus.
      </p>

      <CalculatorComponent />
      <span className="font-bold text-sm">References:</span>
      <ul className="text-sm">
        <li>
          <Link
            rel="nofollow"
            href="https://www.ahajournals.org/doi/full/10.1161/01.cir.0000019552.77778.04"
          >
            2014 American Heart Association study on sugar intake - Sugar and
            Cardiovascular Disease
          </Link>
        </li>
        <li>
          <Link
            rel="nofollow"
            href="https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/how-much-sugar-is-too-much"
          >
            American Heart Association - How much sugar is too much?
          </Link>
        </li>
        <li>
          <Link
            rel="nofollow"
            href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet#:~:text=Less%20than%2010%25%20of%20total%20energy%20intake%20from%20free%20sugars,additional%20health%20benefits%20(7)."
          >
            World Health Association (WHO) - Healthy diet
          </Link>
        </li>
      </ul>
    </section>
  );
}
