"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check token on component mount and handle redirection
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // If no token, redirect to login
            router.push("/pages/login");
        } else {
            // If token exists, set authentication state
            setIsAuthenticated(true);
        }
        setLoading(false); // Update loading state
    }, [router]);

    // Handle authentication state changes reactively
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");

            /* if (!token) {
                setIsAuthenticated(false);
                router.push("/pages/login"); // Redirect if token is removed
            } else {
                setIsAuthenticated(true);
            } */
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [router]);

    if (loading) {
        return <div>Loading...</div>; // Show loading spinner or placeholder
    }

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

                        <span className="hidden sm:inline-block font-extrabold  text-2xl hover:text-primary transition-colors">
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
                        <Link href="/finance" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200">
                            Finance
                        </Link>
                        <Link className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200"
                            href="/pages/create"
                            onClick={(e) => {
                                if (!isAuthenticated) {
                                    e.preventDefault();
                                    router.push("/pages/login");
                                }
                            }}
                        >
                            Create
                        </Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200">
                            About
                        </Link>
                    </nav>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden hover:bg-secondary transition-colors"
                >
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
