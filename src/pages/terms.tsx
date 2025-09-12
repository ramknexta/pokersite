import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLoading } from "@/contexts/LoadingContext";
import { useEffect } from "react";

const termsContent = [
  {
    title: "Acceptance of Terms",
    description:
      "By accessing or using Poker Club Hub, you agree to comply with these Terms and Conditions. If you do not agree to these terms, do not use our services.",
  },
  {
    title: "User Responsibilities",
    description:
      "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.",
  },
  {
    title: "Privacy Policy",
    description:
      "We value your privacy. Please refer to our Privacy Policy to understand how we collect, use, and protect your data.",
  },
  {
    title: "Prohibited Activities",
    description:
      "Users must not engage in illegal activities or activities that harm the integrity of Poker Club Hub or its users.",
  },
  {
    title: "Limitation of Liability",
    description:
      "Poker Club Hub is not liable for any damages or losses arising from the use or inability to use our services. We are not responsible for user-generated content.",
  },
  {
    title: "Amendments to Terms",
    description:
      "Poker Club Hub reserves the right to modify these terms at any time. We will notify users of any changes and encourage you to review the terms periodically.",
  },
];

const TermsPage = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const loadPage = async () => {
      showLoading();
      await new Promise(resolve => setTimeout(resolve, 400));
      hideLoading();
    };

    loadPage();

    return () => {
      hideLoading(); // Ensure loading is hidden when component unmounts
    };
  }, []); // Empty dependency array since we only want this to run once

  return (
    <MainLayout>
      <div className="container py-8 px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-3 flex items-center text-white hover:text-foreground bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
          Back
        </Button>

        {/* Heading Section */}
        <div className="text-center mt-[-40px] mb-4">
          <h1 className="text-4xl font-extrabold text-[#FFD700] mb-3">
            Terms and Conditions
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Please read these Terms and Conditions carefully before using Poker Club Hub services.
          </p>
        </div>

        {/* Terms Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {termsContent.map((term, index) => (
            <div
              key={index}
              className="relative bg-darkBlue/90 shadow-lg rounded-2xl p-6 text-left border border-[#FFD700]/50"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{term.title}</h3>
              <p className="text-white text-sm">{term.description}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;
