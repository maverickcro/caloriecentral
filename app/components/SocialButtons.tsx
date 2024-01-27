import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
export default function SocialShareButtons({ url }: { url: string }) {
  // Define the URLs for sharing content on social platforms
  const socialLinks = {
    instagram: `https://www.instagram.com/direct/t/${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`,
    linkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  return (
    <div className="flex-row lg:fixed bottom-0 left-0 z-10 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex lg:flex-col justify-center gap-2 p-2  md:left-4 lg:left-8">
      {/* LinkedIn */}
      <Link
        href={socialLinks.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600"
      >
        <FaLinkedin className="text-2xl  md:text-4xl" />
      </Link>
      {/* Wp */}
      <Link
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600"
      >
        <FaWhatsapp className="text-2xl  md:text-4xl" />
      </Link>
      {/* Facebook */}
      <Link
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600"
      >
        <FaFacebook className="text-2xl  md:text-4xl" />
      </Link>
    </div>
  );
}
