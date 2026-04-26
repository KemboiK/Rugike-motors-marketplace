import { toast } from "sonner";
import { useEffect, useState } from "react";
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Seller {
  id: number;
  name: string;
  email: string;
  company: string;
  total_cars: number;
  status: string;
  joinDate: string;
}

const Sellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const token = localStorage.getItem("accessToken");

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/sellers/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch sellers");
      const data = await response.json();
      setSellers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const updateSellerStatus = async (id: number, action: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/sellers/${id}/${action}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`Failed to ${action} seller`);
      setSellers((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: action === "approve" || action === "activate" ? "active" : "inactive" }
            : s
        )
      );
      toast.success(`Seller ${action === "approve" ? "approved" : action + "d"} successfully!`);
    } catch (err: any) {
      toast.error(err.message || `Failed to ${action} seller`);
    }
  };

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-500">Active</Badge>;
      case "inactive": return <Badge className="bg-gray-500">Inactive</Badge>;
      case "pending": return <Badge className="bg-yellow-500">Pending</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name?.split(" ").map((part) => part[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rugike-primary">Seller Management</h1>
          <div className="mt-4 md:mt-0">
            <Button
              className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90"
              onClick={() => setShowAddForm(true)}
            >
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

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-rugike-primary" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
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
                      <TableCell>{seller.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
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
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => updateSellerStatus(seller.id, "deactivate")}
                            >
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
                  {filteredSellers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No sellers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Add Seller Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Seller</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const data = {
                  username: formData.get("username"),
                  email: formData.get("email"),
                  password: formData.get("password"),
                  name: formData.get("name"),
                  company: formData.get("company"),
                };
                try {
                  const response = await fetch("http://127.0.0.1:8000/api/sellers/add/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                  });
                  if (!response.ok) {
                    const errData = await response.json();
                    toast.error(errData.error || "Failed to add seller");
                    return;
                  }
                  toast.success("Seller added successfully!");
                  form.reset();
                  setShowAddForm(false);
                  fetchSellers();
                } catch (err: any) {
                  toast.error(err.message || "Something went wrong");
                }
              }}
              className="space-y-4"
            >
              <Input name="name" placeholder="Full Name" required />
              <Input name="username" placeholder="Username" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="password" type="password" placeholder="Password" required />
              <Input name="company" placeholder="Company Name" />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-rugike-accent text-rugike-primary">
                  Add Seller
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sellers;