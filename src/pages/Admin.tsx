import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { clubs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useLoading } from "@/contexts/LoadingContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { baseUrl } from "@/config";
import { motion } from "framer-motion";

const Admin = () => {
  const [clubId, setClubId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotResult, setForgotResult] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clubId || !password) {
      toast({
        title: "Missing information",
        description: "Please provide both club ID and password",
        variant: "destructive",
      });
      return;
    }

    try {
      showLoading();
      let res = await fetch(`${baseUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: clubId, password: password }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await res.json();
      localStorage.setItem("redirect_url", data.redirect_url);
      if (res.status == 200) navigate(`/club/${data.redirect_url}?tab=admin`);
    } finally {
      hideLoading();
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotResult(null);
    // Find club by email and phone
    const club = clubs.find(
        (c) => c.email === forgotEmail && c.phone === forgotPhone
    );
    if (club && club.password) {
      setForgotResult(club.password);
    } else if (club && !club.password) {
      setForgotResult("Password not set for this club.");
    } else {
      setForgotError("No club found with that email and phone number.");
    }
  };

  return (
      <MainLayout>
        <div className="container  px-4 max-w-md mx-auto">
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
                <Lock className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Club Admin Portal
            </h1>
            <p className="text-lg text-gray-600">
              Access your club's dashboard to update live status
            </p>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="mb-8 bg-white/90 backdrop-blur-md border-gray-200/70 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Lock className="mr-2 h-5 w-5 text-fuchsia-600" />
                  Club Authentication
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your club ID and password to access admin features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clubId" className="text-gray-700">
                      Club ID
                    </Label>
                    <Input
                        id="clubId"
                        value={clubId}
                        onChange={(e) => setClubId(e.target.value)}
                        placeholder="e.g., high-stakes-society"
                        className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                          id="password"
                          type={!showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="bg-white/80 border-gray-300 focus:border-fuchsia-500 pr-10"
                      />
                      <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-500 hover:text-fuchsia-600"
                          onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white shadow-md"
                  >
                    Login
                  </Button>
                </form>
                {/* <div className="text-right mt-2">
                <button
                  type="button"
                  className="text-fuchsia-600 hover:underline text-sm"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </button>
              </div> */}
                <Dialog open={showForgot} onOpenChange={setShowForgot}>
                  <DialogContent className="sm:max-w-[400px] bg-white/95 backdrop-blur-xl border-gray-200/70">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-gray-800">
                        Forgot Password
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleForgotPassword} className="space-y-3">
                      <Label htmlFor="forgotEmail" className="text-gray-700">
                        Registered Email
                      </Label>
                      <Input
                          id="forgotEmail"
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                          required
                      />
                      <Label htmlFor="forgotPhone" className="text-gray-700">
                        Registered Phone
                      </Label>
                      <Input
                          id="forgotPhone"
                          type="tel"
                          value={forgotPhone}
                          onChange={(e) => setForgotPhone(e.target.value)}
                          className="bg-white/80 border-gray-300 focus:border-fuchsia-500"
                          required
                      />
                      <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white shadow-md"
                      >
                        Retrieve Password
                      </Button>
                      {forgotError && (
                          <div className="text-red-500 text-sm">{forgotError}</div>
                      )}
                      {forgotResult && (
                          <div className="text-green-600 text-sm">
                            Your password is: <b>{forgotResult}</b>
                          </div>
                      )}
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t border-gray-200 pt-6">
                {/* <div className="text-sm text-gray-600">
                <p>Demo credentials:</p>
                <p>Club ID: high-stakes-society</p>
                <p>Password: admin</p>
              </div> */}
                <div className="w-full border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-700 mb-3 font-medium">
                    What can club admins do?
                  </p>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>Update number of tables running</li>
                    <li>Update player count for each game</li>
                    <li>Manage waiting list information</li>
                    <li>Set next call time</li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-dashed border-fuchsia-300 bg-white/80 backdrop-blur-md text-gray-800">
            <CardHeader>
              <CardTitle className="text-center text-gray-800">
                Don't have a club account?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                onClick={() => navigate("/add-club")}
                variant="outline"
                className="group border-fuchsia-400 text-fuchsia-600 hover:bg-fuchsia-100/60 hover:text-fuchsia-700"
              >
                <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-all " />
                Register Your Club
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </CardContent>
          </Card>
        </motion.div> */}
        </div>
      </MainLayout>
  );
};

export default Admin;