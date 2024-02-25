import Link from "next/link";
import CalculatorCard from "./components/CalculatorCard";
import CustomButton from "./components/CustomButton";
import LandingPagePosts from "./components/LandingPagePosts";
import AboutMeSection from "./components/AboutMeSection";
export default function Home() {
  return (
    <main className="mt-6 mx-auto px-6 max-w-4xl">
      <h1 className="text-2xl  md:text-4xl text-center font-bold text-gradient mb-2">
        take the guesswork out of dieting
      </h1>
      <span className="block pt-1 text-base text-center">
        Target your weight goals with precision. Our calculators make it simple
        to track and adjust your macros for balanced nutrition.
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
      {/* <LandingPagePosts />
      <div className="w-full flex justify-center pb-12">
        <Link href="/posts">
          <CustomButton type={"gradient"} label="VIEW ALL POSTS" />
        </Link>
      </div> */}
      <AboutMeSection />
    </main>
  );
}
