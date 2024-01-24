import { getSortedPostsData } from "@/lib/posts";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import Image from "next/image";

export default function Posts() {
  const posts = getSortedPostsData();

  return (
    <>
      <h1 className="text-4xl text-center font-bold text-gradient mb-2">
        Fast Food Nutrition & Guides
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
        {posts.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            passHref
            key={post.id}
            className="group flex flex-col blog-post bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-[1.03]"
          >
            <div className="relative w-full h-48 cursor-pointer">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={200}
                height={200}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">
                {getFormattedDate(post.date)}
              </p>
              <h2 className="text-lg font-medium leading-tight">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
