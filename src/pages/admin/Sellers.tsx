import { useEffect, useState } from "react";
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch sellers from backend
  useEffect(() => {
    setLoading(true);
    fetch("/api/sellers/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sellers");
        return res.json();
      })
      .then((data) => {
        setSellers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Update seller status helper
  const updateSellerStatus = async (id, action) => {
    try {
      const res = await fetch(`/api/sellers/${id}/${action}/`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`Failed to ${action} seller`);
      // Update local state on success
      setSellers((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: action === "approve" || action === "activate" ? "active" : "inactive" } : s
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter sellers
  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
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

        {loading && <p>Loading sellers...</p>}
        {error && <p className="text-red-500">{error}</p>}

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
                    <TableCell>{seller.total_cars}</TableCell>
                    <TableCell>{getStatusBadge(seller.status)}</TableCell>
                    <TableCell>{seller.join_date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {seller.status === "pending" && (
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                            onClick={() => updateSellerStatus(seller.id, "approve")}
                          >
                            Approve
                          </Button>
                        )}
                        {seller.status === "active" && (
                          <Button variant="destructive" size="sm" onClick={() => updateSellerStatus(seller.id, "deactivate")}>
                            Deactivate
                          </Button>
                        )}
                        {seller.status === "inactive" && (
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                            onClick={() => updateSellerStatus(seller.id, "activate")}
                          >
                            Activate
                          </Button>
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
