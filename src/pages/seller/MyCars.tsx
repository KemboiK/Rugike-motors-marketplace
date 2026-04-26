import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SellerNavigation from "@/components/SellerNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Edit, Trash2, Eye, Loader2 } from "lucide-react";
import Chatbot from "@/components/Chatbot";

const MyCars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cars/my/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Unauthorized. Please log in again.");
        } else {
          toast.error("Failed to fetch cars.");
        }
        return;
      }

      const data = await response.json();
      setCars(data);
    } catch (error) {
      toast.error("Network error while fetching your cars.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCar) return;
    setDeleting(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cars/${selectedCar.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete car");

      setCars(cars.filter((car) => car.id !== selectedCar.id));
      toast.success(`${selectedCar.name} has been removed from your listings`);
    } catch (error) {
      toast.error("Failed to delete car. Please try again.");
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedCar(null);
    }
  };

  const handleEdit = (car: any) => {
    toast.info(`Editing ${car.name}. Feature in development.`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return <Badge className="bg-green-600">Approved</Badge>;
      case "rejected": return <Badge className="bg-red-500">Rejected</Badge>;
      default: return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  const getImageUrl = (car: any) => {
    if (car.images && car.images.length > 0) {
      return `http://127.0.0.1:8000${car.images[0].image}`;
    }
    return "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavigation />

      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold text-rugike-primary mb-8">My Car Listings</h1>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-rugike-primary" />
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All My Listings ({cars.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Car</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Inquiries</TableHead>
                      <TableHead>Listed Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cars.map((car) => (
                      <TableRow key={car.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded overflow-hidden">
                              <img
                                src={getImageUrl(car)}
                                alt={car.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{car.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>KES {Number(car.price).toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(car.status)}</TableCell>
                        <TableCell>{car.views_count || 0}</TableCell>
                        <TableCell>{car.inquiries_count || 0}</TableCell>
                        <TableCell>{new Date(car.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" onClick={() => handleEdit(car)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                              <Link to={`/cars/${car.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                setSelectedCar(car);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {cars.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No listings yet. <Link to="/seller/add-car" className="text-rugike-accent underline">Add your first car!</Link>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCar?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Chatbot variant="seller" />
    </div>
  );
};

export default MyCars;