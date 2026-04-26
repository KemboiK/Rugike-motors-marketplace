import { useState, useEffect } from "react";
import SellerNavigation from "@/components/SellerNavigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User, Lock, Store, BarChart, MapPin, Loader2 } from "lucide-react";
import Chatbot from "@/components/Chatbot";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [myCars, setMyCars] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    address: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchProfile();
    fetchMyCars();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/sellers/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "",
        website: data.website || "",
        address: data.address || "",
        bio: data.bio || "",
      });
    } catch (err) {
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMyCars = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cars/my/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      setMyCars(data);
    } catch (err) {
      console.error("Failed to fetch cars", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/sellers/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleBusinessSubmit = async () => {
    setSaving(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/sellers/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: formData.company,
          website: formData.website,
          address: formData.address,
        }),
      });
      if (!response.ok) throw new Error("Failed to update business info");
      toast.success("Business information updated!");
    } catch (err) {
      toast.error("Failed to update business information.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setChangingPassword(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/sellers/profile/change-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      });
      if (!response.ok) throw new Error("Failed to change password");
      toast.success("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error("Failed to update password. Check your current password.");
    } finally {
      setChangingPassword(false);
    }
  };

  // Performance stats from real cars
  const totalCars = myCars.length;
  const approvedCars = myCars.filter(c => c.status === "approved").length;
  const totalViews = myCars.reduce((sum, car) => sum + (car.views_count || 0), 0);
  const totalInquiries = myCars.reduce((sum, car) => sum + (car.inquiries_count || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SellerNavigation />
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-rugike-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavigation />

      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold text-rugike-primary mb-8">My Profile</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Store className="h-4 w-4" /> Business
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Performance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    {!isEditing && (
                      <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6 h-full">
                        <div className="w-32 h-32 rounded-full bg-rugike-primary flex items-center justify-center text-white text-4xl font-bold mb-4">
                          {formData.name?.split(" ").map((n) => n[0]).join("") || "?"}
                        </div>
                        {isEditing && (
                          <Button type="button" variant="outline" size="sm">
                            Change Photo
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} rows={4} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter className="justify-end space-x-2">
                    <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                      {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </form>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Your business address information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-rugike-primary mt-1" />
                  <div>
                    <p className="font-medium">{formData.company}</p>
                    <p className="text-gray-500">{formData.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePasswordSubmit} disabled={changingPassword}>
                  {changingPassword ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Your dealership details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" value={formData.website} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleBusinessSubmit} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL LISTINGS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalCars}</div>
                  <p className="text-sm text-green-600 mt-2">{approvedCars} approved</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL VIEWS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalViews}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL INQUIRIES</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalInquiries}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">APPROVAL RATE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {totalCars > 0 ? Math.round((approvedCars / totalCars) * 100) : 0}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>My Listings Performance</CardTitle>
                <CardDescription>Views and inquiries per listing</CardDescription>
              </CardHeader>
              <CardContent>
                {myCars.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No listings yet.</p>
                ) : (
                  <div className="space-y-4">
                    {myCars.map((car) => (
                      <div key={car.id} className="flex items-center justify-between border-b pb-3">
                        <span className="font-medium">{car.name}</span>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>{car.views_count || 0} views</span>
                          <span>{car.inquiries_count || 0} inquiries</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Chatbot variant="seller" />
    </div>
  );
};

export default Profile;