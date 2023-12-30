import Posts from "./components/Posts";
export default function Home() {
  return (
    <main className="mt-6 mx-auto px-6 prose prose-xl prose-slate">
      <p className="mt-12 mb-12 text-3xl text-center text-black">
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold text-gradient">Marko</span>.&nbsp;
        </span>
        I will make sure you are{" "}
        <span className="font-bold text-gradient">NOT</span> afraid of calories!
      </p>
      <Posts />
    </main>
  );
}
