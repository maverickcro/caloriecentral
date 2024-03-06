import React from "react";
import Posts from "../components/Posts";
import AboutMeSection from "../components/AboutMeSection";

export const metadata = {
  title: "Blog",
  description:
    "Simplifying Nutrition and Calories. Small choices that make a Big Impact",
  keywords: [
    "fast food nutrition",
    "calorie counts",
    "healthy dining options",
    "dieting tips",
    "weight loss",
    "weight gain",
    "understanding macros",
    "healthy eating",
    "nutrition guides",
    "calorie management",
  ],
};

export default function PostList() {
  return (
    <main className="mt-6 mx-auto px-6 max-w-4xl ">
      <h1 className="mt-12 mb-16 text-2xl  md:text-4xl  text-black text-center">
        Blog is almost finished! ⛏️
      </h1>
      <h2 className="mt-12 mb-16 text-lg  md:text-xl text-black text-center">
        We are so excited to write about everything{" "}
        <span className="font-bold text-gradient">calorie related</span> as well
        as nutrition tips and fast food guides. Stay tuned, you will{" "}
        <span className="font-bold text-gradient">love</span> it.&nbsp;
      </h2>
      {/* <h1 className="mt-12 mb-16 text-2xl  md:text-4xl  text-black text-center">
        Simplifying <span className="font-bold text-gradient">Nutrition</span>{" "}
        and <span className="font-bold text-gradient">Calories</span>. Small
        choices that make a{" "}
        <span className="font-bold text-gradient">Big Impact</span>.&nbsp;
      </h1> */}
      {/* <Posts /> */}
      {/* <AboutMeSection /> */}
    </main>
  );
}
