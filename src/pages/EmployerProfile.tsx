import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Globe, MapPin, Users, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";

const EmployerProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    companyName: "JKKN Tech Solutions",
    industry: "IT / Software",
    companySize: "201-500",
    website: "https://www.jkkn.com",
    address: "123 Tech Park, Komarapalayam",
    city: "Namakkal",
    state: "Tamil Nadu",
    description: "Leading technology solutions provider with a focus on innovation and excellence.",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Company Profile" />

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Company Logo */}
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{profile.companyName}</h2>
                <p className="text-muted-foreground">{profile.industry}</p>
                <Button variant="link" className="px-0 h-auto text-primary">
                  Change Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={profile.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input
                  value={profile.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Company Size</Label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <Input
                    value={profile.companySize}
                    onChange={(e) => handleChange("companySize", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <Input
                  value={profile.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>About Company</Label>
              <Textarea
                value={profile.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={profile.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={profile.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={profile.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EmployerProfile;
