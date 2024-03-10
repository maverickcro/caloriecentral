import Link from "next/link";
import ToggleMode from "./ToggleMode";

export default function Navbar() {
  return (
    <nav className="py-2 md:py-7 p-4 sticky top-0 drop-shadow-md z-10 bg-gray-100 dark:bg-slate-900">
      <div className="prose max-w-4xl prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold grid place-content-center mb-2 md:mb-0">
          <Link
            href="/"
            className="logo-animation font-bold text-gradient no-underline"
          >
            CaloriePal
          </Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly sm:items-center gap-4 text-base">
          <Link
            className="logo-animation font-bold no-underline navbar-link text-black dark:text-white"
            href="/calculators"
          >
            Calculators
          </Link>
          <Link
            className="logo-animation font-bold no-underline navbar-link text-black dark:text-white"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="logo-animation font-bold no-underline navbar-link text-black dark:text-white"
            href="/about"
          >
            About
          </Link>
          <ToggleMode />
        </div>
      </div>
    </nav>
  );
}
