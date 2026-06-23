import { useState, useEffect } from "react";
import { Sliders, ShieldCheck, Clock, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomeContent() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        // Take only available products, and slice to show only 3
        const available = response.data.filter((p) => p.availability === true);
        setFeaturedProducts(available.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full px-6 md:px-16 py-20 md:py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT PANEL */}
        <div className="space-y-8 order-2 md:order-1">

          <div className="space-y-3">

            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#0B0F1A]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B0F1A]/40" />
              Premium Audio · Rentals & Sales
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0F1A] leading-[1.1]">
              Sound systems <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B0F1A] via-[#10131F] to-[#404557]">
                that define moments.
              </span>
            </h1>

          </div>

          <p className="text-base sm:text-lg text-[#10131F]/70 max-w-lg leading-relaxed">
            Professional-grade speakers, microphones, mixers, and full acoustic systems 
            precision-tuned for weddings, concerts, and corporate keynotes across Sri Lanka.
          </p>

          {/* BUTTONS (FIXED ROUTES) */}
          <div className="flex flex-wrap gap-4 items-center">

            <button
              onClick={() => navigate("/rentals")}
              className="group flex items-center gap-2 px-8 py-3.5 bg-[#0B0F1A] text-white rounded-lg hover:bg-black transition-all duration-300 font-medium shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20"
            >
              Rent Equipment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3.5 border border-[#0B0F1A]/10 bg-white/50 backdrop-blur-sm rounded-lg hover:border-[#0B0F1A]/40 hover:bg-white transition-all duration-300 font-medium text-[#0B0F1A]"
            >
              Browse Products
            </button>

          </div>

          {/* SOCIAL PROOF */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#0B0F1A]/5 max-w-md">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-[#F7F5F0]" />
              <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-[#F7F5F0]" />
              <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-[#F7F5F0]" />
            </div>
            <p className="text-xs font-medium text-[#10131F]/50 tracking-wide">
              Trusted by over 500+ premium corporate event organizers
            </p>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex justify-center relative order-1 md:order-2 mb-8 md:mb-0">

          <div className="absolute w-[350px] h-[350px] bg-[#FFB648]/15 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative bg-gradient-to-b from-white/40 to-transparent p-6 rounded-3xl border border-white/40 shadow-sm backdrop-blur-[2px]">

            <img
              src="https://xmobile.lk/wp-content/uploads/2023/10/JBL-PartyBox-Encore-Essential-Portable-Bluetooth-Speaker-1.png"
              alt="Professional Audio Equipment Setup"
              className="w-full max-w-sm sm:max-w-md object-contain filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-[1.02]"
            />

          </div>

        </div>

      </section>

      {/* FEATURED ITEMS SECTION */}
      <section className="w-full bg-[#10131F]/5 border-t border-black/[0.03] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFB648]">
                Featured Collection
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B0F1A] leading-tight">
                Our Most Popular Equipment
              </h2>
              <p className="text-sm text-gray-500 max-w-md">
                Handpicked premium gear available for both sale and short-term rentals.
              </p>
            </div>
            
            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-2 px-6 py-3 border border-[#0B0F1A]/10 bg-white hover:bg-gray-50 text-[#0B0F1A] text-sm rounded-lg font-semibold shadow-sm transition-all duration-300"
            >
              View More Items
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFB648]" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#FFB648] animate-spin" />
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="bg-white border border-black/5 rounded-2xl p-12 text-center text-gray-400">
              No featured items available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.key}
                  className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="w-full h-56 bg-[#fbfbfb] p-4 flex items-center justify-center relative overflow-hidden border-b border-gray-50">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.src = "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg";
                      }}
                    />
                    <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      product.type === "rental" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {product.type === "rental" ? "For Rental" : "For Sale"}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-[#0B0F1A] line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-gray-400 font-mono">{product.dimension}</p>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                      <p className="text-base font-bold text-[#0B0F1A]">
                        LKR {product.price.toLocaleString()}
                        {product.type === "rental" && <span className="text-[10px] text-gray-400 font-normal"> /day</span>}
                      </p>
                      <button
                        onClick={() => navigate(product.type === "rental" ? "/rentals" : "/products")}
                        className="px-4 py-2 bg-[#0B0F1A] text-white text-xs font-semibold rounded-lg hover:bg-black transition duration-300"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* CORE VALUE PROPOSITIONS */}
      <section className="w-full bg-white border-t border-black/[0.03] py-24 md:py-32 shadow-[0_-1px_10px_rgba(0,0,0,0.01)]">

        <div className="max-w-7xl mx-auto px-6 md:px-16">

          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0F1A]/50">
              Why JB-BOSE Engineering
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B0F1A] leading-tight">
              Engineered for acoustic clarity, massive power, and flawless performance.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">

            {[
              {
                icon: <Sliders className="w-5 h-5 text-[#0B0F1A]" />,
                title: "Studio-Grade Equipment",
                desc: "Rigorously maintained high-fidelity audio networks suited for live events.",
              },
              {
                icon: <Clock className="w-5 h-5 text-[#0B0F1A]" />,
                title: "Flexible Scheduling",
                desc: "Custom event-based rental plans for every requirement.",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-[#0B0F1A]" />,
                title: "Dedicated Support",
                desc: "On-site setup, tuning, and real-time monitoring during events.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-[#F7F5F0]/30 border border-black/[0.04] hover:bg-white hover:border-[#FFB648]/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-black/[0.03] mb-6">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm text-[#10131F]/70">{item.desc}</p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="w-full bg-[#0B0F1A] text-white py-20 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative z-10">

          <div className="space-y-3">
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to power your event?
            </h3>
            <p className="text-white/60 text-base max-w-xl font-light">
              Get premium sound system setups within 24 hours.
            </p>
          </div>

          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 bg-[#FFB648] text-[#0B0F1A] font-bold rounded-lg hover:bg-[#ffc56e] transition-all duration-300 shadow-lg shadow-[#FFB648]/10 hover:shadow-xl shrink-0 tracking-wide text-sm uppercase"
          >
            Contact An Expert
          </button>

        </div>

      </section>
    </>
  );
}
