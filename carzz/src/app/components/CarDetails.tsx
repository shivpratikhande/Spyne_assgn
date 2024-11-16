'use client'

import { useState, useEffect } from 'react'  // Import useEffect
import Image from 'next/image'
import { ArrowLeft, Calendar, DollarSign, Fuel, Info, Settings, FastForwardIcon as Speed } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation';

// Mock data for demonstration
const carDetails = {
    id: 1,
    name: 'Tesla Model S',
    year: 2022,
    price: 94990,
    image: '/placeholder.svg?height=400&width=600',
    description: 'The Tesla Model S is an all-electric five-door liftback sedan produced by Tesla, Inc. As Tesla\'s flagship vehicle, the Model S features cutting-edge technology, impressive performance, and long-range capabilities.',
    specs: {
        range: '405 miles',
        topSpeed: '200 mph',
        acceleration: '1.99 s 0-60 mph',
        drive: 'All-Wheel Drive',
        peakPower: '1,020 hp'
    },
    features: [
        'Autopilot',
        'Full Self-Driving Capability',
        '17" Cinematic Display',
        'Wireless Gaming',
        'Premium Audio System',
        'Glass Roof'
    ]
}

export default function CarDetailPage() {
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [value, setValue] = useState<string | null>(null);
    const { slug } = useParams();
    
    // Use useEffect to avoid infinite re-renders
    useEffect(() => {
        if (typeof slug === 'string') {
            setValue(slug);
        } else {
            setValue(null);  // Ensure value is null if slug is undefined or not a string
        }

    }, [slug]); 
    console.log(value)


    return (
        <div className="container mx-auto p-4 space-y-6">
            <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
            </Button>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <Image
                        src={carDetails.image}
                        alt={carDetails.name}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover w-full"
                    />
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl">{carDetails.name}</CardTitle>
                                <CardDescription className="text-xl">{carDetails.year}</CardDescription>
                            </div>
                            <Badge variant="secondary" className="text-lg">
                                <DollarSign className="mr-1 h-4 w-4" />
                                {carDetails.price.toLocaleString()}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className={showFullDescription ? '' : 'line-clamp-3'}>
                            {carDetails.description}
                        </p>
                        {carDetails.description.length > 150 && (
                            <Button
                                variant="link"
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="p-0"
                            >
                                {showFullDescription ? 'Show less' : 'Read more'}
                            </Button>
                        )}

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <Speed className="mr-2 h-5 w-5" />
                                <span>{carDetails.specs.topSpeed}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                <span>{carDetails.specs.acceleration}</span>
                            </div>
                            <div className="flex items-center">
                                <Fuel className="mr-2 h-5 w-5" />
                                <span>{carDetails.specs.range}</span>
                            </div>
                            <div className="flex items-center">
                                <Settings className="mr-2 h-5 w-5" />
                                <span>{carDetails.specs.drive}</span>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold mb-2">Key Features</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {carDetails.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <Info className="mr-2 h-4 w-4" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Contact Seller</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
