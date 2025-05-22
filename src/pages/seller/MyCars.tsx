
import { useState } from "react";
import SellerNavigation from "@/components/SellerNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Edit, Trash2, Eye } from "lucide-react";
import Chatbot from "@/components/Chatbot";

const MyCars = () => {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Sample data - in a real app, this would come from a database
  const myCars = [
    {
      id: 1,
      name: "Toyota Camry 2022",
      price: "$28,500",
      status: "approved",
      views: 45,
      inquiries: 3,
      date: "2025-04-15",
      image: "https://source.unsplash.com/random/800x600/?toyota,camry"
    },
    {
      id: 2,
      name: "Honda Civic 2023",
      price: "$22,900",
      status: "pending",
      views: 12,
      inquiries: 0,
      date: "2025-05-10",
      image: "https://source.unsplash.com/random/800x600/?honda,civic"
    },
    {
      id: 3,
      name: "Ford Mustang 2021",
      price: "$38,700",
      status: "approved",
      views: 87,
      inquiries: 6,
      date: "2025-03-22",
      image: "https://source.unsplash.com/random/800x600/?ford,mustang"
    },
    {
      id: 4,
      name: "Tesla Model 3 2022",
      price: "$42,900",
      status: "approved",
      views: 102,
      inquiries: 9,
      date: "2025-04-05",
      image: "https://source.unsplash.com/random/800x600/?tesla,model3"
    },
    {
      id: 5,
      name: "BMW X5 2023",
      price: "$62,500",
      status: "pending",
      views: 32,
      inquiries: 2,
      date: "2025-05-12",
      image: "https://source.unsplash.com/random/800x600/?bmw,x5"
    }
  ];

  const handleDelete = () => {
    toast.success(`${selectedCar.name} has been removed from your listings`);
    setDeleteDialogOpen(false);
    setSelectedCar(null);
  };

  const handleEdit = (car: any) => {
    toast.info(`Editing ${car.name}. Feature in development.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavigation />
      
      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold text-rugike-primary mb-8">My Car Listings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>All My Listings ({myCars.length})</CardTitle>
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
                  {myCars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium">{car.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{car.price}</TableCell>
                      <TableCell>
                        <Badge className={car.status === "approved" ? "bg-green-600" : "bg-yellow-500"}>
                          {car.status === "approved" ? "Approved" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>{car.views}</TableCell>
                      <TableCell>{car.inquiries}</TableCell>
                      <TableCell>{car.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(car)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
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
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
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
            <Button variant="destructive" onClick={handleDelete}>
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
