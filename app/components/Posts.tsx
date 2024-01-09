import { getSortedPostsData } from "@/lib/posts";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";

export default function Posts() {
  const posts = getSortedPostsData();

  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gradient mb-2">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <p className="text-sm text-gray-600">{getFormattedDate(post.date)}</p>
            <Link href={`/posts/${post.id}`} className="block mt-2 text-lg leading-tight font-medium hover:underline">{post.title}
            </Link>
          </div>
        </div>
      ))}
      </div>  
    </section>
  );
}
