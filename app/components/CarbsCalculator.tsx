"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import { activityLevels } from "../../lib/data";
import GoToTop from "./GoToTop";
import Image from "next/image";

export default function CarbsCalculator() {
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
  const [carbs, setCarbs] = useState(0);
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

  const calculateCarbs = () => {
    // Convert height to centimeters if the user has selected imperial
    let heightInCm =
      measurementSystem === "metric"
        ? heightCm
        : heightFeet * 30.48 + heightInches * 2.54;
    measurementSystem === "imperial" &&
      heightInches > 11 &&
      setHeightInches(11);
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
        setCarbs(((calculatedTdee - deficitPerDay) * 0.4) / 4);
        break;
      case "2": //maintain weight
        setTdee(calculatedTdee);
        setCarbs((calculatedTdee * 0.4) / 4);
        break;
      case "3":
        suficitPerDay = deficitPerday(deficitLevel);
        setTdee(calculatedTdee + suficitPerDay);
        setCarbs(((calculatedTdee + suficitPerDay) * 0.4) / 4);
        break;
    }

    setCalculated(true);
    localStorage.setItem("age", age.toString());
    localStorage.setItem("gender", gender);
    localStorage.setItem("weight", weight.toString());
    localStorage.setItem("heightCm", heightCm.toString());
    localStorage.setItem("heightFeet", heightFeet.toString());
    localStorage.setItem("heightInches", heightInches.toString());
    localStorage.setItem("measurementSystem", measurementSystem);
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
    calculateCarbs();
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
          {/* activity */}
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="10"
              className="inline-block w-full text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
                      : "border-gray-300 bg-white text-black hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                  }`}
                  onClick={() => setActivityLevel(activity)}
                >
                  {activity.label}
                </div>
              ))}
            </div>
          </div>
          {/* goal */}
          <div className="group relative w-full px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
            <div className="group relative w-full px-3 md:w-[70%]">
              <label
                htmlFor="3"
                className="block w-full pb-1 text-sm font-medium text-gray-500 dark:text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
          <div className="group w-full px-3 md:w-[70%]">
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
            <div className="flex w-full justify-center items-center py-2 rounded-3xl animated-background bg-gray-200 to-gray-200">
              <div className="results md:max-w-md m-3 md:m-11 p-5 bg-white rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_60px_40px_-7px]">
                <h3 className="my-6">
                  💪 For{" "}
                  <span className="text-gradient">
                    {goal === "1"
                      ? "Weight loss"
                      : goal === "2"
                      ? "Weight maintenance"
                      : "Weight gain"}
                  </span>
                </h3>
                <h3 className="my-6">
                  🥔 <span className="text-gradient">{Math.round(carbs)}</span>{" "}
                  grams per day
                </h3>
                <h3 className="my-0">
                  🍴 with a{" "}
                  <span className="text-gradient">{Math.round(tdee)}</span> kcal
                  diet.
                </h3>
                <p className="block pt-5 text-sm font-semibold text-gray-500">
                  {`According to The Institute of Medicine: ${Math.round(
                    (tdee * 0.4) / 4
                  )} - ${Math.round((tdee * 0.65) / 4)} grams per day.`}
                </p>
                <p className="block pt-1 text-sm font-semibold text-gray-500">
                  {`According to Food and Agriculture Organization and the World
              Health Organization: ${Math.round(
                (tdee * 0.55) / 4
              )} - ${Math.round((tdee * 0.75) / 4)} grams per day.`}
                </p>
                <h3 className="my-0">
                  🍬 with sugar limit of:{" "}
                  <span className="text-gradient">
                    {Math.round((tdee * 0.1) / 4)}
                  </span>{" "}
                  grams per day.
                </h3>
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
          Carbohydrates are a vital part of our diet, providing the main source
          of energy for our bodies. But how much do we really need? The answer
          depends on various factors, including your total daily energy
          expenditure (TDEE).
        </p>
        <h2 className="text-black dark:text-white">Why this much?</h2>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Guidelines by The Institute of Medicine:
            </strong>{" "}
            They recommend that carbohydrates should make up{" "}
            <strong className="text-black dark:text-white">40% to 65%</strong>{" "}
            of your total daily calories. This range ensures adequate energy
            while supporting overall health.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Recommendations by the Food and Agriculture Organization and the
              World Health Organization:
            </strong>{" "}
            A slightly higher intake, between{" "}
            <strong className="text-black dark:text-white">55% and 75%</strong>{" "}
            of your TDEE, is advised to meet your body&apos;s energy needs and
            support bodily functions.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Sugar Intake:
            </strong>{" "}
            It&apos;s crucial to limit added sugars, with a maximum
            recommendation of{" "}
            <strong className="text-black dark:text-white">10%</strong> of your
            total daily calories. Keeping sugars low helps manage blood sugar
            levels, reduces the risk of metabolic diseases and you reduce{" "}
            <strong className="text-black dark:text-white">empty</strong>{" "}
            calories.
          </li>
        </ul>

        <h2 className="text-black dark:text-white">
          Why Follow These Recommendations?
        </h2>
        <p>
          <strong className="text-black dark:text-white">
            Energy Maintenance:
          </strong>{" "}
          Carbs provide the fuel your body needs for daily activities and
          maintaining energy levels.
        </p>
        <p>
          <strong className="text-black dark:text-white">
            Health Benefits:
          </strong>{" "}
          A balanced carb intake supports brain function, aids in digestive
          health, and helps regulate blood sugar.
        </p>
        <p>
          <strong className="text-black dark:text-white">
            Disease Prevention:
          </strong>{" "}
          Proper carbohydrate management can lower the risk of diabetes, heart
          disease, and obesity.
        </p>

        <h2 className="text-black dark:text-white">
          Tips for Healthy Carb Consumption
        </h2>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Choose Wisely:
            </strong>{" "}
            Opt for whole, unprocessed carbs like fruits, vegetables, and whole
            grains over refined sugars and flours.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Monitor Portions:
            </strong>{" "}
            Keep an eye on portion sizes to stay within your recommended daily
            intake.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Balance Your Diet:
            </strong>{" "}
            Combine carbohydrates with proteins and healthy fats for a
            well-rounded diet.
          </li>
        </ul>

        <h2 className="text-black dark:text-white">
          Carbs are not scary! Do not avoid them.
        </h2>
        <p>
          It&apos;s a common misconception that carbohydrates are the enemy of a
          healthy diet. However, the truth is that{" "}
          <strong className="text-black dark:text-white">
            carbs are essential
          </strong>{" "}
          for energy, brain function, and even weight management. The key is to
          choose{" "}
          <strong className="text-black dark:text-white">
            healthy sources
          </strong>{" "}
          of carbohydrates, such as whole grains, fruits, and vegetables, which
          provide vital nutrients and fiber. This fiber aids in digestion and
          can help you feel{" "}
          <strong className="text-black dark:text-white">fuller</strong> longer,
          preventing overeating. So, instead of avoiding carbs, focus on
          incorporating the right kinds into your diet to fuel your body and
          support overall health.
        </p>
        <Image
          src={"/carbs-image-one.jpg"}
          alt={`Carbohydrates for weight loss, weight gain or maintenance`}
          width={400}
          height={200}
          style={{ objectFit: "cover", marginTop: "0", width: "100%" }}
          className="mb-0"
        />
        <span className="block text-sm font-semibold text-gray-500">
          Image source: unsplash.com
        </span>
        <h2 className="text-black dark:text-white">
          How much carbs for weight loss and weight gain?
        </h2>
        <p>
          When it comes to adjusting your weight, understanding your
          carbohydrate intake is crucial.
        </p>
        <h3 className="text-black dark:text-white">Weight loss</h3>
        <p>
          For{" "}
          <strong className="text-black dark:text-white">weight loss</strong>,
          focusing on a diet lower in calories but rich in nutrients is key.
          Reducing simple carbs like sugar and opting for complex carbs can help
          create a calorie deficit while keeping you satiated. Aim for carbs to
          make up{" "}
          <strong className="text-black dark:text-white">40% to 50%</strong> of
          your total caloric intake, emphasizing foods with a low glycemic index
          to avoid spikes in blood sugar.
        </p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Whole Grains:
            </strong>{" "}
            Quinoa, barley, and whole grain pasta.
          </li>
          <li>
            <strong className="text-black dark:text-white">Vegetables:</strong>{" "}
            Leafy greens, carrots, and broccoli.
          </li>
          <li>
            <strong className="text-black dark:text-white">Legumes:</strong>{" "}
            Lentils, chickpeas, and black beans.
          </li>
          <li>
            <strong className="text-black dark:text-white">Fruits:</strong>{" "}
            Apples, berries, and pears.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Nuts and Seeds:
            </strong>{" "}
            Almonds, walnuts, and flaxseeds.
          </li>
          <li>
            <strong className="text-black dark:text-white">Dairy:</strong> Greek
            yogurt and cottage cheese.
          </li>
        </ul>
        <Image
          src={"/carbs-image-two.jpg"}
          alt={`Bread as a carbohydrate source`}
          width={400}
          height={200}
          style={{ objectFit: "cover", marginTop: "0", width: "100%" }}
          className="mb-0"
        />
        <span className="block text-sm font-semibold text-gray-500">
          Image source: unsplash.com
        </span>
        <h3 className="text-black dark:text-white">Weight gain</h3>
        <p>
          Conversely, for{" "}
          <strong className="text-black dark:text-white">weight gain</strong>,
          increasing your carbohydrate intake can help achieve a calorie surplus
          needed for muscle growth and weight gain. Targeting{" "}
          <strong className="text-black dark:text-white">55% to 65%</strong> of
          your calories from carbs, including more starchy vegetables, whole
          grains, and legumes, can provide the extra energy required. Remember,
          balancing these with proteins and healthy fats is essential for
          healthy weight gain.
        </p>
        <h3 className="text-black dark:text-white">
          Some supplements to support your diet:
        </h3>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Protein Powders:
            </strong>{" "}
            Whey, pea, or hemp protein can help keep you full and support muscle
            maintenance during weight loss.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Fiber Supplements:
            </strong>{" "}
            Psyllium husk or glucomannan to help with fullness and improve
            digestion.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Green Tea Extract:
            </strong>{" "}
            Known for its metabolism-boosting properties.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Omega-3 Supplements:
            </strong>{" "}
            Fish oil or algal oil to support heart health and potentially aid in
            weight management.
          </li>
        </ul>
      </div>
      <GoToTop />
    </section>
  );
}
