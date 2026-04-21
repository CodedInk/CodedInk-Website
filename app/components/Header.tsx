import Link from "next/link";
import Image from "next/image";
import { asset } from "../lib/asset";

export default function Header(): React.JSX.Element {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#110720]/80 backdrop-blur-sm border-b border-red-500/70"
      style={{
        boxShadow:
          "0 0 4px rgba(239, 68, 68, 0.8), 0 0 12px rgba(239, 68, 68, 0.5), 0 0 24px rgba(239, 68, 68, 0.25)",
      }}
    >
      <nav className="px-6 py-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between h-full">
          <Link 
            href="/" 
            className="text-2xl font-bold text-white hover:text-red-400 transition-colors"
          >
          <Image src={asset("/logo/logo.svg")} alt="Logo" width={190} height={56} style={{ width: "auto", height: "56px" }} />
          </Link>
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            <li className="m-0 p-0">
              <Link
                href="/#home"
                className="text-white hover:text-red-400 transition-colors text-base font-normal"
              >
                Home
              </Link>
            </li>
            <li className="m-0 p-0">
              <Link
                href="/#about"
                className="text-white hover:text-red-400 transition-colors text-base font-normal"
              >
                About
              </Link>
            </li>
            <li className="m-0 p-0">
              <Link
                href="/services"
                className="text-white hover:text-red-400 transition-colors text-base font-normal"
              >
                Services
              </Link>
            </li>
            <li className="m-0 p-0">
              <Link
                href="/portfolio"
                className="text-white hover:text-red-400 transition-colors text-base font-normal"
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

