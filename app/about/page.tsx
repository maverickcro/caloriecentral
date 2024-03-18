import React from "react";
import ProfilePic from "../components/ProfilePic";
import Link from "next/link";
import CustomButton from "../components/CustomButton";
import CalculatorCard from "../components/CalculatorCard";

export const metadata = {
  title: "About",
  description:
    "CaloriePal: Your trusted companion for understanding calories and achieving your health goals faster and more effectively.",
  keywords: [
    "CaloriePal about",
    "calorie management guide",
    "fitness journey insights",
    "weight loss tips",
    "muscle gain strategies",
    "healthier lifestyle advice",
    "balanced diet importance",
    "calorie counting explained",
    "nutrition decision making",
    "diet trends",
  ],
};

export default function About() {
  return (
    <main className="mt-6 mx-auto px-6 prose max-w-4xl prose-xl prose-slate">
      <h1 className="font-bold text-gradient mb-2 text-[2.4rem] sm:text-[3rem]">
        About CaloriePal
      </h1>
      <div className="text-black dark:text-white text-[18px] sm:text-[20px]">
        <p>
          Welcome to{" "}
          <strong className="text-black dark:text-white">CaloriePal</strong>{" "}
          where our mission is simple: empower you to reach your health goals,
          whether it&apos;s losing weight, gaining muscle, or simply leading a{" "}
          <strong className="text-black dark:text-white">
            healthier lifestyle.
          </strong>
        </p>
        <ProfilePic />
        <p>
          Hi, I&apos;m Marko!👋 For years, my life was just work, work, work. As
          a software developer, I spent long hours at the computer, snacking on
          whatever was quick and easy (spoiler: it wasn&apos;t salads).
          Exercise? That word wasn&apos;t in my vocabulary unless I was
          programming it into an app.
        </p>
        <br />
        <p>
          It wasn&apos;t until I noticed how this lifestyle was{" "}
          <strong className="text-black dark:text-white">
            dragging me down
          </strong>{" "}
          that I decided to make a change. I started working out a bit at a
          time, figuring out how to eat better, and surprisingly, I began to
          enjoy it. I lost 15 pounds, started seeing some muscle definition, and
          most importantly, I felt energized and ready to take on the world.
        </p>
        <p>
          This journey led me to create CaloriePal. It&apos;s my way of
          combining tech with my newfound fitness knowledge to help folks like
          you and me find a healthier way of life. Here you&apos;ll find
          practical tools to track your{" "}
          <strong className="text-black dark:text-white">
            eating and exercise
          </strong>
          .
        </p>
        <div className="w-full flex justify-center py-6">
          <Link href="/calculators">
            <CustomButton type={"gradient"} label="VIEW ALL CALCULATORS" />
          </Link>
        </div>
        <p>
          {" "}
          These are the very{" "}
          <strong className="text-black dark:text-white">
            calculators
          </strong>{" "}
          that helped me get on track, and I hope they&apos;ll do the same for
          you. So stick around, explore the calculators, and let&apos;s get to a
          healthier place together🙏 . Welcome to CaloriePal! We will help you{" "}
          <strong className="text-black dark:text-white">
            make informed decisions about your nutrition
          </strong>
          .
        </p>
      </div>
    </main>
  );
}
