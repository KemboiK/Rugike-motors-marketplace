import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Customer {
  id: number;
  name: string;
  email: string;
  inquiries_count: number;
  status: string;
  joinDate: string;
}

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("accessToken");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/customers/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setCustomers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleActivate = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/customers/${id}/activate/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to activate customer");
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "active" } : c))
      );
      toast.success("Customer activated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to activate customer");
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/customers/${id}/deactivate/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to deactivate customer");
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "inactive" } : c))
      );
      toast.success("Customer deactivated.");
    } catch (err: any) {
      toast.error(err.message || "Failed to deactivate customer");
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/customers/export/pdf/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "customer_list.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      toast.error(err.message || "Failed to export PDF");
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-500">Active</Badge>;
      case "inactive": return <Badge className="bg-gray-500">Inactive</Badge>;
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
          <h1 className="text-3xl font-bold text-rugike-primary">Customer Management</h1>
          <div className="mt-4 md:mt-0">
            <Button
              className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90"
              onClick={handleExport}
            >
              Export Customer Data
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search customers by name or email..."
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
              <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Inquiries</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.inquiries_count}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          {customer.status === "active" ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeactivate(customer.id)}
                            >
                              Deactivate
                            </Button>
                          ) : (
                            <Button
                              className="bg-green-600 hover:bg-green-700"
                              size="sm"
                              onClick={() => handleActivate(customer.id)}
                            >
                              Activate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No customers found.
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

export default Customers;