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
  const [isRegistering, setIsRegistering] = useState(false);

  // Registration fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCompany, setRegCompany] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const actualRole = data.role;

        if (role !== actualRole && !(role === 'admin' && actualRole === 'admin')) {
          toast.error(`Invalid credentials for ${role} login`);
          return;
        }

        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("userRole", actualRole);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.id);

        toast.success(`Welcome back, ${data.username}!`);

        if (actualRole === "customer") {
          navigate("/");
        } else {
          navigate(`/${actualRole}/dashboard`);
        }

      } else {
        // 🔥 ONLY CHANGE: better message for unapproved sellers
        if (data.detail === "No active account found with the given credentials") {
          toast.error("Your account is not approved yet. Please wait for admin approval.");
        } else {
          toast.error("Invalid credentials");
        }
      }

    } catch (error) {
      console.error("Login error", error);
      toast.error("Login failed. Please check your connection.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regName || !regEmail || !regUsername || !regPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const endpoint = role === "seller"
        ? "http://127.0.0.1:8000/api/sellers/register/"
        : "http://127.0.0.1:8000/api/sellers/register/customer/";

      const body = role === "seller"
        ? { name: regName, email: regEmail, username: regUsername, password: regPassword, phone: regPhone, company: regCompany }
        : { name: regName, email: regEmail, username: regUsername, password: regPassword, phone: regPhone };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Registration successful! Please login.");
        setIsRegistering(false);
      } else {
        const data = await response.json();
        const errorMsg = Object.values(data).flat().join(", ");
        toast.error(errorMsg || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
      toast.error("Registration failed. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rugike-primary to-rugike-dark p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            <span className="text-rugike-accent">RUGIKE</span> Motors
          </CardTitle>
          <CardDescription>
            {isRegistering ? "Create your account" : "Login to access your account"}
          </CardDescription>
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

            <TabsContent value="customer">
              <p className="text-sm text-muted-foreground mb-4">
                Explore our premium car marketplace and find your dream car.
              </p>
            </TabsContent>
            <TabsContent value="seller">
              <p className="text-sm text-muted-foreground mb-4">
                List your cars and manage your inventory.
              </p>
            </TabsContent>
            <TabsContent value="admin">
              <p className="text-sm text-muted-foreground mb-4">
                Admin access is restricted. Use your admin credentials to login.
              </p>
            </TabsContent>
          </Tabs>

          {!isRegistering && (
            <form onSubmit={handleLogin} className="mt-4 space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full mt-2">Login</Button>
              {role !== "admin" && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Don't have an account?{" "}
                  <span
                    className="text-rugike-accent cursor-pointer hover:underline"
                    onClick={() => setIsRegistering(true)}
                  >
                    Register here
                  </span>
                </p>
              )}
            </form>
          )}

          {isRegistering && role !== "admin" && (
            <form onSubmit={handleRegister} className="mt-4 space-y-4">
              <div>
                <Label htmlFor="regName">Full Name *</Label>
                <Input
                  id="regName"
                  placeholder="John Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="regEmail">Email *</Label>
                <Input
                  id="regEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="regUsername">Username *</Label>
                <Input
                  id="regUsername"
                  placeholder="johndoe"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="regPassword">Password *</Label>
                <Input
                  id="regPassword"
                  type="password"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="regPhone">Phone</Label>
                <Input
                  id="regPhone"
                  placeholder="+1 (555) 000-0000"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                />
              </div>
              {role === "seller" && (
                <div>
                  <Label htmlFor="regCompany">Company</Label>
                  <Input
                    id="regCompany"
                    placeholder="Your company name"
                    value={regCompany}
                    onChange={(e) => setRegCompany(e.target.value)}
                  />
                </div>
              )}
              <Button type="submit" className="w-full mt-2">Register</Button>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Already have an account?{" "}
                <span
                  className="text-rugike-accent cursor-pointer hover:underline"
                  onClick={() => setIsRegistering(false)}
                >
                  Login here
                </span>
              </p>
            </form>
          )}
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