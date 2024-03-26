"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import GoToTop from "./GoToTop";
import Image from "next/image";

export default function BodyRecompositionCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male"); // default to male
  const [weight, setWeight] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  const [measurementSystem, setMeasurementSystem] = useState("metric"); // default to metric
  const [recompGoal, setRecompGoal] = useState("2");
  const [trainingDaysTotalCalories, setTrainingDaysTotalCalories] = useState(0);
  const [restDaysTotalCalories, setRestDaysTotalCalories] = useState(0);
  const [trainingCarbs, setTrainingCarbs] = useState(0);
  const [trainingProtein, setTrainingProtein] = useState(0);
  const [trainingFat, setTrainingFat] = useState(0);
  const [restCarbs, setRestCarbs] = useState(0);
  const [restProtein, setRestProtein] = useState(0);
  const [restFat, setRestFat] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const isValid: boolean =
    age > 0 && weight > 0 && (heightCm > 0 || heightFeet > 0);

  useEffect(() => {
    // Load all values from localStorage
    const savedAge = localStorage.getItem("age");
    const savedGender = localStorage.getItem("gender");
    const savedWeight = localStorage.getItem("weight");
    const savedHeightCm = localStorage.getItem("heightCm");
    const savedHeightFeet = localStorage.getItem("heightFeet");
    const savedHeightInches = localStorage.getItem("heightInches");
    const savedMeasurementSystem = localStorage.getItem("measurementSystem");

    if (savedAge) setAge(Number(savedAge));
    if (savedGender) setGender(savedGender);
    if (savedWeight) setWeight(Number(savedWeight));
    if (savedHeightCm) setHeightCm(Number(savedHeightCm));
    if (savedHeightFeet) setHeightFeet(Number(savedHeightFeet));
    if (savedHeightInches) setHeightInches(Number(savedHeightInches));
    if (savedMeasurementSystem) setMeasurementSystem(savedMeasurementSystem);
  }, []);

  useEffect(() => {
    if (calculated && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
      setCalculated(false); // Reset to false after scrolling
    }
  }, [calculated]);

  const calculateBodyRecomp = () => {
    // Convert height to centimeters if the user has selected imperial
    let heightInCm: number =
      measurementSystem === "metric"
        ? heightCm
        : heightFeet * 30.48 + heightInches * 2.54;
    measurementSystem === "imperial" &&
      heightInches > 11 &&
      setHeightInches(11);
    // Convert weight to kilograms if the user has selected imperial
    let weightInKg: number =
      measurementSystem === "metric" ? weight : weight * 0.453592;

    // Define a variable to store BMR
    let BMR: number;

    // Check if body fat percentage is entered to decide which formula to use
    if (bodyFat > 0) {
      // Using Katch-McArdle formula
      let leanBodyMass = weightInKg - weightInKg * (bodyFat / 100);
      BMR = 370 + 21.6 * leanBodyMass;
    } else {
      // Using Mifflin-St Jeor formula
      if (gender === "male") {
        BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
      } else {
        BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      }
    }

    // Calculate TDEE based on activity level
    let calculatedTdee: number = BMR * 1.2;
    setTdee(calculatedTdee);
    // Adjust TDEE for training and rest days based on recomp goal
    let trainingDaysCalories: number = 0;
    let restDaysCalories: number = 0;

    switch (recompGoal) {
      case "1": // Fat loss
        trainingDaysCalories = calculatedTdee * 1.1; // +10% on training days
        restDaysCalories = calculatedTdee * 0.85; // -15% on rest days
        break;
      case "2": // Balanced
        trainingDaysCalories = calculatedTdee * 1.15; // No change on training days
        restDaysCalories = calculatedTdee * 0.9; // No change on rest days
        break;
      case "3": // Muscle gain
        trainingDaysCalories = calculatedTdee * 1.2; // +20% on training days
        restDaysCalories = calculatedTdee * 0.95; // -5% on rest days
        break;
      default:
        // Handle default case or error
        break;
    }

    // Calculate macros for both training and rest days
    let proteinGrams: number = weightInKg * 1.6; // Default protein amount
    let fatCaloriesTraining: number = trainingDaysCalories * 0.3;
    let carbsCaloriesTraining: number = trainingDaysCalories * 0.4; // 40% on training days
    let proteinCaloriesTraining: number = proteinGrams * 4; // per gram of protein

    let fatCaloriesRest: number = restDaysCalories * 0.3;
    let carbsCaloriesRest: number = restDaysCalories * 0.3; // 30% on rest days
    // Protein is higher on rest days hence using remaining calories after fats and carbs
    let proteinCaloriesRest: number =
      restDaysCalories - (fatCaloriesRest + carbsCaloriesRest);

    let fatGramsTraining: number = fatCaloriesTraining / 9; // per gram of fat
    let carbsGramsTraining: number = carbsCaloriesTraining / 4; // per gram of carbs
    let proteinGramsTraining: number = proteinCaloriesTraining / 4; // adjusted protein for training

    let fatGramsRest: number = fatCaloriesRest / 9; // per gram of fat
    let carbsGramsRest: number = carbsCaloriesRest / 4; // per gram of carbs
    let proteinGramsRest: number = proteinCaloriesRest / 4; // adjusted protein for rest days (since it&apos;s higher)

    // Set state with the new values
    setTrainingDaysTotalCalories(Number(trainingDaysCalories));
    setRestDaysTotalCalories(Number(restDaysCalories));
    setTrainingCarbs(Number(carbsGramsTraining));
    setTrainingProtein(Number(proteinGramsTraining));
    setTrainingFat(Number(fatGramsTraining));
    setRestCarbs(Number(carbsGramsRest));
    setRestProtein(Number(proteinGramsRest));
    setRestFat(Number(fatGramsRest));

    setCalculated(true);
    localStorage.setItem("age", age.toString());
    localStorage.setItem("gender", gender);
    localStorage.setItem("weight", weight.toString());
    localStorage.setItem("heightCm", heightCm.toString());
    localStorage.setItem("heightFeet", heightFeet.toString());
    localStorage.setItem("heightInches", heightInches.toString());
    localStorage.setItem("measurementSystem", measurementSystem);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calculateBodyRecomp();
  };
  return (
    <section className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-300 dark:bg-slate-900 rounded-3xl to-gray-200 py-8 md:py-16 px-2">
        <div className="grid w-full grid-cols-1 place-items-center space-y-6">
          {/* measurement system */}
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Measurement System
            </label>
            <div className="w-full relative flex flex-row items-center">
              <button
                onClick={() => setMeasurementSystem("imperial")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  measurementSystem === "imperial"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Imperial
              </button>
              &nbsp;
              <button
                onClick={() => setMeasurementSystem("metric")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  measurementSystem === "metric"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Metric
              </button>
            </div>
          </div>
          {/* gender */}
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Biological Sex
            </label>
            <div className="relative flex flex-row items-center">
              <button
                onClick={() => setGender("female")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  gender === "female"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Female
              </button>
              &nbsp;
              <button
                onClick={() => setGender("male")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  gender === "male"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Male
              </button>
            </div>
          </div>
          {/* age and weight */}
          <div className="w-full relative px-3 md:w-[70%]">
            <div className="flex items-center space-x-2">
              {/* age */}
              <div className="relative w-1/2">
                <label
                  htmlFor="3"
                  className="block w-full pb-1 text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                >
                  Age
                </label>
                <div className="relative flex items-center">
                  <input
                    value={age}
                    id="3"
                    min="0"
                    max="100"
                    type="number"
                    onChange={(e: any) => setAge(e.target.value)}
                    className={`peer h-10 w-full pl-[4.5rem] rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg ${
                      !(age > 0) && "shadow-lg shadow-blue-400"
                    }`}
                  />
                  <button className="absolute h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    {"years"}
                  </button>
                </div>
              </div>
              {/* weight */}
              <div className="relative w-1/2">
                <label
                  htmlFor="9"
                  className="block w-full pb-1 text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                >
                  Weight
                </label>
                <div className="relative flex items-center">
                  <input
                    value={weight}
                    id="9"
                    type="number"
                    min="1"
                    onChange={(e: any) => setWeight(e.target.value)}
                    className={`peer h-10 w-full pl-[4.5rem] rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg ${
                      !(weight > 0) && "shadow-lg shadow-blue-400"
                    }`}
                  />
                  <button className="absolute h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    {measurementSystem === "metric" ? "kg" : "lbs"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* height */}
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="9"
              className="inline-block w-full text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Height
            </label>
            {measurementSystem === "metric" ? (
              <div className="relative flex items-center">
                <input
                  value={heightCm}
                  id="9"
                  min="40"
                  type="number"
                  onChange={(e: any) => setHeightCm(e.target.value)}
                  className={`peer h-10 w-full pl-[4.5rem] rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg ${
                    !(heightCm > 0) && "shadow-lg shadow-blue-400"
                  }`}
                />
                <button className="absolute h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                  cm
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="relative w-1/2">
                  <input
                    value={heightFeet}
                    id="9"
                    type="number"
                    min="1"
                    max="8"
                    placeholder="1-8"
                    onChange={(e: any) => setHeightFeet(e.target.value)}
                    className={`peer h-10 w-full pl-[4.5rem] rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg ${
                      !(heightFeet > 0) && "shadow-lg shadow-blue-400"
                    }`}
                  />
                  <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    feet
                  </button>
                </div>
                &nbsp;
                <div className="relative w-1/2">
                  <input
                    value={heightInches}
                    id="9"
                    type="number"
                    min="0"
                    max="11"
                    placeholder="0-11"
                    onChange={(e: any) => setHeightInches(e.target.value)}
                    className={`peer h-10 w-full pl-[4.5rem] rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg ${
                      heightInches > 11 && "shadow-lg shadow-blue-400"
                    }`}
                  />
                  <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    inches
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* bodyFat */}
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="9"
              className="inline-block w-full text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Body fat (optional)
            </label>
            <div className="relative flex flex-col items-left">
              <input
                id="9"
                type="number"
                onChange={(e: any) => setBodyFat(e.target.value)}
                className="peer relative h-10 w-full pl-[4.5rem] rounded-md bg-gray-50 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              />
              <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                %
              </button>
            </div>
          </div>
          <div className="w-full px-3 md:w-[70%]">
            <div className="relative flex flex-col items-center">
              <p className="inline-block w-full text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                The optimal number of workouts is 2-4 weight exercise workouts
                per week. Each workout should last at least 30 minutes.
              </p>
            </div>
          </div>
          {/* recompGoal */}
          <div className="relative w-full px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              What is your goal?
            </label>
            <div className="relative flex flex-row items-center">
              <button
                onClick={() => setRecompGoal("1")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  recompGoal === "1"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Prefer Fat Loss
              </button>
              &nbsp;
              <button
                onClick={() => setRecompGoal("2")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  recompGoal === "2"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Balanced
              </button>
              &nbsp;
              <button
                onClick={() => setRecompGoal("3")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  recompGoal === "3"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Prefer Muscle Gain
              </button>
            </div>
          </div>
          <div className="w-full px-3 md:w-[70%]">
            <CustomButton
              type="finish"
              onClick={handleSubmit}
              label="Calculate"
              className="w-full"
              disabled={!isValid}
            />
            <span className="block pt-1 text-xs font-semibold text-gray-500 dark:text-white">
              {isValid == true ? "" : `Please input the missing values. `}
            </span>
          </div>
        </div>
      </div>
      {/* RESULTS */}
      <div ref={resultRef} className="group mx-auto group flex flex-col">
        {tdee > 0 ? (
          <>
            <h2 className="font-normal text-center">
              <strong className="text-black dark:text-white">
                Your results:
              </strong>
            </h2>
            <div className="flex flex-col lg:flex-row w-full justify-center items-center py-2 rounded-3xl bg-gray-200 to-gray-200">
              <div className="results w-[80%] md:w-1/2 mt-11 mb-5 md:m-11 p-5 bg-white rounded-3xl">
                <h2 className="my-6">🤾‍♀️ Training days:</h2>
                <h3 className="text-gradient font-bold my-0">
                  🍴 {Math.round(trainingDaysTotalCalories)} kcal
                </h3>
                <p className="my-0 text-black">
                  🥔 Carbs: {Math.round(trainingCarbs)}g
                </p>
                <p className="my-0 text-black">
                  🥩 Protein: {Math.round(trainingProtein)}g
                </p>
                <p className="my-0 text-black">
                  🥑 Fat: {Math.round(trainingFat)}g
                </p>
              </div>
              <div className="w-[80%] md:w-1/2 mt-5 mb-11 md:m-11 p-5 bg-white rounded-3xl">
                <h2 className="my-6">😴 Rest days:</h2>
                <h3 className="text-gradient font-bold my-0">
                  🍴 {Math.round(restDaysTotalCalories)} kcal
                </h3>
                <p className="my-0 text-black">
                  🥔 Carbs: {Math.round(restCarbs)}g
                </p>
                <p className="my-0 text-black">
                  🥩 Protein: {Math.round(restProtein)}g
                </p>
                <p className="my-0 text-black">
                  🥑 Fat: {Math.round(restFat)}g
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <p className="text-lg text-red-600">
              Please do the calculation above first.
            </p>
          </div>
        )}
        <p>
          <strong className="text-black dark:text-white">
            Body recomposition
          </strong>
          , a game-changer in fitness that allows you to{" "}
          <strong className="text-black dark:text-white">burn fat</strong> and{" "}
          <strong className="text-black dark:text-white">build muscle </strong>
          at the same time. This approach goes beyond the scale, focusing on
          improving body shape and muscle tone through a blend of targeted{" "}
          <strong className="text-black dark:text-white">
            resistance training
          </strong>{" "}
          and a{" "}
          <strong className="text-black dark:text-white">
            high-protein diet
          </strong>
          . It reshapes your body and elevates your health, all without extreme
          dieting or exhaustive workouts.
        </p>
        <h2 className="text-black dark:text-white">Why this much?</h2>
        <p>
          On{" "}
          <strong className="text-black dark:text-white">training days</strong>,
          you need a boost in energy to fuel those intense workouts—that&apos;s
          where the higher carbs come in, making up 40% of your calorie intake.
          We don&apos;t skimp on the proteins, either; they&apos;re crucial for
          muscle repair. Then, there&apos;s a healthy dose of fats to keep your
          hormone levels in check.
        </p>
        <p>
          On <strong className="text-black dark:text-white">rest days</strong>,
          we dial down the carbs to 30% and let proteins take the lead,
          supporting muscle growth even when you&apos;re not lifting. Every gram
          and calorie is calculated to optimize your body recomp, targeting the
          sweet spot between{" "}
          <strong className="text-black dark:text-white">muscle gain</strong>{" "}
          and
          <strong className="text-black dark:text-white"> fat loss</strong>.
          It&apos;s not just about eating more or less; it&apos;s about eating
          right for your body&apos;s specific needs during the muscle-building
          journey.
        </p>
        <h2 className="text-black dark:text-white">
          Steps to Get the Muscle and Lose the Fat
        </h2>
        <p>It&apos;s simpler than you think.</p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Do your calculation:
            </strong>{" "}
            I&apos;ve done the math so you know exactly how much to eat.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Protein is Key:
            </strong>{" "}
            More protein on rest days means more muscle repair.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Do not skip your workouts:
            </strong>{" "}
            Aim to do at least 2, at best 3-4 per week. Resistance training in
            the gym, body training in the park or at home. Make it work the best
            for you.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Stay consistant:
            </strong>{" "}
            Probably the most important part. Find the right motivation, find a
            training partner.{" "}
          </li>
        </ul>
        <h2 className="text-black dark:text-white">Body Recomposition Macros</h2>
<p>During <strong className="text-black dark:text-white">body recomposition</strong>, macros play an enormous role. Macros, short for macronutrients, are the fats, proteins, and carbohydrates that your body needs in larger amounts to function properly and support muscle building and fat loss.</p>

<h3 className="text-black dark:text-white">On Training Days:</h3>
<ul>
  <li><strong className="text-black dark:text-white">Protein:</strong> Very important for muscle repair and growth. A guideline is to consume protein at <strong className="text-black dark:text-white">1.6 grams</strong> per kilogram of body weight.</li>
  <li><strong className="text-black dark:text-white">Fat:</strong> Important for hormone production. Fats should comprise around <strong className="text-black dark:text-white">30%</strong> of your calorie intake on these days.</li>
  <li><strong className="text-black dark:text-white">Carbohydrates:</strong> They fuel your workouts and help with recovery. Aim for them to be <strong className="text-black dark:text-white">40%</strong> of your calorie intake post-workout.</li>
</ul>

<h3 className="text-black dark:text-white">On Rest Days:</h3>
<ul>
  <li><strong className="text-black dark:text-white">Protein:</strong> Still a priority, slightly higher on rest days to aid recovery, constituting the remaining calories after fats and carbs are accounted for.</li>
  <li><strong className="text-black dark:text-white">Fat:</strong> Slightly increased to <strong className="text-black dark:text-white">30%</strong> of daily calorie intake, important for recovery processes.</li>
  <li><strong className="text-black dark:text-white">Carbohydrates:</strong> Lowered to <strong className="text-black dark:text-white">30%</strong> of your calorie intake as your body is less active and requires less energy.</li>
</ul>

<p>Eat more <a className="text-black dark:text-white" href="/protein-calculator">protein</a> and less <a className="text-black dark:text-white" href="/carbs-calculator">carbs</a> when you&apos;re not working out. Your muscles need protein to repair on your off days. Increase carbs only on your workout days when you&apos;re burning them off.</p>
        <h2 className="text-black dark:text-white">
              Have a clear goal
            </h2>
        <p>
          Trust the plan, see the change, and feel great doing it. Come back
          every two weeks and do your calculation again for an updated plan.{" "}
          <strong className="text-black dark:text-white">
            I truly believe in you.
          </strong>
        </p>
      </div>
      <GoToTop />
    </section>
  );
}
