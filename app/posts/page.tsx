import React from "react";
import Posts from "../components/Posts";

export default function PostList() {
  return (
    <main className="mt-6 mx-auto px-6 max-w-4xl">
      <p className="mt-12 mb-12 text-3xl text-center text-black">
        <span className="whitespace-nowrap">
          Simplifying <span className="font-bold text-gradient">Nutrition</span>
          .&nbsp;
        </span>
        One Bite at a Time.
      </p>
      <Posts />
    </main>
  );
}
