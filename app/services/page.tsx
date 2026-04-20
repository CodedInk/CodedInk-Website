import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Services(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#110720] text-white">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight mb-6">
            Services
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Coming soon.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
