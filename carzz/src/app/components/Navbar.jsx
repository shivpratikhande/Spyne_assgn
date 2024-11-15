import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-end p-5 lg:px-32">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        {/* <Image src="/placeholder.svg" alt="AutoMarket Logo" width={32} height={32} /> */}
                        <span className="hidden font-bold sm:inline-block">CARZZ</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/buy" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Buy
                        </Link>
                        <Link href="/sell" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Sell
                        </Link>
                        <Link href="/finance" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Finance
                        </Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            About
                        </Link>
                    </nav>
                </div>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                        <Button size="sm">Sign up</Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
