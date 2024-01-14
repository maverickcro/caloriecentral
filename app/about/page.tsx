import React from "react";
import ProfilePic from "../components/ProfilePic";

export default function About() {
  return (
    <main className="mt-6 mx-auto px-6 prose max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-2">About</h1>
      <div className="text-md text-black">
        <p>
          Hello everyone! I&apos;m Marko, and this is my blog. My journey with
          sports began at a young age, and for a while, I even pursued soccer
          professionally.
        </p>
        <ProfilePic />
        <p>
          My life took an interesting turn when I ventured into Computer
          Science. This new path was exciting, but it also meant long hours of
          coding and meeting tight deadlines. As a result, my regular sports
          routine suffered. During this time, my diet, which was never a concern
          before, started to show its effects. I gained weight, felt less
          comfortable in my own clothes, and realized that something needed to
          change.
        </p>
        <br />
        <p>
          That&apos;s when I made a decision to take control. I experimented
          with various diets – vegan, carnivore, high-protein – and along the
          way, I learned the importance of understanding calories. By 2023, I
          had lost 15 pounds and gained muscle, feeling better than ever. Now,
          I&apos;m eager to share my insights on dieting, especially the
          practical aspects of calorie counting and how to approach it
          effectively. My philosophy is simple: enjoy food without categorizing
          it as good or bad. In this blog, I&apos;m all about exploring and
          breaking the traditional dieting rules.
        </p>
      </div>
    </main>
  );
}
