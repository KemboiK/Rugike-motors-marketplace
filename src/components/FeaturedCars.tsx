import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Fuel, Gauge, Car, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Car {
  id: number;
  name: string;
  image: string;
  price: string;
  year: number;
  mileage: string;
  transmission: string;
  fuelType?: string;
  category?: string;
  verified: boolean;
  featured?: boolean;
  viewCount?: number;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Mercedes-Benz E-Class",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$42,500",
    year: 2023,
    mileage: "15,000 mi",
    transmission: "Automatic",
    fuelType: "Gasoline",
    category: "luxury",
    verified: true,
    featured: true,
    viewCount: 245
  },
  {
    id: 2,
    name: "BMW 5 Series",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$38,900",
    year: 2022,
    mileage: "22,300 mi",
    transmission: "Automatic",
    fuelType: "Hybrid",
    category: "luxury",
    verified: true,
    viewCount: 187
  },
  {
    id: 3,
    name: "Audi A6",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0abd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$37,800",
    year: 2023,
    mileage: "18,700 mi",
    transmission: "Automatic",
    fuelType: "Diesel",
    category: "luxury",
    verified: true,
    featured: true,
    viewCount: 203
  },
  {
    id: 4,
    name: "Toyota RAV4",
    image: "https://images.unsplash.com/photo-1568844293986-8c2587ab9651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$29,500",
    year: 2022,
    mileage: "25,400 mi",
    transmission: "Automatic",
    fuelType: "Hybrid",
    category: "suv",
    verified: true,
    viewCount: 156
  },
  {
    id: 5,
    name: "Tesla Model 3",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$45,700",
    year: 2023,
    mileage: "9,800 mi",
    transmission: "Automatic",
    fuelType: "Electric",
    category: "electric",
    verified: true,
    featured: true,
    viewCount: 312
  },
  {
    id: 6,
    name: "Honda Civic",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: "$23,900",
    year: 2022,
    mileage: "28,700 mi",
    transmission: "Manual",
    fuelType: "Gasoline",
    category: "sedan",
    verified: true,
    viewCount: 134
  }
];

const FeaturedCars = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter cars based on the active tab category
  const filteredCars = activeTab === "all" 
    ? cars 
    : cars.filter(car => car.category === activeTab);

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
          <Link to="#">
            <Button variant="outline" className="mt-4 md:mt-0 border-rugike-primary text-rugike-primary hover:bg-rugike-primary hover:text-white group">
              View All Cars
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-white grid grid-cols-2 md:grid-cols-5 gap-2 p-1 w-full md:w-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">All Cars</TabsTrigger>
            <TabsTrigger value="luxury" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">Luxury</TabsTrigger>
            <TabsTrigger value="suv" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">SUV</TabsTrigger>
            <TabsTrigger value="sedan" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">Sedan</TabsTrigger>
            <TabsTrigger value="electric" className="data-[state=active]:bg-rugike-accent data-[state=active]:text-rugike-primary">Electric</TabsTrigger>
          </TabsList>
          
          {/* Simplified TabsContent structure - just use one content area that displays filtered cars */}
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
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow group">
      <div className="relative h-60 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {car.featured && (
          <Badge className="absolute top-3 right-3 bg-rugike-accent text-rugike-primary">
            Featured
          </Badge>
        )}
        {car.verified && (
          <Badge className="absolute top-3 left-3 bg-rugike-primary text-white">
            Verified
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-rugike-primary">{car.name}</h3>
          <span className="text-xl font-bold text-rugike-accent">{car.price}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-rugike-secondary mb-4">
          <div className="flex items-center gap-1">
            <Car className="h-4 w-4 text-rugike-accent" />
            <span className="font-medium">{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4 text-rugike-accent" />
            <span>{car.mileage}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span>{car.transmission}</span>
          </div>
          {car.fuelType && (
            <div className="flex items-center gap-1 text-sm">
              <Fuel className="h-4 w-4 text-rugike-accent" />
              <span>{car.fuelType}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-sm text-rugike-secondary mb-4">
          <Eye className="h-4 w-4 text-rugike-accent" />
          <span>{car.viewCount || 0} views</span>
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
