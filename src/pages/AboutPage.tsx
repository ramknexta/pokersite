import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Info, Users, Briefcase, ArrowLeft, Shield, Heart, Globe, Star, Crown, Target, Zap, Award } from "lucide-react";
import { useEffect } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

// Light theme colors
const gradientBackground = "linear-gradient(135deg, #fdfcfb 0%, #e2e2e2 100%)";
const accentGradient = "linear-gradient(135deg, #FFB347 0%, #FFCC33 50%, #FF8C00 100%)";
const cardGradient = "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)";

const features = [
  { icon: <Info className="h-10 w-10 text-amber-500" />, title: "Overview", description: "Poker Club Hub is a premium platform bringing poker enthusiasts together with real-time club availability." },
  { icon: <Users className="h-10 w-10 text-amber-500" />, title: "Our Team", description: "A passionate team of poker players and tech enthusiasts ensuring the best experience for all users." },
  { icon: <Target className="h-10 w-10 text-amber-500" />, title: "Our Mission", description: "Connecting players with the best clubs, creating a secure, transparent, and engaging experience." },
  { icon: <Shield className="h-10 w-10 text-amber-500" />, title: "Security", description: "We protect members' data with top-notch security protocols and encryption." },
  { icon: <Heart className="h-10 w-10 text-amber-500" />, title: "Community", description: "Building a strong, supportive poker community for players to grow together." },
  { icon: <Globe className="h-10 w-10 text-amber-500" />, title: "Reach", description: "Expanding across India to connect poker players with quality clubs nationwide." },
];

const stats = [
  { value: "50+", label: "Partner Clubs" },
  { value: "5,000+", label: "Active Players" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" }
];

const team = [
  { name: "Alex Johnson", role: "Founder & CEO", expertise: "Poker Pro & Entrepreneur" },
  { name: "Sarah Miller", role: "CTO", expertise: "Tech Innovation" },
  { name: "Michael Chen", role: "Head of Community", expertise: "Player Relations" },
  { name: "Priya Sharma", role: "Marketing Director", expertise: "Brand Strategy" }
];

const AboutPage = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    const timer = setTimeout(() => hideLoading(), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
      <MainLayout>
        <div className="min-h-screen" style={{ background: gradientBackground }}>
          <div className="container py-12 px-4 mx-auto">

            {/* Back Button */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Button
                  variant="ghost"
                  className="mb-6 flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-300 group"
                  onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
              </Button>
            </motion.div>

            {/* Hero Section */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-16 mt-4">
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                About <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGradient }}>Poker Club Hub</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Your ultimate platform to discover and connect with the best poker clubs in your city.
                We're revolutionizing how players find games and clubs connect with enthusiasts.
              </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
              {stats.map((stat, index) => (
                  <motion.div
                      key={index}
                      variants={scaleIn}
                      className="bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-lg"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent" style={{ backgroundImage: accentGradient }}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
              ))}
            </motion.div>

            {/* Features Grid */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              {features.map((feature, index) => (
                  <motion.div
                      key={index}
                      variants={scaleIn}
                      className="relative bg-white p-8 rounded-2xl shadow-md group overflow-hidden hover:shadow-lg"
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-200/50 group-hover:bg-amber-400 transition-colors" />
                    <div className="flex justify-center mb-6">
                      <div className="p-3 rounded-xl bg-amber-100 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                    <p className="text-gray-700 text-center leading-relaxed">{feature.description}</p>
                  </motion.div>
              ))}
            </motion.div>

            {/* Team Section */}
            <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Our Leadership Team
              </motion.h2>
              <motion.p variants={fadeIn} className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Meet the passionate individuals driving innovation in the poker community
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        variants={scaleIn}
                        className="bg-white p-6 rounded-2xl text-center shadow-md group hover:shadow-lg"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <Crown className="h-10 w-10" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                      <div className="text-amber-500 text-sm font-medium mb-2">{member.role}</div>
                      <div className="text-gray-600 text-xs">{member.expertise}</div>
                    </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Core Values Section */}
            <motion.div className="bg-white rounded-3xl p-10 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Our Core Values
              </motion.h2>
              <motion.p variants={fadeIn} className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                The principles that guide everything we do
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Zap className="h-8 w-8 text-amber-500" />, title: "Innovation", description: "Continuously improving our platform to deliver the best experience." },
                  { icon: <Shield className="h-8 w-8 text-amber-500" />, title: "Trust", description: "Building a secure environment for all players." },
                  { icon: <Award className="h-8 w-8 text-amber-500" />, title: "Excellence", description: "Striving for the highest standards in everything we do." }
                ].map((value, index) => (
                    <motion.div key={index} variants={fadeIn} className="text-center p-6 rounded-xl bg-amber-50">
                      <div className="inline-flex p-3 rounded-lg bg-amber-100 text-amber-500 mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-700">{value.description}</p>
                    </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Join Our Community?
              </motion.h2>
              <motion.p variants={fadeIn} className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                Discover the best poker clubs, connect with players, and elevate your game today
              </motion.p>
              <motion.div variants={fadeIn}>
                <Button
                    size="lg"
                    className="font-bold text-lg px-8 py-6 rounded-xl"
                    style={{ background: accentGradient, color: "#0A0F1C" }}
                    onClick={() => navigate('/clubs')}
                >
                  Explore Clubs
                </Button>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </MainLayout>
  );
};

export default AboutPage;
