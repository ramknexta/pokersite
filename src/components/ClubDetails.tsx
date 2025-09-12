import { Club, Stake } from "@/types";
import { formatCurrency, formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign, Map, MapPin, Phone, Mail, Globe } from "lucide-react";
import { ClubMap } from "@/components/ClubMap";
import { getGoogleMapsEmbedUrl } from "@/lib/map-utils";
import { motion } from "framer-motion";

interface ClubDetailsProps {
  club: Club;
  className?: string;
}

export function ClubDetails({ club, className }: ClubDetailsProps) {
  return (
      <div className={className}>
        <div className="space-y-6">
          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700">{club.description}</p>
          </motion.section>

          {club.video && (
              <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Video Tour</h2>
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 p-4 border border-gray-200/50">
                  <video
                      src={club.video}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-contain"
                      poster={club.images[0]}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.section>
          )}

          <Separator className="bg-gray-200/50" />

          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
            <div className="space-y-4">
              <Card className="bg-white/80 backdrop-blur-md border-gray-200/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-fuchsia-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">{club.location.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ClubMap
                  className="rounded-lg border border-gray-200/50"
                  address={club.location.address}
                  googleMapsEmbedUrl={getGoogleMapsEmbedUrl(club.name)}
              />
            </div>
          </motion.section>

          <Separator className="bg-gray-200/50" />

          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Operating Hours</h2>
            <Card className="bg-white/80 backdrop-blur-md border-gray-200/50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {club.operatingHours.map((hours) => (
                      <div key={hours.day} className="flex justify-between items-center py-1">
                        <div className="font-medium text-gray-800">{hours.day}</div>
                        <div className="flex items-center text-gray-600 min-w-[170px] md:justify-end">
                          <Clock className="h-4 w-4 mr-2 text-fuchsia-600" />
                          <span>{formatTime(hours.open)} - {formatTime(hours.close)}</span>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <Separator className="bg-gray-200/50" />

          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Stakes & Games</h2>
            <div className="space-y-4">
              {club.stakes.map((stake: Stake) => (
                  <Card key={stake.name} className="bg-white/80 backdrop-blur-md border-gray-200/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-gray-800">{stake.name}</CardTitle>
                      <div className="mt-1">
                        <Badge variant="outline" className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white border-0">
                          {formatCurrency(stake.smallBlind, stake.currency)}/{formatCurrency(stake.bigBlind, stake.currency)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex items-center justify-between text-sm text-gray-700">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-fuchsia-600" />
                          <span>Min Buy-in: {formatCurrency(stake.minBuyIn, stake.currency)}</span>
                        </div>
                        {stake.maxBuyIn && (
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-indigo-600" />
                              <span>Max Buy-in: {formatCurrency(stake.maxBuyIn, stake.currency)}</span>
                            </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </motion.section>

          <Separator className="bg-gray-200/50" />

          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {club.amenities.map((amenity) => (
                  <Badge
                      key={amenity}
                      variant="secondary"
                      className="bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200"
                  >
                    {amenity}
                  </Badge>
              ))}
            </div>
          </motion.section>

          <Separator className="bg-gray-200/50" />

          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <Card className="bg-white/80 backdrop-blur-md border-gray-200/50">
              <CardContent className="p-4 space-y-4">
                {club.contactInfo.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-fuchsia-600" />
                      <a href={`tel:${club.contactInfo.phone}`} className="text-gray-700 hover:text-fuchsia-600 hover:underline">
                        {club.contactInfo.phone}
                      </a>
                    </div>
                )}

                {club.contactInfo.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-fuchsia-600" />
                      <a href={`mailto:${club.contactInfo.email}`} className="text-gray-700 hover:text-fuchsia-600 hover:underline">
                        {club.contactInfo.email}
                      </a>
                    </div>
                )}

                {club.contactInfo.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-fuchsia-600" />
                      <a href={club.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-fuchsia-600 hover:underline">
                        {club.contactInfo.website.replace('https://', '')}
                      </a>
                    </div>
                )}
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
  );
}