"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import { activityLevels } from "../../lib/data";
import GoToTop from "./GoToTop";
import Image from "next/image";

export default function FatCalculator() {
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
  const [Fat, setFat] = useState(0);
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

  const calculateFat = () => {
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
        setFat(((calculatedTdee - deficitPerDay) * 0.3) / 9);
        break;
      case "2": //maintain weight
        setTdee(calculatedTdee);
        setFat((calculatedTdee * 0.3) / 9);
        break;
      case "3":
        suficitPerDay = deficitPerday(deficitLevel);
        setTdee(calculatedTdee + suficitPerDay);
        setFat(((calculatedTdee + suficitPerDay) * 0.3) / 9);
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
    calculateFat();
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
          <div className="w-full  relative px-3 md:w-[70%]">
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
            <div className="w-full  relative px-3 md:w-[70%]">
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
                  🥑 <span className="text-gradient">{Math.round(Fat)}</span>{" "}
                  grams per day
                </h3>
                <h3 className="my-0">
                  🍴 with a{" "}
                  <span className="text-gradient">{Math.round(tdee)}</span> kcal
                  diet.
                </h3>
                <p className="block pt-5 text-sm font-semibold text-gray-500">
                  {`Suggested daily fat intake limits for adults are: ${Math.round(
                    (tdee * 0.2) / 9
                  )} - ${Math.round((tdee * 0.35) / 9)} grams per day.`}
                </p>
                <p className="block pt-1 text-sm font-semibold text-gray-500">
                  But, when it comes to{" "}
                  <strong className="text-black">saturated fats</strong>,
                  maximum of: {Math.round((tdee * 0.1) / 9)} grams per day.
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
        <h2 className="text-black dark:text-white">Why this much?</h2>
        <p>
          Understanding the right amount of dietary fat, particularly for total
          and saturated fat intake, is crucial for maintaining good health.
          According to the{" "}
          <strong className="text-black dark:text-white">
            World Health Organization (WHO)
          </strong>
          , adults should aim for a total fat intake that constitutes{" "}
          <strong className="text-black dark:text-white">20-35%</strong> of
          their total daily calories. This recommendation is supported by
          evidence suggesting that this range supports adequate energy,
          essential fatty acids, and fat-soluble vitamin consumption without
          promoting weight gain associated with higher fat diets.
        </p>
        <h2 className="text-black dark:text-white">
          Recommended Fat Intake for Adults
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-blue-500 max-w-xl mt-8 mx-auto">
            <thead>
              <tr className="bg-blue-500">
                <th className="py-2 px-4 text-white text-left">Organization</th>
                <th className="py-2 px-4 text-white text-left">Total Fat</th>
                <th className="py-2 px-4 text-white text-left">
                  Saturated Fat
                </th>
                <th className="py-2 px-4 text-white text-left">Trans Fat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-blue-500">
                <td className="py-2 px-4">World Health Organization</td>
                <td className="py-2 px-4">20-35%</td>
                <td className="py-2 px-4">{`<10%`}</td>
                <td className="py-2 px-4">{`<1%`}</td>
              </tr>
              <tr className="bg-white border-b border-blue-500">
                <td className="py-2 px-4">
                  Food and Nutrition Board, Institute of Medicine
                </td>
                <td className="py-2 px-4">20-35%</td>
                <td className="py-2 px-4">Limit</td>
                <td className="py-2 px-4">Limit</td>
              </tr>
              <tr className="bg-white border-b border-blue-500">
                <td className="py-2 px-4">
                  United States Department of Health and Human Services and
                  United States Department of Agriculture
                </td>
                <td className="py-2 px-4">Limit</td>
                <td className="py-2 px-4">{`<10%`}</td>
                <td className="py-2 px-4">Limit</td>
              </tr>
              <tr className="bg-white border-b border-blue-500">
                <td className="py-2 px-4">
                  American Heart Association/American College of Cardiology
                </td>
                <td className="py-2 px-4">5-6%</td>
                <td className="py-2 px-4">Limit</td>
                <td className="py-2 px-4">Limit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <span className="text-black dark:text-white">
          Limit is a general advice - no percentage because of lack of
          supporting evidence, keep it low.
        </span>
        <h2 className="text-black dark:text-white">
          You absolutely need fat - do not avoid it!
        </h2>
        <p>
          Hey there! Let&apos;s chat about why fat is actually a friend, not a
          foe, in our diets. Did you know that fat is key for{" "}
          <strong className="text-black dark:text-white">
            absorbing vitamins
          </strong>{" "}
          like A, D, E, and K? Yep, without a bit of fat, our bodies
          wouldn&apos;t be able to soak up these vitamins that are crucial for
          things like keeping your vision sharp and your bones strong.
        </p>
        <Image
          src={"/fats-image-one.jpg"}
          alt={`Fats for weight loss, weight gain or maintenance`}
          width={400}
          height={200}
          style={{ objectFit: "cover", marginTop: "0", width: "100%" }}
          className="mb-0"
        />
        <span className="block text-sm font-semibold text-gray-500">
          Image source: unsplash.com
        </span>
        <p>
          Plus, fats bring to the table{" "}
          <strong className="text-black dark:text-white">
            essential fatty acids
          </strong>
          —those are the good guys that your body can&apos;t make by itself but
          really needs for everything from brain health to keeping your skin
          glowing. Totally cutting out fat might leave you missing out on these
          benefits.
        </p>
        <p>These are the ones you look for:</p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Omega-3 and Omega-6 fatty acids
            </strong>{" "}
            - These unsaturated fats are superheroes for your heart, helping to
            lower &quot;bad&quot; cholesterol.
          </li>
          <li>
            Found in plant oils, nuts, fish, and some eggs, they&apos;re an
            essential part of a balanced diet.
          </li>
        </ul>
        <h2 className="text-black dark:text-white">Which ones are bad then?</h2>
        <h3 className="text-black dark:text-white">
          Saturated Fats: Not So Friendly
        </h3>
        <p>
          Saturated fats are the ones to watch. They&apos;re found in a variety
          of foods we often enjoy, but too much can lead to increased
          &quot;bad&quot; LDL cholesterol, putting us at risk for heart disease.
          The goal? Keep them to{" "}
          <strong className="text-black dark:text-white">
            less than 10% of daily calories
          </strong>
          . Here&apos;s where they lurk:
        </p>
        <ul>
          <li>Meaty delights like fatty cuts and processed products</li>
          <li>Dairy darlings, including butter, ghee, and certain cheeses</li>
          <li>Tempting treats like ice cream, cakes, and biscuits</li>
        </ul>
        <h3 className="text-black dark:text-white">
          Trans Fats: The Real Culprits
        </h3>
        <p>
          Trans fats take the &quot;unhealthy&quot; crown, known to wreak havoc
          on heart health. While less common, they&apos;re still around, and
          keeping them{" "}
          <strong className="text-black dark:text-white">
            below 1% of total calories
          </strong>{" "}
          is crucial. Get really good with{" "}
          <strong className="text-black dark:text-white">food labels</strong> to
          avoid these hidden foes.
        </p>
        <Image
          src={"/good-bad-fats.jpg"}
          alt={`Good and bad fats illustration`}
          width={400}
          height={200}
          style={{ objectFit: "cover", marginTop: "0", width: "100%" }}
          className="mb-0"
        />
        <span className="block text-sm font-semibold text-gray-500">
          Image source:{" "}
          <a
            href="https://stock.adobe.com/"
            className="text-black dark:text-white"
          >
            stock.adobe.com
          </a>
        </span>
        <p>
          So, while keeping an eye on fats, remember it’s the type that counts.
          Swapping out the not-so-great ones with beneficial unsaturated fats
          can be a heart-healthy game-changer. Let&apos;s eat smart and take
          care of our hearts!
        </p>
        <h2 className="text-black dark:text-white">In simplest terms</h2>
        <p>
          <strong className="text-black dark:text-white">Good Fats:</strong>
        </p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Unsaturated Fats:
            </strong>{" "}
            These are your heart-healthy heroes. Found in plants and fish, they
            help lower bad cholesterol levels and are crucial for overall
            health. They come in two main types:
            <ul>
              <li>
                <strong className="text-black dark:text-white">
                  Monounsaturated Fats:
                </strong>{" "}
                Think olive oil, avocados, and some nuts like almonds and
                peanuts.
              </li>
              <li>
                <strong className="text-black dark:text-white">
                  Polyunsaturated Fats:
                </strong>{" "}
                These include omega-3 and omega-6 fatty acids found in fish like
                salmon, as well as in flaxseeds and walnuts.
              </li>
            </ul>
          </li>
        </ul>

        <p>
          <strong className="text-black dark:text-white">
            Not-So-Good Fats:
          </strong>
        </p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Saturated Fats:
            </strong>{" "}
            Found in animal products and some tropical oils, they can raise your
            bad cholesterol levels and increase the risk of heart disease if
            consumed in excess. Foods high in saturated fats include red meat,
            butter, cheese, and ice cream.
          </li>
          <li>
            <strong className="text-black dark:text-white">Trans Fats:</strong>{" "}
            The worst type of fats for your heart, trans fats are found in some
            processed foods and can increase bad cholesterol while decreasing
            good cholesterol. They&apos;re often listed as &quot;partially
            hydrogenated oils&quot; on ingredient labels.
          </li>
        </ul>
      </div>
      <GoToTop />
    </section>
  );
}
