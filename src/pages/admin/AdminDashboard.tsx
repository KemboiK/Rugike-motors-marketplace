import { useEffect, useState } from "react";
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";
import Chatbot from "@/components/Chatbot";
import { Car, Users, User, Settings, Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const salesData = [
    { name: 'Jan', sales: 12 },
    { name: 'Feb', sales: 19 },
    { name: 'Mar', sales: 15 },
    { name: 'Apr', sales: 25 },
    { name: 'May', sales: 22 },
    { name: 'Jun', sales: 30 },
  ];

  const userRegistrationData = [
    { name: 'Jan', customers: 65, sellers: 15 },
    { name: 'Feb', customers: 78, sellers: 18 },
    { name: 'Mar', customers: 95, sellers: 22 },
    { name: 'Apr', customers: 110, sellers: 28 },
    { name: 'May', customers: 125, sellers: 32 },
    { name: 'Jun', customers: 145, sellers: 40 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://127.0.0.1:8000/api/admin/stats/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavigation />

      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button asChild>
              <Link to="/admin/cars">Manage Cars</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/sentiment">View Sentiment</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-rugike-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">TOTAL CARS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.total_cars ?? 0}</div>
                <p className="text-yellow-500 text-sm mt-2">{stats?.pending_cars ?? 0} pending approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">TOTAL CUSTOMERS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.total_customers ?? 0}</div>
                <p className="text-green-500 text-sm mt-2">{stats?.active_customers ?? 0} active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">TOTAL SELLERS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.total_sellers ?? 0}</div>
                <p className="text-green-500 text-sm mt-2">{stats?.active_sellers ?? 0} active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-500 text-sm font-medium">TOTAL REVENUE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  KES {Number(stats?.total_revenue ?? 0).toLocaleString()}
                </div>
                <p className="text-green-500 text-sm mt-2">From approved cars</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly car sales for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#0F172A" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Registration</CardTitle>
              <CardDescription>New user registrations by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userRegistrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="customers" fill="#0F172A" />
                    <Bar dataKey="sellers" fill="#D4AF37" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center" asChild>
                <Link to="/admin/cars">
                  <Car className="h-6 w-6 mb-2" />
                  <span>Manage Cars</span>
                </Link>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center" asChild>
                <Link to="/admin/sellers">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Manage Sellers</span>
                </Link>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center" asChild>
                <Link to="/admin/customers">
                  <User className="h-6 w-6 mb-2" />
                  <span>Manage Customers</span>
                </Link>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center" asChild>
                <Link to="/admin/settings">
                  <Settings className="h-6 w-6 mb-2" />
                  <span>Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Chatbot variant="admin" />
    </div>
  );
};

export default AdminDashboard;