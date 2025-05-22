
import { useState } from "react";
import SellerNavigation from "@/components/SellerNavigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User, Lock, Store, BarChart, MapPin } from "lucide-react";
import Chatbot from "@/components/Chatbot";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    company: "JD Motors",
    website: "jdmotors.com",
    address: "123 Main St, New York, NY 10001",
    bio: "Passionate car dealer with 10+ years of experience in luxury and sports cars."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  // Sample sales data for the performance tab
  const monthlyData = [
    { month: "Jan", sales: 3 },
    { month: "Feb", sales: 2 },
    { month: "Mar", sales: 5 },
    { month: "Apr", sales: 4 },
    { month: "May", sales: 6 },
  ];

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
                          {formData.name.split(' ').map(n => n[0]).join('')}
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
                          <Input 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter className="justify-end space-x-2">
                    <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
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
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast.success("Password updated successfully!")}>
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
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
                    <Input 
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast.success("Business information updated!")}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL SALES</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">20</div>
                  <p className="text-sm text-green-600 mt-2">+3 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">AVERAGE RATING</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.8/5</div>
                  <p className="text-sm text-green-600 mt-2">+0.2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">RESPONSE RATE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">98%</div>
                  <p className="text-sm text-green-600 mt-2">+5% from last month</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Your sales performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {monthlyData.map((item) => (
                    <div key={item.month} className="flex flex-col items-center gap-2">
                      <div 
                        className="bg-rugike-primary rounded-t-md" 
                        style={{ 
                          height: `${item.sales * 40}px`, 
                          width: '40px' 
                        }}
                      ></div>
                      <span className="text-sm">{item.month}</span>
                    </div>
                  ))}
                </div>
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
