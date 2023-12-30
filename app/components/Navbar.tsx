import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-7 text-black shadow-md p-4 sticky top-0 drop-shadow-xl z-10 bg-gray-100">
      <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link
            href="/"
            className="text-gradient font-bold no-underline hover:text-black/50"
          >
            CaloriePal
          </Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-black text-md lg:text-lg">
          <Link
            className="text-black/90 hover:text-black/50 no-underline"
            href="/calculator"
          >
            Subway Calculator&reg;
          </Link>
          <Link
            className="text-black/90 hover:text-black/50 no-underline"
            href="/posts"
          >
            Blog
          </Link>
          <Link
            className="text-black/90 hover:text-black/50 no-underline"
            href="/about"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
