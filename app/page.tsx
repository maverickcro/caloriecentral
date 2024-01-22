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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
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
          description="Learn How Many Calories You Burn Every Day Just For Existing."
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
          alt="Macro Calculator"
        />
        <CalculatorsSection
          title="Protein Intake Calculator"
          href="/protein-calculator"
          description="Calculate the optimal protein intake wheter you are on a weight loss, maintain weight or want to build muscle."
          src="/protein-calculator.png"
          alt="Protein Intake Calculator"
        />
        <CalculatorsSection
          title="Carbs Intake Calculator"
          href="/carbs-calculator"
          description="Calculate the optimal carbs intake wheter you are on a weight loss, maintain weight or want to gain weight."
          src="/carbs-calculator.png"
          alt="Carbs Intake Calculator"
        />
        <CalculatorsSection
          title="Fat Intake Calculator"
          href="/fat-calculator"
          description="Calculate the optimal fat intake wheter you are on a weight loss, maintain weight or want to gain weight."
          src="/fat-calculator.png"
          alt="Fat Intake Calculator"
        />
        <CalculatorsSection
          title="Fasting Calculator"
          href="/fasting-calculator"
          description="Fasting is popular for various reasons: Weight loss, health
          benefits and much more. Let's calculate the calories behind it."
          src="/fasting-calculator.png"
          alt="Fasting Calculator"
        />
        <CalculatorsSection
          title="Anorexic BMI Calculator"
          href="/anorexic-calculator"
          description="
          Accurately assess your health with our Anorexia BMI Calculator, a
          critical resource for identifying potential anorexia nervosa based on
          BMI."
          src="/anorexic-calculator.jpg"
          alt="Anorexic BMI Calculator"
        />
      </div>
    </main>
  );
}
