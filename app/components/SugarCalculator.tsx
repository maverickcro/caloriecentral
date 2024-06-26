"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import CustomButton from "./CustomButton";
import GoToTop from "./GoToTop";
import { activityLevels } from "../../lib/data";
import Image from "next/image";

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

  const calculate = () => {
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
    calculate();
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
          <div className="w-full relative px-3 md:w-[70%]">
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
            <div className="w-full relative px-3 md:w-[70%]">
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
          <div className="w-full relative px-3 md:w-[70%]">
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
                  🍬 According to WHO:
                  <span className="text-gradient">
                    {" "}
                    {Math.round((tdee * 0.1) / 4)}{" "}
                  </span>
                  grams per day.
                </h3>
                <h3 className="my-6">
                  🍦 According to AHA:
                  <span className="text-gradient">
                    {" "}
                    {gender === "male"
                      ? Math.round((tdee * 0.07) / 4)
                      : Math.round((tdee * 0.05) / 4)}{" "}
                  </span>
                  grams per day.
                </h3>
                <p className="block pt-5 text-sm font-semibold text-gray-500">
                  <strong className="text-black">
                    World Health Organization&apos;s
                  </strong>{" "}
                  recommends less than 10% of total energy intake from
                </p>
                <p className="block pt-1 text-sm font-semibold text-gray-500">
                  <strong className="text-black">
                    The American Heart Association&apos;s
                  </strong>{" "}
                  recommendation for limiting added sugars to no more than 5%
                  calories per day for women and 7% calories per day for men
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
        <p className=" text-black dark:text-white">
          Sugar{" "}
          <strong className="text-black dark:text-white">
            only gives you calories
          </strong>{" "}
          and no other good nutrients. To make your diet healthier and not eat
          too many calories, it&apos;s important to not let sugary foods take
          the place of foods that are good for you or make you eat more calories
          than you need.{" "}
        </p>
        <h2 className="text-black dark:text-white">Why this much?</h2>
        <p className=" text-black dark:text-white">
          <strong className="text-black dark:text-white">
            The American Heart Association&apos;s
          </strong>{" "}
          recommendation for limiting added sugars to no more than 5% calories
          per day for women and 7% calories per day for men is based on the
          concept of discretionary calories.
        </p>
        <p className=" text-black dark:text-white">
          <strong className="text-black dark:text-white">
            World Health Organization&apos;s
          </strong>{" "}
          on the other side, recommends less than 10% of total energy intake
          from free sugars but ideally less than 5% of total energy intake for
          additional health benefits.
        </p>
        <h2 className="text-black dark:text-white">
          How We Calculated Your Sugar Intake?
        </h2>
        <p className=" text-black dark:text-white">
          We&apos;ve calculated your Total Daily Energy Expenditure (TDEE) based
          on your personal details like gender, height, weight, and activity
          level. This number is essential because it tells us how many calories
          you need daily to maintain your current weight, whether you are super
          active or not so much.
        </p>
        <p className="text-black dark:text-white">
          Here&apos;s the easy part: once we have your TDEE, we use it to figure
          out your ideal daily sugar intake. We stick to recommendations from
          reliable sources like the American Heart Association (AHA) and the
          World Health Organization (WHO) for this.
        </p>
        <p className=" text-black dark:text-white">
          So, if your TDEE is around 2000 calories, a woman should aim for no
          more than 100 calories from sugar (that&apos;s roughly 25 grams or 6
          teaspoons). A man can go up to about 140 calories from sugar (around
          35 grams or 8.75 teaspoons).
        </p>
        <h2 className="text-black dark:text-white">
          What Happens When You Quit Sugar?
        </h2>
        <p>
          When you give up sugar for a short period of time, the impact on your
          body is quite significant. If you manage to do it for a couple of days
          you can <strong className="text-black dark:text-white">surely</strong>{" "}
          do it for longer. Here are some things you can expect:
        </p>
        <ul>
          <li>
            <strong className="text-black dark:text-white">Weight loss</strong>{" "}
            is almost guaranteed as you will skip on empty calories.
          </li>
          <li>Eye, brain, artery, and kidney health could improve.</li>
          <li>
            You might find yourself getting up less at night to use the
            bathroom.
          </li>
          <li>
            Expect a boost in your{" "}
            <strong className="text-black dark:text-white">energy</strong>{" "}
            levels.
          </li>
          <li>Hunger between meals could become less frequent.</li>
          <li>
            You may notice a decrease in joint stiffness, pain, and{" "}
            <strong className="text-black dark:text-white">inflammation</strong>
            .
          </li>
          <li>
            Your <strong className="text-black dark:text-white">skin</strong>{" "}
            could clear up, looking healthier.
          </li>
          <li>
            Better regulation of{" "}
            <strong className="text-black dark:text-white">insulin</strong> and
            blood sugar levels is possible.
          </li>
        </ul>
        <p>
          Try it for two weeks and let us know what you noticed. Try to replace
          these donuts with some fruit. Do it for{" "}
          <strong className="text-black dark:text-white">yourself</strong>.
        </p>
        <Image
          src={"/sugar-calculator.png"}
          alt={`Sugar intake calculator`}
          width={400}
          height={200}
          style={{ objectFit: "cover", marginTop: "0", width: "100%" }}
          className="mb-0"
        />
        <span className="block text-sm font-semibold text-gray-500">
          Image source: unsplash.com
        </span>
        <h2 className="text-black dark:text-white">
          No sugar for weight loss:{" "}
        </h2>
        <ul>
          <li>
            For Women: The average daily caloric intake for women generally
            ranges from{" "}
            <strong className="text-black dark:text-white">
              1,800 to 2,400
            </strong>{" "}
            calories per day.
          </li>
          <li>
            For Men: Similarly, for men, the average daily caloric intake ranges
            from{" "}
            <strong className="text-black dark:text-white">
              2,200 to 3,000
            </strong>{" "}
            calories per day.
          </li>
        </ul>
        <p>
          Now, imagine if you eliminated the calories from sugar. You might not
          believe how many calories you consume from sugars alone.
        </p>
        <ul>
          <li>
            Average soda can: About{" "}
            <strong className="text-black dark:text-white">150</strong> calories
            from sugar.
          </li>
          <li>
            Typical chocolate bar: Roughly{" "}
            <strong className="text-black dark:text-white">200-300</strong>{" "}
            calories, mostly from sugar.
          </li>
          <li>
            Store-bought iced tea: Approximately{" "}
            <strong className="text-black dark:text-white">90</strong> calories
            from sugar.
          </li>
          <li>
            A serving of flavored yogurt: Around{" "}
            <strong className="text-black dark:text-white">80</strong> calories
            from sugar.
          </li>
          <li>
            One scoop of ice cream: Could be{" "}
            <strong className="text-black dark:text-white">100 or more</strong>{" "}
            calories from sugar.
          </li>
        </ul>
        <h3 className="text-black dark:text-white">
          Two Weeks Weight Loss: Two pounds!
        </h3>
        <p>
          If you consume these kinds of sugary items daily, you could be
          ingesting an extra{" "}
          <strong className="text-black dark:text-white">500 to 700</strong>{" "}
          calories or more per day. By eliminating these sugary foods and
          drinks, you can create a substantial calorie deficit. Since one pound
          of fat is equivalent to about{" "}
          <strong className="text-black dark:text-white">3,500</strong>{" "}
          calories, cutting out these sugars could lead to a loss of about one
          pound per week, provided your other eating habits and physical
          activity levels remain the same.
        </p>
        <p>
          Sugars are not just in sweets; they&apos;re also hidden in many
          processed foods like sauces, bread, and even salad dressings. So, make
          sure to read food labels.
        </p>
      </div>
      <GoToTop />
    </section>
  );
}
