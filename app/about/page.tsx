import React from "react";
import ProfilePic from "../components/ProfilePic";

export default function About() {
  return (
    <section className="mt-6 mx-auto px-6 prose prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-2">About</h1>
      <div className="text-md text-black">
        <p>
          Hey guys! My name is Marko, and welcome to my humble little blog.
          I&apos;ve been into sports since forever, and for a hot minute, I even
          tried my hand at being a soccer pro.
        </p>
        <ProfilePic />
        <p>
          So, here&apos;s the deal. I was always fit &apos;cause of all the
          sports, and I never really bothered about what or how much I ate. But
          then, life hit me with a curveball when I dove into the world of
          Computer Science. Between coding marathons and deadlines, my active
          routine took a nosedive. Suddenly, all those pizzas and burgers caught
          up with me. I gained 20 pounds, struggled to fit into my jeans, and my
          stomach was like, &apos;Dude, what are you doing?&apos; Looking in the
          mirror got real awkward, real quick.
        </p>
        <br />
        <p>
          So, one day, I decided enough was enough. I tried all sorts of
          diets—vegan, meat-only, protein overload, you name it. Guess what? It
          all comes down to knowing how calories work. In just 2023, I dropped
          15 pounds, got some muscle on, and I&apos;m feeling like a million
          bucks. Now, I&apos;m here to spill the beans on dieting and share all
          the cool tricks I picked up about counting calories and doing it the
          right way! Oh, and about food? I love it all. Forget this good or bad
          food nonsense. My blog is all about breaking those rules.
        </p>
      </div>
    </section>
  );
}
