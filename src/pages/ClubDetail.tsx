import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { getClubById } from "@/lib/mock-data";
import { Club, LiveStatus } from "@/types";
import { ClubDetails } from "@/components/ClubDetails";
import { LiveStatus as LiveStatusComponent } from "@/components/LiveStatus";
import { LiveStatusUpdateForm } from "@/components/LiveStatusUpdateForm";
import { ImageGallery } from "@/components/ImageGallery";
import { ClubMap } from "@/components/ClubMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building, Clock, MapPin, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/contexts/LoadingContext";
import { getGoogleMapsEmbedUrl } from "@/lib/map-utils";
import OfferComp from "@/components/OfferComp";
import { motion } from "framer-motion";

const ClubDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "details";

  useEffect(() => {
    const loadClub = async () => {
      if (id) {
        showLoading();
        try {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 400));
          const foundClub = getClubById(id);
          if (foundClub) {
            setClub(foundClub);
          } else {
            toast({
              title: "Club not found",
              description: "The club you're looking for doesn't exist",
              variant: "destructive",
            });
            navigate("/clubs");
          }
        } finally {
          hideLoading();
        }
      }
    };

    loadClub();
  }, [id, navigate, toast]);

  const handleStatusUpdated = (newStatus: LiveStatus) => {
    if (club) {
      showLoading();
      // Simulate network delay
      setTimeout(() => {
        const updatedClub = {
          ...club,
          liveStatus: newStatus,
        };
        setClub(updatedClub);

        toast({
          title: "Status updated",
          description: "Club status has been updated successfully",
        });
        hideLoading();
      }, 400);
    }
  };

  if (!club) {
    return null; // Loading state is handled by LoadingProvider
  }

  return (
      <MainLayout>
        <div className="container py-8 px-4">
          {/* Back Button */}
          <div className="flex justify-between items-center mb-6">
            <Button
                variant="ghost"
                className="mb-6 -ml-3 flex items-center text-fuchsia-600 hover:text-fuchsia-700 hover:bg-fuchsia-100/60"
                onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <OfferComp />
          </div>

          {/* Club Header */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Building className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {club.name}
            </h1>
            <div className="flex items-center justify-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1 text-fuchsia-600" />
              <span>
              {club.location.area}, {club.location.city}
            </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Club Images */}
            <div className="lg:col-span-2">
              <ImageGallery images={club.images} />
            </div>

            {/* Right Column - Live Status */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
              <LiveStatusComponent club={club} />
            </motion.div>
          </div>

          {/* Tabs Section */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-8"
          >
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-md border border-gray-200/50">
                <TabsTrigger
                    value="details"
                    className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Club Details
                </TabsTrigger>
                <TabsTrigger
                    value="map"
                    className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                >
                  <Map className="h-4 w-4 mr-2" />
                  Map
                </TabsTrigger>
                <TabsTrigger
                    value="admin"
                    className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Update Status
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="pt-6">
                <ClubDetails club={club} />
              </TabsContent>

              <TabsContent value="map" className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Map Location
                  </h2>
                  <ClubMap
                      address={club.location.address}
                      className="h-96 rounded-lg border border-gray-200/50"
                      googleMapsEmbedUrl={getGoogleMapsEmbedUrl(club.name)}
                  />
                  <div className="mt-4 p-4 bg-white/80 backdrop-blur-md rounded-lg border border-gray-200/50">
                    <p className="text-sm text-gray-700">
                      <MapPin className="h-4 w-4 inline-block mr-1 text-fuchsia-600" />
                      {club.location.address}, {club.location.area},{" "}
                      {club.location.city}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="admin" className="pt-6">
                <LiveStatusUpdateForm
                    club={club}
                    onStatusUpdated={handleStatusUpdated}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </MainLayout>
  );
};

export default ClubDetail;