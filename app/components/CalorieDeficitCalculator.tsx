"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import { activityLevels } from "../../lib/data";

export default function CalorieDeficitCalculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male"); // default to male
  const [deficitLevel, setDeficitLevel] = useState("1");
  const [deficit, setDeficit] = useState(1925 / 7);
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
    let heightInCm =
      measurementSystem === "metric"
        ? heightCm
        : heightFeet * 30.48 + heightInches * 2.54;
    measurementSystem === "imperial" &&
      heightInches > 11 &&
      setHeightInches(11);
    let weightInKg =
      measurementSystem === "metric" ? weight : weight * 0.453592;
    let BMR =
      gender === "male"
        ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5
        : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
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
        deficitPerDay = 0;
    }

    setDeficit(deficitPerDay);
    const CALORIES_PER_KG = 7700;
    const CALORIES_PER_POUND = 3500;

    let totalCalorieDeficit;
    if (measurementSystem === "metric") {
      totalCalorieDeficit = (weight - weightGoal) * CALORIES_PER_KG;
    } else {
      // assuming the only other option is "imperial"
      totalCalorieDeficit = (weight - weightGoal) * CALORIES_PER_POUND;
    }
    const numberOfDays = Math.round(totalCalorieDeficit / deficitPerDay);
    const today = new Date();
    const goalDate = new Date();
    goalDate.setDate(today.getDate() + Math.ceil(numberOfDays));

    const options: any = { month: "short", day: "numeric", year: "numeric" };
    const formattedGoalDate = goalDate.toLocaleDateString("en-US", options);

    setGoalDate(formattedGoalDate);
    setGoalDays(Math.ceil(numberOfDays));
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
          {/* activity */}
          <div className="w-full  px-3 md:w-[70%]">
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
          <div className="group relative  w-full  px-3 md:w-[70%]">
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
          <div className="w-full px-3 md:w-[70%]">
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
          <div className="group w-full px-3 md:w-[70%]">
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
        {tdee > 0 && deficit > 0 ? (
          <>
            <h2 className="font-normal text-center">
              <strong>Your results:</strong>
            </h2>
            <div className="flex w-full justify-center items-center py-2 rounded-3xl animated-background bg-gray-200 to-gray-200">
              <div className="md:max-w-lg m-11 p-5 bg-white rounded-3xl">
                <h3 className="my-6">
                  💪 For{" "}
                  <span className="text-gradient">{deficitWeight()}</span> loss
                  per week,
                </h3>
                <h3 className="my-6">
                  🍴 eat{" "}
                  <span className="text-gradient">
                    {Math.round(tdee - deficit)}
                  </span>{" "}
                  kcal per day.
                </h3>
                {weightGoal > 0 && (
                  <>
                    <h3 className="my-6">
                      ⌛ Goal weight in{" "}
                      <span className="text-gradient">{goalDays}</span> days,
                    </h3>
                    <h3 className="my-6">
                      📅 on <span className="text-gradient">{goalDate}</span>.
                    </h3>
                  </>
                )}
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
          Calorie deficit is the most important factor when it comes to weight
          loss. If you are not in caloric deficit, you will <strong>not</strong>{" "}
          lose weight - simple as that.
        </p>
        <h2>Why this much?</h2>
        <p>
          Calculator accurately determines how many calories you need to consume
          per day in order to get to your weight goal. We recommend going for{" "}
          <strong>
            {measurementSystem === "metric"
              ? "0.25 kg - 0.75 kg"
              : "0.55lbs - 1.65lbs"}{" "}
            per week
          </strong>{" "}
          because you want to do it in sustainable and healthy way. Anything
          below these values is not recommended as you won&apos;t be able to
          meet minimum nutrient recommendations. It should only be used in{" "}
          limited circumstances along with <strong>medical monitoring</strong>.
        </p>
        <h2>
          How did we calculate <strong>{Math.round(tdee - deficit)}</strong>{" "}
          kcal per day?
        </h2>
        <p>
          First, we asked for some basic information which helped us determine
          your <strong>TDEE</strong>, which stands for{" "}
          <strong>Total Daily Energy Expenditure</strong>. This tells us how
          many calories your body requires in a day to maintain its current
          weight. Your TDEE is <strong>{Math.round(tdee)}</strong> kcal per day.
        </p>
        <p>
          Now, given we have your TDEE, we asked you how much weight you want to
          lose per week. Since one{" "}
          <strong>
            {measurementSystem === "metric" ? "kilogram" : "pound"}
          </strong>{" "}
          is equal to{" "}
          <strong>{measurementSystem === "metric" ? "7,700" : "3,500"}</strong>{" "}
          kcal, it is pretty straightforward to convert that into calories.
        </p>
        <p>
          That means we have a number goal of calories we want to lose per week.
          If you divide it by the number of days per week, you will get your{" "}
          <strong>daily calorie deficit</strong>. Just subtract it from your
          TDEE and that&apos;s it!
        </p>
        <h3>Weight loss calculation example</h3>
        {measurementSystem === "metric" ? (
          <p>
            For instance, if your TDEE is <strong>2500</strong> kcal per day and
            you want to lose <strong>0.5 kg</strong> per week, you need to
            create a deficit of <strong>3850</strong> kcal per week (0.5 kg x
            7700 kcal/kg). This equates to a daily calorie deficit of{" "}
            <strong>550</strong> kcal (3850 kcal / 7 days). Therefore, your
            daily calorie intake should be <strong>1950</strong> kcal (2500 -
            550 kcal).
          </p>
        ) : (
          <p>
            For example, if your TDEE is <strong>2500</strong> kcal per day and
            you want to lose <strong>1 pound</strong> per week, you need to
            create a deficit of <strong>3500</strong> kcal per week (1 pound x
            3500 kcal/pound). This equates to a daily calorie deficit of{" "}
            <strong>500</strong> kcal (3500 kcal / 7 days). Therefore, your
            daily calorie intake should be <strong>2000</strong> kcal (2500 -
            500 kcal).
          </p>
        )}
        {weightGoal > 0 && (
          <>
            <h2>
              How do we estimate that you need <strong>{goalDays}</strong> days
              for your goal weight?
            </h2>
            <p>
              We use similar logic as with goal calories above. We subtract your
              goal weight from your current weight. Then that difference is
              converted to calories. When we divide those calories by your daily
              deficit, we get the number of days needed to reach your goal.
            </p>
            <h3>Weight loss date estimation example</h3>
            {measurementSystem === "metric" ? (
              <p>
                For example, if you want to lose <strong>5 kg</strong>, and one
                kilogram is equivalent to <strong> 7,700 kcal</strong>, you need
                a total deficit of <strong>38,500 kcal</strong>
                (5 kg x 7,700 kcal/kg). With a daily deficit of{" "}
                <strong>500 kcal</strong>, it will take you{" "}
                <strong>77 days</strong> to reach your goal (38,500 kcal / 500
                kcal per day).
              </p>
            ) : (
              <p>
                For instance, if your aim is to lose <strong>10 pounds</strong>,
                and one pound is equivalent to
                <strong>3,500 kcal</strong>, you require a total calorie deficit
                of <strong>35,000 kcal</strong>
                (10 pounds x 3,500 kcal/pound). With a daily deficit of{" "}
                <strong>500 kcal</strong>, it will take you{" "}
                <strong>70 days</strong> to meet your goal (35,000 kcal / 500
                kcal per day).
              </p>
            )}
            <p>Then we just add those days to current date.</p>
          </>
        )}
        <h2>
          Nutrition doesn&apos;t matter for losing weight, only{" "}
          <strong>calorie deficit</strong>
        </h2>
        <p>
          You read it right. When we talk about straight weight loss, you{" "}
          <strong>WILL</strong> lose weight if you eat less.{" "}
        </p>
        <p>
          In a study by NIH&apos;s NHLBI, 811 adults followed four different
          heart-healthy diets, all aimed at reducing calorie intake. Key
          findings include:
        </p>
        <ul>
          <li>
            All diets led to <strong>similar weight loss</strong>, regardless of
            macronutrient composition.
          </li>
          <li>
            Participants saw an average weight loss of{" "}
            <strong>13 pounds in 6 months</strong> and maintained a{" "}
            <strong>9 pound loss after 2 years</strong>.
          </li>
          <li>
            Weight loss was accompanied by a{" "}
            <strong>1 to 3 inch reduction in waist size</strong>.
          </li>
        </ul>
        <p>Reference to that study is in the bottom of the page.</p>
        <p>
          These diets, varying from low to high fat and protein content, proved
          that as long as you consume fewer calories than you burn, weight loss
          occurs. However, while the specifics of your diet may not impact your
          ability to lose weight, we still encourage eating a healthy diet for
          overall well-being.
        </p>

        <h2>Most important thing for weight loss</h2>
        <p>
          Following a structured plan that encompasses a calorie deficit, as
          evidenced by scientific research, maximizes the potential for
          effective and sustainable weight loss. The most important thing is to
          be <strong>consistent</strong>! So stay strong and keep going.
          Hopefully this evidence will encourage you that success is{" "}
          <strong>inevitable</strong>.
        </p>
      </div>
    </section>
  );
}
