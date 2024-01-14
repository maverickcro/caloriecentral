import getFormattedDate from "@/lib/getFormattedDate";
import { getSortedPostsData, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export function generateMetadata({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) notFound();

  const { title, date, contentHtml, featuredImage, category } =
    await getPostData(postId);

  const pubDate = getFormattedDate(date);
  return (
    <main className="px-6 prose prose-xl mt-6 mx-auto max-w-4xl">
      {featuredImage && (
        <Image
          src={featuredImage}
          alt={`Cover image for ${title}`}
          width={700} // These should be the dimensions of your image
          height={475} // These should be the dimensions of your image
          style={{ objectFit: "cover" }}
        />
      )}
      <p className="font-bold my-0">{category}</p>
      <h1 className="text-4xl mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link href="/">← Back to home</Link>
        </p>
      </article>
    </main>
  );
}
