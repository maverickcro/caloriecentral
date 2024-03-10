import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" text-black dark:text-white bg-gray-100 dark:bg-slate-900 p-4">
      <div className="prose prose-lg mx-auto flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-gradient grid place-content-center mb-4">
          <Link href="/" className="no-underline hover:text-black/50">
            CaloriePal
          </Link>
        </h1>

        <p className="text-center text-xs mt-2 mb-4 text-black dark:text-white">
          FDA compliance: the information on this website has not been evaluated
          by the Food & Drug Administration or any other medical body. We do not
          aim to diagnose, treat, cure or prevent any illness or disease.
          Information is shared for educational purposes only. You must consult
          your doctor before acting on any content on this website, especially
          if you are pregnant, nursing, taking medication, or have a medical
          condition.
        </p>

        <div className="flex justify-center space-x-4 mb-4">
          <Link
            href="/disclaimer
            "
            className="text-black/90 dark:text-white/90 no-underline navbar-link"
          >
            Disclaimer
          </Link>
          <Link
            href="/about"
            className="text-black/90 dark:text-white/90 no-underline navbar-link"
          >
            About
          </Link>
          <Link
            href="mailto:mav3ricktv@gmail.com"
            className="text-black/90 dark:text-white/90 no-underline navbar-link"
          >
            Contact
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center space-x-4 mb-4">
          <span className="block pt-1 text-sm font-semibold text-gray-500 dark:text-gray-200">
            Like what you see? Consider supporting
          </span>
          <Link
            className="logo-animation font-bold no-underline navbar-link text-black dark:text-white"
            href="https://paypal.me/caloriepal?country.x=DE&locale.x=de_DE"
          >
            ☕ Buy me a coffee
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-black dark:text-white">
          <p>Copyright CaloriePal 2024 © All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
