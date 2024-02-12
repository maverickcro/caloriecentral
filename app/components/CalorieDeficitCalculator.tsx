"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton"; // Assuming you have a CustomButton component
import { activityLevels } from "../../lib/data";

export default function CalorieDeficitCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male"); // default to male
  const [deficitLevel, setDeficitLevel] = useState("1");
  const [deficit, setDeficit] = useState(0);
  const [weight, setWeight] = useState(0);
  const [weightGoal, setWeightGoal] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [measurementSystem, setMeasurementSystem] = useState("metric");
  const [activityLevel, setActivityLevel] = useState(activityLevels[0]);
  const [calculated, setCalculated] = useState(false);
  const [tdee, setTdee] = useState(0);
  const [goalDate, setGoalDate] = useState("");
  const [goalDays, setGoalDays] = useState(0);

  const isValid: boolean =
    age > 0 && weight > 0 && (heightCm > 0 || heightFeet > 0);

  const deficitWeight = () => {
    switch (deficitLevel) {
      case "1":
        return measurementSystem === "metric" ? "0.25 kg" : "0.55 lbs";
      case "2":
        return measurementSystem === "metric" ? "0.50 kg" : "1.10 lbs";
      case "3":
        return measurementSystem === "metric" ? "0.75 kg" : "1.65 lbs";
    }
  };

  useEffect(() => {
    // Load all values from localStorage
    const savedAge = localStorage.getItem("age");
    const savedGender = localStorage.getItem("gender");
    const savedWeight = localStorage.getItem("weight");
    const savedWeightGoal = localStorage.getItem("weightGoal");
    const savedHeightCm = localStorage.getItem("heightCm");
    const savedHeightFeet = localStorage.getItem("heightFeet");
    const savedHeightInches = localStorage.getItem("heightInches");
    const savedMeasurementSystem = localStorage.getItem("measurementSystem");

    if (savedAge) setAge(Number(savedAge));
    if (savedGender) setGender(savedGender);
    if (savedWeight) setWeight(Number(savedWeight));
    if (savedWeightGoal) setWeightGoal(Number(savedWeightGoal));
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

  const calculateCalorieDeficit = () => {
    // Convert height to centimeters if the user has selected imperial
    let heightInCm =
      measurementSystem === "metric"
        ? heightCm
        : heightFeet * 30.48 + heightInches * 2.54;

    // Convert weight to kilograms if the user has selected imperial
    let weightInKg =
      measurementSystem === "metric" ? weight : weight * 0.453592;

    // Calculate BMR using the Mifflin-St Jeor equation
    let BMR =
      gender === "male"
        ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5
        : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;

    // Adjust BMR based on activity level
    let TDEE = BMR * activityLevel.value;
    setTdee(TDEE);

    let deficitPerDay;
    switch (deficitLevel) {
      case "1":
        deficitPerDay = 1925 / 7;
        break;
      case "2":
        deficitPerDay = 3850 / 7;
        break;
      case "3":
        deficitPerDay = 5775 / 7;
        break;
      default:
        deficitPerDay = 0; // No deficit if no level is selected or an invalid level is provided
    }

    // Set the calculated deficit
    setDeficit(deficitPerDay);

    setCalculated(true);
    localStorage.setItem("age", age.toString());
    localStorage.setItem("gender", gender);
    localStorage.setItem("weight", weight.toString());
    localStorage.setItem("heightCm", heightCm.toString());
    localStorage.setItem("heightFeet", heightFeet.toString());
    localStorage.setItem("heightInches", heightInches.toString());
    localStorage.setItem("measurementSystem", measurementSystem);
    localStorage.setItem("weightGoal", weightGoal.toString());
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calculateCalorieDeficit();
    calculateDaysToGoalWeight();
  };

  const calculateDaysToGoalWeight = () => {
    const CALORIES_PER_KG = 7700;
    const CALORIES_PER_POUND = 3500;

    let totalCalorieDeficit;
    if (measurementSystem === "metric") {
      totalCalorieDeficit = (weight - weightGoal) * CALORIES_PER_KG;
    } else {
      // assuming the only other option is "imperial"
      totalCalorieDeficit = (weight - weightGoal) * CALORIES_PER_POUND;
    }

    if (deficit === 0) {
      throw new Error("Daily calorie deficit cannot be zero.");
    }

    const numberOfDays = totalCalorieDeficit / deficit; // Calculate the goal date
    const today = new Date();
    const goalDate = new Date(today.setDate(today.getDate() + numberOfDays));

    // Format the date as "Month Day, Year"
    const options: any = { month: "short", day: "numeric", year: "numeric" };
    const formattedGoalDate = goalDate.toLocaleDateString("en-US", options);

    setGoalDate(formattedGoalDate);
    setGoalDays(Math.ceil(numberOfDays));
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
              value={age}
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
                value={weight}
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
                  value={heightCm}
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
                    value={heightFeet}
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
                    value={heightInches}
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
          {/* deficitLevel */}
          <div className="group relative w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              How much weight you want to lose per week?
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
          {/* weight goal*/}
          <div className="group w-[70%]">
            <label
              htmlFor="10"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Weight Goal
            </label>
            <div className="relative flex items-center">
              <input
                value={weightGoal}
                id="10"
                type="number"
                min="1"
                onChange={(e: any) => setWeightGoal(e.target.value)}
                className="peer relative h-10 w-full rounded-md bg-gray-50 pl-20 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
              />
              <button className="absolute h-10 w-16 rounded-l-md  text-xs font-semibold border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                {measurementSystem === "metric" ? "kg" : "lbs"}
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

      <div ref={resultRef} className="group mx-auto group flex flex-col">
        {deficit > 0 ? (
          //  && weightGoal > 0
          <div className="flex flex-col">
            <h2>Your daily calorie intake:</h2>
            <span>If you want to lose {deficitWeight()} per week:</span>

            <h1 className="text-gradient mt-0">
              {Math.round(tdee - deficit)} kcal.
            </h1>

            <span>
              How long will it take to get to {weightGoal}{" "}
              {`${measurementSystem === "metric" ? "kg" : "pounds"}`}?
            </span>
            <h2 className="text-gradient mt-0">
              {goalDays} days, {goalDate}
            </h2>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="text-lg text-red-600">
              Please do the calculation above first.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
