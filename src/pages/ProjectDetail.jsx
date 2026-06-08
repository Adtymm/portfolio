import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects.js";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-bg px-5 py-10 text-white">
        <Link className="font-mono text-sm uppercase tracking-[0.16em] text-neon" to="/">
          Back home
        </Link>
        <h1 className="mt-10 font-anton text-6xl uppercase">Project not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg px-5 py-10 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.16em] text-neon" to="/">
          <ArrowLeft size={16} />
          Back
        </Link>
        <p className="mt-16 font-mono text-sm uppercase tracking-[0.2em] text-neon">{project.index}</p>
        <h1 className="mt-5 font-anton text-6xl uppercase leading-none md:text-8xl">{project.name}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-zinc-300">{project.summary}</p>
      </div>
    </main>
  );
}
