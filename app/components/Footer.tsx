import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-black bg-gray-100 p-4">
      <div className="prose prose-lg mx-auto flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-gradient grid place-content-center mb-4">
          <Link href="/" className="no-underline hover:text-black/50">
            CaloriePal
          </Link>
        </h1>

        {/* Text paragraph */}
        <p className="text-center text-xs2 mt-2 mb-4">
          FDA compliance: the information on this website has not been evaluated
          by the Food & Drug Administration or any other medical body. We do not
          aim to diagnose, treat, cure or prevent any illness or disease.
          Information is shared for educational purposes only. You must consult
          your doctor before acting on any content on this website, especially
          if you are pregnant, nursing, taking medication, or have a medical
          condition.
        </p>

        {/* Navigation links */}
        <div className="flex justify-center space-x-4 mb-4">
          <Link
            href="/privacy"
            className="text-black/90 hover:text-black/50 no-underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/about"
            className="text-black/90 hover:text-black/50 no-underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-black/90 hover:text-black/50 no-underline"
          >
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs">
          <p>Copyright CaloriePal 2024 © All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
