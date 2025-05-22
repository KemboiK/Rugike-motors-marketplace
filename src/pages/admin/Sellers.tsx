
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sellers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data - in a real app, this would come from a database
  const sellers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Premium Motors",
      status: "active",
      totalCars: 12,
      joinDate: "2025-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      company: "Luxury Cars Inc.",
      status: "active",
      totalCars: 8,
      joinDate: "2025-02-23"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      company: "Auto Excellence",
      status: "inactive",
      totalCars: 5,
      joinDate: "2025-03-10"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      company: "Williams Auto",
      status: "pending",
      totalCars: 3,
      joinDate: "2025-05-01"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.b@example.com",
      company: "Brown's Cars",
      status: "active",
      totalCars: 7,
      joinDate: "2025-02-05"
    }
  ];
  
  // Filter sellers based on search
  const filteredSellers = sellers.filter(seller => 
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      
      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rugike-primary">Seller Management</h1>
          <div className="mt-4 md:mt-0">
            <Button className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90">
              Add New Seller
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search sellers by name, email or company..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sellers ({filteredSellers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seller</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Cars</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(seller.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{seller.name}</div>
                          <div className="text-sm text-muted-foreground">{seller.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{seller.company}</TableCell>
                    <TableCell>{seller.totalCars}</TableCell>
                    <TableCell>
                      {getStatusBadge(seller.status)}
                    </TableCell>
                    <TableCell>{seller.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        {seller.status === "pending" && (
                          <Button className="bg-green-600 hover:bg-green-700" size="sm">Approve</Button>
                        )}
                        {seller.status === "active" && (
                          <Button variant="destructive" size="sm">Deactivate</Button>
                        )}
                        {seller.status === "inactive" && (
                          <Button className="bg-green-600 hover:bg-green-700" size="sm">Activate</Button>
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

export default Sellers;
