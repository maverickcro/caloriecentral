import Link from "next/link";
import CalculatorCard from "./components/CalculatorCard";
import CustomButton from "./components/CustomButton";
import Head from "next/head";

export const metadata = {
  title: "CaloriePal - Calculate And Understand Calories",
  description:
    "Macros? Calories? Weight? Calculate calories, manage your fasting and achieve your health and fitness goals with CaloriePal.",
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
        <link rel="canonical" href="https://calorie-pal.com" />
      </Head>
      <main className="mt-10 md:mt-6 mx-auto px-6 max-w-4xl">
        <div className="animated-background rounded-3xl h-[40vh] mb-10">
          <h1 className="text-2xl md:text-4xl text-center font-bold text-white mb-2">
            Welcome to CaloriePal
          </h1>
          <p className="block pt-1 text-center text-white">
            Your favourite Fitness companion
          </p>
        </div>
        <h2 className="text-xl md:text-2xl leading-10 text-center font-bold text-gradient mb-2">
          Take the Guesswork out of Dieting
        </h2>
        <span className="block pt-1 text-base text-center">
          Target your weight goals with precision. Our calculators make it
          simple to track and adjust your macros for balanced nutrition.
        </span>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-6 py-12">
          <CalculatorCard
            title="Subway Calorie Calculator"
            href="/subway-calculator"
            description="Calculate the nutrition of your favorite Subway sandwich."
            src="/subway-calculator.jpg"
            alt="Subway calorie nutrition calculator"
          />
          <CalculatorCard
            title="TDEE Calculator"
            href="/tdee-calculator"
            description="Learn How Many Calories You Burn Every Day Just For Existing."
            src="/tdee-calculator.png"
            alt="TDEE calculator"
          />
          <CalculatorCard
            title="Calorie Deficit Calculator"
            href="/calorie-deficit-calculator"
            description="Efficiently calculate your daily calorie needs for healthy weight management."
            src="/calorie-deficit.png"
            alt="Calorie Deficit Calculator"
          />
          <CalculatorCard
            title="Protein Intake Calculator"
            href="/protein-calculator"
            description="Calculate the optimal protein intake wheter you are on a weight loss, maintain weight or want to build muscle."
            src="/protein-calculator.jpg"
            alt="Protein Intake Calculator"
          />
          <CalculatorCard
            title="Fasting Calculator"
            href="/fasting-calculator"
            description="Fasting is popular for various reasons: Weight loss, health
          benefits and much more. Let's calculate the calories behind it."
            src="/fasting-calculator.png"
            alt="Fasting Calculator"
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
      </main>
    </>
  );
}
