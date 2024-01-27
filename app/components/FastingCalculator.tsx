"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton"; // Assuming you have a CustomButton component
import { activityLevels, fastingMethods } from "../../lib/data";

export default function FastingCalculator() {
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
  const [method, setMethod] = useState("16/8 Split Diet");
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

  const calculateFasting = () => {
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
    setTdee(calculatedTdee);

    setCalculated(true);
    return;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calculateFasting();
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
          <div className="group w-[70%]">
            <label
              htmlFor="10"
              className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Which fasting method?
            </label>
            <div className="relative flex flex-col items-center">
              {fastingMethods.map((fastingMethod, index) => (
                <div
                  key={index}
                  className={`p-2 m-2 mb-0 w-full text-base border rounded-md cursor-pointer text-black ${
                    method === fastingMethod.label
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                      : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                  }`}
                  onClick={() => setMethod(fastingMethod.label)}
                >
                  {fastingMethod.label}
                </div>
              ))}
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
      {tdee > 0 && (
        <div
          ref={resultRef}
          className="group w-[90%] mx-auto group flex flex-col justify-center"
        >
          <h1 className="text-gradient mb-0">{method}</h1>
          {method === "5/2 Split Diet" ? (
            <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
              <thead>
                <tr className="bg-blue-500">
                  <th className="py-2 px-4 text-white text-left">Day</th>
                  <th className="py-2 px-4 text-white text-left">Diet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 1</td>
                  <td className="py-2 px-4">650 kcal</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 2</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 3</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 4</td>
                  <td className="py-2 px-4">650 kcal</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 5</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 6</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 7</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
              </tbody>
            </table>
          ) : method === "Alternate day Fasting" ? (
            <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
              <thead>
                <tr className="bg-blue-500">
                  <th className="py-2 px-4 text-white text-left">Day</th>
                  <th className="py-2 px-4 text-white text-left">Diet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 1</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 2</td>
                  <td className="py-2 px-4">24-hour fasting</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 3</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 4</td>
                  <td className="py-2 px-4">24-hour fasting</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 5</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 6</td>
                  <td className="py-2 px-4">24-hour fasting</td>
                </tr>
                <tr className="bg-white border-b border-blue-500">
                  <td className="py-2 px-4">Day 7</td>
                  <td className="py-2 px-4">Maintanence calories - TDEE</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <>
              <p>
                You should eat one to three meals per day in a 8-hour window.{" "}
              </p>
              <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
                <thead>
                  <tr className="bg-blue-500">
                    <th className="py-2 px-4 text-white text-left">
                      Prefered times
                    </th>
                    <th className="py-2 px-4 text-white text-left">
                      Eating timeframe
                    </th>
                    <th className="py-2 px-4 text-white text-left">
                      Fasting timeframe
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-blue-500">
                    <td className="py-2 px-4">Early in day</td>
                    <td className="py-2 px-4">8 AM - 4 PM</td>
                    <td className="py-2 px-4">4 PM - 8 AM next day</td>
                  </tr>
                  <tr className="bg-white border-b border-blue-500">
                    <td className="py-2 px-4">Later in day</td>
                    <td className="py-2 px-4">3 PM - 11 PM</td>
                    <td className="py-2 px-4">11 PM - 7 AM next day</td>
                  </tr>
                  <tr className="bg-white border-b border-blue-500">
                    <td className="py-2 px-4">Standard</td>
                    <td className="py-2 px-4">Noon - 8 PM</td>
                    <td className="py-2 px-4">8 PM - Noon next day</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          <div className="text-2xl font-bold">
            <p>Your TDEE is:</p>
            <h1 className="text-gradient mb-0">{tdee.toFixed(2)} kcal.</h1>
          </div>
        </div>
      )}
    </section>
  );
}
