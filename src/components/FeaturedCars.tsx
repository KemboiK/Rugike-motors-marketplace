import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Fuel, Gauge, Car, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Car {
  id: number;
  name: string;
  images: { id: number; image: string }[];
  price: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel_type: string;
  views_count: number;
  status: string;
}

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cars/all/");
        if (!response.ok) throw new Error("Failed to fetch cars");
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError("Failed to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = activeTab === "all"
    ? cars
    : cars.filter(car => car.fuel_type === activeTab);

  if (loading) {
    return (
      <section className="py-20 bg-rugike-light">
        <div className="container-custom flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-rugike-primary" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-rugike-light">
        <div className="container-custom flex justify-center items-center h-64">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-rugike-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-rugike-primary mb-4">Featured Vehicles</h2>
            <p className="text-rugike-secondary max-w-xl">
              Discover our handpicked selection of premium vehicles, each thoroughly inspected and verified for quality.
            </p>
          </div>
          <Link to="/cars/all">
            <Button variant="outline" className="mt-4 md:mt-0 border-rugike-primary text-rugike-primary hover:bg-rugike-primary hover:text-white group">
              View All Cars
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-white grid grid-cols-2 md:grid-cols-5 gap-2 p-1 w-full md:w-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">All Cars</TabsTrigger>
            <TabsTrigger value="gasoline" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">Gasoline</TabsTrigger>
            <TabsTrigger value="diesel" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">Diesel</TabsTrigger>
            <TabsTrigger value="hybrid" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">Hybrid</TabsTrigger>
            <TabsTrigger value="electric" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">Electric</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}

              {filteredCars.length === 0 && (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-xl text-rugike-secondary">No cars found in this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const CarCard = ({ car }: { car: Car }) => {
  const imageUrl = car.images && car.images.length > 0
    ? `http://127.0.0.1:8000${car.images[0].image}`
    : "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80";

  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow group">
      <div className="relative h-60 overflow-hidden">
        <img
          src={imageUrl}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-rugike-primary text-white">
          Verified
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-rugike-primary">{car.name}</h3>
          <span className="text-xl font-bold text-rugike-accent">
            KES {Number(car.price).toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-rugike-secondary mb-4">
          <div className="flex items-center gap-1">
            <Car className="h-4 w-4 text-rugike-accent" />
            <span className="font-medium">{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4 text-rugike-accent" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Fuel className="h-4 w-4 text-rugike-accent" />
            <span>{car.fuel_type}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-rugike-secondary mb-4">
          <Eye className="h-4 w-4 text-rugike-accent" />
          <span>{car.views_count || 0} views</span>
        </div>

        <Link to={`/cars/${car.id}`}>
          <Button className="w-full bg-rugike-primary hover:bg-rugike-dark group">
            View Details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FeaturedCars;