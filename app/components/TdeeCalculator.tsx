"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import { activityLevels } from "../../lib/data";
import GoToTop from "./GoToTop";
import Link from "next/link";

export default function TDEECalculator() {
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

  const calculateTDEE = () => {
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

    // Update the TDEE state
    setTdee(calculatedTdee);
    setCalculated(true);
    localStorage.setItem("age", age.toString());
    localStorage.setItem("gender", gender);
    localStorage.setItem("weight", weight.toString());
    localStorage.setItem("heightCm", heightCm.toString());
    localStorage.setItem("heightFeet", heightFeet.toString());
    localStorage.setItem("heightInches", heightInches.toString());
    localStorage.setItem("measurementSystem", measurementSystem);

    // Return the dynamic sentence and the TDEE calculation
    return;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calculateTDEE();
  };

  return (
    <section className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-200 rounded-3xl to-gray-400 py-8 md:py-16 px-2">
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
          <div className="w-full px-3 relative md:w-[70%]">
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
      <div ref={resultRef} className="w-full mx-auto flex flex-col">
        {tdee > 0 ? (
          <>
            <h2 className="font-normal text-center">
              <strong className="text-black dark:text-white">
                Your results:
              </strong>
            </h2>
            <div
              className="flex w-full justify-center items-center py-2 rounded-3xl animated-background
             "
            >
              <div className="md:max-w-md m-11 p-5 bg-white rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_60px_40px_-7px]">
                <h3 className="my-6">
                  💪Your TDEE is{" "}
                  <span className="text-gradient">{Math.round(tdee)}</span>{" "}
                  kcal.
                </h3>
                <p className="block pt-5 text-sm font-semibold text-gray-500">
                  You need this many calories to{" "}
                  <strong className="text-black">maintain</strong> your weight.
                </p>
                <p className="block pt-1 text-sm font-semibold text-gray-500">
                  To <strong className="text-black">lose weight</strong>, aim
                  for a calorie intake{" "}
                  <strong className="text-black">below</strong> this number.
                </p>
                <h3 className="my-6">
                  🍴 Find out more with our{" "}
                  <Link
                    href="/calorie-deficit-calculator"
                    className="logo-animation text-gradient"
                  >
                    Calorie Deficit Calculator
                  </Link>
                  .
                </h3>
              </div>
            </div>
            <p>Based on your TDEE, here are some additional insights:</p>
            <ul>
              <li>
                <strong className="text-black dark:text-white">
                  Macronutrient Breakdown:
                </strong>{" "}
                For balanced nutrition, target approximately 50% of your
                calories from carbohydrates, 20% from proteins, and 30% from
                fats.
              </li>
              <li>
                <strong className="text-black dark:text-white">
                  Weekly Caloric Deficit:
                </strong>{" "}
                Aiming for a deficit of 3500 kcal can lead to a weight loss of
                approximately 1 pound per week.
              </li>
              <li>
                <strong className="text-black dark:text-white">
                  Activity Adjustment:
                </strong>{" "}
                Remember, if your activity level changes, so does your TDEE.
                Re-calculate accordingly.
              </li>
            </ul>
            <p>
              In other words, if you eat{" "}
              <strong className="text-black dark:text-white">
                {Math.round(tdee)} kcal
              </strong>{" "}
              daily with your activity level, you will{" "}
              <strong className="text-black dark:text-white">maintain</strong>{" "}
              your current weight. It helps you figure out how many calories to
              eat, whether you want to maintain your current weight, become
              stronger, or lose some weight. It&apos;s like having a map for
              your food journey.
            </p>
          </>
        ) : (
          <div className="flex flex-col">
            <p className="text-lg text-red-600">
              Please do the calculation above first.
            </p>
          </div>
        )}

        <h2 className="text-black dark:text-white">
          TDEE Calculator for Weight loss?
        </h2>

        <p>
          Imagine you&apos;re the 185-pound individual who just burned around{" "}
          <strong className="text-black dark:text-white">400 calories</strong>{" "}
          on a vigorous 30-minute bike ride. That&apos;s an impressive effort!
          Now consider a large slice of pepperoni pizza that can easily contain
          the same amount of calories. Consuming that slice would effectively{" "}
          <strong className="text-black dark:text-white">cancel out</strong> all
          the hard work you just put in on your bike.
        </p>

        <p>
          The truth is, it&apos;s much{" "}
          <strong className="text-black dark:text-white">
            quicker and easier
          </strong>{" "}
          to consume calories than it is to burn them off. This is why paying
          attention to your diet is so crucial when trying to lose weight. You
          can unknowingly eat hundreds of calories in just a few minutes, which
          might take over an hour of intense exercise to burn off.
        </p>

        <p>
          Use this calculator for{" "}
          <strong className="text-black dark:text-white">
            faster weight loss
          </strong>
          . Calories are important. At best, be mindful that if you eat{" "}
          <strong className="text-black dark:text-white">more</strong> than your
          TDEE you <strong className="text-black dark:text-white">will</strong>{" "}
          gain weight. At best combine workouts with less empty calories and
          keep them under your TDEE.
        </p>

        <h2 className="text-black dark:text-white">
          How We Calculate Your TDEE
        </h2>

        <p>
          Our TDEE calculator starts with something called BMR—that&apos;s like
          the minimum amount of fuel your body needs just to keep all systems
          running, even if you&apos;re just chilling all day. Then, we think
          about how much you move, whether it&apos;s a little or a lot, and add
          that to your BMR. This gives you your TDEE.
        </p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">
              Starting with the Basics:
            </strong>{" "}
            Your Basal Metabolic Rate (BMR) is like the idle power your body
            needs, similar to how a parked car still uses fuel to run the radio.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Height and Weight:
            </strong>{" "}
            We first convert your height to centimeters and your weight to
            kilograms, even if you use pounds and feet.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Lean Body Mass:
            </strong>{" "}
            If you know your body fat percentage, we fine-tune the calculations
            to focus on the lean part of your weight—that&apos;s everything in
            your body minus the fat.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Gender Matters:
            </strong>{" "}
            Men and women burn energy differently, so we adjust the formula
            based on your biological sex.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Age Adjustments:
            </strong>{" "}
            As we age, our metabolism changes, so we factor in your age for a
            precise number.
          </li>
          <li>
            <strong className="text-black dark:text-white">
              Active Lifestyle:
            </strong>{" "}
            Whether you&apos;re a couch potato or a fitness freak, we multiply
            your BMR by your activity level to find out how many calories you
            burn on a typical day.
          </li>
        </ul>

        <p>
          Once all the numbers are crunched, voilà! You have your TDEE, a
          snapshot of your daily calorie needs you burn just by existing
          combined with your physical activity.
        </p>

        <h2 className="text-black dark:text-white">
          Tips for Making the Most of Your TDEE
        </h2>

        <ul>
          <li>
            Track your food: Keep a diary of what you eat to stay close to your
            TDEE goals.
          </li>
          <li>
            Be consistent: Try to be as accurate as possible with your activity
            levels for the best TDEE estimate.
          </li>
          <li>
            Adjust as you go: Your TDEE can change if you start moving more or
            less, so recalculate it if your lifestyle changes.
          </li>
        </ul>

        <p>
          Remember, your TDEE is a starting point. With this information you
          push your fitness goals{" "}
          <strong className="text-black dark:text-white">further</strong>! Here
          are some other calculators that{" "}
          <strong className="text-black dark:text-white">will</strong> help you
          with your weight loss, muscle gain, macros and much more.
        </p>
      </div>
      <GoToTop />
    </section>
  );
}
