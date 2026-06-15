import { ArrowLeft, Github } from "lucide-react";
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
        <div className="flex items-center justify-between mt-10">
          <Link className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.16em] text-neon hover:text-neon/80 transition-colors" to="/">
            <ArrowLeft size={16} />
            Back
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:text-indigo-300"
            >
              <Github size={14} />
              View on Github
            </a>
          )}
        </div>
        <h1 className="mt-10 font-anton text-6xl uppercase leading-none md:text-8xl">{project.name}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-zinc-300">{project.tagline}</p>
      </div>
    </main>
  );
}
