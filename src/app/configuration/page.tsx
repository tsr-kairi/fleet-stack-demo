"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Shield, Database, Globe, Zap, Palette } from "lucide-react";
import { applyBrandingTheme } from "@/lib/theme-utils";

const colorThemes = [
  { name: "Default", primary: "#000000", secondary: "#3b82f6" },
  { name: "Blue", primary: "#2563eb", secondary: "#60a5fa" },
  { name: "Green", primary: "#16a34a", secondary: "#4ade80" },
  { name: "Purple", primary: "#9333ea", secondary: "#c084fc" },
  { name: "Orange", primary: "#ea580c", secondary: "#fb923c" },
  { name: "Red", primary: "#dc2626", secondary: "#f87171" },
];

export default function ConfigurationPage() {
  const [selectedTheme, setSelectedTheme] = useState("Default");
  const [customColor, setCustomColor] = useState("#000000");

  useEffect(() => {
    const saved = localStorage.getItem("brandingTheme");
    if (saved) {
      const theme = JSON.parse(saved);
      setSelectedTheme(theme.name);
      setCustomColor(theme.primary);
      applyTheme(theme);
    }
  }, []);

  const applyTheme = (theme: typeof colorThemes[0]) => {
    applyBrandingTheme(theme.primary);
    
    // Broadcast theme change
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("themeChange", { detail: theme }));
    }
  };

  const handleThemeChange = (theme: typeof colorThemes[0]) => {
    setSelectedTheme(theme.name);
    setCustomColor(theme.primary);
    applyTheme(theme);
    localStorage.setItem("brandingTheme", JSON.stringify(theme));
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    const customTheme = { name: "Custom", primary: color, secondary: color };
    setSelectedTheme("Custom");
    applyTheme(customTheme);
    localStorage.setItem("brandingTheme", JSON.stringify(customTheme));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Configuration</h1>
        <p className="text-sm text-muted-foreground">Manage system settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="branding">
            <Palette className="mr-2 h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Zap className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Fleet Stack" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fleet Settings</CardTitle>
              <CardDescription>Configure fleet-wide preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-assign vehicles</p>
                  <p className="text-sm text-muted-foreground">Automatically assign vehicles to drivers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Real-time tracking</p>
                  <p className="text-sm text-muted-foreground">Enable live GPS tracking</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance reminders</p>
                  <p className="text-sm text-muted-foreground">Send automatic maintenance alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>Choose a color theme for your entire application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium">Preset Themes</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => handleThemeChange(theme)}
                      className={`group relative rounded-lg border-2 p-4 transition-all hover:shadow-lg ${
                        selectedTheme === theme.name ? "border-primary shadow-md" : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-12 w-12 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div className="text-left">
                          <p className="font-medium">{theme.name}</p>
                          <p className="text-xs text-muted-foreground">{theme.primary}</p>
                        </div>
                      </div>
                      {selectedTheme === theme.name && (
                        <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-3 text-sm font-medium">Custom Color</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="custom-color">Pick your brand color</Label>
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        type="color"
                        id="custom-color"
                        value={customColor}
                        onChange={(e) => handleCustomColorChange(e.target.value)}
                        className="h-12 w-20 cursor-pointer rounded-lg border-2"
                      />
                      <div className="flex-1">
                        <Input
                          value={customColor}
                          onChange={(e) => handleCustomColorChange(e.target.value)}
                          placeholder="#000000"
                          className="font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {selectedTheme === "Custom" && (
                  <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <p className="text-sm font-medium text-primary">✓ Custom color applied</p>
                  </div>
                )}
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  💡 Changes are applied instantly across all pages, buttons, links, and UI elements.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email alert preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Speeding alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when vehicles exceed speed limits</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Geofence violations</p>
                  <p className="text-sm text-muted-foreground">Alert on unauthorized zone entry</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily reports</p>
                  <p className="text-sm text-muted-foreground">Receive daily fleet summary</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance due</p>
                  <p className="text-sm text-muted-foreground">Notify before scheduled maintenance</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>Configure SMS alert preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Critical alerts only</p>
                  <p className="text-sm text-muted-foreground">Send SMS for urgent events</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage authentication and access control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-factor authentication</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session timeout</p>
                  <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timeout">Timeout Duration (minutes)</Label>
                <Input id="timeout" type="number" defaultValue="30" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">IP whitelist</p>
                  <p className="text-sm text-muted-foreground">Restrict access to specific IPs</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API access tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Production API Key</p>
                    <p className="font-mono text-xs text-muted-foreground">sk_live_••••••••••••1234</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
              <Button variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                View API Documentation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Third-party Integrations</CardTitle>
              <CardDescription>Connect external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Database className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Google Maps</p>
                    <p className="text-sm text-muted-foreground">Connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Database className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Slack</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Database className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Webhook</p>
                    <p className="text-sm text-muted-foreground">Not configured</p>
                  </div>
                </div>
                <Button size="sm">
                  Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
