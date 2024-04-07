import React from "react";

export const metadata = {
  title: "Disclaimer - CaloriePal",
  description:
    "Read our disclaimer for understanding the scope of information provided by CaloriePal's website and its intended use.",
  keywords: [
    "CaloriePal disclaimer",
    "health information disclaimer",
    "website liability notice",
    "general information disclaimer",
    "calorie advice disclaimer",
    "nutritional information caution",
    "fitness information notice",
    "CaloriePal website terms",
    "medical advice disclaimer",
    "health service disclaimer",
  ],
};

export default function Disclaimer() {
  return (
    <main className="mt-6 mx-auto px-6 prose max-w-4xl prose-xl prose-slate">
      <h1 className="font-bold text-gradient mb-2">CaloriePal Disclaimer</h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Jan 23, 2024
      </span>
      <div className="text-base text-black">
        <p>
          The information contained on https://www.calorie-pal.com (the
          &apos;Service&apos;) website is for general information purposes only.
        </p>
        <p>
          <b>CaloriePal</b> assumes no responsibility for errors or omissions in
          the contents on the Service.
        </p>
        <p>
          In no event shall CaloriePal be liable for any special, direct,
          indirect, consequential, or incidental damages or any damages
          whatsoever, whether in an action of contract, negligence or other
          tort, arising out of or in connection with the use of the Service or
          the contents of the Service. CaloriePal reserves the right to make
          additions, deletions, or modification to the contents on the Service
          at any time without prior notice.
        </p>
        <p>
          The Service offers health, fitness and nutritional information and is
          designed for educational purposes only. You should not rely on this
          information as a substitute for, nor does it replace, professional
          medical advice, diagnosis, or treatment. If you have any concerns or
          questions about your health, you should always consult with a
          physician or other health-care professional. Do not disregard, avoid
          or delay obtaining medical or health related advice from your
          health-care professional because of something you may have read on the
          Service. The use of any information provided on the Service is solely
          at your own risk.
        </p>
      </div>
    </main>
  );
}
