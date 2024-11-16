'use client';

import { useEffect, useState } from 'react';
import { Search, Trash2, PenTool } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import axios from 'axios';
import ToggleButton from '@/components/ui/ToggleButton';

// Interface to include images
interface Car {
    _id: number;
    title: string;
    description: string;
    images: string[];
}

export default function CarListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State to manage modal visibility and current car being edited
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCar, setCurrentCar] = useState<Car | null>(null);
    const [updatedCar, setUpdatedCar] = useState<Car | null>(null);

    // Filtering cars based on the search term
    const filteredCars = cars.filter((car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reverse the filtered cars array
    const reversedCars = [...filteredCars].reverse();

    // Fetch cars from the API
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get<Car[]>('http://192.168.1.12:3000/api/cars');
                setCars(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cars:', error);
                setError('Failed to fetch cars. Please try again later.');
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Open the modal for editing a car and populate the updatedCar state
    const openModal = (car: Car) => {
        console.log("Opening modal for car:", car); // Debugging log
        setCurrentCar(car); // Set the selected car
        setUpdatedCar({ ...car }); // Set initial values for the modal (including id)
        setIsModalOpen(true); // Open the modal
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle input changes for title, description, and images in the modal
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Car
    ) => {
        if (updatedCar) {
            console.log("Updating field:", field, "with value:", e.target.value); // Debugging log
            setUpdatedCar({
                ...updatedCar,
                [field]:
                    field === 'images'
                        ? e.target.value.split(',').map((url) => url.trim()) // Handle images field
                        : e.target.value, // Update other fields
            });
        }
    };

    // Handle car update after the user edits it
    const handleUpdateCar = async () => {
        if (!updatedCar || !updatedCar._id) {
            console.error("Car ID is missing:", updatedCar); // Debugging log
            setError('Car ID is missing. Please try again.');
            return;
        }

        console.log("Updating car with ID:", updatedCar._id); // Debugging log
        try {
            const response = await axios.put(
                `http://192.168.1.12:3000/api/cars/${updatedCar._id}`,
                updatedCar
            );
            console.log("Car updated:", response.data); // Debugging log
            // Update the cars list with the updated car data
            setCars(cars.map((car) => (car._id === updatedCar._id ? response.data : car)));
            closeModal(); // Close the modal after update
        } catch (error) {
            console.error('Error updating car:', error);
            setError('Failed to update car. Please try again later.');
        }
    };

    // Handle car deletion
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://192.168.1.12:3000/api/cars/${id}`);
            setCars(cars.filter((car) => car._id !== id));
        } catch (error) {
            console.error('Error deleting car:', error);
            setError('Failed to delete car. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-4 space-y-6 mt-12">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">My Cars Collection</h1>
                <ToggleButton />
            </div>

            {/* Search bar with icon */}
            <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                    type="text"
                    placeholder="Search cars..."
                    className="pl-16 rounded-xl py-5"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Loading state */}
            {loading && <p className="text-center text-gray-500">Loading cars...</p>}

            {/* Error handling */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Render filtered and reversed cars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reversedCars.length === 0 && !loading && !error && (
                    <p className="text-center text-gray-500">No cars found. Try a different search term.</p>
                )}

                {reversedCars.map((car) => (
                    <div className="relative" key={car._id}> {/* Use car.id as the key */}
                        {/* Card Content */}
                        <Card className="h-full flex flex-col pt-5">
                            <CardContent className="flex flex-col justify-between flex-grow">
                                {/* Render images if available */}
                                {car.images.length > 0 ? (
                                    <div className="relative overflow-hidden" style={{ height: '250px' }}>
                                        <img
                                            src={`http://localhost:3000/${car.images[0]}`}
                                            alt={`Car Image`}
                                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg"
                                        />
                                    </div>
                                ) : (
                                    <p>No images available</p>
                                )}
                            </CardContent>
                            <CardHeader>
                                <CardTitle>{car.title}</CardTitle>
                                <CardDescription>{car.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full hover:bg-transparent hover:bg-teal-900">
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Edit button */}
                        <Button
                            onClick={() => openModal(car)}
                            variant="outline"
                            className="absolute top-2 right-12 p-2 mx-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
                        >
                            <PenTool className="mr-2" size={16} />
                        </Button>

                        {/* Delete button */}
                        <Button
                            onClick={() => handleDelete(car.id)}
                            variant="outline"
                            className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
                        >
                            <Trash2 className="mr-2" size={16} />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {isModalOpen && currentCar && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Car</h2>

                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={updatedCar?.title || ''}
                                    onChange={(e) => handleInputChange(e, 'title')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={updatedCar?.description || ''}
                                    onChange={(e) => handleInputChange(e, 'description')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows={4}
                                />
                            </div>

                            {/* Images */}
                            <div>
                                <label htmlFor="images" className="block text-sm font-semibold">
                                    Images (URLs, comma separated)
                                </label>
                                <input
                                    type="text"
                                    id="images"
                                    value={updatedCar?.images.join(', ') || ''}
                                    onChange={(e) => handleInputChange(e, 'images')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex justify-between mt-4">
                                <Button onClick={closeModal} variant="outline">
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdateCar}>Save Changes</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
