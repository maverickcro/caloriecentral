import CalculatorsSection from "./components/CalculatorsSection";
<Posts />;
import Posts from "./components/Posts";
export default function Home() {
  return (
    <main className="mt-6 mx-auto px-6 max-w-4xl">
      <p className="mt-12 mb-12 text-3xl text-center text-black">
        <span className="whitespace-nowrap">
          All.&nbsp;<span className="font-bold text-gradient">Calories</span>
          .&nbsp;
        </span>
        Everything.
      </p>
      <Posts />
      <h1 className="text-4xl text-center font-bold text-gradient mb-2">
        Nutrition Calculators
      </h1>
      <CalculatorsSection
        title="Subway Calorie Calculator"
        href="/subway-calculator"
        description="Calculate the nutrition of your favorite Subway sandwich."
        src="/subway-calculator.jpg"
        alt="Subway calorie nutrition calculator"
      />
      <CalculatorsSection
        title="TDEE Calculator"
        href="/tdee-calculator"
        description="Learn How Many Calories You Burn Every Day."
        src="/tdee-calculator.png"
        alt="TDEE calculator"
      />
      <CalculatorsSection
        title="Calorie Deficit Calculator"
        href="/calorie-deficit-calculator"
        description="Efficiently calculate your daily calorie needs for healthy weight management with our user-friendly Calorie Deficit Calculator."
        src="/calorie-deficit.png"
        alt="Calorie Deficit Calculator"
      />
      <CalculatorsSection
        title="Body Recomposition Calculator"
        href="/body-recomposition-calculator"
        description="Did you know you can BUILD muscle and BURN fat at the same time? Check calories and body recomposition macros here."
        src="/body-recomposition.png"
        alt="Body Recomposition Calculator"
      />
      <CalculatorsSection
        title="Macro Calculator"
        href="/macro-calculator"
        description="Optimize your protein, carbohydrate, and fat intake simultaneously for maximum muscle gain and fat loss by using our Macro Calculator to fine-tune your diet and enhance your performance."
        src="/macro-calculator.png"
        alt="Macro Calculatorr"
      />
    </main>
  );
}
