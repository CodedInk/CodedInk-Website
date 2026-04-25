import Link from "next/link";
import Image from "next/image";
import { asset } from "../lib/asset";

export default function Header(): React.JSX.Element {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#110720]/80 backdrop-blur-sm border-b border-red-500/25"
      style={{ boxShadow: "0 4px 16px rgba(220, 38, 38, 0.15)" }}
    >
      <nav className="px-6 py-3 lg:py-4">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-0">
          <div className="flex justify-center lg:justify-start">
            <Link
              href="/"
              className="font-bold text-white hover:text-red-400 transition-colors inline-block"
            >
              <Image
                src={asset("/logo/logo.svg")}
                alt="Logo"
                width={190}
                height={56}
                style={{ width: "auto", height: "52px" }}
              />
            </Link>
          </div>
          <ul className="flex items-center justify-center lg:justify-end gap-5 sm:gap-8 list-none m-0 p-0">
            <li className="m-0 p-0">
              <Link
                href="/#home"
                className="text-white hover:text-red-400 transition-colors text-sm sm:text-base font-normal"
              >
                Home
              </Link>
            </li>
            <li className="m-0 p-0">
              <Link
                href="/#about"
                className="text-white hover:text-red-400 transition-colors text-sm sm:text-base font-normal"
              >
                About
              </Link>
            </li>
            <li className="m-0 p-0">
              <Link
                href="/services"
                className="text-white hover:text-red-400 transition-colors text-sm sm:text-base font-normal"
              >
                Services
              </Link>
            </li>
            <li className="m-0 p-0">
              <Link
                href="/portfolio"
                className="text-white hover:text-red-400 transition-colors text-sm sm:text-base font-normal"
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

