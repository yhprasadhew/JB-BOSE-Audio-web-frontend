import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] text-[#10131F]">

      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Contact <span className="text-[#FFB648]">Us</span>
          </h1>
          <p className="mt-4 text-[#10131F]/60">
            Let’s plan your next event with premium sound solutions.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT INFO SECTION */}
          <div className="space-y-6">

            <div className="p-6 bg-white rounded-xl border border-black/5 shadow-sm flex items-center gap-4">
              <Phone className="text-[#FFB648]" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-sm text-gray-600">+94 77 123 4567</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-black/5 shadow-sm flex items-center gap-4">
              <Mail className="text-[#FFB648]" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-gray-600">info@jbbooseaudio.com</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-black/5 shadow-sm flex items-center gap-4">
              <MapPin className="text-[#FFB648]" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-sm text-gray-600">Kalutara, Sri Lanka</p>
              </div>
            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="p-8 bg-white rounded-xl border border-black/5 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Send a Message
            </h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB648]"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB648]"
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB648]"
              ></textarea>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#0B0F1A] text-white py-3 rounded-lg hover:bg-black transition"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}