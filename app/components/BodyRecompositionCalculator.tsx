"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton"; // Assuming you have a CustomButton component
import { activityLevels } from "../../lib/data";

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

  const [calculated, setCalculated] = useState(false);

  const isValid: boolean =
    age > 0 && weight > 0 && (heightCm > 0 || heightFeet > 0);

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
    let proteinGramsRest: number = proteinCaloriesRest / 4; // adjusted protein for rest days (since it's higher)

    // Set state with the new values
    setTrainingDaysTotalCalories(Number(trainingDaysCalories.toFixed(2)));
    setRestDaysTotalCalories(Number(restDaysCalories.toFixed(2)));
    setTrainingCarbs(Number(carbsGramsTraining.toFixed(2)));
    setTrainingProtein(Number(proteinGramsTraining.toFixed(2)));
    setTrainingFat(Number(fatGramsTraining.toFixed(2)));
    setRestCarbs(Number(carbsGramsRest.toFixed(2)));
    setRestProtein(Number(proteinGramsRest.toFixed(2)));
    setRestFat(Number(fatGramsRest.toFixed(2)));

    setCalculated(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calculateBodyRecomp();
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
            <div className="relative flex flex-col items-center">
              <p className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                The optimal number of workouts is 3 weight exercise workouts per
                week. Each workout should last at least 30
                minutes.(!!!reference!!!)
              </p>
            </div>
          </div>
          {/* recompGoal */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
      {restFat > 0 && (
        <div
          ref={resultRef}
          className="group w-[70%] mx-auto group flex flex-col"
        >
          <div className="text-2xl font-bold">
            <h1 className="text-gradient mb-0">TRAINING DAYS:</h1>
            <p className="text-gradient__orange">
              Total calories: {trainingDaysTotalCalories} kcal
            </p>
            <p>Carbs: {trainingCarbs} g</p>
            <p>Protein: {trainingProtein}g</p>
            <p>Fat: {trainingFat}g</p>
          </div>
          <div className="text-2xl font-bold">
            <h1 className="text-gradient mb-0">REST DAYS:</h1>
            <p className="text-gradient__orange">
              Total calories: {restDaysTotalCalories} kcal
            </p>
            <p>Carbs: {restCarbs}g</p>
            <p>Protein: {restProtein}g</p>
            <p>Fat: {restFat}g</p>
          </div>
        </div>
      )}
    </section>
  );
}
