"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check token on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false); // Done loading
    }, []);

    // Handle storage change (if the token is updated or removed)
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token); // True if token exists, false otherwise
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading spinner or placeholder
    }

    const handleCreateClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            router.push("/pages/login"); // Redirect to login if not authenticated
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
            <div className="flex h-16 items-center justify-between p-5 lg:px-32">
                {/* Logo Section */}
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="relative w-full h-40 overflow-hidden">
                            <img
                                src="/logocar.png"
                                alt="Car Logo"
                                className="w-full h-full object-contain animate-pulse"
                            />
                            <div className="absolute inset-0 border-4 border-transparent shadow-lg pointer-events-none"></div>
                        </div>

                        <span className="hidden sm:inline-block font-extrabold text-2xl hover:text-primary transition-colors">
                            CARZZ
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex items-center space-x-6 text-sm font-medium ml-16">
                        <Link href="/pages/mycars" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200">
                            My Cars
                        </Link>
                        <Link href="/pages/marketplace" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200">
                            Market Place
                        </Link>
                        <Link href="/pages/finance" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200">
                            Finance
                        </Link>
                        <Link
                            href="/pages/create"
                            onClick={handleCreateClick} // Handle the "Create" link click
                            className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200"
                        >
                            Create
                        </Link>
                        <Link href="/pages/about" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200">
                            About
                        </Link>
                    </nav>
                </div>

                {/* Mobile Menu Button */}
                <Button variant="outline" size="icon" className="md:hidden hover:bg-secondary transition-colors">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>

                {/* Authentication Buttons */}
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <Button
                            size="sm"
                            className="hover:bg-primary hover:text-white transition-colors"
                            onClick={() => router.push("/profile")}
                        >
                            Profile
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-primary hover:text-white transition-colors"
                                onClick={() => router.push("/pages/login")}
                            >
                                Log in
                            </Button>
                            <Button
                                size="sm"
                                className="hover:bg-primary hover:text-white transition-colors"
                                onClick={() => router.push("/pages/signup")}
                            >
                                Sign up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
