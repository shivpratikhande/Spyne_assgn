'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// Mock data for demonstration
const mockCars = [
  { id: 1, name: 'Tesla Model S', year: 2022, price: 94990, image: '/placeholder.svg?height=200&width=300' },
  { id: 2, name: 'Ford Mustang', year: 2023, price: 27470, image: '/placeholder.svg?height=200&width=300' },
  { id: 3, name: 'Toyota Camry', year: 2023, price: 26420, image: '/placeholder.svg?height=200&width=300' },
  { id: 4, name: 'Honda Civic', year: 2023, price: 22550, image: '/placeholder.svg?height=200&width=300' },
  { id: 5, name: 'BMW 3 Series', year: 2023, price: 43300, image: '/placeholder.svg?height=200&width=300' },
]

export default function CarListPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCars = mockCars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">My Cars</h1>
      
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search cars..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map(car => (
          <Card key={car.id}>
            <CardHeader>
              <CardTitle>{car.name}</CardTitle>
              <CardDescription>{car.year}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-2xl font-bold">${car.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <p className="text-center text-gray-500">No cars found. Try a different search term.</p>
      )}
    </div>
  )
}