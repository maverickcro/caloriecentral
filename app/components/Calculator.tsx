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
        <p className="text-lg font-bold text-gradient__orange">
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
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
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
        <p className="text-lg font-bold text-gradient__orange">
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
    <section className="my-6 mx-auto prose prose-md prose-slate">
      {isNormalBread
        ? step < 7 && (
            <p className="text-md font-bold text-gradient">Step {step}/6</p>
          )
        : step < 6 && (
            <p className="text-md font-bold text-gradient">Step {step}/5</p>
          )}
      {}
      {step == 6 && isNormalBread && (
        <div>
          <p className="text-lg text-black">
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
        </div>
      )}
      {step == 1 && (
        <div>
          <p className="text-lg font-bold text-black">
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

          <div ref={buttonRef} className="my-2">
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
        </div>
      )}
      {step == 2 && (
        <div>
          <p className="text-lg font-bold text-black">
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
        </div>
      )}
      {step == 3 && (
        <div>
          <p className="text-lg font-bold text-black">
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
        </div>
      )}
      {step == 4 && (
        <div>
          <p className="text-lg font-bold text-black">
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
        </div>
      )}
      {step == 5 && (
        <div>
          <p className="text-lg font-bold text-black">
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
        </div>
      )}
      {isNormalBread
        ? step == 7 && (
            <div>
              {getCompleteOrder()}
              {getCaloriesAndMacros()}
              <div className="my-2">
                <CustomButton type="previous" onClick={handlePrevious} />
                <CustomButton type="finish" onClick={finish} />
              </div>
            </div>
          )
        : step == 6 && (
            <div>
              {getCompleteOrder()}
              {getCaloriesAndMacros()}
              <div className="my-2">
                <CustomButton type="previous" onClick={handlePrevious} />
                <CustomButton type="finish" onClick={finish} />
              </div>
            </div>
          )}
    </section>
  );
}
