"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function LandingPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col min-h-screen text-center justify-center">

            <main className="flex-1 ">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                        Find Your Perfect Ride
                    </h1>
                    {/* <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                                    Browse thousands of cars from trusted dealers and private sellers. Your dream car is just a click away.
                                </p>6 */}
                </div>
                <section className="relative py-12  md:py-24 lg:py-32 xl:py-48 bg-black m-5 rounded-xl border-transparent border-black shadow-xl shadow-black">
                    <div className="absolute inset-0 z-0">
                        <video
                            className="w-full h-full object-cover rounded-xl"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="/videoplayback.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="relative z-10  px-4 md:px-6 text-center text-white ">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                                    Find Your Perfect Ride
                                </h1>
                                {/* <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                                    Browse thousands of cars from trusted dealers and private sellers. Your dream car is just a click away.
                                </p>6 */}
                            </div>
                            <div className="w-full max-w-sm space-y-2 ">
                                <form className="flex space-x-2 ">
                                    <Input className="max-w-lg flex-1 border-white border-2" placeholder="Search by make, model, or keyword" type="text" />
                                    <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                                        <Search className="mr-2 h-4 w-4" />
                                        Search
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
                    <div className=" px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Cars</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
                            <Card className=" hover:scale-105  shadow-lg" >
                                <CardContent className="p-4">
                                    <Image
                                        src="/image.png"
                                        alt={`Featured Car `}
                                        className=" h-56 object-cover rounded-md mb-4"
                                        width={400}
                                        height={400}
                                    />
                                    <h3 className="text-xl font-bold mb-2">Volkswagen Taigun</h3>
                                    <p className="text-gray-600 mb-4">The Volkswagen Taigun offers a roomy interior, top-notch build, and fun driving. </p>
                                </CardContent>

                            </Card>
                            <Card className=" hover:scale-105  shadow-lg" >
                                <CardContent className="p-4">
                                    <Image
                                        src="/image copy 2.png"
                                        alt={`Featured Car `}
                                        className=" h-56 object-cover rounded-md mb-4"
                                        width={400}
                                        height={400}
                                    />
                                    <h3 className="text-xl font-bold mb-2">Tata Curvv </h3>
                                    <p className="text-gray-600 mb-4">The Tata Curvv is a compelling choice due to its stylish coupe SUV design, extensive feature list,</p>
                                </CardContent>

                            </Card>
                            <Card className=" hover:scale-105 shadow-lg" >
                                <CardContent className="p-4">
                                    <Image
                                        src="/image copy.png"
                                        alt={`Featured Car `}
                                        className=" h-56 object-cover rounded-md mb-4"
                                        width={400}
                                        height={400}
                                    />
                                    <h3 className="text-xl font-bold mb-2">Skoda Slavia </h3>
                                    <p className="text-gray-600 mb-4">The Slavia not only looks good but offers a thrilling driving experience, be it in the city or highway, due to its peppy engines and good handling.</p>
                                </CardContent>

                            </Card>


                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
                    <div className=" px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to add Your Car?</h2>
                                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                                    Lets add Your collection.
                                </p>
                            </div>
                            <Button className="bg-white text-black hover:bg-gray-200" size="lg" onClick={() => { router.push("/pages/create") }}>
                                Start Selling
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
{/*             <footer className="w-full py-6 bg-gray-800 text-white">
                <div className=" px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Image src="/placeholder.svg" alt="AutoMarket Logo" width={32} height={32} />
                            <span className="font-bold">AutoMarket</span>
                        </div>
                        <nav className="flex items-center space-x-4 text-sm mt-4 md:mt-0">
                            <a href="/terms">Terms</a>
                            <a href="/privacy">Privacy</a>
                            <a href="/contact">Contact</a>
                        </nav>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        © 2023 AutoMarket. All rights reserved.
                    </div>
                </div>
            </footer> */}
        </div>
    )
}
