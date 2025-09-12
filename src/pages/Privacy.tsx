import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/layouts/MainLayout";
import { useLoading } from "@/contexts/LoadingContext";
import { useEffect } from "react";

const PrivacyPage: React.FC = () => {
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
      <div>
        <h1 className="text-3xl font-bold mb-6 text-[#FFD700] text-center">Privacy Policy</h1>
        <div className="container mx-auto px-5 py-12 text-white bg-darkBlue rounded-xl">
        <p className="mb-6 text-center">
          At Poker Club Hub, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal
          information when you visit and interact with our website.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect the following types of information when you visit our website:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Personal Information:</strong> When you sign up or make a purchase, we collect details like your name, email address, phone number, and location.</li>
          <li><strong>Usage Information:</strong> We collect data on how you use the website, including pages visited and actions taken, to improve user experience.</li>
          <li><strong>Cookies:</strong> We use cookies and other tracking technologies to enhance your experience on our website.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the collected data for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide and improve our services.</li>
          <li>To personalize your experience and recommend relevant content.</li>
          <li>To send you promotional emails, newsletters, or other updates (if you opt-in).</li>
          <li>To comply with legal obligations or protect our rights.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">3. Data Protection</h2>
        <p className="mb-4">
          We take reasonable steps to protect your personal data. However, no online data transmission is completely secure. We strive to implement adequate security measures to protect your information.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">4. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell or rent your personal data. However, we may share your data under the following circumstances:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>With service providers who help us manage our website and services.</li>
          <li>If required by law or legal processes.</li>
          <li>To protect the safety and security of our website and its users.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data. To exercise your rights, please contact us through the information provided below.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically. Any changes will be posted on this page, and we will update the "Last Updated" date accordingly.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p className="mb-4">
          <strong>Email:</strong> support@pokerclubhub.com<br />
          <strong>Address:</strong> Poker Club Hub, Bangalore, Karnataka, India
        </p>

        <div className="mt-8 flex items-center space-x-2 pt-4 border-t border-[#FFD700] text-[#FFD700]">
          <MapPin className="h-6 w-6" />
          <span className="text-lg">Bangalore</span>
        </div>
        </div>

        <div className="mt-8">
            <Button variant="ghost" size="lg" asChild>
                <Link
                to="/"
                className="text-white border-[#FFD700] bg-red hover:bg-white hover:text-darkblue border-2 px-6 py-2 rounded-lg transition duration-300 ease-in-out"
                >
                Back to Home
                </Link>
            </Button>
        </div>
        </div>
    </MainLayout>
  );
};

export default PrivacyPage;
