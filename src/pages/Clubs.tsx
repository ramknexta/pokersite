import { useState, useEffect, useMemo } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { clubs } from "@/lib/mock-data";
import { ClubCard } from "@/components/ClubCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLoading } from "@/contexts/LoadingContext";
import { RegistrationDialog } from "@/components/RegistrationDialog";
import { ChevronDown, Search, MapPin, Filter, DollarSign, X, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { baseUrl } from "@/config";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Clubs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("waitlist");
  const [areaFilter, setAreaFilter] = useState<string | null>(null);
  const [stakeFilter, setStakeFilter] = useState<number | null>(null);
  const [minBuyInFilter, setMinBuyInFilter] = useState<number | null>(null);
  const [maxBuyInFilter, setMaxBuyInFilter] = useState<number | null>(null);
  const [manualSmallBlind, setManualSmallBlind] = useState<number | null>(null);
  const [manualBigBlind, setManualBigBlind] = useState<number | null>(null);
  const [clubsData, setClubsData] = useState(clubs);
  const [showRegistration, setShowRegistration] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [clubData, setClubData] = useState<any>(null);
  const [activeFilterTab, setActiveFilterTab] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  async function fetchClubs() {
    showLoading();
    try {
      // const response = await fetch(`${baseUrl}get_all_live_updates`);
      // if (!response.ok) throw new Error("Failed to fetch clubs");
      // const data = await response.json();
      // setClubData(data?.live_updates);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      setClubData([]);
    } finally {
      hideLoading();
    }
  }

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    if (clubData?.length === 0) return;
    let updatedClubs = clubsData?.map((club) => {
      const liveStatus = clubData?.find(
          (c: any) => c.redirect_url === club.id
      )?.live_update;

      return {
        ...club,
        liveStatus: liveStatus || {
          waitingList: 0,
          tablesRunning: 0,
          totalPlayers: 0,
        },
      };
    });
    setClubsData(updatedClubs);
  }, [clubData]);

  // Extract unique areas
  const areas = useMemo(() => [...new Set(clubs.map((club) => club.location.area))], [clubs]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      setShowRegistration(true);
    }
  }, []);

  // Filter and sort clubs
  const filteredClubs = useMemo(() => {
    return clubsData
        .filter((club) => {
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                club.name.toLowerCase().includes(searchLower) ||
                club.location.area.toLowerCase().includes(searchLower) ||
                club.location.address.toLowerCase().includes(searchLower)
            );
          }
          return true;
        })
        .filter((club) => (areaFilter ? club.location.area === areaFilter : true))
        .filter((club) => {
          if (
              stakeFilter === null &&
              manualSmallBlind === null &&
              manualBigBlind === null
          )
            return true;
          return club.stakes.some((stake) => {
            if (manualSmallBlind !== null && manualBigBlind !== null) {
              return (
                  stake.smallBlind === manualSmallBlind &&
                  stake.bigBlind === manualBigBlind
              );
            } else if (stakeFilter !== null) {
              return stake.smallBlind === stakeFilter;
            }
            return true;
          });
        })
        .filter((club) => {
          if (minBuyInFilter === null && maxBuyInFilter === null) return true;
          return club.stakes.some((stake) => {
            const minOk =
                minBuyInFilter === null || stake.minBuyIn >= minBuyInFilter;
            const maxOk =
                maxBuyInFilter === null ||
                (stake.maxBuyIn ? stake.maxBuyIn <= maxBuyInFilter : true);
            return minOk && maxOk;
          });
        })
        .sort((a, b) => {
          switch (sortOption) {
            case "waitlist":
              return (
                  (a.liveStatus?.waitingList || 0) - (b.liveStatus?.waitingList || 0)
              );
            case "tables":
              return (
                  (b.liveStatus?.tablesRunning || 0) -
                  (a.liveStatus?.tablesRunning || 0)
              );
            case "players":
              return (
                  (b.liveStatus?.totalPlayers || 0) -
                  (a.liveStatus?.totalPlayers || 0)
              );
            default:
              return 0;
          }
        });
  }, [
    clubsData,
    searchTerm,
    areaFilter,
    stakeFilter,
    manualSmallBlind,
    manualBigBlind,
    minBuyInFilter,
    maxBuyInFilter,
    sortOption
  ]);

  const activeFiltersCount = useMemo(() => {
    return [
      searchTerm,
      areaFilter,
      stakeFilter,
      manualSmallBlind,
      manualBigBlind,
      minBuyInFilter,
      maxBuyInFilter
    ].filter(item => item !== null && item !== "").length;
  }, [searchTerm, areaFilter, stakeFilter, manualSmallBlind, manualBigBlind, minBuyInFilter, maxBuyInFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setAreaFilter(null);
    setStakeFilter(null);
    setMinBuyInFilter(null);
    setMaxBuyInFilter(null);
    setManualSmallBlind(null);
    setManualBigBlind(null);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
  };

  const stakeOptions = [
    { label: "50/100", value: 50 },
    { label: "100/200", value: 100 },
    { label: "200/400", value: 200 },
    { label: "500/1000", value: 500 },
    { label: "1000/2000", value: 1000 },
  ];

  return (
      <MainLayout>
        <RegistrationDialog
            isOpen={showRegistration}
            onClose={() => setShowRegistration(false)}
            onSuccess={handleRegistrationSuccess}
        />

        <div className="container py-6 px-4 max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-amber-400 rounded-lg flex items-center justify-center shadow-md"
              >
                <span className="text-white font-bold text-2xl">♠</span>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Poker Clubs in Bangalore</h1>
                <p className="text-gray-600 mt-1">Find the best poker clubs with real-time updates</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gradient-to-r from-pink-100 to-purple-100 text-fuchsia-700 border-fuchsia-200">
                {filteredClubs.length} clubs available
              </Badge>
              <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden flex items-center gap-2 border-fuchsia-300"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFiltersCount > 0 && (
                    <Badge className="ml-1 bg-fuchsia-500 text-white h-5 w-5 p-0 flex items-center justify-center">
                      {activeFiltersCount}
                    </Badge>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <Card className="bg-white/80 backdrop-blur-md border-gray-200/70 sticky top-24 shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                    {activeFiltersCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearFilters}
                            className="text-fuchsia-600 hover:text-fuchsia-700 hover:bg-fuchsia-100/60 h-8 px-2"
                        >
                          Clear all
                        </Button>
                    )}
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                          placeholder="Club name or location..."
                          className="pl-9 bg-white/70 border-gray-300 text-gray-800 focus:border-fuchsia-500/50"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                          <button
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-fuchsia-600"
                              onClick={() => setSearchTerm("")}
                          >
                            <X size={16} />
                          </button>
                      )}
                    </div>
                  </div>

                  {/* Area Filter */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Area</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                          onClick={() => setAreaFilter(null)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                              areaFilter === null
                                  ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md'
                                  : 'bg-white/80 text-gray-700 hover:bg-fuchsia-100/60 hover:text-fuchsia-700'
                          }`}
                      >
                        All Areas
                      </button>
                      {areas.map((area) => (
                          <button
                              key={area}
                              onClick={() => setAreaFilter(area)}
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                  areaFilter === area
                                      ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md'
                                      : 'bg-white/80 text-gray-700 hover:bg-fuchsia-100/60 hover:text-fuchsia-700'
                              }`}
                          >
                            {area}
                          </button>
                      ))}
                    </div>
                  </div>

                  {/* Blinds Filter */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Blinds</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {stakeOptions.map((option) => (
                          <button
                              key={option.value}
                              onClick={() => setStakeFilter(stakeFilter === option.value ? null : option.value)}
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                  stakeFilter === option.value
                                      ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md'
                                      : 'bg-white/80 text-gray-700 hover:bg-fuchsia-100/60 hover:text-fuchsia-700'
                              }`}
                          >
                            {option.label}
                          </button>
                      ))}
                    </div>

                    <div className="text-xs text-gray-500 mb-2">Custom blinds</div>
                    <div className="flex items-center gap-2">
                      <Input
                          type="number"
                          min={0}
                          placeholder="SB"
                          value={manualSmallBlind ?? ""}
                          onChange={(e) => {
                            setManualSmallBlind(e.target.value ? parseInt(e.target.value) : null);
                            setStakeFilter(null);
                          }}
                          className="bg-white/70 border-gray-300 text-gray-800 focus:border-fuchsia-500/50"
                      />
                      <span className="text-gray-500">/</span>
                      <Input
                          type="number"
                          min={0}
                          placeholder="BB"
                          value={manualBigBlind ?? ""}
                          onChange={(e) => {
                            setManualBigBlind(e.target.value ? parseInt(e.target.value) : null);
                            setStakeFilter(null);
                          }}
                          className="bg-white/70 border-gray-300 text-gray-800 focus:border-fuchsia-500/50"
                      />
                    </div>
                  </div>

                  {/* Buy-in Filter */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Buy-in Range (₹)</label>
                    <div className="flex gap-2">
                      <Input
                          type="number"
                          min={0}
                          placeholder="Min"
                          value={minBuyInFilter ?? ""}
                          onChange={(e) => setMinBuyInFilter(e.target.value ? parseInt(e.target.value) : null)}
                          className="bg-white/70 border-gray-300 text-gray-800 focus:border-fuchsia-500/50"
                      />
                      <Input
                          type="number"
                          min={0}
                          placeholder="Max"
                          value={maxBuyInFilter ?? ""}
                          onChange={(e) => setMaxBuyInFilter(e.target.value ? parseInt(e.target.value) : null)}
                          className="bg-white/70 border-gray-300 text-gray-800 focus:border-fuchsia-500/50"
                      />
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Sort by</label>
                    <div className="flex flex-col gap-2">
                      <button
                          onClick={() => setSortOption("waitlist")}
                          className={`px-3 py-2 rounded-md text-left text-sm transition-all ${
                              sortOption === "waitlist"
                                  ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md'
                                  : 'bg-white/80 text-gray-700 hover:bg-fuchsia-100/60 hover:text-fuchsia-700'
                          }`}
                      >
                        Shortest Waitlist
                      </button>
                      <button
                          onClick={() => setSortOption("tables")}
                          className={`px-3 py-2 rounded-md text-left text-sm transition-all ${
                              sortOption === "tables"
                                  ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md'
                                  : 'bg-white/80 text-gray-700 hover:bg-fuchsia-100/60 hover:text-fuchsia-700'
                          }`}
                      >
                        Most Tables Running
                      </button>
                      <button
                          onClick={() => setSortOption("players")}
                          className={`px-3 py-2 rounded-md text-left text-sm transition-all ${
                              sortOption === "players"
                                  ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-md'
                                  : 'bg-white/80 text-gray-700 hover:bg-fuchsia-100/60 hover:text-fuchsia-700'
                          }`}
                      >
                        Most Players
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden" onClick={() => setShowMobileFilters(false)}>
                  <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white/95 backdrop-blur-xl overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                        <button onClick={() => setShowMobileFilters(false)} className="text-gray-500 hover:text-fuchsia-600">
                          <X size={24} />
                        </button>
                      </div>

                      {/* Mobile filter content would go here, similar to desktop but optimized for mobile */}

                      <div className="mt-8">
                        <Button
                            className="w-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-400 text-white shadow-md"
                            onClick={() => setShowMobileFilters(false)}
                        >
                          Apply Filters
                        </Button>
                        {activeFiltersCount > 0 && (
                            <Button
                                variant="outline"
                                className="w-full mt-3 border-gray-300 text-gray-700 hover:bg-fuchsia-100/60 hover:text-fuchsia-700"
                                onClick={handleClearFilters}
                            >
                              Clear All Filters
                            </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {/* Clubs Listing Area */}
            <div className="flex-1">
              {/* Active Filters Bar */}
              {activeFiltersCount > 0 && (
                  <div className="bg-white/70 backdrop-blur-md rounded-lg p-4 mb-6 flex flex-wrap items-center gap-2 border border-gray-200/50 shadow-sm">
                    <span className="text-sm text-gray-600">Active filters:</span>

                    {searchTerm && (
                        <Badge variant="secondary" className="bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200">
                          Search: {searchTerm}
                          <button onClick={() => setSearchTerm("")} className="ml-1">
                            <X size={14} />
                          </button>
                        </Badge>
                    )}

                    {areaFilter && (
                        <Badge variant="secondary" className="bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200">
                          Area: {areaFilter}
                          <button onClick={() => setAreaFilter(null)} className="ml-1">
                            <X size={14} />
                          </button>
                        </Badge>
                    )}

                    {(stakeFilter || (manualSmallBlind && manualBigBlind)) && (
                        <Badge variant="secondary" className="bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200">
                          Blinds: {manualSmallBlind && manualBigBlind
                            ? `${manualSmallBlind}/${manualBigBlind}`
                            : `${stakeFilter}/${stakeFilter * 2}`}
                          <button onClick={() => {
                            setStakeFilter(null);
                            setManualSmallBlind(null);
                            setManualBigBlind(null);
                          }} className="ml-1">
                            <X size={14} />
                          </button>
                        </Badge>
                    )}

                    {(minBuyInFilter || maxBuyInFilter) && (
                        <Badge variant="secondary" className="bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200">
                          Buy-in: {minBuyInFilter ? `₹${minBuyInFilter}` : ''}
                          {minBuyInFilter && maxBuyInFilter ? '-' : ''}
                          {maxBuyInFilter ? `₹${maxBuyInFilter}` : ''}
                          <button onClick={() => {
                            setMinBuyInFilter(null);
                            setMaxBuyInFilter(null);
                          }} className="ml-1">
                            <X size={14} />
                          </button>
                        </Badge>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-fuchsia-600 hover:text-fuchsia-700 hover:bg-fuchsia-100/60 h-7 ml-auto"
                    >
                      Clear all
                    </Button>
                  </div>
              )}

              {/* Sort Tabs for Mobile */}
              <div className="lg:hidden mb-6">
                <Tabs value={sortOption} onValueChange={setSortOption} className="w-full">
                  <TabsList className="grid grid-cols-3 bg-white/80 backdrop-blur-md p-1 h-auto border border-gray-200/50">
                    <TabsTrigger value="waitlist" className="py-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                      Shortest Waitlist
                    </TabsTrigger>
                    <TabsTrigger value="tables" className="py-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                      Most Tables
                    </TabsTrigger>
                    <TabsTrigger value="players" className="py-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">
                      Most Players
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Clubs Grid */}
              {filteredClubs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredClubs.map((club) => (
                        <ClubCard key={club.id} club={club} />
                    ))}
                  </div>
              ) : (
                  <Card className="bg-white/80 backdrop-blur-md border-gray-200/70">
                    <CardContent className="p-8 text-center">
                      <div className="text-fuchsia-500 mb-3 text-4xl">♠️</div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">No clubs match your filters</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search criteria or clear all filters to see more options.
                      </p>
                      <Button
                          onClick={handleClearFilters}
                          className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-400 text-white shadow-md"
                      >
                        Clear All Filters
                      </Button>
                    </CardContent>
                  </Card>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
  );
};

export default Clubs;