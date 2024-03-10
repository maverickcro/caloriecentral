"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import GoToTop from "./GoToTop";

export default function AnorexicBMICalculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [measurementSystem, setMeasurementSystem] = useState("metric"); // default to metric
  const [bmi, setBmi] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const isValid: boolean =
    age > 0 && weight > 0 && (heightCm > 0 || heightFeet > 0);

  useEffect(() => {
    // Load all values from localStorage
    const savedAge = localStorage.getItem("age");
    const savedWeight = localStorage.getItem("weight");
    const savedHeightCm = localStorage.getItem("heightCm");
    const savedHeightFeet = localStorage.getItem("heightFeet");
    const savedHeightInches = localStorage.getItem("heightInches");
    const savedMeasurementSystem = localStorage.getItem("measurementSystem");

    if (savedAge) setAge(Number(savedAge));
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

  const calcBmi = () => {
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

    let calculatedBmi: number = 0;
    // Convert height from cm to meters for BMI calculation
    let heightInMeters = heightInCm / 100;

    // Calculate BMI
    calculatedBmi = weightInKg / (heightInMeters * heightInMeters);

    setBmi(calculatedBmi);
    setCalculated(true);
    localStorage.setItem("age", age.toString());
    localStorage.setItem("weight", weight.toString());
    localStorage.setItem("heightCm", heightCm.toString());
    localStorage.setItem("heightFeet", heightFeet.toString());
    localStorage.setItem("heightInches", heightInches.toString());
    localStorage.setItem("measurementSystem", measurementSystem);
    return;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calcBmi();
  };

  return (
    <section className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-200 rounded-3xl to-gray-200 py-8 md:py-16 px-2">
        <div className="grid w-full grid-cols-1 place-items-center space-y-6">
          {/* gender */}
          <div className="w-full px-3 md:w-[70%]">
            <div className="relative flex flex-col items-center">
              <p className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                BMI calculation is gender neutral. Same formula applies to
                biological males and females.
              </p>
            </div>
          </div>
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
      <div ref={resultRef} className="w-full mx-auto flex flex-col">
        {bmi > 0 ? (
          <>
            <h2 className="font-normal text-center">
              <strong className="text-black dark:text-white">
                Your results:
              </strong>
            </h2>
            <div className="flex w-full justify-center items-center py-2 rounded-3xl animated-background bg-gray-200 to-gray-200">
              <div className="md:max-w-md m-11 p-5 bg-white rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_60px_40px_-7px]">
                <h3 className="my-6">
                  🏋️Your BMI is{" "}
                  <span className="text-gradient">{Math.round(bmi)}</span>{" "}
                  kg/m².
                </h3>
                <p
                  className={`block pt-5 text-sm font-semibold ${
                    bmi < 18.5
                      ? "text-red-600"
                      : bmi < 25
                      ? "text-green-600"
                      : bmi < 30
                      ? "text-orange-500"
                      : bmi < 35
                      ? "text-orange-600"
                      : bmi < 40
                      ? "text-orange-700"
                      : "text-red-700"
                  }`}
                >
                  Your Body Mass Index (BMI) suggests that you are in the{" "}
                  <span className="font-semibold">
                    {bmi < 16
                      ? "extremely underweight"
                      : bmi < 16.9
                      ? "underweight (risk of anorexia)"
                      : bmi < 18.5
                      ? "underweight"
                      : bmi < 25
                      ? "normal"
                      : bmi < 30
                      ? "overweight"
                      : bmi < 35
                      ? "obese (Class I)"
                      : bmi < 40
                      ? "obese (Class II - severe)"
                      : "obese (Class III - very severe)"}
                  </span>{" "}
                  weight category for your height.
                </p>
                <p className="block pt-1 text-sm font-semibold text-gray-500">
                  This BMI result is{" "}
                  <strong className="text-black dark:text-white">not</strong> an
                  official medical diagnosis. For a full assessment and health
                  advice, please
                  <strong className="text-black dark:text-white">
                    {" "}
                    consult
                  </strong>{" "}
                  a healthcare professional.
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-lg text-red-600">
            Please do the calculation above first.
          </p>
        )}

        <p className=" text-black">
          Your Body Mass Index (BMI) is a starting point to help understand your
          body weight compared to your height. Here&apos;s what your BMI might
          indicate:
        </p>
        <table className="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
          <thead>
            <tr className="bg-blue-500">
              <th className="py-2 px-4 text-white text-left">BMI</th>
              <th className="py-2 px-4 text-white text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">Below 15</td>
              <td className="py-2 px-4">Extremely low</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">15 to 15.99</td>
              <td className="py-2 px-4">Severe</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">16 to 16.99</td>
              <td className="py-2 px-4">Moderate</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">17 to 17.49</td>
              <td className="py-2 px-4">Mild</td>
            </tr>
            <tr className="bg-white border-b border-blue-500">
              <td className="py-2 px-4">17.5 and above</td>
              <td className="py-2 px-4">Normal range</td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-black dark:text-white">
          Understanding BMI in Anorexia Nervosa
        </h2>
        <div>
          <p className=" text-black">
            When considering anorexia nervosa (AN), a{" "}
            <strong className="text-black dark:text-white">
              BMI result is more than just a number
            </strong>
            —it&apos;s a window into an individual&apos;s health that requires
            careful interpretation. While BMI specifiers offer a framework for
            identifying AN, recent studies suggest that they{" "}
            <strong className="text-black dark:text-white">
              may not fully capture the severity of the condition
            </strong>
            , especially in hospital settings where patients often present with
            extremely low BMI.
          </p>
          <p className=" text-black">
            Here&apos;s a snapshot of what BMI levels might indicate for those
            with AN:
          </p>
          <ul>
            <li>
              <strong className="text-black dark:text-white">
                A BMI below 15 suggests a severe condition
              </strong>{" "}
              that requires immediate medical attention.
            </li>
            <li>
              Those with a BMI between 13.6 and 14.99 fall into a critical
              category, often requiring{" "}
              <strong className="text-black dark:text-white">
                hospitalization for intensive care
              </strong>
              .
            </li>
            <li>
              A new proposed category, &quot;very extreme&quot; AN, with a BMI ≤
              13.5, doesn&apos;t necessarily indicate a distinct clinical group
              from those with slightly higher BMIs. Yet, it signals a{" "}
              <strong className="text-black dark:text-white">
                need for immediate and specialized medical intervention
              </strong>
              .
            </li>
          </ul>

          <p className=" text-black">
            It&apos;s important to note that while a{" "}
            <strong className="text-black dark:text-white">
              low BMI is a significant health risk
            </strong>
            , it doesn&apos;t always correlate with the intensity of eating
            disorder psychopathology. This disconnect suggests that{" "}
            <strong className="text-black dark:text-white">
              BMI alone isn&apos;t a complete measure
            </strong>{" "}
            of an individual&apos;s experience with AN.
          </p>

          <p className=" text-black">
            While BMI is a crucial tool for assessing the physical aspect of AN,
            it&apos;s only part of the picture. The treatment and recovery
            journey for those with AN{" "}
            <strong className="text-black dark:text-white">
              varies significantly
            </strong>{" "}
            and goes beyond just achieving a healthy BMI.&nbsp;
            <strong className="text-black dark:text-white">
              A holistic approach to treatment that addresses both physical and
              mental health is essential for recovery
            </strong>
            .
          </p>
          <h2 className="text-black dark:text-white">How to calculate BMI?</h2>
          <p>
            To calculate your BMI (Body Mass Index), which helps understand if
            your weight is in a healthy range for your height, follow these easy
            steps:
          </p>
          <ul>
            <li>
              Get your weight in your usual unit (like pounds or kilograms).
            </li>
            <li>
              Measure your height using your preferred unit (like inches or
              meters).
            </li>
            <li>Square your height (multiply it by itself).</li>
            <li>Divide your weight by your squared height.</li>
            <li>If you used pounds and inches, multiply the result by 703.</li>
            <li>
              If you used kilograms and meters, there&apos;s no need for a
              conversion factor.
            </li>

            <li>The resulting number is your BMI.</li>
          </ul>
          <p>
            This number gives you a basic idea of whether you fall into a normal
            category or if you have strong reason to consider reaching for help.
          </p>
        </div>
        <span className="italic text-sm py-6">
          Please remember, this text is for informational purposes only and
          should not replace professional medical advice. If you suspect that
          you or someone else is experiencing symptoms of anorexia,{" "}
          <strong className="text-black dark:text-white">
            seek help from a healthcare provider immediately
          </strong>
          .
        </span>
      </div>
      <GoToTop />
    </section>
  );
}
