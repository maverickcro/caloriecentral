import React from "react";

export const metadata = {
  title: "Disclaimer - CalorieCentral",
  description:
    "Read our disclaimer for understanding the scope of information provided by CalorieCentral's website and its intended use.",
  keywords: [
    "CalorieCentral disclaimer",
    "health information disclaimer",
    "website liability notice",
    "general information disclaimer",
    "calorie advice disclaimer",
    "nutritional information caution",
    "fitness information notice",
    "CalorieCentral website terms",
    "medical advice disclaimer",
    "health service disclaimer",
  ],
};

export default function Disclaimer() {
  return (
    <main className="mt-6 mx-auto px-6 prose max-w-4xl prose-xl prose-slate">
      <h1 className="font-bold text-gradient mb-2">DISCLAIMER</h1>
      <span className="block pt-1 text-xs font-semibold text-gray-500">
        Updated: Apr 25, 2024
      </span>
      <div className="text-base text-black mb-20">
        <h2 className="font-bold text-gradient mb-2">WEBSITE DISCLAIMER</h2>
        <p>
          The information provided by CaloriePal (&apos;we,&apos;
          &apos;us,&apos; or &apos;our&apos;) on caloriecentral.com (the
          &apos;Site&apos;) is for general informational purposes only. All
          information on the Site is provided in good faith, however we make no
          representation or warranty of any kind, express or implied, regarding
          the accuracy, adequacy, validity, reliability, availability, or
          completeness of any information on the Site. UNDER NO CIRCUMSTANCE
          SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND
          INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY
          INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR
          RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.
        </p>
        <h2 className="font-bold text-gradient mb-2">
          EXTERNAL LINKS DISCLAIMER
        </h2>
        <p>
          The Site may contain (or you may be sent through the Site) links to
          other websites or content belonging to or originating from third
          parties or links to websites and features in banners or other
          advertising. Such external links are not investigated, monitored, or
          checked for accuracy, adequacy, validity, reliability, availability,
          or completeness by us. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR
          ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY
          INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR
          ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE
          WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
          TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR
          SERVICES.
        </p>
        <h2 className="font-bold text-gradient mb-2">
          PROFESSIONAL DISCLAIMER
        </h2>
        <p>
          The Site cannot and does not contain fitness advice. The fitness
          information is provided for general informational and educational
          purposes only and is not a substitute for professional advice.
          Accordingly, before taking any actions based upon such information, we
          encourage you to consult with the appropriate professionals. We do not
          provide any kind of fitness advice. THE USE OR RELIANCE OF ANY
          INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.
        </p>
      </div>
    </main>
  );
}
