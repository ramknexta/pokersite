import { MainLayout } from "@/layouts/MainLayout";
import { clubs } from "@/lib/mock-data";
import { ClubCard } from "@/components/ClubCard";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Users, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";

// Enhanced animations
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const gradientBackground = "linear-gradient(135deg, #0A0F1C 0%, #1A1E2C 50%, #2D1B2C 100%)";
const accentGradient = "linear-gradient(135deg, #FFB347 0%, #FFCC33 50%, #FF8C00 100%)";
const cardGradient = "linear-gradient(135deg, #1A1E2C 0%, #252A3F 100%)";

const Index = () => {
  const [featuredClubs, setFeaturedClubs] = useState(clubs.slice(0, 3));
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const loadFeaturedClubs = async () => {
      showLoading();
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFeaturedClubs(clubs.slice(0, 3));
      } finally {
        hideLoading();
      }
    };
    loadFeaturedClubs();
  }, []);

  return (
      <MainLayout>
        {/* 🌟 Hero Section */}
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative overflow-hidden rounded-2xl h-[700px] flex items-center justify-center text-center mb-16"
            style={{
              background:
                  "linear-gradient(to bottom right, #fdf2f8, #e0e7ff, #fce7f3)",
            }}
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 bg-[url('/poker_background3.png')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/30 to-transparent" />

          <motion.div
              variants={staggerContainer}
              className="relative z-10 px-4 max-w-6xl mx-auto"
          >
            <motion.h1
                variants={fadeUp}
                className="mb-6 font-extrabold text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight"
            >
              Discover Premium{" "}
              <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #ec4899, #6366f1)",
                  }}
              >
          Poker Clubs
        </span>{" "}
              in Bangalore
            </motion.h1>

            <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl font-medium mb-10 max-w-3xl mx-auto text-gray-600 leading-relaxed"
            >
              Real-time table availability, waitlist status, and exclusive member
              benefits at your fingertips
            </motion.p>

            <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                variants={fadeUp}
            >
              <Button
                  asChild
                  size="lg"
                  className="relative overflow-hidden group font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
                  style={{
                    background: "linear-gradient(to right, #ec4899, #6366f1)",
                    color: "white",
                  }}
              >
                <Link to="/clubs">Explore Clubs</Link>
              </Button>
              <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-semibold text-lg px-8 py-6 rounded-xl border-pink-400 text-pink-500 hover:bg-pink-50"
              >
                <Link to="/about" className="flex items-center gap-2">
                  Learn More <ChevronRight size={18} />
                </Link>
              </Button>
            </motion.div>

            {/* Hero Features */}
            <motion.div
                variants={fadeUp}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
            >
              {[
                { icon: <Clock className="text-pink-500" />, text: "Real-time table status" },
                { icon: <Users className="text-indigo-500" />, text: "Waitlist management" },
                { icon: <Star className="text-amber-500" />, text: "Exclusive member benefits" },
              ].map((item, index) => (
                  <motion.div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -5 }}
                  >
                    {item.icon}
                    <span className="text-gray-700">{item.text}</span>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 🎲 Featured Clubs */}
        <motion.div
            className="container px-4 py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <motion.div variants={fadeUp} className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Poker Clubs
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Curated selection of Bangalore's most prestigious poker destinations
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button
                  asChild
                  variant="outline"
                  className="mt-4 md:mt-0 group rounded-xl px-6 py-5 border-pink-400 text-pink-500 hover:bg-pink-50"
              >
                <Link to="/clubs" className="flex items-center gap-2">
                  View All Clubs{" "}
                  <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredClubs.map((club) => (
                <motion.div
                    key={club.id}
                    variants={scaleIn}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                >
                  <ClubCard
                      club={club}
                      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  />
                </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 🗣 Testimonials */}
        <motion.div
            className="container px-4 py-24"
            style={{
              background:
                  "linear-gradient(to bottom right, #fff1f2, #e0f2fe, #fce7f3)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Player Testimonials
            </motion.h2>
            <motion.p
                variants={fadeUp}
                className="text-gray-600 max-w-2xl mx-auto"
            >
              Hear from our community of passionate poker enthusiasts
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "Poker Club Hub transformed how I find games. The real-time table status is a game-changer!",
                name: "Rajesh K.",
                role: "Professional Player",
                rating: 5,
              },
              {
                text: "Finally, a platform that understands poker players' needs. The waitlist feature saves me hours.",
                name: "Priya M.",
                role: "Tournament Regular",
                rating: 5,
              },
              {
                text: "As a club owner, this has helped us manage our games better and attract serious players.",
                name: "Vikram S.",
                role: "Club Owner",
                rating: 5,
              },
            ].map((t, i) => (
                <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                >
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, starIndex) => (
                        <Star
                            key={starIndex}
                            size={18}
                            className="fill-amber-400 text-amber-400"
                        />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                    "{t.text}"
                  </p>
                  <div>
                    <div className="text-pink-600 font-bold text-lg">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ❓ FAQ */}
        <motion.div
            className="container px-4 py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
                variants={fadeUp}
                className="text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need to know about Poker Club Hub
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: "How current is the table availability information?",
                a: "Our system updates table status in real-time, with information refreshed every 2 minutes directly from partner clubs.",
              },
              {
                q: "Is there a membership fee for players?",
                a: "No, Poker Club Hub is completely free for players. Club owners have optional premium features for enhanced visibility.",
              },
              {
                q: "Can I reserve a seat through the platform?",
                a: "Yes, our premium partner clubs allow direct seat reservations. For others, we provide contact information to secure your spot.",
              },
              {
                q: "How do clubs get listed on your platform?",
                a: "Clubs undergo a verification process to ensure they meet our standards for quality, security, and player experience.",
              },
            ].map((faq, i) => (
                <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -3 }}
                >
                  <h3 className="text-xl font-semibold text-indigo-600 mb-3 flex items-center justify-between">
                    {faq.q}
                    <ChevronRight className="transform group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-gray-700">{faq.a}</p>
                </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 🚀 CTA */}
        <motion.div
            className="container px-4 py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
          <div
              className="rounded-3xl overflow-hidden p-12 text-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
          >
            <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Ready to Find Your Perfect Game?
            </motion.h2>
            <motion.p
                variants={fadeUp}
                className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              Join thousands of players who've transformed their poker experience
              with Poker Club Hub
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                  asChild
                  size="lg"
                  className="font-bold text-lg px-10 py-6 rounded-xl text-white"
                  style={{
                    background: "linear-gradient(to right, #ec4899, #6366f1)",
                  }}
              >
                <Link to="/clubs">Get Started Today</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </MainLayout>

  );
};

export default Index;