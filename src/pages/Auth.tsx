import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, CheckCircle2, Mail, User, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = loginSchema.extend({
  displayName: z.string().trim().min(2, { message: "Display name must be at least 2 characters" }).max(50, { message: "Display name must be less than 50 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');

  useEffect(() => {
    console.log('Auth: auth state, user:', user?.id, 'loading:', loading);

    if (user && !loading) {
      const redirectUrl = redirectParam || '/student-dashboard';
      console.log('Auth: redirect param =', redirectParam);
      console.log('Auth: After login, redirecting to:', redirectUrl);
      navigate(redirectUrl, { replace: true });
    }
  }, [user, loading, redirectParam, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse({ email, password });
      } else {
        signupSchema.parse({ email, password, confirmPassword, displayName });
      }
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Login Failed",
              description: "Invalid email or password. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
        }
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Sign Up Failed",
              description: "An account with this email already exists. Please log in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome! Your account has been created successfully.",
          });
          
          // Show registration success screen
          setRegistrationSuccess(true);
          
          // Send welcome email (non-blocking)
          try {
            fetch('/api/send-welcome-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, displayName: displayName || email.split('@')[0] }),
            });
          } catch (emailErr) {
            console.log('Welcome email send attempted');
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fresh-page-wrapper page-transition flex items-center justify-center p-4">
      {/* Registration Success Screen */}
      {registrationSuccess ? (
        <Card className="fresh-card w-full max-w-md relative z-10 overflow-hidden">
          {/* Green Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-yellow-600 p-6 text-center text-white">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-3">
                <CheckCircle2 className="h-10 w-10" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">Registration Successful! 🎉</h2>
            <p className="text-sm mt-1 opacity-90">Welcome to VAZHIKATTI</p>
          </div>

          <CardContent className="p-6 space-y-5">
            {/* Thank You Message */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Thank you for signing up, <strong className="text-emerald-700">{displayName || 'Learner'}</strong>! 
                Your career journey starts now.
              </p>
            </div>

            {/* Registration Details */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-5 border border-green-200">
              <h3 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                📋 Your Registration Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                  <div className="bg-emerald-100 rounded-full p-2">
                    <User className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium text-gray-800">{displayName || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                  <div className="bg-emerald-100 rounded-full p-2">
                    <Mail className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800">{email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notification */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
              <span className="text-lg">📧</span>
              <p className="text-xs text-amber-800">
                A welcome email has been sent to <strong>{email}</strong>. Please check your inbox (and spam folder).
              </p>
            </div>

            {/* What's Next */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">🚀 What you can do next:</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-600">🤖 AI Career Chat</div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-600">📊 Career Assessment</div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-600">🏛️ Find Colleges</div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center text-xs text-gray-600">💼 Job Portal</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              className="w-full bg-gradient-to-r from-[#FF6B35] to-[#e55a2a] hover:from-[#e55a2a] hover:to-[#d44a1a] text-white font-semibold py-5 text-base"
              onClick={() => navigate('/student-dashboard')}
            >
              Start Exploring VAZHIKATTI
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : (
      <Card className="fresh-card w-full max-w-md border-l-fresh-green-medium relative z-10 notranslate">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-serif text-fresh-green-dark">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className="fresh-body">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Fill in your details to get started'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="fresh-label">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="John Doe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={`fresh-input ${errors.displayName ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                />
                {errors.displayName && (
                  <p className="text-sm text-destructive">{errors.displayName}</p>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="fresh-label">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`fresh-input ${errors.email ? 'border-destructive' : ''}`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="fresh-label">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`fresh-input pr-10 ${errors.password ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-fresh-gold-dark hover:text-fresh-gold-rich transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="fresh-label">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`fresh-input ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full btn-fresh-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
            
            <div className="text-center text-sm">
              <span className="fresh-muted">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={toggleMode}
                className="text-fresh-green-medium hover:text-fresh-green-dark font-medium transition-colors"
                disabled={isLoading}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
      )}
    </div>
  );
};

export default Auth;
