import Link from "next/link";
import CalculatorCard from "./components/CalculatorCard";
import CustomButton from "./components/CustomButton";
import Head from "next/head";

export const metadata = {
  title: "CalorieCentral - Calculate And Understand Calories",
  description:
    "Macros? Calories? Weight? Calculate calories, manage your fasting and achieve your health and fitness goals with CalorieCentral.",
  keywords: [
    "fitness calculators",
    "macros calculator",
    "calorie tracking",
    "weight management tools",
    "protein intake calculator",
    "carbs intake guide",
    "fat consumption calculator",
    "daily sugar limit tool",
    "TDEE calculation",
    "calorie deficit strategies",
    "body recomposition macros",
    "health nutrition calculators",
    "fasting benefits calculator",
    "Subway sandwich nutrition",
  ],
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://caloriecentral.com" />
      </Head>
      <main className="mt-10 md:mt-6 mx-auto px-6 max-w-4xl">
        <h1 className="mt-12 mb-16 text-2xl  md:text-4xl  text-black dark:text-white text-center">
          Macros?&nbsp;
          <span className="font-bold text-gradient">Calories?</span>
          &nbsp;Weight?&nbsp;We Have All Kinds Of{" "}
          <span className="font-bold text-gradient">Calculators</span>.
        </h1>
        <div className="animated-background rounded-3xl h-[30vh] mb-10">
          <h1 className="text-2xl md:text-4xl text-center font-bold text-white mb-2">
            Take the Guesswork out of Dieting with Macro Calculators
          </h1>
          <p className="block pt-1 text-center text-white">
            Our calculators make it simple to track and adjust your macros for
            balanced nutrition.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-12">
          {/* <CalculatorCard
            title="Protein Intake Calculator"
            href="/protein-calculator"
            description="Calculate the optimal protein intake wheter you are on a weight loss, maintain weight or want to build muscle."
            src="/protein-calculator.png"
            alt="Protein Intake Calculator"
          /> */}
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
            description="
          How much sugar are you allowed to eat per day. This comes handy if you are on a weight loss."
            src="/sugar-calculator.png"
            alt="Sugar Calculator"
          />
        </div>
        <div className="animated-background rounded-3xl h-[30vh] mb-10">
          <h1 className="text-2xl md:text-4xl text-center font-bold text-white mb-2">
            Weight Management Calculators
          </h1>
          <p className="block pt-1 text-center text-white">
            These calculators are ideal for individuals aiming to lose, gain, or
            maintain weight. They provide insights into daily calorie needs,
            deficits for weight loss, and body composition changes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-12">
          <CalculatorCard
            title="Weight Loss Calculator"
            href="/weight-loss-calculator"
            description="Efficiently calculate your daily calorie needs for healthy weight management with our user-friendly Weight Loss Calculator."
            src="/weight-loss-calculator.png"
            alt="Weight Loss Calculator"
          />
          <CalculatorCard
            title="Body Recomposition Calculator"
            href="/body-recomposition-calculator"
            description="Did you know you can BUILD muscle and BURN fat at the same time? Check calories and body recomposition macros here."
            src="/body-recomposition-calculator.png"
            alt="Body Recomposition Calculator"
          />
          <CalculatorCard
            title="Subway Calorie Calculator"
            href="/subway-calculator"
            description="Calculate the nutrition of your favorite Subway sandwich."
            src="/subway-calculator.png"
            alt="Subway calorie nutrition calculator"
          />
        </div>
      </main>
    </>
  );
}
