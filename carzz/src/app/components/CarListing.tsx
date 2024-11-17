"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, PenTool } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import ToggleButton from "@/components/ui/ToggleButton";

interface Car {
    _id: number;
    title: string;
    description: string;
    images: string[];
}

import { useRouter } from "next/navigation";

export default function CarListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCar, setCurrentCar] = useState<Car | null>(null);
    const [updatedCar, setUpdatedCar] = useState<Car | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState<Car | null>(null);

    const router = useRouter();

    const filteredCars = cars.filter((car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const reversedCars = [...filteredCars].reverse();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get<Car[]>("http://192.168.1.12:3000/api/cars");
                setCars(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cars:", error);
                setError("Failed to fetch cars. Please try again later.");
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Open the edit modal
    const openEditModal = (car: Car) => {
        setCurrentCar(car);
        setUpdatedCar({ ...car }); // Initialize updatedCar with current car data
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setUpdatedCar(null); // Reset updatedCar when closing the modal
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Car
    ) => {
        if (updatedCar) {
            setUpdatedCar({
                ...updatedCar,
                [field]:
                    field === "images"
                        ? e.target.value.split(",").map((url) => url.trim())
                        : e.target.value,
            });
        }
    };

    const handleUpdateCar = async () => {
        if (!updatedCar || !updatedCar._id) {
            setError("Car ID is missing. Please try again.");
            return;
        }

        try {
            const response = await axios.put(
                `http://192.168.1.12:3000/api/cars/${updatedCar._id}`,
                updatedCar
            );
            setCars(cars.map((car) => (car._id === updatedCar._id ? response.data : car)));
            closeEditModal();
        } catch (error) {
            console.error("Error updating car:", error);
            setError("Failed to update car. Please try again later.");
        }
    };

    // Open the delete confirmation modal
    const openDeleteModal = (car: Car) => {
        setCarToDelete(car);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        if (!carToDelete) return;

        try {
            await axios.delete(`http://192.168.1.12:3000/api/cars/${carToDelete._id}`);
            setCars(cars.filter((car) => car._id !== carToDelete._id));
            closeDeleteModal();
        } catch (error) {
            console.error("Error deleting car:", error);
            setError("Failed to delete car. Please try again later.");
        }
    };

    const handleView = async (userId: number) => {
        router.push(`/pages/mycars/cardetails/${userId}`);
    };

    return (
        <div className="container mx-auto p-4 space-y-6 mt-12">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">My Cars Collection</h1>
                <ToggleButton />
            </div>

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

            {loading && <p className="text-center text-gray-500">Loading cars...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reversedCars.map((car) => (
                    <div className="relative" key={car._id}>
                        <Card className="h-full flex flex-col pt-5">
                            <CardContent>
                                {car.images.length > 0 ? (
                                    <img
                                        src={car.images[0]}
                                        alt="Car"
                                        className="w-full h-56 object-cover rounded-lg"
                                    />
                                ) : (
                                    <p>No images available</p>
                                )}
                            </CardContent>
                            <CardHeader>
                                <CardTitle>{car.title}</CardTitle>
                                <CardDescription>{car.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button onClick={() => handleView(car._id)}>View Details</Button>
                            </CardFooter>
                        </Card>

                        <Button
                            onClick={() => openEditModal(car)}
                            variant="outline"
                            className="absolute top-2 right-16"
                        >
                            <PenTool size={16} />
                        </Button>
                        <Button
                            onClick={() => openDeleteModal(car)}
                            variant="outline"
                            className="absolute top-2 right-2"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && updatedCar && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Car</h2>
                        <div>uploads/7872733c3b325dc692e26de6cdae30b4
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <Input
                                type="text"
                                value={updatedCar.title}
                                onChange={(e) => handleInputChange(e, "title")}
                                className="mt-1"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <Input
                                type="text"
                                value={updatedCar.description}
                                onChange={(e) => handleInputChange(e, "description")}
                                className="mt-1"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Images (comma separated)</label>
                            <Input
                                type="text"
                                value={updatedCar.images.join(", ")}
                                onChange={(e) => handleInputChange(e, "images")}
                                className="mt-1"
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button onClick={closeEditModal} variant="outline">
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateCar} className="bg-blue-500 text-white">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && carToDelete && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Delete Confirmation</h2>
                        <p>Are you sure you want to delete the car "{carToDelete.title}"?</p>
                        <div className="flex justify-between mt-4">
                            <Button onClick={closeDeleteModal} variant="outline">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} className="bg-red-500 text-white">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
