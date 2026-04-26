import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerNavigation from "@/components/SellerNavigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AddCar = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
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

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    transmission: "",
    fuelType: "",
    description: "",
    phone: "",
    email: "",
    instagram: "",
    twitter: "",
    whatsapp: "",
    snapchat: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 10 - images.length);
      setImages((prev) => [...prev, ...selectedFiles]);
      const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
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

    setSubmitting(true);

    const data = new FormData();
    data.append("name", `${formData.year} ${formData.make} ${formData.model}`);
    data.append("make", formData.make);
    data.append("model", formData.model);
    data.append("year", formData.year);
    data.append("price", formData.price);
    data.append("mileage", formData.mileage);
    data.append("color", formData.color);
    data.append("transmission", formData.transmission);
    data.append("fuel_type", formData.fuelType);
    data.append("description", formData.description);
    data.append("phone", formData.phone);
    data.append("whatsapp", formData.whatsapp);
    data.append("instagram", formData.instagram);
    data.append("twitter", formData.twitter);
    data.append("snapchat", formData.snapchat);

    // Send selected features as feature_list
    const selectedFeatures = Object.entries(features)
      .filter(([_, value]) => value)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim());

    selectedFeatures.forEach((feature) => {
      data.append("feature_list", feature);
    });

    // Append images
    images.forEach((file) => {
      data.append("uploaded_images", file);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cars/add/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        toast.success("Car submitted for review!");
        navigate("/seller/my-cars");
      } else {
        const errorData = await response.json();
        toast.error(`Submission failed: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      toast.error("Network error occurred while submitting the car.");
    } finally {
      setSubmitting(false);
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
                <CardDescription>Enter the basic information about your car</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" value={formData.make} onChange={handleChange} placeholder="e.g. Toyota" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" value={formData.model} onChange={handleChange} placeholder="e.g. Camry" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" value={formData.year} onChange={handleChange} placeholder="e.g. 2023" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (KES)</Label>
                    <Input id="price" type="number" value={formData.price} onChange={handleChange} placeholder="e.g. 2500000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input id="mileage" type="number" value={formData.mileage} onChange={handleChange} placeholder="e.g. 15000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" value={formData.color} onChange={handleChange} placeholder="e.g. Silver" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <select
                      id="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
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
                      id="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
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
                    value={formData.description}
                    onChange={handleChange}
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
                <CardDescription>Select all features that apply to your car</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(features).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) =>
                          setFeatures({ ...features, [key]: checked === true })
                        }
                      />
                      <label htmlFor={key} className="text-sm font-medium leading-none">
                        {key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, (str) => str.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Car Images</CardTitle>
                <CardDescription>Upload up to 10 high-quality images of your car</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="car-images"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10 Images)</p>
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

                  {previewUrls.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Selected Images ({previewUrls.length}/10):</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img src={url} alt={`Preview ${index}`} className="h-32 w-full rounded-md object-cover" />
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
                <CardDescription>Your contact information will only be shared with RUGIKE administrators.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+(254) 00-000-000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram (optional)</Label>
                    <Input id="instagram" value={formData.instagram} onChange={handleChange} placeholder="@yourusername" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter (optional)</Label>
                    <Input id="twitter" value={formData.twitter} onChange={handleChange} placeholder="@yourusername" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
                    <Input id="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+(254) 00-000-000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="snapchat">Snapchat (optional)</Label>
                    <Input id="snapchat" value={formData.snapchat} onChange={handleChange} placeholder="yourusername" />
                  </div>
                </div>
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox id="terms" required />
                  <div className="grid gap-1.5 leading-none">
                    <label htmlFor="terms" className="text-sm font-medium leading-none">
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
              <Button variant="outline" type="button" onClick={() => navigate("/seller/dashboard")}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-rugike-primary text-white hover:bg-rugike-dark"
                disabled={submitting}
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting...</>
                ) : (
                  "Submit for Review"
                )}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddCar;