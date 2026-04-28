import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Car, ArrowLeft } from "lucide-react";

type View = "login" | "choose" | "register-customer" | "register-seller";

const Login = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");

  // Login fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Registration fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCompany, setRegCompany] = useState("");

  const resetRegFields = () => {
    setRegName(""); setRegEmail(""); setRegUsername("");
    setRegPassword(""); setRegPhone(""); setRegCompany("");
  };

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
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.id);
        toast.success(`Welcome back, ${data.username}!`);
        if (data.role === "admin") navigate("/admin/dashboard");
        else if (data.role === "seller") navigate("/seller/dashboard");
        else navigate("/");
      } else {
        if (data.detail === "No active account found with the given credentials") {
          toast.error("Account not approved yet or credentials invalid.");
        } else {
          toast.error("Invalid username or password.");
        }
      }
    } catch {
      toast.error("Login failed. Please check your connection.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regUsername || !regPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    const isSeller = view === "register-seller";
    const endpoint = isSeller
      ? "http://127.0.0.1:8000/api/sellers/register/"
      : "http://127.0.0.1:8000/api/sellers/register/customer/";
    const body = isSeller
      ? { name: regName, email: regEmail, username: regUsername, password: regPassword, phone: regPhone, company: regCompany }
      : { name: regName, email: regEmail, username: regUsername, password: regPassword, phone: regPhone };
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        toast.success(
          isSeller
            ? "Registration submitted! Await admin approval before logging in."
            : "Registration successful! You can now log in."
        );
        resetRegFields();
        setView("login");
      } else {
        const data = await response.json();
        const errorMsg = Object.values(data).flat().join(", ");
        toast.error(errorMsg || "Registration failed");
      }
    } catch {
      toast.error("Registration failed. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rugike-primary to-rugike-dark p-4">
      <Card className="w-full max-w-md">

        {/* LOGIN VIEW */}
        {view === "login" && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                <span className="text-rugike-accent">RUGIKE</span> Motors
              </CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
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
                <p className="text-center text-sm text-muted-foreground mt-2">
                  New here?{" "}
                  <span
                    className="text-rugike-accent cursor-pointer hover:underline"
                    onClick={() => setView("choose")}
                  >
                    Create an account
                  </span>
                </p>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="link" onClick={() => navigate("/")} className="text-sm">
                Return to Homepage
              </Button>
            </CardFooter>
          </>
        )}

        {/* CHOOSE ROLE VIEW */}
        {view === "choose" && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                <span className="text-rugike-accent">RUGIKE</span> Motors
              </CardTitle>
              <CardDescription>Register as a customer or seller?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full h-16 text-lg bg-rugike-primary hover:bg-rugike-dark flex items-center justify-center gap-3"
                onClick={() => setView("register-customer")}
              >
                <User className="h-5 w-5" /> I'm a Customer
              </Button>
              <Button
                className="w-full h-16 text-lg bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90 flex items-center justify-center gap-3"
                onClick={() => setView("register-seller")}
              >
                <Car className="h-5 w-5" /> I'm a Seller
              </Button>
              <Button
                variant="ghost"
                className="w-full flex items-center gap-2"
                onClick={() => setView("login")}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </Button>
            </CardContent>
          </>
        )}

        {/* REGISTER CUSTOMER VIEW */}
        {view === "register-customer" && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                <span className="text-rugike-accent">RUGIKE</span> Motors
              </CardTitle>
              <CardDescription>Create your customer account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input placeholder="John Doe" value={regName} onChange={(e) => setRegName(e.target.value)} />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" placeholder="john@example.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Username *</Label>
                  <Input placeholder="johndoe" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} />
                </div>
                <div>
                  <Label>Password *</Label>
                  <Input type="password" placeholder="••••••••" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input placeholder="+254 700 000000" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">Register</Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex items-center gap-2"
                  onClick={() => { resetRegFields(); setView("choose"); }}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {/* REGISTER SELLER VIEW */}
        {view === "register-seller" && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                <span className="text-rugike-accent">RUGIKE</span> Motors
              </CardTitle>
              <CardDescription>Apply to become a seller</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input placeholder="John Doe" value={regName} onChange={(e) => setRegName(e.target.value)} />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" placeholder="john@example.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Username *</Label>
                  <Input placeholder="johndoe" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} />
                </div>
                <div>
                  <Label>Password *</Label>
                  <Input type="password" placeholder="••••••••" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input placeholder="+254 700 000000" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} />
                </div>
                <div>
                  <Label>Company Name</Label>
                  <Input placeholder="Your dealership name" value={regCompany} onChange={(e) => setRegCompany(e.target.value)} />
                </div>
                <Button type="submit" className="w-full bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90">
                  Submit Application
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex items-center gap-2"
                  onClick={() => { resetRegFields(); setView("choose"); }}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </form>
            </CardContent>
          </>
        )}

      </Card>
    </div>
  );
};

export default Login;