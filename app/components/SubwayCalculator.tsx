"use client";
import { useEffect, useRef, useState } from "react";
import {
  breadOptions,
  cheeseOptions,
  meatOptions,
  sauceOptions,
  extraOptions,
} from "../../lib/data";
import CustomButton from "./CustomButton";
import GoToTop from "./GoToTop";
import Link from "next/link";
import Dropdown from "./Dropdown";

export default function Calculator() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [calculated, setCalculated] = useState(false);
  const [selectedBread, setSelectedBread] = useState<Option>({
    title: "",
    kcal: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [selectedBreadLength, setSelectedBreadLength] = useState<Option>({
    title: "",
    kcal: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [selectedCheese, setSelectedCheese] = useState<Option[]>([
    {
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    },
  ]);
  const [selectedMeat, setSelectedMeat] = useState<Option[]>([
    {
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    },
  ]);
  const [selectedSauce, setSelectedSauce] = useState<Option[]>([
    {
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    },
  ]);
  const [selectedExtras, setSelectedExtras] = useState<Option[]>([
    {
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    },
  ]);

  const isValid: boolean =
    selectedBread.title !== "" &&
    selectedBreadLength.title !== "" &&
    selectedCheese.length > 0 &&
    selectedCheese[0].title !== "" &&
    selectedMeat.length > 0 &&
    selectedMeat[0].title !== "" &&
    selectedSauce.length > 0 &&
    selectedSauce[0].title !== "" &&
    selectedExtras.length > 0 &&
    selectedExtras[0].title !== "";
  console.log(
    selectedBread,
    selectedBreadLength,
    selectedCheese,
    selectedMeat,
    selectedSauce,
    selectedExtras
  );
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);

  useEffect(() => {
    if (calculated && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
      setCalculated(false); // Reset to false after scrolling
    }
  }, [calculated]);

  const getCaloriesAndMacros = (event: any) => {
    event.preventDefault();
    let totalCalories: number = 0;
    let totalProtein: number = 0;
    let totalCarbs: number = 0;
    let totalFats: number = 0;

    // Start by adding the values from selectedBread
    if (selectedBread) {
      totalCalories += selectedBread.kcal || 0;
      totalProtein += selectedBread.protein || 0;
      totalCarbs += selectedBread.carbs || 0;
      totalFats += selectedBread.fats || 0;
    }

    // Function to add up values from each selection array
    const addNutritionalValues = (selection: Option[]) => {
      selection.forEach((item) => {
        totalCalories += item.kcal || 0;
        totalProtein += item.protein || 0;
        totalCarbs += item.carbs || 0;
        totalFats += item.fats || 0;
      });
    };

    // Add values from other selections if they are not empty
    if (selectedCheese.length > 0) addNutritionalValues(selectedCheese);
    if (selectedMeat.length > 0) addNutritionalValues(selectedMeat);
    // Assuming selectedSauce can now be an array as well
    if (selectedSauce.length > 0) addNutritionalValues(selectedSauce);
    if (selectedExtras.length > 0) addNutritionalValues(selectedExtras);

    // If the bread length indicates a Footlong, double the totals
    if (selectedBreadLength && selectedBreadLength.title === "Footlong") {
      totalCalories *= 2;
      totalProtein *= 2;
      totalCarbs *= 2;
      totalFats *= 2;
    }

    setTotalCalories(totalCalories);
    setTotalProtein(totalProtein);
    setTotalCarbs(totalCarbs);
    setTotalFats(totalFats);
    setCalculated(true);
  };

  const finish = () => {
    setSelectedBread({
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
    setSelectedExtras([]);
    setSelectedSauce([]);
    setSelectedMeat([]);
    setSelectedCheese([]);
    setSelectedBreadLength({
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
  };
  const isNormalBread: boolean =
    selectedBread.title === "Artisan Flatbread" ||
    selectedBread.title === "Artisan Italian Bread" ||
    selectedBread.title === "Hearty Multigrain Bread" ||
    selectedBread.title === "Italian Herbs & Cheese Bread" ||
    selectedBread.title === "Jalapeño Cheddar Bread";
  return (
    <section className="my-6 mx-auto max-w-4xl">
      <div className="bg-gray-200 rounded-3xl to-gray-400 py-8 md:py-16 px-2">
        <div className="grid w-full grid-cols-1 place-items-center space-y-6">
          <h2 className="font-normal text-center my-0">
            <strong>Subway Calculator</strong>
          </h2>
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Bread/Wrap
            </label>
            <div className="w-full">
              <Dropdown items={breadOptions} selectItems={setSelectedBread} />
            </div>
          </div>
          {isNormalBread && (
            <div className="w-full relative px-3 md:w-[70%]">
              <label
                htmlFor="3"
                className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
              >
                Bread size
              </label>
              <div className="w-full relative flex flex-row items-center">
                <button
                  onClick={() =>
                    setSelectedBreadLength({
                      title: "6-inch",
                      protein: 0,
                      carbs: 0,
                      fats: 0,
                    })
                  }
                  className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                    selectedBreadLength.title === "6-inch"
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                      : "bg-blue-200 group-hover:bg-blue-400 text-black"
                  }`}
                >
                  6-inch
                </button>
                &nbsp;
                <button
                  onClick={() =>
                    setSelectedBreadLength({
                      title: "Footlong",
                      protein: 0,
                      carbs: 0,
                      fats: 0,
                    })
                  }
                  className={`w-1/2 h-10 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out ${
                    selectedBreadLength.title === "Footlong"
                      ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                      : "bg-blue-200 group-hover:bg-blue-400 text-black"
                  }`}
                >
                  Footlong
                </button>
              </div>
            </div>
          )}
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Cheese
            </label>
            <div className="w-full">
              <Dropdown
                items={cheeseOptions}
                selectItems={setSelectedCheese}
                multiple={true}
              />
            </div>
          </div>
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Protein
            </label>
            <div className="w-full">
              <Dropdown
                items={meatOptions}
                selectItems={setSelectedMeat}
                multiple={true}
              />
            </div>
          </div>
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Sauce
            </label>
            <div className="w-full">
              <Dropdown
                items={sauceOptions}
                selectItems={setSelectedSauce}
                multiple={true}
                specialItem={true}
              />
            </div>
          </div>
          <div className="w-full relative px-3 md:w-[70%]">
            <label
              htmlFor="3"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Extras
            </label>
            <div className="w-full">
              <Dropdown
                items={extraOptions}
                selectItems={setSelectedExtras}
                multiple={true}
                specialItem={true}
              />
            </div>
          </div>
          <div className="w-full px-3 relative md:w-[70%]">
            <CustomButton
              type="finish"
              onClick={getCaloriesAndMacros}
              label="Calculate"
              className="w-full"
              disabled={!isValid}
            />
            <span className="block pt-1 text-xs font-semibold text-gray-500">
              {isValid === true ? "" : `Please input the missing values. `}
            </span>
          </div>
        </div>
      </div>
      <div ref={resultRef} className="w-full mx-auto flex flex-col">
        {totalCalories > 0 ? (
          <>
            <h2 className="font-normal text-center">
              <strong>Your results:</strong>
            </h2>
            <div className="flex w-full justify-center items-center py-2 rounded-3xl animated-background bg-gray-200 to-gray-200">
              <div className="w-[80%] md:w-[300px] text-left m-11 p-7 bg-white rounded-3xl shadow-[rgba(0,_0,_0,_0.4)_0px_60px_40px_-7px]">
                <p className="block font-bold text-gray-800 mt-0">
                  Your meal has:
                </p>
                <h3 className="text-gradient font-bold my-0">
                  🍴{Math.round(totalCalories)} kcal
                </h3>
                <p className="my-0">🥩 Protein: {Math.round(totalProtein)}g</p>
                <p className="my-0">🥔 Carbs: {Math.round(totalCarbs)}g</p>
                <p className="my-0">🥜 Fat: {Math.round(totalFats)}g</p>
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
          I created this Subway Calorie Calculator with the knowledge I gained
          while working at Subway. I&apos;ve double-checked the calorie count
          and weight for all the options, from breads to proteins, sauces to
          cookies. I wanted to make sure that this calculator is as accurate and
          helpful as possible because I truly value the fresh, tasty food Subway
          offers. I&apos;m excited to share this with everyone who loves Subway
          and is mindful of their calorie intake.
        </p>
        <p>
          Calories are like fuel for your body. The amount you need each day can
          vary, but generally, adults need between 1,500 to 2,500 calories
          daily. Here&apos;s a quick guide to understanding how a Subway meal
          fits into your calorie goals:
        </p>
        <ul>
          <li>
            <strong>Light Meals:</strong> Under 800 calories - ideal for smaller
            appetites or weight loss goals, making up about 40% of a
            2,000-calorie daily diet.
          </li>
          <li>
            <strong>Regular Meals:</strong> 800 - 1,300 calories - suitable for
            an average adult, accounting for 40-65% of daily calorie intake,
            especially if you&apos;re moderately active.
          </li>
          <li>
            <strong>Hearty Meals:</strong> Over 1,300 calories - perfect for
            those with a very active lifestyle, providing a substantial part of
            your energy needs. If you are not so active though, this might be
            <strong> too many </strong> calories in one meal.
          </li>
        </ul>
        <p>
          If you are interested how many calories you need per day use our{" "}
          <strong>FREE </strong>
          tool and find out in seconds:{" "}
          <Link href="/tdee-calculator">Calorie Calculator</Link>
        </p>
        <p>
          Choosing meals that match your lifestyle and nutritional needs is
          essential. It&apos;s not only about how many calories, but also the
          quality of those calories - incorporating a mix of protein, vitamins,
          and minerals is important for a balanced diet.
        </p>
        <p>
          We got you covered there as well! If you are interested which macros
          and how much you need per day use our&nbsp;
          <Link href="/macro-calculator">Macros Calculator</Link>
        </p>{" "}
        <h2>Is Subway Healthy?</h2>
        <p>
          Many of you ask,{" "}
          <strong>&quot;Are Subway sandwiches healthy?&quot;</strong> or even
          <strong>&quot;Is Subway bad for you?&quot;</strong>. It&apos;s a good
          question! Subway offers a lot of choices, and how healthy they are can
          depend on what you pick. Some options are packed with veggies and lean
          proteins, which are great for you. But some choices might have more
          calories and fat, especially if you add lots of cheese and sauces.
        </p>
        <p>
          Although less calories doesn&apos;t necessairly means healthy and
          right nutrition for you, we prepared some general calorie information
          you would be interested in.
        </p>
        <h2>Subway Bread: Counting the Calories</h2>
        <p>
          Choosing the right bread for your Subway sandwich can affect the
          calorie count, especially if you&apos;re comparing a footlong to a
          6-inch or a wrap. Here are some choices:
        </p>
        <p>
          <strong>Lower Calorie Bread Options:</strong>
        </p>
        <ul>
          <li>Mini Artisan Italian Bread: 130 kcal</li>
          <li>Mini Hearty Multigrain Bread: 130 kcal</li>
          <li>Artisan Italian Bread: 200 kcal</li>
          <li>Hearty Multigrain Bread: 200 kcal</li>
        </ul>
        <p>
          <strong>Higher Calorie Bread Options:</strong>
        </p>
        <ul>
          <li>Artisan Flatbread: 220 kcal</li>
          <li>Italian Herbs & Cheese Bread: 240 kcal</li>
          <li>Jalapeño Cheddar Bread: 230 kcal</li>
          <li>Wrap: 300 kcal</li>
        </ul>
        <h2>Subway Cheese: Low vs. High Calorie Choices</h2>
        <p>
          Adding cheese to your sandwich? Some cheeses add more calories than
          others. Here&apos;s a quick guide:
        </p>
        <p>
          <strong>Lower Calorie Cheese Options:</strong>
        </p>
        <ul>
          <li>American: 40 kcal</li>
          <li>BelGioioso Fresh Mozzarella: 40 kcal</li>
          <li>Mozzarella, Shredded: 45 kcal</li>
        </ul>
        <p>
          <strong>Higher Calorie Cheese Options:</strong>
        </p>
        <ul>
          <li>Monterey Cheddar, Shredded: 50 kcal</li>
          <li>Pepper Jack: 50 kcal</li>
          <li>Provolone: 50 kcal</li>
          <li>Swiss: 60 kcal</li>
        </ul>
        <h2>Subway Meats: Lean vs. Rich Calorie Counts</h2>
        <p>
          Meats can be the most varying part of the calorie count on your Subway
          sandwich. Choose wisely:
        </p>
        <p>
          <strong>Leaner Protein Options:</strong>
        </p>
        <ul>
          <li>Black Forest Ham: 70 kcal</li>
          <li>Oven Roasted Turkey: 60 kcal</li>
          <li>Grilled Chicken: 80 kcal</li>
        </ul>
        <p>
          <strong>Richer Calorie Protein Options:</strong>
        </p>
        <ul>
          <li>All-American Club Meats: 140 kcal</li>
          <li>Meatballs: 240 kcal</li>
          <li>Tuna: 250 kcal</li>
          <li>Spicy Italian Meats: 250 kcal</li>
        </ul>
        <h2>Subway Cookies and Sides: Sweet Treats and Calorie Facts</h2>
        <p>
          Thinking about a sweet end to your meal or some extras on the side?
          Here&apos;s how they stack up in calories:
        </p>
        <p>
          <strong>Cookie Choices:</strong>
        </p>
        <ul>
          <li>Chocolate Chip Cookie: 210 kcal</li>
          <li>Double Chocolate Cookie: 210 kcal</li>
          <li>Oatmeal Raisin Cookie: 200 kcal</li>
        </ul>
        <p>
          <strong>Other Side Options:</strong>
        </p>
        <ul>
          <li>Applesauce: 70 kcal</li>
          <li>Hash Browns: 190 kcal</li>
          <li>Muffin, Apple Cinnamon: 450 kcal</li>
          <li>Muffin, Blueberry Crumb: 410 kcal</li>
        </ul>
        <p>
          Remember, if you&apos;re watching your calorie intake, you might want
          to skip or share a cookie, and go for lighter sides like applesauce.
        </p>
        <h2>High and Low Calorie Subway Toppings</h2>
        <p>
          Keep in mind that the right Subway toppings can really change the
          calorie count of your sandwich. Picking low-calorie veggies can make
          your meal healthier, while some sauces and meats can add more calories
          than you might expect.
        </p>
        <p>
          <strong>Some good low-calorie choices include:</strong>
        </p>
        <ul>
          <li>Cucumbers</li>
          <li>Lettuce</li>
          <li>Tomatoes</li>
          <li>Red onions</li>
        </ul>
        <p>
          <strong>Watch out for high-calorie toppings like:</strong>
        </p>
        <ul>
          <li>Chipotle sauce (70 kcal)</li>
          <li>Mayonnaise (100 kcal) or Ranch sauce (80 kcal)</li>
          <li>Caloric and unhealthy additions like Bacon (80 kcal).</li>
          <li>
            Generally cheese, but you should try parmesan (only 5 kcal) instead.
          </li>
        </ul>
      </div>
      <GoToTop />
    </section>
  );
}
