'use client'

import { useState, useEffect } from 'react'
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
import axios from 'axios'

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
    const [details, setDetails] = useState<any>(null);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Set the value from slug when slug changes
    useEffect(() => {
        if (typeof slug === 'string') {
            setValue(slug);
        } else {
            setValue(null);  // Ensure value is null if slug is undefined or not a string
        }
    }, [slug]); // Trigger when `slug` changes

    useEffect(() => {
        if (value) {
            const fetchCars = async () => {
                try {
                    console.log("Fetching car details for:", value);
                    const response = await axios.get(`http://localhost:3000/api/cars/${value}`);
                    setDetails(response.data);  // Set the fetched car details
                    setLoading(false);          // Stop loading after fetching
                } catch (error) {
                    console.error('Error fetching cars:', error);
                    setError('Failed to fetch cars. Please try again later.');
                    setLoading(false);
                }
            };

            fetchCars();
        }
    }, [value]); 

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    console.log(details)
    // If details are successfully fetched, render the data
    return (
        <div className="container mx-auto p-4 space-y-6">
            <Button variant="ghost" className="mb-4" >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
            </Button>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <CardContent className="flex flex-col justify-between flex-grow">
                        {/* Render images if available */}
                        {details.images.length > 0 ? (
                            <div className="relative overflow-hidden" style={{ height: '550px' }}>
                                <img
                                    src={details.images[0]}
                                    alt={`Car Image`}
                                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg"
                                />
                            </div>
                        ) : (
                            <p>No images available</p>
                        )}
                    </CardContent>
                </div>

                <Card className=' h-[500px]'>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl">{details?.title || carDetails.name}</CardTitle>
                                <CardDescription className="text-xl">{details?.year || carDetails.year}</CardDescription>
                            </div>
                            <Badge variant="secondary" className="text-lg">
                                <DollarSign className="mr-1 h-4 w-4" />
                                {details?.price ? details.price.toLocaleString() : carDetails.price.toLocaleString()}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className={showFullDescription ? '' : 'line-clamp-3'}>
                            {details?.description || carDetails.description}
                        </p>
                        {details?.description && details.description.length > 150 && (
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
                                <span>{details?.specs?.topSpeed || carDetails.specs.topSpeed}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                <span>{details?.specs?.acceleration || carDetails.specs.acceleration}</span>
                            </div>
                            <div className="flex items-center">
                                <Fuel className="mr-2 h-5 w-5" />
                                <span>{details?.specs?.range || carDetails.specs.range}</span>
                            </div>
                            <div className="flex items-center">
                                <Settings className="mr-2 h-5 w-5" />
                                <span>{details?.specs?.drive || carDetails.specs.drive}</span>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold mb-2">Key Features</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {(details?.features || carDetails.features).map(({feature , index}) => (
                                    <li key={index} className="flex items-center">
                                        <Info className="mr-2 h-4 w-4" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Go Back</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
