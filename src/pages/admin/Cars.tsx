
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sample data - in a real app, this would come from a database
  const allCars = [
    {
      id: 1,
      name: "BMW X5 2023",
      seller: "John Doe",
      price: "$45,000",
      status: "approved",
      date: "2025-04-10"
    },
    {
      id: 2,
      name: "Mercedes E-Class 2022",
      seller: "Jane Smith",
      price: "$38,900",
      status: "pending",
      date: "2025-05-11"
    },
    {
      id: 3,
      name: "Audi Q7 2024",
      seller: "Mike Johnson",
      price: "$52,500",
      status: "pending",
      date: "2025-05-12"
    },
    {
      id: 4,
      name: "Toyota Camry 2023",
      seller: "Sarah Williams",
      price: "$27,800",
      status: "approved",
      date: "2025-04-25"
    },
    {
      id: 5,
      name: "Honda Civic 2024",
      seller: "David Brown",
      price: "$24,500",
      status: "rejected",
      date: "2025-05-05"
    }
  ];
  
  // Filter cars based on search and status
  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         car.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
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
            <Button className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90">
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
                    <TableCell>
                      {getStatusBadge(car.status)}
                    </TableCell>
                    <TableCell>{car.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        {car.status === "pending" && (
                          <>
                            <Button className="bg-green-600 hover:bg-green-700" size="sm">Approve</Button>
                            <Button variant="destructive" size="sm">Reject</Button>
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
      </main>
    </div>
  );
};

export default Cars;
