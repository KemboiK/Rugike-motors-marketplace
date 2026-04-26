import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Car {
  id: number;
  name: string;
  seller: any;
  price: string;
  status: string;
  date: string;
}

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cars/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      const carsData = data.map((car: any) => ({
        id: car.id,
        name: car.name,
        seller: car.seller,
        price: car.price,
        status: car.status,
        date: new Date(car.created_at).toISOString().split("T")[0],
      }));
      setAllCars(carsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = allCars.filter((car) => {
    const sellerName = typeof car.seller === 'object' ? car.seller?.name : String(car.seller);
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sellerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cars/download/pdf/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to download PDF");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "car_list.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download PDF");
    }
  };

  const handleApprove = async (carId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cars/${carId}/approve/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to approve car");
      setAllCars((prev) =>
        prev.map((car) => (car.id === carId ? { ...car, status: "approved" } : car))
      );
      toast.success("Car approved successfully!");
    } catch (error) {
      toast.error("Failed to approve car");
    }
  };

  const handleReject = async (carId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cars/${carId}/reject/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to reject car");
      setAllCars((prev) =>
        prev.map((car) => (car.id === carId ? { ...car, status: "rejected" } : car))
      );
      toast.success("Car rejected.");
    } catch (error) {
      toast.error("Failed to reject car");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return <Badge className="bg-green-500">Approved</Badge>;
      case "pending": return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected": return <Badge className="bg-red-500">Rejected</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />

      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rugike-primary">Car Management</h1>
          <div className="mt-4 md:mt-0">
            <Button
              className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90"
              onClick={handleDownloadPDF}
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

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-rugike-primary" />
          </div>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
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
                      <TableCell>
                        {typeof car.seller === 'object' ? car.seller?.name : car.seller}
                      </TableCell>
                      <TableCell>KES {Number(car.price).toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(car.status)}</TableCell>
                      <TableCell>{car.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/cars/${car.id}`}>View</Link>
                          </Button>
                          {car.status === "pending" && (
                            <>
                              <Button
                                className="bg-green-600 hover:bg-green-700"
                                size="sm"
                                onClick={() => handleApprove(car.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleReject(car.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCars.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No cars found.
                      </TableCell>
                    </TableRow>
                  )}
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