import { Club, LiveGame, Stake } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, RefreshCw, Users } from "lucide-react";
import { cn, formatCurrency, getTimeAgo } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { baseUrl } from "@/config";
import { set } from "date-fns";

interface LiveStatusProps {
  club: Club;
  className?: string;
}

export function LiveStatus({ club, className }: LiveStatusProps) {
  const { liveStatus } = club;
  const [clubData, setClubData] = useState<any>(null);
  if (!liveStatus) return null;

  const fetchLiveStatus = async () => {
    const clubSlugMatch = window.location.pathname.match(/\/club\/([^/?]+)/);
    const clubSlug = clubSlugMatch ? clubSlugMatch[1] : "";
    try {
      const response = await fetch(`${baseUrl}get_live_update/${clubSlug}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch live status");
      const data = await response.json();
      setClubData(data);
    } catch (error) {
      console.error("Error fetching live status:", error);
    }
  };
  useEffect(() => {
    fetchLiveStatus();
  }, []);

  // State to track last updated time in ms
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveStatus();
      setLastUpdated(Date.now());
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Calculate last updated minutes
  const getLastUpdatedMinutes = () => {
    const now = Date.now();
    const diffMs = now - lastUpdated;
    return Math.floor(diffMs / 60000); // minutes
  };

  const getStakeById = (stakeId: string): Stake | undefined => {
    return club.stakes.find((stake) => stake.name === stakeId);
  };

  const getWaitTimeClass = () => {
    if (!liveStatus.expectedWaitTime) return "text-green-600";
    if (liveStatus.expectedWaitTime <= 15) return "text-green-600";
    if (liveStatus.expectedWaitTime <= 30) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card
      className={cn("overflow-hidden bg-gradient-to-r from-pink-100 to-purple-100 text-fuchsia-700 border-fuchsia-200", className)}
    >
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-xl font-bold text-primaryBlue">
            LIVE STATUS
          </CardTitle>
          <CardDescription className="flex items-center mt-1.5">
            <RefreshCw
              className="h-3.5 w-3.5 mr-1.5 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            Last updated{" "}
            {getLastUpdatedMinutes() === 0
              ? "just now"
              : `${getLastUpdatedMinutes()} minutes ago`}
          </CardDescription>
        </div>
        <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-none">
          Live
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold">
              {clubData?.live_update?.tablesRunning}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Tables</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {clubData?.live_update?.totalPlayers}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Players</div>
          </div>
          <div className="text-center">
            <div className={cn("text-3xl font-bold", getWaitTimeClass())}>
              {clubData?.live_update?.waitingList}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Waiting</div>
          </div>
        </div>

        {clubData?.live_update?.expectedWaitTime && (
          <div className="flex justify-between items-center py-3 border-t border-b">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primaryBlue" />
              <span className="text-sm">Expected Wait Time</span>
            </div>
            <Badge
              variant="outline"
              className={cn("font-medium", getWaitTimeClass())}
            >
              {clubData?.live_update?.expectedWaitTime || 0} mins
            </Badge>
          </div>
        )}

        {clubData?.live_update?.nextCallTime && (
          <div className="flex justify-between items-center py-3 border-b">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-primaryBlue" />
              <span className="text-sm">Next Call Time</span>
            </div>
            <Badge variant="outline" className="font-medium text-accent">
              {clubData?.live_update?.nextCallTime || "N/A"}
            </Badge>
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-sm text-primaryBlue font-medium mb-3">
            RUNNING GAMES
          </h4>
          <div className="space-y-3">
            {clubData?.live_update?.games.map((game: LiveGame) => {
              const stake = getStakeById(game.stakeId);
              return stake ? (
                <div
                  key={game.stakeId}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{game.stakeId}</div>
                    {stake && (
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(stake.smallBlind, stake.currency)}/
                        {formatCurrency(stake.bigBlind, stake.currency)}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{game.players} players</div>
                    <div className="text-xs text-muted-foreground">
                      {game.tablesRunning} table
                      {game.tablesRunning !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
