import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface Car {
  id: number;
  name: string;
  seller: string;
  price: string;
  status: string;
  date: string;
}

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/cars/") 
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cars");
        return res.json();
      })
      .then((data) => {
        // Adapt data mapping if backend fields differ
        const carsData = data.map((car: any) => ({
          id: car.id,
          name: car.name,
          seller: car.seller_name || car.seller,  // adjust to your API response
          price: car.price,
          status: car.status,
          date: new Date(car.created_at).toISOString().split("T")[0], // format to YYYY-MM-DD
        }));
        setAllCars(carsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter cars based on search and status
  const filteredCars = allCars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadPDFFromAPI = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:8000/api/cars/download/pdf/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "car_list.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />

      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rugike-primary">Car Management</h1>
          <div className="mt-4 md:mt-0">
            <Button className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90"
            onClick={handleDownloadPDFFromAPI}
            >
              Download Car List
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search cars by name or seller..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading && <p>Loading cars...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <Card>
            <CardHeader>
              <CardTitle>Cars ({filteredCars.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Car</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell className="font-medium">{car.name}</TableCell>
                      <TableCell>{car.seller}</TableCell>
                      <TableCell>{car.price}</TableCell>
                      <TableCell>{getStatusBadge(car.status)}</TableCell>
                      <TableCell>{car.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {car.status === "pending" && (
                            <>
                              <Button className="bg-green-600 hover:bg-green-700" size="sm">
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Cars;
