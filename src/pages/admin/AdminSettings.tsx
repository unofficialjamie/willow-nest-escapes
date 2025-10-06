import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const { user, loading: authLoading } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [siteSettings, setSiteSettings] = useState({
    site_name: "",
    header_logo: "",
    footer_logo: "",
    favicon: "",
    instagram_url: "",
    facebook_url: "",
    linkedin_url: "",
  });

  const [uploadingLogo, setUploadingLogo] = useState<'header' | 'footer' | 'favicon' | null>(null);

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [emailData, setEmailData] = useState({
    newEmail: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");

    if (!error && data) {
      const settings = data.reduce((acc, setting) => {
        acc[setting.setting_key] = setting.setting_value;
        return acc;
      }, {} as any);
      
      console.log("Fetched settings:", settings);
      
      setSiteSettings({
        site_name: settings.site_name || "The Willow Nest Hotel",
        header_logo: settings.site_logo || settings.header_logo || "/logo-full.jpg",
        footer_logo: settings.footer_logo || settings.site_logo || "/logo-full.jpg",
        favicon: settings.site_favicon || settings.favicon || "/favicon.ico",
        instagram_url: settings.instagram_url || "",
        facebook_url: settings.facebook_url || "",
        linkedin_url: settings.linkedin_url || "",
      });
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    
    // Update site name
    await supabase
      .from("site_settings")
      .update({ setting_value: siteSettings.site_name })
      .eq('setting_key', 'site_name');
    
    // Update header logo as site_logo
    await supabase
      .from("site_settings")
      .update({ setting_value: siteSettings.header_logo })
      .eq('setting_key', 'site_logo');

    // Update footer logo
    await supabase
      .from("site_settings")
      .update({ setting_value: siteSettings.footer_logo })
      .eq('setting_key', 'footer_logo');

    // Update favicon
    await supabase
      .from("site_settings")
      .update({ setting_value: siteSettings.favicon })
      .eq('setting_key', 'site_favicon');

    // Update social media links
    await supabase
      .from("site_settings")
      .upsert({ setting_key: 'instagram_url', setting_value: siteSettings.instagram_url }, { onConflict: 'setting_key' });
    
    await supabase
      .from("site_settings")
      .upsert({ setting_key: 'facebook_url', setting_value: siteSettings.facebook_url }, { onConflict: 'setting_key' });
    
    await supabase
      .from("site_settings")
      .upsert({ setting_key: 'linkedin_url', setting_value: siteSettings.linkedin_url }, { onConflict: 'setting_key' });

    toast({ title: "Success", description: "Settings saved successfully" });
    setLoading(false);
    
    // Reload page to ensure all components see the updated logos
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Success", description: "Password updated successfully" });
    setPasswordData({ newPassword: "", confirmPassword: "" });
  };

  const handleEmailChange = async () => {
    const { error } = await supabase.auth.updateUser({
      email: emailData.newEmail,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Email update initiated. Please check your inbox for confirmation.",
    });
    setEmailData({ newEmail: "" });
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Manage site settings, logos, and account preferences
        </p>
      </div>

      <main>
        <Tabs defaultValue="site" className="max-w-4xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="site">Site Settings</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    type="text"
                    placeholder="The Willow Nest Hotel"
                    value={siteSettings.site_name}
                    onChange={(e) => setSiteSettings({ ...siteSettings, site_name: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">This name will be used across the website</p>
                </div>

                <div className="space-y-2">
                  <Label>Header Logo</Label>
                  {siteSettings.header_logo && (
                    <div className="mb-4 p-4 border rounded-lg bg-muted/20">
                      <p className="text-sm text-muted-foreground mb-2">Current logo:</p>
                      <img 
                        src={siteSettings.header_logo} 
                        alt="Header Logo" 
                        className="w-48 h-auto"
                        onError={(e) => {
                          console.error("Failed to load header logo:", siteSettings.header_logo);
                        }}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={uploadingLogo === 'header'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        setUploadingLogo('header');
                        
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSiteSettings({ ...siteSettings, header_logo: reader.result as string });
                          toast({
                            title: "Success",
                            description: "Logo uploaded! Click 'Save Settings' to apply changes.",
                          });
                          setUploadingLogo(null);
                          e.target.value = '';
                        };
                        reader.onerror = () => {
                          toast({
                            title: "Error",
                            description: "Failed to read file",
                            variant: "destructive",
                          });
                          setUploadingLogo(null);
                          e.target.value = '';
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    {uploadingLogo === 'header' && <span className="text-sm text-muted-foreground">Uploading...</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Footer Logo</Label>
                  {siteSettings.footer_logo && (
                    <div className="mb-4 p-4 border rounded-lg bg-muted/20">
                      <p className="text-sm text-muted-foreground mb-2">Current logo:</p>
                      <img 
                        src={siteSettings.footer_logo} 
                        alt="Footer Logo" 
                        className="w-48 h-auto"
                        onError={(e) => {
                          console.error("Failed to load footer logo:", siteSettings.footer_logo);
                        }}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={uploadingLogo === 'footer'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        setUploadingLogo('footer');
                        
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSiteSettings({ ...siteSettings, footer_logo: reader.result as string });
                          toast({
                            title: "Success",
                            description: "Logo uploaded! Click 'Save Settings' to apply changes.",
                          });
                          setUploadingLogo(null);
                          e.target.value = '';
                        };
                        reader.onerror = () => {
                          toast({
                            title: "Error",
                            description: "Failed to read file",
                            variant: "destructive",
                          });
                          setUploadingLogo(null);
                          e.target.value = '';
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    {uploadingLogo === 'footer' && <span className="text-sm text-muted-foreground">Uploading...</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Favicon</Label>
                  {siteSettings.favicon && (
                    <div className="mb-4 p-4 border rounded-lg bg-muted/20">
                      <p className="text-sm text-muted-foreground mb-2">Current favicon:</p>
                      <img 
                        src={siteSettings.favicon} 
                        alt="Favicon" 
                        className="w-8 h-8"
                        onError={(e) => {
                          console.error("Failed to load favicon:", siteSettings.favicon);
                        }}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/x-icon,image/png,image/svg+xml,image/jpeg,image/jpg,image/webp"
                      disabled={uploadingLogo === 'favicon'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        setUploadingLogo('favicon');
                        
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSiteSettings({ ...siteSettings, favicon: reader.result as string });
                          toast({
                            title: "Success",
                            description: "Favicon uploaded! Click 'Save Settings' to apply changes.",
                          });
                          setUploadingLogo(null);
                          e.target.value = '';
                        };
                        reader.onerror = () => {
                          toast({
                            title: "Error",
                            description: "Failed to read file",
                            variant: "destructive",
                          });
                          setUploadingLogo(null);
                          e.target.value = '';
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    {uploadingLogo === 'favicon' && <span className="text-sm text-muted-foreground">Uploading...</span>}
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Instagram URL</Label>
                      <Input
                        type="url"
                        placeholder="https://instagram.com/yourhotel"
                        value={siteSettings.instagram_url}
                        onChange={(e) => setSiteSettings({ ...siteSettings, instagram_url: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Facebook URL</Label>
                      <Input
                        type="url"
                        placeholder="https://facebook.com/yourhotel"
                        value={siteSettings.facebook_url}
                        onChange={(e) => setSiteSettings({ ...siteSettings, facebook_url: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>LinkedIn URL</Label>
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/company/yourhotel"
                        value={siteSettings.linkedin_url}
                        onChange={(e) => setSiteSettings({ ...siteSettings, linkedin_url: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveSettings} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button onClick={handlePasswordChange}>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Email</Label>
                    <Input value={user?.email || ""} disabled />
                  </div>
                  <div>
                    <Label>New Email</Label>
                    <Input
                      type="email"
                      value={emailData.newEmail}
                      onChange={(e) =>
                        setEmailData({ ...emailData, newEmail: e.target.value })
                      }
                    />
                  </div>
                  <Button onClick={handleEmailChange}>Update Email</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  To add new admin users, first create their account through the authentication system,
                  then add an entry to the user_roles table with role='admin'.
                </p>
                <Button asChild>
                  <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer">
                    View Documentation
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminSettings;
