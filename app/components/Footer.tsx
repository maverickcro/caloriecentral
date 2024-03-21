import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" text-black dark:text-white bg-gray-100 dark:bg-slate-900 p-4">
      <div className="prose prose-lg mx-auto flex flex-col items-center">
        {/* Logo */}
        <p className="text-3xl font-bold text-gradient grid place-content-center mb-4">
          <Link href="/" className="no-underline hover:text-black/50">
            CaloriePal
          </Link>
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

        {/* Copyright */}
        <div className="text-center text-xs text-black dark:text-white">
          <p>Copyright CaloriePal 2024 © All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
