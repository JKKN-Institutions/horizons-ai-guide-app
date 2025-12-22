import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Globe, MapPin, Users, Save, Loader2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";

interface EmployerProfile {
  id: string;
  company_name: string;
  industry: string | null;
  company_size: string | null;
  website: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_designation: string | null;
}

const EmployerProfilePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [employerId, setEmployerId] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    address: "",
    city: "",
    state: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactDesignation: "",
  });

  useEffect(() => {
    const checkAuthAndLoadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast.error("Please login to view your profile");
        navigate("/auth?redirect=/employer/profile");
        return;
      }
      
      setUserId(session.user.id);
      await loadEmployerProfile(session.user.id);
    };

    checkAuthAndLoadProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session?.user) {
        navigate("/auth?redirect=/employer/profile");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadEmployerProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("employers")
        .select("*")
        .eq("user_id", uid)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setEmployerId(data.id);
        setProfile({
          companyName: data.company_name || "",
          industry: data.industry || "",
          companySize: data.company_size || "",
          website: data.website || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          description: data.description || "",
          contactName: data.contact_name || "",
          contactEmail: data.contact_email || "",
          contactPhone: data.contact_phone || "",
          contactDesignation: data.contact_designation || "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!userId) return;

    if (!profile.companyName || !profile.contactName || !profile.contactEmail || !profile.contactPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const employerData = {
        user_id: userId,
        company_name: profile.companyName,
        industry: profile.industry || null,
        company_size: profile.companySize || null,
        website: profile.website || null,
        description: profile.description || null,
        address: profile.address || null,
        city: profile.city || null,
        state: profile.state || null,
        contact_name: profile.contactName,
        contact_email: profile.contactEmail,
        contact_phone: profile.contactPhone,
        contact_designation: profile.contactDesignation || null,
      };

      if (employerId) {
        // Update existing
        const { error } = await supabase
          .from("employers")
          .update(employerData)
          .eq("id", employerId);

        if (error) throw error;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from("employers")
          .insert(employerData)
          .select()
          .single();

        if (error) throw error;
        setEmployerId(data.id);
      }

      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Company Profile" />
        <div className="container mx-auto p-4 space-y-6 max-w-2xl">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Company Profile" />

      <div className="container mx-auto p-4 space-y-6 max-w-2xl pb-20">
        {/* Company Logo */}
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{profile.companyName || "Your Company"}</h2>
                <p className="text-muted-foreground">{profile.industry || "Add your industry"}</p>
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
              <Label>Company Name *</Label>
              <Input
                value={profile.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input
                  value={profile.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  placeholder="e.g., IT / Software"
                />
              </div>
              <div className="space-y-2">
                <Label>Company Size</Label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <Input
                    value={profile.companySize}
                    onChange={(e) => handleChange("companySize", e.target.value)}
                    placeholder="e.g., 50-100"
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
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>About Company</Label>
              <Textarea
                value={profile.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your company..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Person */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Contact Person
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={profile.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  placeholder="Contact person name"
                />
              </div>
              <div className="space-y-2">
                <Label>Designation</Label>
                <Input
                  value={profile.contactDesignation}
                  onChange={(e) => handleChange("contactDesignation", e.target.value)}
                  placeholder="e.g., HR Manager"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={profile.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  placeholder="contact@company.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone *</Label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  value={profile.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                  placeholder="9876543210"
                />
              </div>
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
                placeholder="Street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={profile.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={profile.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="State"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full" disabled={isSaving}>
          {isSaving ? (
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

export default EmployerProfilePage;
