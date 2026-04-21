import Image from "next/image";
import Link from "next/link";
import { asset } from "../lib/asset";

interface ExperienceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 1,
    title: "WIPRO - Principal UX Consultant",
    description: "WIPRO is a leading multinational corporation providing IT, consulting, and business process services with a strong focus on AI, cloud computing, and digital transformation.",
    icon: "/cards/card-1.png",
  },
  {
    id: 2,
    title: "TDS Telecom - Senior UX/UI Designer",
    description: "TDS Telecom (TDS®) delivers high-speed internet, TV entertainment, and phone services to a mix of small to mid-sized urban, suburban and rural communities.",
    icon: "/cards/card-2.png",
  },
  {
    id: 3,
    title: "HealthEdge - Lead UX/UI Designer",
    description: "HealthEdge, is a AI-Powered Healthcare Platform for payers connecting health plans, providers, and patients. It services over 115 health plans and 110 million covered members across the U.S.. ",
    icon: "/cards/card-3.png",
  },
  {
    id: 4,
    title: "Aflac© - Lead UX/UI Designer (COE Team) ",
    description: "Aflac specializes in voluntary supplemental insurance. Based in Columbus, Georgia, it is a Fortune 500 company serving millions of policyholders in the U.S. and Japan.",
    icon: "/cards/card-4.png",
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
          Work Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceCards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-r from-slate-950 via-red-950 to-slate-950 backdrop-blur-sm rounded-xl p-6 border-t-3 border-red-700 hover:shadow-2xl hover:shadow-red-900 flex items-center gap-4"
            >
              <div className="mb-4 shrink-0">
                <Image
                  src={asset(card.icon)}
                  alt={card.title}
                  width={75}
                  height={75}
                  className="object-contain"
                  style={{ width: "75px", height: "75px" }}
                />
              </div>
              <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {card.description}
              </p>
              <Link
                href="https://#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors inline-block"
              >
                LEARN MORE →
              </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

