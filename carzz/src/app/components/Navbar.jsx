import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
            <div className="flex h-16 items-center justify-end p-5 lg:px-32 lg:mx-12 xl:mx-16">
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
                        <Link href="/pages/create" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200">
                            Create
                        </Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60 hover:scale-105 transform duration-200">
                            About
                        </Link>
                    </nav>
                </div>
                <Button variant="outline" size="icon" className="md:hidden hover:bg-secondary hover:text-white transition-colors duration-200">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="hover:bg-primary hover:text-white transition-colors duration-200">
                            Log in
                        </Button>
                        <Button size="sm" className="hover:bg-primary hover:text-white transition-colors duration-200">
                            Sign up
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
