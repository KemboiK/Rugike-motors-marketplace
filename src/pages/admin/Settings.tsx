
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "RUGIKE Motors",
    contactEmail: "admin@rugike.com",
    contactPhone: "+(254)*********",
    enableRegistration: true,
    requireApproval: true,
    maintenanceMode: false
  });
  
  const handleGeneralSettingsChange = (key: string, value: string | boolean) => {
    setGeneralSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleGeneralSettingsSave = () => {
    toast.success("General settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-rugike-primary">System Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and preferences</p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage the basic settings of your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => handleGeneralSettingsChange('siteName', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input 
                      id="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => handleGeneralSettingsChange('contactEmail', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input 
                      id="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={(e) => handleGeneralSettingsChange('contactPhone', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableRegistration" className="block">Enable User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                    </div>
                    <Switch 
                      id="enableRegistration"
                      checked={generalSettings.enableRegistration}
                      onCheckedChange={(checked) => handleGeneralSettingsChange('enableRegistration', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireApproval" className="block">Require Seller Approval</Label>
                      <p className="text-sm text-muted-foreground">Manually approve sellers before they can list cars</p>
                    </div>
                    <Switch 
                      id="requireApproval"
                      checked={generalSettings.requireApproval}
                      onCheckedChange={(checked) => handleGeneralSettingsChange('requireApproval', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode" className="block">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the site in maintenance mode (only admins can access)</p>
                    </div>
                    <Switch 
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleGeneralSettingsChange('maintenanceMode', checked)}
                    />
                  </div>
                </div>
                
                <Button onClick={handleGeneralSettingsSave} className="w-full md:w-auto">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your application</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Appearance settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure email and system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Notification settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security settings and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Security settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
