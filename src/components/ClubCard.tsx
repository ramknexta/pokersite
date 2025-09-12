import { Club } from "@/types"
import { cn, formatCurrency, formatTime } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface ClubCardProps {
  club: Club
  className?: string
}

export function ClubCard({ club, className }: ClubCardProps) {
  const getCurrentOperatingHours = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const today = days[new Date().getDay()]
    return club.operatingHours.find((hours) => hours.day === today)
  }

  const todayHours = getCurrentOperatingHours()

  const getStakesRange = () => {
    if (club.stakes.length === 0) return "No stakes information"

    const minStake = club.stakes.reduce(
        (min, stake) => (stake.smallBlind < min.smallBlind ? stake : min),
        club.stakes[0]
    )

    const maxStake = club.stakes.reduce(
        (max, stake) => (stake.bigBlind > max.bigBlind ? stake : max),
        club.stakes[0]
    )

    return `${formatCurrency(
        minStake.smallBlind,
        minStake.currency
    )}/${formatCurrency(
        minStake.bigBlind,
        minStake.currency
    )} - ${formatCurrency(
        maxStake.smallBlind,
        maxStake.currency
    )}/${formatCurrency(maxStake.bigBlind, maxStake.currency)}`
  }

  return (
      <Link to={`/club/${club.id}`} className="no-underline">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card
              className={cn(
                  "overflow-hidden rounded-2xl bg-white text-gray-800 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                  className
              )}
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img
                  src={club.images[0] || "/placeholder.svg"}
                  alt={club.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent z-10 flex flex-col justify-end p-4">
                <h3 className="text-2xl font-bold text-gray-900 drop-shadow mb-2">
                  {club.name}
                </h3>
                <Badge
                    variant="outline"
                    className="bg-white/70 text-gray-700 border border-gray-300 backdrop-blur-sm w-fit"
                >
                  {club.location.area}
                </Badge>
              </div>
            </div>

            {/* Info */}
            <CardHeader className="pb-2 bg-white">
              <div className="flex justify-between items-start">
                <CardDescription className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1 text-primaryBlue" />
                  {club.location.address.split(",")[0]}
                </CardDescription>
                {club.liveStatus && (
                    <span
                        className={cn(
                            "text-xs font-semibold py-1 px-3 rounded-md border",
                            club.liveStatus.waitingList === 0
                                ? "bg-green-100 text-green-700 border-green-200"
                                : club.liveStatus.waitingList <= 3
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                        )}
                    >
              {club.liveStatus.waitingList === 0
                  ? "No Wait"
                  : `${club.liveStatus.waitingList} Waiting`}
            </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="pb-3 bg-white text-gray-700">
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1 text-sm">
                  <Clock className="h-4 w-4 text-primaryBlue" />
                  <span>
              {todayHours
                  ? `${formatTime(todayHours.open)} - ${formatTime(todayHours.close)}`
                  : "Hours not available"}
            </span>
                </div>
                {club.liveStatus && (
                    <div className="flex items-center space-x-1 text-sm">
                      <Users className="h-4 w-4 text-primaryBlue" />
                      <span>{club.liveStatus.totalPlayers} Players</span>
                    </div>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {club.description}
              </p>
            </CardContent>

            {/* Stakes */}
            <CardFooter className="pt-2 bg-gray-50 border-t border-gray-200">
        <span className="text-xs">
          <span className="text-primaryBlue font-medium">Stakes: </span>
          {getStakesRange()}
        </span>
            </CardFooter>
          </Card>
        </motion.div>
      </Link>

  )
}
