"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import { activityLevels } from "../../lib/data";
import Image from "next/image";
import GoToTop from "./GoToTop";

export default function ProteinCalculator() {
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
  const [protein, setProtein] = useState(0);
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

  const calculateProtein = () => {
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
        setProtein(((calculatedTdee - deficitPerDay) * 0.3) / 4);
        break;
      case "2": //maintain weight
        setTdee(calculatedTdee);
        setProtein((calculatedTdee * 0.3) / 4);
        break;
      case "3":
        suficitPerDay = deficitPerday(deficitLevel);
        setTdee(calculatedTdee + suficitPerDay);
        setProtein(((calculatedTdee + suficitPerDay) * 0.3) / 4);
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
    calculateProtein();
  };
  return (
    <section className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-200 rounded-3xl to-gray-200 py-8 md:py-16 px-2">
        <div className="grid w-full grid-cols-1 place-items-center space-y-6">
          {/* measurement system */}
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
          {/* age and weight */}
          <div className="w-full relative px-3 md:w-[70%]">
            <div className="flex items-center space-x-2">
              {/* age */}
              <div className="relative w-1/2">
                <label
                  htmlFor="3"
                  className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
                  className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
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
          <div className="relative w-full px-3 md:w-[70%]">
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
            <div className="group relative px-3 md:w-[70%]">
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
          <div className="w-full px-3 md:w-[70%]">
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
        {tdee > 0 ? (
          <>
            <h2 className="font-normal text-center">
              <strong className="text-black dark:text-white">
                Your results:
              </strong>
            </h2>
            <div className="flex w-full justify-center items-center py-2 rounded-3xl animated-background bg-gray-200 to-gray-200">
              <div className="md:max-w-md m-11 p-5 bg-white rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_60px_40px_-7px]">
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
                  🥩{" "}
                  <span className="text-gradient">
                    {measurementSystem === "metric"
                      ? Math.round(weight * 1.6)
                      : Math.round(weight * 0.72)}
                  </span>{" "}
                  grams per day
                </h3>
                <h3 className="my-0">
                  🍴 with a{" "}
                  <span className="text-gradient">{Math.round(tdee)}</span> kcal
                  diet.
                </h3>
                <p className="block pt-5 text-sm font-semibold text-gray-500">
                  {`According to American Dietetic Association (ADA): at least ${Math.round(
                    weight * 0.8
                  )} - ${Math.round(weight * 2.2)} grams per day.`}
                </p>
                <p className="block pt-1 text-sm font-semibold text-gray-500">
                  {`According to The Centers for Disease Control and Prevention (CDC): at least ${Math.round(
                    (tdee * 0.1) / 4
                  )} - ${Math.round((tdee * 0.35) / 4)} grams per day.`}
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
          In today&apos;s society,{" "}
          <strong className="text-black dark:text-white">protein</strong> has
          taken a center stage. It is the most important point of nutritional
          discussions, diets and even culinary innovation. Everywhere you look,
          from local supermarkets to that cool coffee place, protein is
          incorporated in{" "}
          <strong className="text-black dark:text-white">
            every conceivable
          </strong>{" "}
          way. From meat, tofu, to snacks like protein chips, ice creams and
          even protein coffee. Where did all this craze come from?
        </p>
        <p>
          But with all this protein obsession, it is crucial to sift through the
          hype and uncover{" "}
          <strong className="text-black dark:text-white">
            scientific truths
          </strong>{" "}
          about our actual protein needs and how best to incorporate it into our
          diets in a{" "}
          <strong className="text-black dark:text-white">
            balanced manner
          </strong>
          , whether you are building muscle or on a weight loss.
        </p>
        <h2 className="text-black dark:text-white">Why this much?</h2>
        <p>
          We will provide you with our personal{" "}
          <strong className="text-black dark:text-white">unbiased</strong>{" "}
          recommendation and the one that is being recommended to you from
          American Dietetic Association and The Centers for Disease Control and
          Prevention. You decide for youself{" "}
          <strong className="text-black dark:text-white">
            what works best
          </strong>{" "}
          for you.
        </p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Body Weight Consideration:
            </strong>{" "}
            The American Dietetic Association (ADA) recommends a protein intake
            ranging from a minimum of{" "}
            <strong className="text-black dark:text-white">0.8 grams</strong> to
            a maximum of{" "}
            <strong className="text-black dark:text-white">2.2 grams</strong>{" "}
            per kilogram of body weight per day. This range accommodates varying
            levels of activity and physiological needs.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Total Energy Expenditure Alignment:
            </strong>{" "}
            The Centers for Disease Control and Prevention (CDC) suggest that
            your protein intake should constitute between{" "}
            <strong className="text-black dark:text-white">10% and 35%</strong>{" "}
            of your TDEE. This is calculated by taking your TDEE, determining
            the caloric contribution from protein (at 4 calories per gram), and
            converting this into the weight of protein required per day.
          </li>
        </ul>
        <p>
          Minimum protein requirements per day, recommended dietary allowance
          based on age:
        </p>
        <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
          <thead>
            <tr className="bg-blue-500">
              <th className="py-2 px-4 text-white text-left">Age</th>
              <th className="py-2 px-4 text-white text-left">
                Protein Needed (grams/day)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">Age 1 - 3</td>
              <td className="py-2 px-4">13</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">Age 4 - 8</td>
              <td className="py-2 px-4">19</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">Age 9 - 13</td>
              <td className="py-2 px-4">34</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">Age 14 - 18 (Girls)</td>
              <td className="py-2 px-4">46</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">Age 14 - 18 (Boys)</td>
              <td className="py-2 px-4">52</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">Age 19 - 70+ (Women)</td>
              <td className="py-2 px-4">46</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Age 19 - 70+ (Men)</td>
              <td className="py-2 px-4">56</td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-black dark:text-white">
          How much protein for muscle gain?
        </h2>
        <p>
          You heard it over the years. One gram per pound of weight. Two grams
          per kilogram. We gave you our recommendation and the global
          recommendation ranges.
        </p>
        <p>
          Based on the information from the{" "}
          <strong className="text-black dark:text-white">latest</strong>{" "}
          interview with Dr. Stuart Phillips, the{" "}
          <strong className="text-black dark:text-white">
            most cited scientist
          </strong>{" "}
          behind protein intake in the last 20 years:
        </p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Protein Intake
            </strong>
            : For those looking to gain muscle while also losing fat, Phillips
            suggests a protein intake of up to{" "}
            <strong className="text-black dark:text-white">
              (2-2.5 grams per kilogram)
            </strong>{" "}
            of body weight per day, distributed across approximately four meals.
            This higher protein intake, particularly post-workout, may be more
            critical when in a calorie deficit.
          </li>
        </ul>
        <h3 className="text-black dark:text-white">
          Do I need one gram of protein per pound?
        </h3>
        <p>
          It&apos;s almost impossible to find a scientific research on this
          topic without this guy in the past 20 years. He had his fingers in
          everything. But here is a small breakdown over the years. You can find
          every paper in references on the bottom of this calculator.
        </p>
        <ul>
          <li>2004. they recommend 1.0 - 1.3g per kg</li>
          <li>2007. they recommend 1.2 - 1.6g per kg</li>
          <li>2011. they recommend 1.3 - 1.8g per kg</li>
          <li>2018. they recommend 1.62 - 2.2g per kg</li>
          <li>
            Today they recommend{" "}
            <strong className="text-black dark:text-white">
              2.0 - 2.5g per kg
            </strong>
          </li>
        </ul>
        <p>
          How did they go from{" "}
          <strong className="text-black dark:text-white">
            1 gram to 2.5 grams
          </strong>{" "}
          in just under 20 years? Well, maybe humans evolved? Better scientific
          methods or something third? We kept digging further.
        </p>
        <p>
          Apparently, just recently, 11 papers from Dr. Phillips were corrected
          because of{" "}
          <strong className="text-black dark:text-white">
            conflicts of interest
          </strong>
          . He was a founder of a popular whey protein for elderly people and
          athletes.
        </p>
        <h3 className="mb-16 text-black dark:text-white">
          The same guy telling you to eat more protein is directly profiting
          from selling you the protein.
        </h3>
        <p>
          The word of mouth spreads really fast. Fitness industry and
          influencers need their profits. It&apos;s easier to recommend 2 grams
          to sell more, than keep it in normal limits. That is just{" "}
          <strong className="text-black dark:text-white">
            too much protein
          </strong>
          . It&apos;s not sustainable neither physically nor financially.
        </p>
        <h2 className="text-black dark:text-white">
          Okay, again, how much protein do I actually need?
        </h2>

        <p>
          The accompanying graph is derived from a{" "}
          <strong className="text-black dark:text-white">
            systematic review, meta-analysis, and meta-regression study
          </strong>{" "}
          published in the <em>British Journal of Sports Medicine</em> in March
          2018. The study, titled{" "}
          <em>
            A systematic review, meta-analysis and meta-regression of the effect
            of protein supplementation on resistance training-induced gains in
            muscle mass and strength in healthy adults,
          </em>{" "}
          analyzes how dietary protein supplementation affects muscle gains in
          individuals engaged in resistance training.
        </p>
        <p>
          This research is critical in providing evidence-based guidelines for{" "}
          <strong className="text-black dark:text-white">
            optimal protein intake
          </strong>{" "}
          for muscle hypertrophy, particularly in resistance-trained
          individuals. The graph specifically illustrates the relationship
          between total daily protein intake and changes in fat-free
          mass(muscle).
        </p>
        <div className="flex justify-center">
          <Image
            alt="Protein recommendation grams"
            src="/grafss.png"
            width={500}
            height={250}
          />
        </div>
        <>
          <p>
            <strong className="text-black dark:text-white">The graph</strong>{" "}
            suggests a correlation between protein intake and muscle gain. The
            optimal protein intake for muscle gain is indicated at{" "}
            <strong className="text-black dark:text-white">1.6 g/kg/day</strong>
            , where the increase in fat-free mass levels off.
          </p>
          <p>
            Here&apos;s why{" "}
            <strong className="text-black dark:text-white">1.6 g/kg/day</strong>{" "}
            is significant:
          </p>
          <ul>
            <li>
              It represents a balance between sufficient protein for muscle
              growth and the body&apos;s ability to utilize it effectively.
            </li>
            <li>
              Intakes{" "}
              <strong className="text-black dark:text-white">above</strong> this
              level do NOT significantly increase muscle mass, indicating a{" "}
              <strong className="text-black dark:text-white">plateau</strong> in
              the protein&apos;s effectiveness for muscle synthesis.
            </li>
            <li>
              This level is seen as optimal in the data, but individual needs
              may vary.
            </li>
          </ul>

          <p>
            <strong className="text-black dark:text-white">
              Always consult a healthcare provider
            </strong>{" "}
            for personalized nutritional advice.
          </p>
        </>
        <h2 className="text-black dark:text-white">Conclusion</h2>
        <p>
          When building muscle,{" "}
          <strong className="text-black dark:text-white">
            1.6 grams per kg
          </strong>{" "}
          or{" "}
          <strong className="text-black dark:text-white">
            0.72 grams per pound
          </strong>{" "}
          of body weight daily. But{" "}
          <strong className="text-black dark:text-white">
            don&apos;t worry
          </strong>{" "}
          too much about numbers. It doesn&apos;t need to be perfect.
        </p>
        <p>
          {" "}
          Try to have regular meals with protein sources like{" "}
          <strong className="text-black dark:text-white">
            meat, tofu, cheese, eggs
          </strong>{" "}
          etc. With this tactic you will ensure a constant protein intake which
          is permentantly sustainable. As always, be{" "}
          <strong className="text-black dark:text-white">consistent</strong> in
          your training and diet and results are{" "}
          <strong className="text-black dark:text-white">inevitable</strong>.
        </p>
      </div>
      <GoToTop />
    </section>
  );
}
