
import { useState } from "react";
import SellerNavigation from "@/components/SellerNavigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { toast } from "sonner";

const AddCar = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [features, setFeatures] = useState({
    airConditioning: false,
    powerSteering: false,
    antiLockBraking: false,
    leatherSeats: false,
    sunroof: false,
    heatedSeats: false,
    navigation: false,
    bluetooth: false,
    parkingSensors: false,
    backupCamera: false,
  });
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [mileage, setMileage] = useState<number | undefined>();
  const [color, setColor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Limit to 10 images
      const selectedFiles = Array.from(e.target.files).slice(0, 10 - images.length);
      
      // Update state with new images
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
      
      // Create and store preview URLs
      const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    // Release URL object to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    // Remove from state
    setImages(images.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem("accessToken");
  if (!token) {
    toast.error("You must be logged in to submit a car.");
    return;
  }

  const formData = new FormData();
  formData.append("name", make);
  formData.append("model", model);
  formData.append("year", year?.toString() || "");
  formData.append("price", price?.toString() || "");
  formData.append("mileage", mileage?.toString() || "");
  formData.append("color", color);
  formData.append("transmission", transmission);
  formData.append("fuel_type", fuelType);
  formData.append("description", description);
  formData.append("phone", phone);
  formData.append("email", email);
  
  // Add boolean features
  Object.entries(features).forEach(([key, value]) => {
    formData.append(`features.${key}`, value.toString());
  });

  // Append images
  images.forEach((file, index) => {
    formData.append("images", file); // backend should expect "images" as a list
  });

  try {
    const res = await fetch("http://localhost:8000/api/cars/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      toast.success("Car submitted for review!");
    } else {
      const errorData = await res.json();
      toast.error(`Submission failed: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error("Network error:", error);
    toast.error("Network error occurred while submitting the car.");
  }
};

  
  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavigation />
      
      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold text-rugike-primary mb-8">Add New Car</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Car Details</CardTitle>
                <CardDescription>
                  Enter the basic information about your car
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" value={make} onChange={(e) => setMake(e.target.value)} placeholder="e.g. Toyota" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. Camry" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" value={year || ''} onChange={(e) => setYear(Number(e.target.value))} placeholder="e.g. 2023" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" type="number" value={price || ''} onChange={(e) => setPrice(Number(e.target.value))} placeholder="e.g. 25000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input id="mileage" type="number" value={mileage || ''} onChange={(e) => setMileage(Number(e.target.value))} placeholder="e.g. 15000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g. Silver" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <select 
                      id="transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select Transmission</option>
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <select 
                      id="fuelType" value={fuelType} onChange={(e) => setFuelType(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a detailed description of your car" 
                    className="min-h-32"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Car Features</CardTitle>
                <CardDescription>
                  Select all features that apply to your car
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(features).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={key} 
                        checked={value}
                        onCheckedChange={(checked) => {
                          setFeatures({
                            ...features,
                            [key]: checked === true ? true : false,
                          });
                        }}
                      />
                      <label
                        htmlFor={key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Car Images</CardTitle>
                <CardDescription>
                  Upload up to 10 high-quality images of your car (exterior, interior, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="car-images"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or JPEG (MAX. 10 Images)
                        </p>
                      </div>
                      <Input
                        id="car-images"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={images.length >= 10}
                      />
                    </label>
                  </div>
                  
                  {/* Preview Images */}
                  {previewUrls.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Selected Images ({previewUrls.length}/10):</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index}`}
                              className="h-32 w-full rounded-md object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seller Contact Information</CardTitle>
                <CardDescription>
                  Your contact information will only be shared with RUGIKE administrators.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel"value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+(254) 00-000-000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram (optional)</Label>
                    <Input id="instagram" placeholder="@yourusername" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter (optional)</Label>
                    <Input id="twitter" placeholder="@yourusername" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
                    <Input id="whatsapp" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="snapchat">Snapchat (optional)</Label>
                    <Input id="snapchat" placeholder="yourusername" />
                  </div>
                </div>
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox id="terms" required />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                      I understand that my contact information will only be shared with RUGIKE administrators.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">Cancel</Button>
              <Button type="submit" className="bg-rugike-primary text-white hover:bg-rugike-dark">
                Submit for Review
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddCar;
