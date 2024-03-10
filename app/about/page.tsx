import React from "react";
import ProfilePic from "../components/ProfilePic";

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
    "diet trends demystified",
  ],
};

export default function About() {
  return (
    <main className="mt-6 mx-auto px-6 prose max-w-4xl prose-xl prose-slate">
      <h1 className="font-bold text-gradient mb-2">About CaloriePal</h1>
      <div className="text-black dark:text-white">
        <p>
          Welcome to{" "}
          <strong className="text-black dark:text-white">CaloriePal</strong> -
          your go-to hub for demystifying calorie management and achieving your
          fitness milestones. I&apos;m{" "}
          <strong className="text-black dark:text-white">Marko</strong>, the
          founder of this blog, and my mission is simple: empower you to reach
          your health goals, whether it&apos;s losing weight, gaining muscle, or
          simply leading a{" "}
          <strong className="text-black dark:text-white">
            healthier lifestyle.
          </strong>
        </p>
        <ProfilePic />
        <p>
          My own battle with weight gain during a demanding career in Computer
          Science made me realize the importance of maintaining a balanced diet
          amidst a busy schedule. The transformation in my health and mood after
          taking charge of my calorie intake was profound. It wasn&apos;t just
          about losing pounds; it was about gaining a new perspective on life.
        </p>
        <br />
        <p>
          That&apos;s precisely why I created{" "}
          <strong className="text-black dark:text-white">CaloriePal</strong>. To
          share with you the effective, practical approaches to dieting that
          have worked for me and many others. Here, we don&apos;t just count
          calories—we understand them. And with that understanding comes the
          freedom to enjoy food, to tailor diets that don&apos;t feel like
          punishment, and to truly enjoy the journey towards better health.
        </p>
        <p>
          So, whether you&apos;re here to find out the best way to manage your
          calorie intake or to seek advice on a balanced diet,{" "}
          <strong className="text-black dark:text-white">CaloriePal</strong> is
          here to guide you. It&apos;s time to say goodbye to confusing diet
          trends and hello to clear, actionable information that&apos;ll help
          you{" "}
          <strong className="text-black dark:text-white">
            make informed decisions about your nutrition
          </strong>
          . Let&apos;s embark on this journey together!
        </p>
      </div>
    </main>
  );
}
