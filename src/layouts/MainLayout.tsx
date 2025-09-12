import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Crown,
    MapPin,
    Menu,
    X,
    LogIn,
    Home,
    Users,
    Info,
    BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLoading } from "@/contexts/LoadingContext";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const handleClubLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        showLoading();
        setTimeout(() => {
            navigate("/admin");
            hideLoading();
        }, 400);
    };

    const handleRegisterClub = (e: React.MouseEvent) => {
        e.preventDefault();
        showLoading();
        setTimeout(() => {
            navigate("/add-club");
            hideLoading();
        }, 400);
    };

    const navigationItems = [
        { path: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
        { path: "/clubs", label: "Clubs", icon: <Users className="h-4 w-4" /> },
        { path: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
    ];

    return (
        <div className="min-h-screen flex flex-col text-gray-800">
            <Helmet>
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Helmet>

            {/* Background */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"></div>
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_2px_2px,_rgba(0,0,0,0.05)_1px,_transparent_0)] bg-[length:28px_28px]"></div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full py-2">
                <div className="container rounded-2xl mx-auto px-4 flex items-center w-3/2 justify-between h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-md">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => {
                            showLoading();
                            setTimeout(() => {
                                navigate("/");
                                hideLoading();
                            }, 400);
                        }}
                        className="flex items-center space-x-2 font-bold text-xl tracking-wide group"
                    >
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-amber-400 rounded-lg flex items-center justify-center shadow-md"
                        >
                            <span className="text-white font-bold text-lg">♠</span>
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-gray-800 font-semibold">Poker Club</span>
                            <span className="text-pink-600 text-xs font-medium tracking-wider">
                HUB
              </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <nav className="flex items-center space-x-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                                        location.pathname === item.path
                                            ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-md"
                                            : "text-gray-700 hover:text-fuchsia-600 hover:bg-pink-100/60"
                                    )}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}

                            {/* Poker Rules */}
                            <a
                                href="/poker_rules.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-fuchsia-100 to-pink-100 text-fuchsia-700 border border-fuchsia-200 hover:scale-105 hover:shadow-md transition-all duration-300"
                            >
                                <BookOpen className="h-4 w-4" />
                                <span>Poker Rules</span>
                            </a>
                        </nav>
                    )}

                    {/* Desktop Actions */}
                    {!isMobile && (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRegisterClub}
                                className="text-gray-700 border-gray-300 hover:bg-pink-100 hover:text-fuchsia-600 transition-all duration-300"
                            >
                                Register Club
                            </Button>

                            <Button
                                size="sm"
                                onClick={
                                    localStorage.getItem("redirect_url")
                                        ? () => {
                                            localStorage.clear();
                                            navigate("/");
                                        }
                                        : handleClubLogin
                                }
                                className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-400 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                            >
                                <LogIn className="h-4 w-4" />
                                <span>
                  {localStorage.getItem("redirect_url")
                      ? "Logout"
                      : "Club Login"}
                </span>
                            </Button>
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    {isMobile && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            className="text-gray-700 hover:text-fuchsia-600 hover:bg-pink-100"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    )}
                </div>
            </header>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobile && mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-lg"
                    >
                        <nav className="container py-6 flex flex-col space-y-4">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                                        location.pathname === item.path
                                            ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white"
                                            : "text-gray-700 hover:text-fuchsia-600 hover:bg-pink-100/60"
                                    )}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}

                            <a
                                href="/poker_rules.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-pink-100 to-indigo-100 text-fuchsia-700 border border-fuchsia-200 hover:scale-105 hover:shadow-md transition-all duration-300"
                            >
                                <BookOpen className="h-5 w-5" />
                                <span>Poker Rules</span>
                            </a>

                            {/* Mobile Actions */}
                            <div className="pt-4 border-t border-gray-200 space-y-3">
                                <button
                                    onClick={handleRegisterClub}
                                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 border border-gray-300 hover:bg-pink-100 hover:text-fuchsia-600 transition-colors duration-300"
                                >
                                    Register Your Club
                                </button>
                                <button
                                    onClick={
                                        localStorage.getItem("redirect_url")
                                            ? () => {
                                                localStorage.clear();
                                                navigate("/");
                                            }
                                            : handleClubLogin
                                    }
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-400 text-white shadow-md transition-all duration-300"
                                >
                                    <LogIn className="h-5 w-5" />
                                    <span>
                    {localStorage.getItem("redirect_url")
                        ? "Logout"
                        : "Club Login"}
                  </span>
                                </button>
                            </div>

                            {/* Location */}
                            <div className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-200 text-gray-500">
                                <MapPin className="h-5 w-5" />
                                <span className="text-sm">Currently serving Bangalore</span>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 container mx-auto px-4 py-8"
            >
                {children}
            </motion.main>

            {/* Footer */}
            <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-8 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="bg-gradient-to-r from-fuchsia-500 to-amber-500 p-2 rounded-md mr-3 shadow-sm">
                                <Crown className="h-4 w-4 text-white" />
                            </div>
                            <p className="text-sm text-gray-600">
                                © {new Date().getFullYear()}{" "}
                                <span className="text-fuchsia-600 font-semibold">
                  Poker Club Hub
                </span>
                                . All rights reserved.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            {["/about", "/privacy", "/terms", "/contact"].map(
                                (path, index) => (
                                    <Link
                                        key={index}
                                        to={path}
                                        className="text-sm text-gray-600 hover:text-fuchsia-600 transition-colors font-medium"
                                    >
                                        {path === "/about" && "About"}
                                        {path === "/privacy" && "Privacy Policy"}
                                        {path === "/terms" && "Terms of Service"}
                                        {path === "/contact" && "Contact"}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
