'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Upload, X } from 'lucide-react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '../../components/ui/textarea'
// Correct for named export
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Toast } from '../../components/ui/toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  image: z.instanceof(File).refine((file) => file.size <= 15000000, {
    message: 'Image must be less than 5MB.',
  }),
})

export default function ProductCreationForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [responseValue, setResponseValue] = useState<any>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Prepare form data
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('images', values.image)
    formData.append('tags', "tags") // Add tags as needed

    try {
      // Send the form data to the backend
      const response = await axios.post('http://192.168.1.12:3000/api/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })

      // If the request is successful
      console.log(response.data)
      setResponseValue(response.data)

      // Display success toast
      

      // Redirect to /home after successful form submission
      router.push('/pages/mycars')
    } catch (error) {
      console.error('Error creating product:', error)
      // Optionally handle errors and show an error message
      
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('image', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Create New Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product title" {...field} />
                </FormControl>
                <FormDescription>
                  Give your product a clear and concise title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your product"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      multiple
                      {...field}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </label>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload a high-quality image of your product (max 5MB).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Product preview"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <Button type="submit">Create Product</Button>
        </form>
      </Form>
    </div>
  )
}