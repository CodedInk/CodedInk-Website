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
    title: "WebHR - HR Management App",
    description: "WebHR automates all of your company's HR processes such as Recruitment, Onboarding, Payroll, Time & Attendance, Leaves & PTO, Performance, and much more.",
    icon: "/cards/card-1.png",
  },
  {
    id: 2,
    title: "TDS Telecom - Time Clock Kiosk",
    description: "WebHR Kiosk is a time clock kiosk that allows you to clock in and out of your work. It is a simple and easy to use app that allows you to clock in and out of your work.",
    icon: "/cards/card-2.png",
  },
  {
    id: 3,
    title: "HealthEdge - AI-Powered Agents",
    description: "Connecting health plans, providers, and patients with end-to-end digital technology solutions to support new business models, reduce administrative costs and improve health outcomes.",
    icon: "/cards/card-3.png",
  },
  {
    id: 4,
    title: "FileIT - File Sharing App",
    description: "FileIT is a file sharing app that allows you to share files with your friends and family. It is a simple and easy to use app that allows you to share files with your friends and family.",
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
              className="bg-gradient-to-r from-slate-950 via-red-950 to-slate-950  backdrop-blur-sm rounded-xl p-6 border-t-3 border-red-700 hover:shadow-2xl hover:shadow-red-900 flex items-center gap-4"
            >
              <div className="mb-4 ">
                <Image
                  src={asset(card.icon)}
                  alt={card.title}
                  width={160}
                  height={160}
                  className="object-contain"
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

