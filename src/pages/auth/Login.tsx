
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Users, Car } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }
    
    // Simple role-based authentication
    if (role === "admin") {
      // In a real app, you would verify credentials against a database
      if (username === "admin" && password === "admin123") {
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
        localStorage.setItem("userRole", "admin");
      } else {
        toast.error("Invalid admin credentials");
      }
    } else if (role === "seller") {
      // For demo purposes, any seller can login with "seller" and "seller123"
      if (username === "seller" && password === "seller123") {
        toast.success("Seller login successful");
        navigate("/seller/dashboard");
        localStorage.setItem("userRole", "seller");
      } else {
        toast.error("Invalid seller credentials");
      }
    } else {
      // Customer doesn't need authentication in this demo
      toast.success("Welcome to RUGIKE Motors!");
      navigate("/");
      localStorage.setItem("userRole", "customer");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rugike-primary to-rugike-dark p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            <span className="text-rugike-accent">RUGIKE</span> Motors
          </CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="customer" onValueChange={setRole}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer
              </TabsTrigger>
              <TabsTrigger value="seller" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Seller
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Admin
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <TabsContent value="customer">
                  <p className="text-sm text-muted-foreground mb-4">
                    As a customer, explore our premium car marketplace and find your dream car.
                  </p>
                </TabsContent>
                
                <TabsContent value="seller">
                  <p className="text-sm text-muted-foreground mb-4">
                    Login as a seller to list your cars and manage your inventory.
                    <br /><br />
                    <span className="font-semibold">Demo credentials:</span><br />
                    Username: seller<br />
                    Password: seller123
                  </p>
                </TabsContent>
                
                <TabsContent value="admin">
                  <p className="text-sm text-muted-foreground mb-4">
                    Admin access is restricted. Use your admin credentials to login.
                    <br /><br />
                    <span className="font-semibold">Demo credentials:</span><br />
                    Username: admin<br />
                    Password: admin123
                  </p>
                </TabsContent>
              </div>
              
              <Button type="submit" className="w-full mt-6">Login</Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => navigate("/")} className="text-sm">
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
