import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Fuel, Gauge, Car, Eye, Search, Loader2 } from "lucide-react";

import { useSearchParams } from "react-router-dom";

const CarListing = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) setFilter(filterParam);

    // Reads ?search= from Navigation
    const searchParam = searchParams.get("search");
    if (searchParam) setSearchTerm(searchParam);
  }, [searchParams]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cars/all/");
        if (!response.ok) throw new Error("Failed to fetch cars");
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError("Failed to load cars.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "premium") return matchesSearch && Number(car.price) >= 3000000;
    if (filter === "budget") return matchesSearch && Number(car.price) < 3000000;
    if (filter === "new") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return matchesSearch && new Date(car.created_at) >= oneMonthAgo;
    }
    return matchesSearch;
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-rugike-light">

        {/* Header */}
        <div className="bg-rugike-primary text-white py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">
              {filter === "premium" && "Premium Vehicles"}
              {filter === "budget" && "Budget Friendly Cars"}
              {filter === "new" && "New Arrivals"}
              {filter === "all" && "Browse All Cars"}
            </h1>
            <p className="text-rugike-secondary text-lg">
              {filteredCars.length} vehicles available
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by make, model or name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "All Cars", value: "all" },
                { label: "Premium", value: "premium" },
                { label: "Budget Friendly", value: "budget" },
                { label: "New Arrivals", value: "new" },
              ].map((f) => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? "default" : "outline"}
                  className={filter === f.value ? "bg-rugike-primary text-white" : ""}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Cars Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-rugike-primary" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car) => {
                  const imageUrl =
                    car.images && car.images.length > 0
                      ? `http://127.0.0.1:8000${car.images[0].image}`
                      : "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80";

                  return (
                    <Card key={car.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow group">
                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={car.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Badge className="absolute top-3 left-3 bg-rugike-primary text-white">
                          Verified
                        </Badge>
                        {Number(car.price) >= 3000000 && (
                          <Badge className="absolute top-3 right-3 bg-rugike-accent text-rugike-primary">
                            Premium
                          </Badge>
                        )}
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
                            <span>{car.mileage?.toLocaleString()} mi</span>
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
                })}
              </div>

              {filteredCars.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-rugike-secondary">No cars found matching your search.</p>
                  <Button className="mt-4" onClick={() => { setSearchTerm(""); setFilter("all"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CarListing;