'use client'

import { useState, useEffect } from 'react'
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
import Image from 'next/image'

// Define the types for the fetched car details
interface CarSpecs {
  range: string;
  topSpeed: string;
  acceleration: string;
  drive: string;
  peakPower: string;
}

interface CarDetails {
  id: number;
  name: string;
  year: number;
  price: number;
  image: string;
  description: string;
  specs: CarSpecs;
  features: string[];
  images: string[]; // Add the images property as an array of strings
}

export default function CarDetailPage() {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [value, setValue] = useState<string | null>(null);
  const { slug } = useParams();
  const [details, setDetails] = useState<CarDetails | null>(null); // Update to use CarDetails type
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

  // If details are successfully fetched, render the data
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <CardContent className="flex flex-col justify-between flex-grow">
            {/* Render images if available */}
            {details?.images && details.images.length > 0 ? (
              <div className="relative overflow-hidden" style={{ height: '550px' }}>
                <Image
                  src={details.images[0]}
                  alt="Car Image"
                  width={720}
                  height={500}
                  className=" object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg"
                />
              </div>
            ) : (
              <p>No images available</p>
            )}
          </CardContent>
        </div>

        <Card className='h-[500px]'>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{details?.name || 'Car Name'}</CardTitle>
                <CardDescription className="text-xl">{details?.year || 'Year'}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg">
                <DollarSign className="mr-1 h-4 w-4" />
                {details?.price ? details.price.toLocaleString() : 'Price'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className={showFullDescription ? '' : 'line-clamp-3'}>
              {details?.description || 'Description not available'}
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
                <span>{details?.specs?.topSpeed || 'Top Speed'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{details?.specs?.acceleration || 'Acceleration'}</span>
              </div>
              <div className="flex items-center">
                <Fuel className="mr-2 h-5 w-5" />
                <span>{details?.specs?.range || 'Range'}</span>
              </div>
              <div className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                <span>{details?.specs?.drive || 'Drive'}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {/* Add proper type to the features mapping */}
                {(details?.features || []).map((feature, index) => (
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
