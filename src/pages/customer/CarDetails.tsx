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
  Gauge,
  Loader2,
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
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [sendingInquiry, setSendingInquiry] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://127.0.0.1:8000/api/cars/all/${id}/`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`Error fetching car: ${response.statusText}`);

        const data = await response.json();
        setCarData(data);

        // Set first image as main image
        if (data.images && data.images.length > 0) {
          setMainImage(`http://127.0.0.1:8000${data.images[0].image}`);
        }
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
    toast[saved ? "info" : "success"](
      saved ? "Car removed from favorites." : "Car saved to favorites!"
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleContact = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login to contact the seller.");
      return;
    }

    if (!inquiryMessage.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    setSendingInquiry(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cars/${id}/inquire/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: inquiryMessage }),
      });

      if (!response.ok) throw new Error("Failed to send inquiry.");

      toast.success("Message sent to the seller!");
      setInquiryMessage("");
    } catch (err) {
      toast.error("Failed to contact the seller.");
    } finally {
      setSendingInquiry(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="container-custom py-8 flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-rugike-primary" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !carData) {
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
                    alt={carData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
              {carData.images && carData.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {carData.images.map((img: any, index: number) => (
                    <div
                      key={index}
                      className={`aspect-video bg-gray-100 rounded-md overflow-hidden cursor-pointer border-2 ${
                        mainImage === `http://127.0.0.1:8000${img.image}`
                          ? "border-rugike-accent"
                          : "border-transparent"
                      }`}
                      onClick={() => setMainImage(`http://127.0.0.1:8000${img.image}`)}
                    >
                      <img
                        src={`http://127.0.0.1:8000${img.image}`}
                        alt={`${carData.name} - View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
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
                <p className="text-gray-700 mb-6">{carData.description || "No description available."}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-rugike-primary" />
                    <span className="text-gray-700">{carData.year} {carData.make}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-rugike-primary" />
                    <span className="text-gray-700">{carData.mileage?.toLocaleString()} mi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-rugike-primary" />
                    <span className="text-gray-700">{carData.fuel_type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{carData.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{carData.color}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Features & Options</h2>
                {carData.features && carData.features.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                    {carData.features.map((feature: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No features listed.</p>
                )}
              </TabsContent>

              <TabsContent value="specs" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Vehicle Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Make", value: carData.make },
                    { label: "Model", value: carData.model },
                    { label: "Year", value: carData.year },
                    { label: "Mileage", value: `${carData.mileage?.toLocaleString()} mi` },
                    { label: "Fuel Type", value: carData.fuel_type },
                    { label: "Transmission", value: carData.transmission },
                    { label: "Color", value: carData.color },
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{spec.label}</span>
                      <span>{spec.value || "N/A"}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="seller" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Seller Information</h2>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-rugike-primary" />
                        <span>Member since: {carData.seller?.join_date || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-rugike-primary" />
                        <a href={`tel:${carData.phone}`} className="underline">
                          {carData.phone || "N/A"}
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

          {/* Sidebar */}
          <aside className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-3xl font-extrabold text-rugike-primary">
                    KES {Number(carData.price)?.toLocaleString() || "N/A"}
                  </h3>
                  <Badge className={carData.status === "approved" ? "bg-green-500" : "bg-yellow-500"}>
                    {carData.status}
                  </Badge>
                </div>

                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={handleSave}
                    variant={saved ? "destructive" : "outline"}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Heart className="h-5 w-5" />
                    {saved ? "Saved" : "Save"}
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>

                {/* Inquiry Form */}
                <div className="space-y-3">
                  <textarea
                    className="w-full border rounded-md p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-rugike-primary"
                    placeholder="Write a message to the seller..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                  <Button
                    onClick={handleContact}
                    className="w-full bg-rugike-primary hover:bg-rugike-dark"
                    disabled={sendingInquiry}
                  >
                    {sendingInquiry ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Chatbot variant="buyer" />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CarDetails;