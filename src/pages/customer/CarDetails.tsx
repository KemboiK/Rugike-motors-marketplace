
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Mail, Heart, Share2, Car, Fuel, Users, Gauge, Clock } from "lucide-react";
import { toast } from "sonner";
import Chatbot from "@/components/Chatbot";

const carData = {
  id: 1,
  title: "Mercedes-Benz C-Class 2023",
  price: "$45,800",
  location: "New York, NY",
  condition: "New",
  year: "2023",
  make: "Mercedes-Benz",
  model: "C-Class",
  mileage: "0 miles",
  engineType: "2.0L Turbo Inline-4",
  transmission: "9-Speed Automatic",
  exteriorColor: "Polar White",
  interiorColor: "Black",
  fuelType: "Gasoline",
  mpg: "25 city / 35 highway",
  seating: "5 passengers",
  description: "Experience the perfect blend of luxury and performance with this brand new 2023 Mercedes-Benz C-Class. With its sleek design, cutting-edge technology, and powerful engine, this vehicle offers an unparalleled driving experience. The interior features premium materials, advanced infotainment system, and comfortable seating for five passengers. Safety features include adaptive cruise control, lane keeping assist, and automatic emergency braking. This is the perfect car for those who demand the best in luxury and performance.",
  features: [
    "Leather Seats",
    "Sunroof/Moonroof",
    "Navigation System",
    "Bluetooth",
    "Backup Camera",
    "Parking Sensors",
    "Blind Spot Monitoring",
    "Heated Seats",
    "Apple CarPlay/Android Auto",
    "Premium Sound System",
    "Keyless Entry",
    "Push Button Start",
    "Memory Seats",
    "Wireless Charging",
    "Adaptive Cruise Control"
  ],
  seller: {
    name: "Luxury Auto Group",
    rating: 4.8,
    reviewCount: 124,
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    email: "sales@luxuryautogroup.com"
  },
  images: [
    "https://source.unsplash.com/random/800x600/?mercedes,cclass",
    "https://source.unsplash.com/random/800x600/?mercedes,interior",
    "https://source.unsplash.com/random/800x600/?mercedes,front",
    "https://source.unsplash.com/random/800x600/?mercedes,back",
    "https://source.unsplash.com/random/800x600/?mercedes,wheel"
  ]
};

const CarDetails = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(carData.images[0]);
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast.success("Car saved to favorites!");
    } else {
      toast.info("Car removed from favorites.");
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };
  
  const handleContact = () => {
    toast.success("Message sent to the seller!");
  };

  return (
    <>
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Car Images and Details */}
          <div className="w-full md:w-2/3 space-y-8">
            {/* Images Gallery */}
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={mainImage} 
                  alt={carData.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {carData.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`aspect-video bg-gray-100 rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-rugike-accent' : 'border-transparent'}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${carData.title} - View ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Car Information Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="seller">Seller Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Vehicle Description</h2>
                <p className="text-gray-700 mb-6">
                  {carData.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-rugike-primary" />
                    <span className="text-gray-700">{carData.year} {carData.make}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-rugike-primary" />
                    <span className="text-gray-700">{carData.mileage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-rugike-primary" />
                    <span className="text-gray-700">{carData.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-rugike-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span className="text-gray-700">{carData.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-rugike-primary" />
                    <span className="text-gray-700">{carData.seating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-rugike-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gray-700">Vehicle Warranty</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Features & Options</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                  {carData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Vehicle Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Make</span>
                    <span>{carData.make}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Model</span>
                    <span>{carData.model}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Year</span>
                    <span>{carData.year}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Condition</span>
                    <span>{carData.condition}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Mileage</span>
                    <span>{carData.mileage}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Fuel Type</span>
                    <span>{carData.fuelType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">MPG</span>
                    <span>{carData.mpg}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Engine</span>
                    <span>{carData.engineType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Transmission</span>
                    <span>{carData.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Exterior Color</span>
                    <span>{carData.exteriorColor}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Interior Color</span>
                    <span>{carData.interiorColor}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Seating</span>
                    <span>{carData.seating}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="seller" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">About the Seller</h2>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-rugike-primary text-white flex items-center justify-center text-2xl font-bold mr-4">
                    {carData.seller.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{carData.seller.name}</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(carData.seller.rating) ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        ({carData.seller.rating}) · {carData.seller.reviewCount} reviews
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{carData.seller.location}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-rugike-primary mr-2" />
                    <span>{carData.seller.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-rugike-primary mr-2" />
                    <span>{carData.seller.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-rugike-primary mr-2" />
                    <span>Typically responds within 1 hour</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Price and Contact */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-24">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold">{carData.title}</h1>
                      <p className="text-gray-500">{carData.location}</p>
                    </div>
                    <Badge className="bg-rugike-accent text-rugike-primary">{carData.condition}</Badge>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-rugike-primary mb-1">{carData.price}</div>
                    <p className="text-sm text-gray-500">Plus applicable taxes and fees</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-rugike-primary hover:bg-rugike-dark">
                      Contact Seller
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleContact}>
                      Request More Info
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <span className="flex items-center justify-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Test Drive
                      </span>
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleSave}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                        {saved ? 'Saved' : 'Save'}
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Chatbot variant="buyer" />
    </>
  );
};

export default CarDetails;
