import { useState, useEffect } from "react";
import SellerNavigation from "@/components/SellerNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chatbot from "@/components/Chatbot";

const SellerDashboard = () => {
  const [myCars, setMyCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const viewsData = [
    { day: 'Mon', views: 15 },
    { day: 'Tue', views: 20 },
    { day: 'Wed', views: 35 },
    { day: 'Thu', views: 28 },
    { day: 'Fri', views: 32 },
    { day: 'Sat', views: 45 },
    { day: 'Sun', views: 30 },
  ];

  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://127.0.0.1:8000/api/cars/my/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cars");
        const data = await response.json();
        setMyCars(data);
      } catch (err) {
        setError("Failed to load your listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCars();
  }, []);

  const totalViews = myCars.reduce((sum, car) => sum + (car.views_count || 0), 0);
  const totalInquiries = myCars.reduce((sum, car) => sum + (car.inquiries_count || 0), 0);

  const handleRemove = async (carId: number) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cars/${carId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setMyCars(myCars.filter(car => car.id !== carId));
      }
    } catch (err) {
      console.error("Failed to remove car", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavigation />

      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rugike-primary">Seller Dashboard</h1>
          <div className="mt-4 md:mt-0">
            <Button className="bg-rugike-primary text-white hover:bg-rugike-dark" asChild>
              <Link to="/seller/add-car">
                <Car className="mr-2 h-4 w-4" />
                Add New Car
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-rugike-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">TOTAL LISTINGS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{myCars.length}</div>
                  <div className="p-2 bg-rugike-light rounded-full">
                    <Car className="h-5 w-5 text-rugike-primary" />
                  </div>
                </div>
                <p className="text-yellow-500 text-sm mt-2">
                  {myCars.filter(c => c.status === 'pending').length} pending approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">TOTAL VIEWS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{totalViews}</div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">TOTAL INQUIRIES</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{totalInquiries}</div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Listing Views (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#0F172A"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild className="justify-start">
                <Link to="/seller/add-car">
                  <Car className="mr-2 h-4 w-4" /> Add New Car
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/seller/my-cars">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg> View All Listings
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/seller/profile">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg> Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Listings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Car</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Inquiries</TableHead>
                    <TableHead>Listed Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myCars.slice(0, 5).map((car) => (
                    <TableRow key={car.id}>
                      <TableCell className="font-medium">{car.name}</TableCell>
                      <TableCell>KES {Number(car.price).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={
                          car.status === "approved" ? "bg-green-600" :
                          car.status === "rejected" ? "bg-red-500" : "bg-yellow-500"
                        }>
                          {car.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{car.views_count || 0}</TableCell>
                      <TableCell>{car.inquiries_count || 0}</TableCell>
                      <TableCell>{new Date(car.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/cars/${car.id}`}>View</Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemove(car.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {myCars.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No listings yet. Add your first car!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            <div className="mt-4 flex justify-end">
              <Button variant="outline" asChild>
                <Link to="/seller/my-cars">View All Cars</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Chatbot variant="seller" />
    </div>
  );
};

export default SellerDashboard;