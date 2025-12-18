import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, isAdmin, isLoading, user } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAdmin, isLoading, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error.message);
        return;
      }

      // Wait a moment for admin check to complete
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fresh-page-wrapper flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-fresh-green-medium" />
      </div>
    );
  }

  return (
    <div className="fresh-page-wrapper flex items-center justify-center p-4">
      <Card className="fresh-card w-full max-w-md border-l-fresh-green-medium relative z-10">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="absolute top-4 left-4 text-fresh-green-dark hover:text-fresh-green-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
          <div className="w-16 h-16 bg-fresh-green-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-fresh-green-medium" />
          </div>
          <CardTitle className="text-2xl font-serif text-fresh-green-dark">Admin Login</CardTitle>
          <CardDescription className="fresh-body">Sign in to access the admin dashboard</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="fresh-label">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="fresh-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="fresh-label">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="fresh-input"
              />
            </div>
            <Button
              type="submit" 
              className="w-full btn-fresh-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;