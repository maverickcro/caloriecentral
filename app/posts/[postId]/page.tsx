import getFormattedDate from "@/lib/getFormattedDate";
import { getSortedPostsData, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SocialShareButtons from "@/app/components/SocialButtons";
import AboutMeSection from "@/app/components/AboutMeSection";

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
  const currentUrl = `https://calorie-pal.com/posts/${postId}`;

  return (
    <main className="px-6 prose prose-xl mt-6 mx-auto max-w-4xl">
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div
          id="progress-bar"
          className="h-2 bg-blue-500"
          style={{ width: "0%" }}
        ></div>
      </div>
      {featuredImage && (
        <Image
          src={featuredImage}
          alt={`Cover image for ${title}`}
          width={700} // These should be the dimensions of your image
          height={475} // These should be the dimensions of your image
          style={{ objectFit: "cover", marginTop: "0", width: "100%" }}
        />
      )}
      <p className="font-bold my-0">{category}</p>
      <h1 className="text-2xl  md:text-4xl mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section
          className="pb-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        <SocialShareButtons url={currentUrl} />
        <AboutMeSection />
      </article>
    </main>
  );
}
