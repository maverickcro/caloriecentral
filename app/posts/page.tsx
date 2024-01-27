import React from "react";
import Posts from "../components/Posts";
import AboutMeSection from "../components/AboutMeSection";

export default function PostList() {
  return (
    <main className="mt-6 mx-auto px-6 max-w-4xl ">
      <h1 className="mt-12 mb-16 text-2xl  md:text-4xl  text-black text-center">
        Simplifying <span className="font-bold text-gradient">Nutrition</span>{" "}
        and <span className="font-bold text-gradient">Calories</span>. Small
        choices that make a{" "}
        <span className="font-bold text-gradient">Big Impact</span>.&nbsp;
      </h1>
      <Posts />
      <AboutMeSection />
    </main>
  );
}
