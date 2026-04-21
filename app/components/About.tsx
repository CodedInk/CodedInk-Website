import Image from "next/image";
import { asset } from "../lib/asset";

type TechIcon = {
  name: string;
  src?: string;
  label?: string;
  tint?: string;
};

const techStack: TechIcon[] = [
  { name: "Figma", src: "/tech/figma.svg", tint: "invert" },
  { name: "React", src: "/tech/react.svg", tint: "invert" },
  { name: "FigJam", label: "FJ" },
  { name: "Figma Make", label: "FM" },
  { name: "Sketch", src: "/tech/sketch.svg", tint: "invert" },
  { name: "MCP", src: "/tech/modelcontextprotocol.svg", tint: "invert" },
  { name: "GitHub", src: "/tech/github.svg", tint: "invert" },
  { name: "Storybook", src: "/tech/storybook.svg", tint: "invert" },
];

export default function About(): React.JSX.Element {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-2xl max-w-6xl mx-auto">
            I&apos;m currently looking to join a{" "}
            <span className="text-red-400">cross-functional team</span>
            <br />{" "}
            <span className="text-sm">
              that values improving people&apos;s lives through accessible
              design
            </span>
          </p>
        </div>

        <div className="relative mx-auto" style={{ maxWidth: "895px" }}>
          {/* Tech stack icons */}
          <div className="relative z-20 flex flex-wrap justify-center gap-x-6 gap-y-4 mb-2">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                title={tech.name}
                aria-label={tech.name}
                className="w-14 h-14 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center p-3 shadow-lg shadow-red-900/20 hover:border-red-500/40 transition-colors"
              >
                {tech.src ? (
                  <Image
                    src={asset(tech.src)}
                    alt={tech.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    style={
                      tech.tint === "invert" ? { filter: "invert(1)" } : undefined
                    }
                  />
                ) : (
                  <span className="text-sm font-semibold text-white">
                    {tech.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Connector lines from each icon to the center orb */}
          <svg
            viewBox="0 0 895 180"
            className="w-full h-[180px] -mt-4 pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: techStack.length }).map((_, i) => {
              const spread = 500;
              const startX =
                (895 - spread) / 2 + (spread / (techStack.length - 1)) * i;
              return (
                <path
                  key={i}
                  d={`M ${startX} 0 Q ${startX} 90 447.5 180`}
                  stroke="rgba(248, 113, 113, 0.35)"
                  strokeWidth="1"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* Orbital section + center orb */}
          <div className="relative -mt-[180px]">
            <Image
              src={asset("/assets/illustration-orbital.png")}
              alt=""
              width={895}
              height={337}
              className="object-cover mx-auto"
              style={{ width: "100%", height: "auto" }}
              aria-hidden="true"
            />
            <Image
              src={asset("/assets/favicon.svg")}
              alt="CodedInk"
              width={140}
              height={140}
              className="absolute"
              style={{
                left: "50%",
                top: "36%",
                width: "15%",
                height: "auto",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
