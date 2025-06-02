import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2,
  Car,
  Fuel,
  Users,
  Gauge,
} from "lucide-react";
import { toast } from "sonner";
import Chatbot from "@/components/Chatbot";

const CarDetails = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("access");

        const response = await fetch(`/api/cars/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching car data: ${response.statusText}`);
        }

        const data = await response.json();
        setCarData(data);
        setMainImage(data.images && data.images.length > 0 ? data.images[0] : "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

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

const handleContact = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await fetch(`/api/inquiries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ car: carData.id }),
    });

    if (!response.ok) {
      throw new Error("Failed to send inquiry.");
    }

    toast.success("Message sent to the seller!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to contact the seller.");
  }
};


  if (loading) {
    return (
      <>
        <Navigation />
        <main className="container-custom py-8">
          <p>Loading car details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <main className="container-custom py-8">
          <p className="text-red-600">Failed to load car details: {error}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!carData) {
    return (
      <>
        <Navigation />
        <main className="container-custom py-8">
          <p>No car data available.</p>
        </main>
        <Footer />
      </>
    );
  }

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
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={carData.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {carData.images?.map((img: string, index: number) => (
                  <div
                    key={index}
                    className={`aspect-video bg-gray-100 rounded-md overflow-hidden cursor-pointer border-2 ${
                      mainImage === img ? "border-rugike-accent" : "border-transparent"
                    }`}
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
                <p className="text-gray-700 mb-6">{carData.description}</p>
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
                    {/* transmission icon */}
                    <svg
                      className="h-5 w-5 text-rugike-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                    <span className="text-gray-700">{carData.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-rugike-primary" />
                    <span className="text-gray-700">{carData.seating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* warranty icon */}
                    <svg
                      className="h-5 w-5 text-rugike-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-gray-700">Vehicle Warranty</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Features & Options</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                  {carData.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                    <span className="font-medium">Mileage</span>
                    <span>{carData.mileage}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Fuel Type</span>
                    <span>{carData.fuelType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Transmission</span>
                    <span>{carData.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Seating Capacity</span>
                    <span>{carData.seating}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seller" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Seller Information</h2>
                <Card>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-rugike-primary" />
                        <span>Member since: {carData.seller?.memberSince || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-rugike-primary" />
                        <a href={`tel:${carData.seller?.phone}`} className="underline">
                          {carData.seller?.phone || "N/A"}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-rugike-primary" />
                        <a href={`mailto:${carData.seller?.email}`} className="underline">
                          {carData.seller?.email || "N/A"}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar with Price and Actions */}
          <aside className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardContent>
                <h3 className="text-3xl font-extrabold text-rugike-primary mb-2">
                  ${carData.price?.toLocaleString() || "N/A"}
                </h3>
                <Button
                  onClick={handleSave}
                  variant={saved ? "destructive" : "default"}
                  className="w-full mb-3 flex items-center justify-center gap-2"
                >
                  <Heart className="h-5 w-5" />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full mb-3 flex items-center justify-center gap-2"
                >
                  <Share2 className="h-5 w-5" />
                  Share
                </Button>
                <Button
                  onClick={handleContact}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Contact Seller
                </Button>
              </CardContent>
            </Card>

            <Chatbot />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CarDetails;
