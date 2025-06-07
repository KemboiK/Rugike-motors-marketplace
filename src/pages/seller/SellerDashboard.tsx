
import SellerNavigation from "@/components/SellerNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chatbot from "@/components/Chatbot";

const SellerDashboard = () => {
  // Sample data - in a real app, this would come from a database
  const myCars = [
    {
      id: 1,
      name: "Toyota Camry 2022",
      price: "KES 2,850,000",
      status: "approved",
      views: 45,
      inquiries: 3,
      date: "2025-04-15"
    },
    {
      id: 2,
      name: "Honda Civic 2023",
      price: "KES 2,290,000",
      status: "pending",
      views: 12,
      inquiries: 0,
      date: "2025-05-10"
    },
    {
      id: 3,
      name: "Ford Mustang 2021",
      price: "KES 3,870,000",
      status: "approved",
      views: 87,
      inquiries: 6,
      date: "2025-03-22"
    }
  ];
  
  // Sample data for view statistics
  const viewsData = [
    { day: 'Mon', views: 15 },
    { day: 'Tue', views: 20 },
    { day: 'Wed', views: 35 },
    { day: 'Thu', views: 28 },
    { day: 'Fri', views: 32 },
    { day: 'Sat', views: 45 },
    { day: 'Sun', views: 30 },
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-500 text-sm font-medium">TOTAL LISTINGS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">3</div>
                <div className="p-2 bg-rugike-light rounded-full">
                  <Car className="h-5 w-5 text-rugike-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-500 text-sm font-medium">TOTAL VIEWS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">144</div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-green-500 text-sm mt-2">+24 in the last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-500 text-sm font-medium">TOTAL INQUIRIES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">9</div>
                <div className="p-2 bg-green-100 rounded-full">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-green-500 text-sm mt-2">+3 new inquiries</p>
            </CardContent>
          </Card>
        </div>
        
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
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg> View All Listings
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/seller/profile">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg> Edit Profile
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="#">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg> View Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
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
                {myCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium">{car.name}</TableCell>
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
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Remove</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
