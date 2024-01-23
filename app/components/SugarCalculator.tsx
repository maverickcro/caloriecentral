"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import CustomButton from "./CustomButton"; // Assuming you have a CustomButton component
import { activityLevels } from "../../lib/data";

export default function SugarCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male"); // default to male
  const [weight, setWeight] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  const [measurementSystem, setMeasurementSystem] = useState("metric"); // default to metric
  const [activityLevel, setActivityLevel] = useState(activityLevels[0]); // default to first activity level
  const [goal, setGoal] = useState("2");
  const [deficitLevel, setDeficitLevel] = useState("1");
  const [tdee, setTdee] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const isValid: boolean =
    age > 0 && weight > 0 && (heightCm > 0 || heightFeet > 0);

  useEffect(() => {
    if (calculated && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
      setCalculated(false); // Reset to false after scrolling
    }
  }, [calculated]);

  const calculate = () => {
    // Convert height to centimeters if the user has selected imperial
    let heightInCm =
      measurementSystem === "metric"
        ? heightCm
        : heightFeet * 30.48 + heightInches * 2.54;

    // Convert weight to kilograms if the user has selected imperial
    let weightInKg =
      measurementSystem === "metric" ? weight : weight * 0.453592;

    // Define a variable to store BMR
    let BMR;

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
    let calculatedTdee = BMR * activityLevel.value;
    let deficitPerDay: number = 0;
    let suficitPerDay: number = 0;
    switch (goal) {
      case "1": //weight loss
        deficitPerDay = deficitPerday(deficitLevel);
        setTdee(calculatedTdee - deficitPerDay);
        break;
      case "2": //maintain weight
        setTdee(calculatedTdee);
        break;
      case "3":
        suficitPerDay = deficitPerday(deficitLevel);
        setTdee(calculatedTdee + suficitPerDay);
        break;
    }

    setCalculated(true);
    return;
  };

  const deficitPerday = (deficitLevel: string) => {
    switch (deficitLevel) {
      case "1":
        return 1925 / 7;
      case "2":
        return 3850 / 7;
      case "3":
        return 5775 / 7;
      default:
        return 0;
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calculate();
  };

  return (
    <section className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-200 to-gray-200 py-16 px-2">
        <div className="grid w-full grid-cols-1 place-items-center space-y-6">
          {/* measurement system */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Measurement System
            </label>
            <div className="relative flex flex-row items-center">
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
          {/* age */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Age
            </label>
            <input
              id="3"
              min="1"
              max="100"
              type="number"
              onChange={(e: any) => setAge(e.target.value)}
              className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
            />
          </div>
          {/* gender */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
          {/* weight */}
          <div className="group w-[70%]">
            <label
              htmlFor="9"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Weight
            </label>
            <div className="relative flex items-center">
              <input
                id="9"
                type="number"
                min="1"
                onChange={(e: any) => setWeight(e.target.value)}
                className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              />
              <button className="absolute h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                {measurementSystem === "metric" ? "kg" : "lbs"}
              </button>
            </div>
          </div>
          {/* height */}
          <div className="group w-[70%]">
            <label
              htmlFor="9"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Height
            </label>
            {measurementSystem === "metric" ? (
              <div className="relative flex items-center">
                <input
                  id="9"
                  min="40"
                  type="number"
                  onChange={(e: any) => setHeightCm(e.target.value)}
                  className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                />
                <button className="absolute h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                  cm
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="relative w-1/2">
                  <input
                    id="9"
                    type="number"
                    min="1"
                    max="8"
                    placeholder="1-8"
                    onChange={(e: any) => setHeightFeet(e.target.value)}
                    className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                  />
                  <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    feet
                  </button>
                </div>
                &nbsp;
                <div className="relative w-1/2">
                  <input
                    id="9"
                    type="number"
                    min="0"
                    max="11"
                    placeholder="0-11"
                    onChange={(e: any) => setHeightInches(e.target.value)}
                    className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                  />
                  <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                    inches
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* bodyFat */}
          <div className="group w-[70%]">
            <label
              htmlFor="9"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Body fat (optional)
            </label>
            <div className="relative flex flex-col items-left">
              <input
                id="9"
                type="number"
                onChange={(e: any) => setBodyFat(e.target.value)}
                className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              />
              <span className="block pt-1 text-xs font-semibold text-gray-500">
                Calculate with our free tool.
              </span>
              <button className="absolute left-0 h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                %
              </button>
            </div>
          </div>
          {/* activity */}
          <div className="group w-[70%]">
            <label
              htmlFor="10"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Activity level
            </label>
            <div className="relative flex flex-col items-center">
              {activityLevels.map((activity, index) => (
                <div
                  key={index}
                  className={`p-2 m-2 mb-0 w-full text-base border rounded-md cursor-pointer text-black ${
                    activityLevel.label === activity.label
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                      : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                  }`}
                  onClick={() => setActivityLevel(activity)}
                >
                  {activity.label}
                </div>
              ))}
            </div>
          </div>
          {/* goal */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              What is your goal?
            </label>
            <div className="relative flex flex-row items-center">
              <button
                onClick={() => setGoal("1")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  goal === "1"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Weight loss
              </button>
              &nbsp;
              <button
                onClick={() => setGoal("2")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  goal === "2"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Maintain weight
              </button>
              &nbsp;
              <button
                onClick={() => setGoal("3")}
                className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                  goal === "3"
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-blue-200 group-hover:bg-blue-400 text-black"
                }`}
              >
                Weight gain
              </button>
            </div>
          </div>
          {(goal === "1" || goal === "3") && (
            <div className="group relative w-[70%]">
              <label
                htmlFor="3"
                className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
              >
                {goal === "1"
                  ? "How much weight you want to lose per week?"
                  : "How much weight you want to gain per week?"}
              </label>
              <div className="relative flex flex-row items-center">
                <button
                  onClick={() => setDeficitLevel("1")}
                  className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                    deficitLevel === "1"
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                      : "bg-blue-200 group-hover:bg-blue-400 text-black"
                  }`}
                >
                  {measurementSystem === "metric" ? "0.25 kg" : "0.55 lbs"}
                </button>
                &nbsp;
                <button
                  onClick={() => setDeficitLevel("2")}
                  className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                    deficitLevel === "2"
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                      : "bg-blue-200 group-hover:bg-blue-400 text-black"
                  }`}
                >
                  {measurementSystem === "metric" ? "0.50 kg" : "1.10 lbs"}
                </button>
                &nbsp;
                <button
                  onClick={() => setDeficitLevel("3")}
                  className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                    deficitLevel === "3"
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                      : "bg-blue-200 group-hover:bg-blue-400 text-black"
                  }`}
                >
                  {measurementSystem === "metric" ? "0.75 kg" : "1.65 lbs"}
                </button>
              </div>
            </div>
          )}
          <div className="group w-[70%]">
            <CustomButton
              type="finish"
              onClick={handleSubmit}
              label="Calculate"
              className="w-full"
              disabled={!isValid}
            />
            <span className="block pt-1 text-xs font-semibold text-gray-500">
              {isValid == true ? "" : `Please input the missing values. `}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div>
          {tdee > 0 && (
            <div
              ref={resultRef}
              className="group w-[70%] mx-auto group flex flex-col"
            >
              <p>
                Your allowed <b>sugar</b> intake per day is:
              </p>
              <h1 className="text-gradient mb-0">
                {gender === "male"
                  ? ((tdee * 0.07) / 4).toFixed(2)
                  : ((tdee * 0.05) / 4).toFixed(2)}
                g
              </h1>
            </div>
          )}
          <p className="text-base text-black">
            The American Heart Association&apos;s recommendation for limiting
            added sugars to no more than 100 calories per day for women and 150
            calories per day for men is based on the concept of discretionary
            calories. Discretionary calories are the portion of a person&apos;s
            daily caloric intake that can be used for added sugars and fats,
            after accounting for the calories needed to meet all nutrient
            requirements through consuming nutrient-dense foods.{" "}
          </p>
          <h3>Daily Caloric Intake: </h3>
          <p className="text-base text-black">
            For Women: The average daily caloric intake for women can vary based
            on age, activity level, and overall health, but it generally ranges
            from 1,800 to 2,400 calories per day. The lower end is for sedentary
            women, while the higher end is for those who are more active. For
            Men: Similarly, for men, the average daily caloric intake ranges
            from 2,200 to 3,000 calories per day, with the range depending on
            activity level and age.
          </p>
          <h3>Calculation of Discretionary Calories:</h3>
          <p className="text-base text-black">
            100 to 150 Calories from Added Sugars: The AHA&apos;s recommendation
            implies that added sugars should constitute only a small fraction of
            the total daily calorie intake. This is because the majority of a
            person’s caloric intake should come from foods that provide the
            nutrients needed to maintain health. Percentage of Total Calories:
            For women, 100 calories from added sugars represent about 4-5% of a
            2,000-calorie diet, which is a commonly used reference point. For
            men, 150 calories represent about 5-7% of a 2,500-calorie diet.
          </p>
        </div>
      </div>
    </section>
  );
}
