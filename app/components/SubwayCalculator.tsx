"use client";
import { useEffect, useRef, useState } from "react";
import {
  breadOptions,
  cheeseOptions,
  meatOptions,
  breadLength,
  sauceOptions,
  extraOptions,
} from "../../lib/data";
import CustomButton from "./CustomButton";
import GoToTop from "./GoToTop";
import Link from "next/link";

export default function Calculator() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
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
  const [selectedCheese, setSelectedCheese] = useState<Option>({
    title: "",
    kcal: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [selectedMeat, setSelectedMeat] = useState<Option>({
    title: "",
    kcal: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [selectedSauce, setSelectedSauce] = useState<Option>({
    title: "",
    kcal: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [selectedExtras, setSelectedExtras] = useState<Option[]>([]);
  const handleNext = () => {
    window.scrollTo(0, 0);
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSelectExtra = (extra: Option) => {
    // Check if "No that's all" is the selected extra
    if (extra.title === "No that's all!") {
      // Set selectedExtras to only contain "No that's all!"
      setSelectedExtras([extra]);
    } else {
      // If any other extra is selected, check if "No that's all!" is currently selected
      if (selectedExtras.some((e) => e.title === "No that's all!")) {
        // If so, replace it with the newly selected extra
        setSelectedExtras([extra]);
      } else {
        // If "No that's all" is not selected, toggle the selected state of the extra
        if (selectedExtras.some((e) => e.title === extra.title)) {
          // Remove the extra if it's already selected
          setSelectedExtras(
            selectedExtras.filter((e) => e.title !== extra.title)
          );
        } else {
          // Add the extra to the selectedExtras
          setSelectedExtras([...selectedExtras, extra]);
        }
      }
    }
  };

  const getCaloriesAndMacros = () => {
    let totalCalories: number = 0;
    let totalProtein: number = 0;
    let totalCarbs: number = 0;
    let totalFats: number = 0;
    if (
      selectedBread.kcal &&
      selectedCheese.kcal &&
      selectedMeat.kcal &&
      (selectedSauce.kcal || selectedSauce.kcal === 0) &&
      selectedExtras.length > 0
    ) {
      totalCalories =
        selectedBread.kcal +
        selectedCheese.kcal +
        selectedMeat.kcal +
        selectedSauce.kcal;
      totalProtein =
        selectedBread.protein +
        selectedCheese.protein +
        selectedMeat.protein +
        selectedSauce.protein;
      totalCarbs =
        selectedBread.carbs +
        selectedCheese.carbs +
        selectedMeat.carbs +
        selectedSauce.carbs;
      totalFats =
        selectedBread.fats +
        selectedCheese.fats +
        selectedMeat.fats +
        selectedSauce.fats;

      selectedExtras.map((extra: Option) => {
        extra.kcal && (totalCalories = totalCalories + extra.kcal);
        totalProtein = totalProtein + extra.protein;
        totalCarbs = totalCarbs + extra.carbs;
        totalFats = totalFats + extra.fats;
      });
      if (selectedBreadLength.title === "Footlong") {
        totalCalories = totalCalories * 2;
        totalProtein = totalProtein * 2;
        totalCarbs = totalCarbs * 2;
        totalFats = totalFats * 2;
      }
    }

    return (
      <>
        <p className="text-2xl font-bold text-gradient__orange">
          Nutritional facts:
        </p>
        <ul>
          <li>
            Total calories:{" "}
            <span className="text-gradient">{totalCalories} kcal</span>
          </li>
          <li>Protein: {totalProtein} g</li>
          <li>Carbs: {totalCarbs} g</li>
          <li>Fats: {totalFats} g</li>
        </ul>
      </>
    );
  };

  useEffect(() => {
    if (buttonRef.current) {
      const yOffset = -window.innerHeight / 2; // Scroll to 50% of the viewport height
      const y =
        buttonRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [
    selectedBread,
    selectedCheese,
    selectedMeat,
    selectedSauce,
    selectedExtras,
    selectedBreadLength,
  ]);

  const getCompleteOrder = () => {
    return (
      <>
        <p className="text-2xl font-bold text-gradient__orange">
          Your complete Subway order:
        </p>
        <ul>
          <li>
            {isNormalBread
              ? `${selectedBreadLength.title} ${selectedBread.title}`
              : `${selectedBread.title}`}
            &nbsp;&nbsp;
          </li>
          <li>
            {selectedCheese.title}&nbsp;Cheese&nbsp;and&nbsp;
            {selectedMeat.title}
            &nbsp;Sub
          </li>
          {selectedSauce && selectedSauce.title !== "No sauce" && (
            <li>with&nbsp;{selectedSauce.title}&nbsp;Sauce</li>
          )}
          {selectedExtras.length > 0 &&
            selectedExtras[0].title !== "No that's all!" && (
              <li>
                {selectedExtras.map((extra, index) => (
                  <span key={index}>
                    {extra.title}
                    {index < selectedExtras.length - 1 ? ", " : ""}
                  </span>
                ))}
                &nbsp;on the side
              </li>
            )}
        </ul>
      </>
    );
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
    setSelectedSauce({
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
    setSelectedMeat({
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
    setSelectedCheese({
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
    setSelectedBreadLength({
      title: "",
      kcal: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
    setStep(1);
  };
  const isNormalBread: boolean =
    selectedBread.title === "Artisan Flatbread" ||
    selectedBread.title === "Artisan Italian Bread" ||
    selectedBread.title === "Hearty Multigrain Bread" ||
    selectedBread.title === "Italian Herbs & Cheese Bread" ||
    selectedBread.title === "Jalapeño Cheddar Bread";
  return (
    <section className="my-6 mx-auto max-w-4xl">
      {isNormalBread
        ? step < 7 && <p className="font-bold text-gradient">Step {step}/6</p>
        : step < 6 && <p className="font-bold text-gradient">Step {step}/5</p>}
      {}
      {step == 6 && isNormalBread && (
        <div>
          <p className="text-2xl text-black">
            Which sub size did you get? Please choose below.
          </p>
          <div className="lg:min-h-[40vh] my-[20px]">
            {breadLength.map((bread, index) => (
              <div
                key={index}
                className={`p-2  m-2 mb-0 border rounded-md cursor-pointer text-black ${
                  selectedBreadLength.title === bread.title
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                    : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                }`}
                onClick={() =>
                  setSelectedBreadLength({
                    ...bread,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                  })
                }
              >
                {bread.title}
              </div>
            ))}
          </div>

          <div ref={buttonRef} className="my-2">
            <CustomButton type="previous" onClick={handlePrevious} />
            <CustomButton
              type="next"
              onClick={() => handleNext()}
              disabled={selectedBreadLength.title === ""}
            />
          </div>
          {!selectedBreadLength.title ? (
            <p style={{ color: "red" }}>Choose your option</p>
          ) : (
            <p style={{ color: "green" }}>You can click Next now.</p>
          )}
        </div>
      )}
      {step == 1 && (
        <div>
          <p className="text-2xl font-bold text-black">
            Please choose your bread option.
          </p>
          <div className="min-h-[40vh] my-[30px]">
            {breadOptions.map((bread, index) => (
              <div
                key={index}
                className={`p-2  m-2 mb-0 border rounded-md cursor-pointer text-black ${
                  selectedBread.title === bread.title
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                    : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                }`}
                onClick={() => setSelectedBread(bread)}
              >
                {bread.title} - {bread.kcal} kcal
              </div>
            ))}
          </div>

          <div className="my-2">
            <CustomButton
              type="previous"
              onClick={handlePrevious}
              disabled={true}
            />
            <CustomButton
              type="next"
              onClick={() => handleNext()}
              disabled={selectedBread.title === ""}
            />
          </div>
          {!selectedBread.title ? (
            <p style={{ color: "red" }}>Choose your option</p>
          ) : (
            <p style={{ color: "green" }}>You can click Next now.</p>
          )}
        </div>
      )}
      {step == 2 && (
        <div>
          <p className="text-2xl font-bold text-black">
            Please choose your cheese option.
          </p>
          <div className="min-h-[40vh] my-[30px]">
            {cheeseOptions.map((cheese, index) => (
              <div
                key={index}
                className={`p-2  m-2 mb-0 border rounded-md cursor-pointer text-black ${
                  selectedCheese.title === cheese.title
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                    : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                }`}
                onClick={() => setSelectedCheese(cheese)}
              >
                {cheese.title} - {cheese.kcal} kcal
              </div>
            ))}
          </div>
          <div ref={buttonRef} className="my-2">
            <CustomButton type="previous" onClick={handlePrevious} />
            <CustomButton
              type="next"
              onClick={() => handleNext()}
              disabled={selectedCheese.title === ""}
            />
          </div>
          {!selectedCheese.title ? (
            <p style={{ color: "red" }}>Choose your option</p>
          ) : (
            <p style={{ color: "green" }}>You can click Next now.</p>
          )}
        </div>
      )}
      {step == 3 && (
        <div>
          <p className="text-2xl font-bold text-black">
            Please choose your protein option.
          </p>
          <div className="min-h-[40vh] my-[30px]">
            {meatOptions.map((meat, index) => (
              <div
                key={index}
                className={`p-2  m-2 border rounded-md cursor-pointer text-black ${
                  selectedMeat.title === meat.title
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                    : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                }`}
                onClick={() => setSelectedMeat(meat)}
              >
                {meat.title} - {meat.kcal} kcal
              </div>
            ))}
          </div>
          <div ref={buttonRef} className="my-2">
            <CustomButton type="previous" onClick={handlePrevious} />
            <CustomButton
              type="next"
              onClick={() => handleNext()}
              disabled={selectedMeat.title === ""}
            />
          </div>
          {!selectedMeat.title ? (
            <p style={{ color: "red" }}>Choose your option</p>
          ) : (
            <p style={{ color: "green" }}>You can click Next now.</p>
          )}
        </div>
      )}
      {step == 4 && (
        <div>
          <p className="text-2xl font-bold text-black">
            Which sauce did you get?
          </p>
          <div className="min-h-[40vh] my-[30px]">
            {sauceOptions.map((sauce, index) => (
              <div
                key={index}
                className={`p-2  m-2 border rounded-md cursor-pointer text-black ${
                  selectedSauce.title === sauce.title
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                    : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                }`}
                onClick={() => setSelectedSauce(sauce)}
              >
                {sauce.title} - {sauce.kcal} kcal
              </div>
            ))}
          </div>
          <div ref={buttonRef} className="my-2">
            <CustomButton type="previous" onClick={handlePrevious} />
            <CustomButton
              type="next"
              onClick={() => handleNext()}
              disabled={selectedSauce.title === ""}
            />
          </div>
          {!selectedSauce.title ? (
            <p style={{ color: "red" }}>Choose your option</p>
          ) : (
            <p style={{ color: "green" }}>You can click Next now.</p>
          )}
        </div>
      )}
      {step == 5 && (
        <div>
          <p className="text-2xl font-bold text-black">
            Anything extra with your sub? You can choose{" "}
            <span className="text-gradient__orange">multiple</span> options.
          </p>
          <div className="min-h-[40vh] my-[30px]">
            {extraOptions.map((extra, index) => (
              <div
                key={index}
                className={`p-2 m-2 border rounded-md cursor-pointer text-black ${
                  selectedExtras.some((e) => e.title === extra.title)
                    ? "border-blue-500 bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:text-white"
                    : "border-gray-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white"
                }`}
                onClick={() => handleSelectExtra(extra)}
              >
                {extra.title} - {extra.kcal} kcal
              </div>
            ))}
          </div>
          <div ref={buttonRef} className="my-2">
            <CustomButton type="previous" onClick={handlePrevious} />
            <CustomButton
              type="next"
              onClick={() => handleNext()}
              disabled={selectedExtras.length === 0}
            />
          </div>
          <p style={{ color: "green" }}>
            Click Next when you selected your option(s).
          </p>
        </div>
      )}
      {isNormalBread
        ? step == 7 && (
            <div>
              {getCompleteOrder()}
              {getCaloriesAndMacros()}
              <div className="my-2">
                <CustomButton type="previous" onClick={handlePrevious} />
                <CustomButton
                  type="finish"
                  onClick={finish}
                  label="Reset to default"
                />
              </div>
            </div>
          )
        : step == 6 && (
            <div>
              {getCompleteOrder()}
              {getCaloriesAndMacros()}
              <div className="my-2">
                <CustomButton type="previous" onClick={handlePrevious} />
                <CustomButton
                  type="finish"
                  onClick={finish}
                  label="Reset to default"
                />
              </div>
            </div>
          )}
      <div className="group mx-auto group flex flex-col">
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
