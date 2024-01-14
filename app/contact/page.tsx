"use client";
import React, { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const mailtoLink = `mailto:mav3ricktv@gmail.com?subject=${encodeURIComponent(
    "Message from " + (formState.name || "Anonymous")
  )}&body=${encodeURIComponent(formState.message)}`;

  return (
    <main className="mt-6 mx-auto px-6 prose max-w-4xl prose-xl prose-slate">
      <h1 className="text-2xl font-bold text-gradient mb-2">Contact</h1>
      <div className="text-md text-black">
        <p>
          Have an idea or a question? Share it here! Even if you prefer to stay
          anonymous, I&apos;m all ears.
        </p>

        <form className="mt-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />

          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mt-3"
          >
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />

          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mt-3"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          ></textarea>

          <a
            href={mailtoLink}
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Send Message
          </a>
        </form>
      </div>
    </main>
  );
}
