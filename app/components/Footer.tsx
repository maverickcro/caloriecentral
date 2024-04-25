import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" text-black dark:text-white bg-gray-100 dark:bg-slate-900 p-4">
      <div className="prose prose-lg mx-auto flex flex-col items-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link
            href="mailto:mav3ricktv@gmail.com"
            className="text-gradient no-underline navbar-link"
          >
            Contact
          </Link>
          <Link
            href="/disclaimer"
            className="text-gradient no-underline navbar-link"
          >
            Disclaimer
          </Link>
        </div>
        {/* Copyright */}
        <div className="text-center text-xs text-black dark:text-white">
          <p>Copyright CalorieCentral 2024 © All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
