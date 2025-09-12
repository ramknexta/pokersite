import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiveStatus, Club, LiveGame } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";
import { baseUrl } from "@/config";
import { motion } from "framer-motion";

interface LiveStatusUpdateFormProps {
  club: Club;
  onStatusUpdated: (newStatus: LiveStatus) => void;
  className?: string;
}

export function LiveStatusUpdateForm({
                                       club,
                                       onStatusUpdated,
                                       className,
                                     }: LiveStatusUpdateFormProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    tablesRunning: club.liveStatus?.tablesRunning || 0,
    totalPlayers: club.liveStatus?.totalPlayers || 0,
    waitingList: club.liveStatus?.waitingList || 0,
    expectedWaitTime: club.liveStatus?.expectedWaitTime || 0,
    nextCallTime: club.liveStatus?.nextCallTime || "",
    games:
        club.liveStatus?.games.map((game) => ({
          stakeId: game.stakeId,
          tablesRunning: game.tablesRunning,
          players: game.players,
        })) ||
        club.stakes.map((stake) => ({
          stakeId: stake.name,
          tablesRunning: 0,
          players: 0,
        })),
  });
  const [offerData, setOfferData] = useState({
    noOffers: false,
    imageFile: null,
    text: "",
  });

  const { toast } = useToast();

  const handleOffer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("no_offers", offerData.noOffers.toString());

    if (!offerData.noOffers && offerData.imageFile) {
      formData.append("image", offerData.imageFile);
      formData.append("text", offerData.text);
    }

    try {
      const response = await fetch(`${baseUrl}update_offer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("clubToken") || ""}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    const clubSlugMatch = window.location.pathname.match(/\/club\/([^/?]+)/);
    const clubSlug = clubSlugMatch ? clubSlugMatch[1] : "";
    try {
      let res = await fetch(`${baseUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirect_url: clubSlug, password: password }),
      });

      let data = await res.json();
      if (res.status === 200) {
        toast({
          title: "Authentication successful",
          description: "You can now update the club's live status",
        });
        localStorage.setItem("clubToken", data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStatus: LiveStatus = {
      ...formData,
      lastUpdated: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem("clubToken");
      const res = await fetch(`${baseUrl}update_live_update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ live_update: newStatus }),
      });

      if (res.ok) {
        onStatusUpdated(newStatus);
        toast({
          title: "Status updated successfully",
          description: "The club's live status has been updated.",
        });
      } else {
        const data = await res.json();
        toast({
          title: "Update failed",
          description: data?.message || "Failed to update live status.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An error occurred while updating live status.",
        variant: "destructive",
      });
    }
  };

  const handleGameChange = (
      index: number,
      field: keyof LiveGame,
      value: number
  ) => {
    const updatedGames = [...formData.games];
    updatedGames[index] = {
      ...updatedGames[index],
      [field]: value,
    };

    // Recalculate totals
    const totalTablesRunning = updatedGames.reduce(
        (sum, game) => sum + game.tablesRunning,
        0
    );
    const totalPlayers = updatedGames.reduce(
        (sum, game) => sum + game.players,
        0
    );

    setFormData({
      ...formData,
      games: updatedGames,
      tablesRunning: totalTablesRunning,
      totalPlayers: totalPlayers,
    });
  };

  if (!isAuthenticated) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
          <Card className={`${className} bg-white/90 backdrop-blur-md border-gray-200/70 shadow-md`}>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Lock className="mr-2 h-5 w-5 text-fuchsia-600" />
                Club Staff Authentication
              </CardTitle>
              <CardDescription className="text-gray-600">
                Please enter your password to update the live status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuthenticate}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                  onClick={handleAuthenticate}
                  className="w-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white shadow-md"
              >
                Authenticate
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
    );
  }

  return (
      <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
          <Card className={`${className} bg-white/90 backdrop-blur-md border-gray-200/70 shadow-md`}>
            <CardHeader>
              <CardTitle className="text-gray-800">Update Live Status</CardTitle>
              <CardDescription className="text-gray-600">
                Update the current status of games and waiting list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="waitingList" className="text-gray-700">Waiting List</Label>
                      <Input
                          id="waitingList"
                          type="number"
                          min="0"
                          value={formData.waitingList}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                waitingList: parseInt(e.target.value) || 0,
                              })
                          }
                          className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectedWaitTime" className="text-gray-700">Expected Wait (mins)</Label>
                      <Input
                          id="expectedWaitTime"
                          type="number"
                          min="0"
                          value={formData.expectedWaitTime}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                expectedWaitTime: parseInt(e.target.value) || 0,
                              })
                          }
                          className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nextCallTime" className="text-gray-700">
                        Next Call Time (e.g. 19:30)
                      </Label>
                      <Input
                          id="nextCallTime"
                          type="text"
                          placeholder="HH:MM"
                          value={formData.nextCallTime}
                          onChange={(e) =>
                              setFormData({ ...formData, nextCallTime: e.target.value })
                          }
                          className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="font-medium text-gray-800">Games Status</div>

                    {formData.games.map((game, index) => (
                        <div
                            key={game.stakeId}
                            className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-gray-200/50 rounded-md bg-white/60"
                        >
                          <div className="font-medium md:col-span-1 flex items-center text-gray-800">
                            {game.stakeId}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`tables-${index}`} className="text-gray-700">Tables Running</Label>
                            <Input
                                id={`tables-${index}`}
                                type="number"
                                min="0"
                                value={game.tablesRunning}
                                onChange={(e) =>
                                    handleGameChange(
                                        index,
                                        "tablesRunning",
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`players-${index}`} className="text-gray-700">Players</Label>
                            <Input
                                id={`players-${index}`}
                                type="number"
                                min="0"
                                value={game.players}
                                onChange={(e) =>
                                    handleGameChange(
                                        index,
                                        "players",
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                            />
                          </div>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                      type="submit"
                      className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white shadow-md"
                  >
                    Update Status
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6"
        >
          <Card className="bg-white/90 backdrop-blur-md border-gray-200/70 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-800">Update Offer</CardTitle>
              <CardDescription className="text-gray-600">
                Update the current offer details or set no offers status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOffer}>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="noOffers" className="text-gray-700">No Offers Available</Label>
                      <input
                          className="cursor-pointer bg-gray-100 rounded"
                          type="checkbox"
                          id="noOffers"
                          checked={offerData.noOffers}
                          onChange={(e) =>
                              setOfferData({ ...offerData, noOffers: e.target.checked })
                          }
                      />
                    </div>
                  </div>

                  {!offerData.noOffers && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="offerImage" className="text-gray-700">Offer Image</Label>
                          <Input
                              id="offerImage"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                  setOfferData({
                                    ...offerData,
                                    imageFile: e.target.files[0],
                                  })
                              }
                              className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="offerText" className="text-gray-700">Offer Text</Label>
                          <Input
                              id="offerText"
                              type="text"
                              placeholder="Enter offer description"
                              value={offerData.text}
                              onChange={(e) =>
                                  setOfferData({ ...offerData, text: e.target.value })
                              }
                              className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                          />
                        </div>
                      </div>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <Button
                      type="submit"
                      className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white shadow-md"
                  >
                    Update Offer
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </>
  );
}