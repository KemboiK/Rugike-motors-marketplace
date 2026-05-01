import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Sun, Moon, Type, Shield, Clock, AlertTriangle } from "lucide-react";

const Settings = () => {
  // ─── General ───────────────────────────────────────────────
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "RUGIKE Motors",
    contactEmail: "admin@rugike.com",
    contactPhone: "+(254)*********",
    enableRegistration: true,
    requireApproval: true,
    maintenanceMode: false,
  });

  const handleGeneralSettingsChange = (key: string, value: string | boolean) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleGeneralSettingsSave = () => {
    localStorage.setItem("rugike_general_settings", JSON.stringify(generalSettings));
    toast.success("General settings saved successfully");
  };

  // ─── Appearance ────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("rugike_dark_mode") === "true");
  const [marketplaceName, setMarketplaceName] = useState(() => localStorage.getItem("rugike_marketplace_name") || "RUGIKE Motors");
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("rugike_font_size") || "normal");
  const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem("rugike_primary_color") || "#1a2942");
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem("rugike_accent_color") || "#f5c842");
  const [logoPreview, setLogoPreview] = useState<string | null>(localStorage.getItem("rugike_logo") || null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLogoPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAppearanceSave = () => {
    localStorage.setItem("rugike_dark_mode", String(darkMode));
    localStorage.setItem("rugike_marketplace_name", marketplaceName);
    localStorage.setItem("rugike_font_size", fontSize);
    localStorage.setItem("rugike_primary_color", primaryColor);
    localStorage.setItem("rugike_accent_color", accentColor);
    if (logoPreview) localStorage.setItem("rugike_logo", logoPreview);

    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply font size
    document.documentElement.style.fontSize = fontSize === "large" ? "18px" : "16px";

    toast.success("Appearance settings saved successfully");
  };

  // ─── Notifications ─────────────────────────────────────────
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("rugike_notifications");
    return saved ? JSON.parse(saved) : {
      newSellerRegistration: true,
      newCarListed: true,
      newCustomerMessage: true,
      carApprovedRejected: true,
      sellerPendingApproval: true,
      notifySellerCarStatus: true,
      notifyCustomerInquiry: true,
    };
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleNotificationsSave = () => {
    localStorage.setItem("rugike_notifications", JSON.stringify(notifications));
    toast.success("Notification settings saved successfully");
  };

  // ─── Security ──────────────────────────────────────────────
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(() => localStorage.getItem("rugike_session_timeout") || "24");
  const [loginAttemptLimit, setLoginAttemptLimit] = useState(() => localStorage.getItem("rugike_login_attempts") || "5");
  const [twoFA, setTwoFA] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.new_password !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordData.new_password.length < 8) {
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
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
        }),
      });
      if (!response.ok) throw new Error("Failed to change password");
      toast.success("Password updated successfully!");
      setPasswordData({ current_password: "", new_password: "", confirmPassword: "" });
    } catch {
      toast.error("Failed to update password. Check your current password.");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSecuritySave = () => {
    localStorage.setItem("rugike_session_timeout", sessionTimeout);
    localStorage.setItem("rugike_login_attempts", loginAttemptLimit);
    toast.success("Security settings saved successfully");
  };

  const handleForceLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    toast.success("All sessions cleared. Redirecting to login...");
    setTimeout(() => { window.location.href = "/auth/login"; }, 1500);
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

          {/* ── GENERAL ── */}
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
                      onChange={(e) => handleGeneralSettingsChange("siteName", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => handleGeneralSettingsChange("contactEmail", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={(e) => handleGeneralSettingsChange("contactPhone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="block">Enable User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                    </div>
                    <Switch
                      checked={generalSettings.enableRegistration}
                      onCheckedChange={(checked) => handleGeneralSettingsChange("enableRegistration", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="block">Require Seller Approval</Label>
                      <p className="text-sm text-muted-foreground">Manually approve sellers before they can list cars</p>
                    </div>
                    <Switch
                      checked={generalSettings.requireApproval}
                      onCheckedChange={(checked) => handleGeneralSettingsChange("requireApproval", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="block">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the site in maintenance mode (only admins can access)</p>
                    </div>
                    <Switch
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleGeneralSettingsChange("maintenanceMode", checked)}
                    />
                  </div>
                </div>

                <Button onClick={handleGeneralSettingsSave} className="w-full md:w-auto">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── APPEARANCE ── */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="h-5 w-5 text-rugike-primary" /> : <Sun className="h-5 w-5 text-rugike-primary" />}
                    <div>
                      <Label className="block">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                {/* Marketplace Name */}
                <div className="grid gap-2">
                  <Label>Marketplace Name</Label>
                  <Input
                    value={marketplaceName}
                    onChange={(e) => setMarketplaceName(e.target.value)}
                    placeholder="RUGIKE Motors"
                  />
                  <p className="text-sm text-muted-foreground">This name appears in the navigation and page titles</p>
                </div>

                {/* Font Size */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="h-5 w-5 text-rugike-primary" />
                    <Label>Font Size</Label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFontSize("normal")}
                      className={`px-6 py-2 rounded-lg border-2 font-medium transition-all ${
                        fontSize === "normal"
                          ? "border-rugike-primary bg-rugike-primary text-white"
                          : "border-gray-200 hover:border-rugike-primary"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setFontSize("large")}
                      className={`px-6 py-2 rounded-lg border-2 font-medium transition-all text-lg ${
                        fontSize === "large"
                          ? "border-rugike-primary bg-rugike-primary text-white"
                          : "border-gray-200 hover:border-rugike-primary"
                      }`}
                    >
                      Large
                    </button>
                  </div>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-10 rounded cursor-pointer border border-gray-200"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Main brand color used for backgrounds and headings</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-12 h-10 rounded cursor-pointer border border-gray-200"
                      />
                      <Input
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Highlight color used for buttons and accents</p>
                  </div>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label>Logo Upload</Label>
                  <div className="flex items-center gap-4">
                    {logoPreview && (
                      <img src={logoPreview} alt="Logo preview" className="h-12 w-auto rounded border border-gray-200 p-1" />
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Upload a PNG or SVG logo (recommended: 200x50px)</p>
                </div>

                <Button onClick={handleAppearanceSave} className="w-full md:w-auto">
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── NOTIFICATIONS ── */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure which events trigger notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">

                <div>
                  <h3 className="font-semibold text-rugike-primary mb-4">Admin Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="block">New Seller Registration</Label>
                        <p className="text-sm text-muted-foreground">Notify when a new seller registers and awaits approval</p>
                      </div>
                      <Switch
                        checked={notifications.newSellerRegistration}
                        onCheckedChange={(v) => handleNotificationChange("newSellerRegistration", v)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="block">Seller Pending Approval</Label>
                        <p className="text-sm text-muted-foreground">Remind admin of sellers awaiting approval</p>
                      </div>
                      <Switch
                        checked={notifications.sellerPendingApproval}
                        onCheckedChange={(v) => handleNotificationChange("sellerPendingApproval", v)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="block">New Car Listed</Label>
                        <p className="text-sm text-muted-foreground">Notify when a seller lists a new car for approval</p>
                      </div>
                      <Switch
                        checked={notifications.newCarListed}
                        onCheckedChange={(v) => handleNotificationChange("newCarListed", v)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="block">New Customer Message</Label>
                        <p className="text-sm text-muted-foreground">Notify when a customer sends a contact message</p>
                      </div>
                      <Switch
                        checked={notifications.newCustomerMessage}
                        onCheckedChange={(v) => handleNotificationChange("newCustomerMessage", v)}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-rugike-primary mb-4">Seller Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="block">Car Approved / Rejected</Label>
                        <p className="text-sm text-muted-foreground">Notify sellers when their car listing is reviewed</p>
                      </div>
                      <Switch
                        checked={notifications.carApprovedRejected}
                        onCheckedChange={(v) => handleNotificationChange("carApprovedRejected", v)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="block">Account Status Change</Label>
                        <p className="text-sm text-muted-foreground">Notify sellers when their account is approved or deactivated</p>
                      </div>
                      <Switch
                        checked={notifications.notifySellerCarStatus}
                        onCheckedChange={(v) => handleNotificationChange("notifySellerCarStatus", v)}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-rugike-primary mb-4">Customer Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="block">Inquiry Response</Label>
                        <p className="text-sm text-muted-foreground">Notify customers when their inquiry gets a response</p>
                      </div>
                      <Switch
                        checked={notifications.notifyCustomerInquiry}
                        onCheckedChange={(v) => handleNotificationChange("notifyCustomerInquiry", v)}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleNotificationsSave} className="w-full md:w-auto">
                  Save Notifications
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── SECURITY ── */}
          <TabsContent value="security" className="space-y-4">

            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-rugike-primary" />
                  Change Admin Password
                </CardTitle>
                <CardDescription>Update your admin account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>
                <Button onClick={handlePasswordSubmit} disabled={changingPassword} className="w-full md:w-auto">
                  {changingPassword ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Updating...</> : "Update Password"}
                </Button>
              </CardContent>
            </Card>

            {/* Session Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-rugike-primary" />
                  Session Settings
                </CardTitle>
                <CardDescription>Control session timeouts and login limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label>Session Timeout (hours)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="72"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">Auto logout after this many hours of inactivity</p>
                </div>
                <div className="grid gap-2">
                  <Label>Login Attempt Limit</Label>
                  <Input
                    type="number"
                    min="3"
                    max="10"
                    value={loginAttemptLimit}
                    onChange={(e) => setLoginAttemptLimit(e.target.value)}
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">Lock account after this many failed login attempts</p>
                </div>
                <Button onClick={handleSecuritySave} className="w-full md:w-auto">
                  Save Session Settings
                </Button>
              </CardContent>
            </Card>

            {/* 2FA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Two-Factor Authentication
                  <Badge className="bg-yellow-500 text-white ml-2">Coming Soon</Badge>
                </CardTitle>
                <CardDescription>Add an extra layer of security to your admin account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                  <div>
                    <Label className="block">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Require a verification code on login</p>
                  </div>
                  <Switch checked={twoFA} onCheckedChange={setTwoFA} disabled />
                </div>
              </CardContent>
            </Card>

            {/* Force Logout */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Force Logout
                </CardTitle>
                <CardDescription>Clear all active sessions and return to login</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This will immediately log out all active sessions including your current one.
                </p>
                <Button variant="destructive" onClick={handleForceLogout}>
                  Force Logout All Sessions
                </Button>
              </CardContent>
            </Card>

          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
