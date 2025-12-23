import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Building2, GraduationCap, Briefcase,
  Linkedin, Github, Loader2, Plus, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { jkknColleges } from '@/constants/jkkn-colleges';

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 7 }, (_, i) => currentYear + i);
const yearsOfStudy = ['1st', '2nd', '3rd', '4th', '5th'];

const popularSkills = [
  'Python', 'Java', 'JavaScript', 'React', 'Node.js', 'SQL', 
  'Machine Learning', 'Data Analysis', 'HTML/CSS', 'C++',
  'AWS', 'Git', 'TypeScript', 'Angular', 'MongoDB'
];

export function LearnerRegistrationForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    branch: '',
    year_of_study: '',
    graduation_year: '',
    skills: [] as string[],
    career_interest: '',
    linkedin_url: '',
    github_url: '',
  });

  const selectedCollege = jkknColleges.find(c => c.name === formData.college);

  const handleAddSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.college || !formData.course || !formData.branch ||
        !formData.year_of_study || !formData.graduation_year) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.from('learners').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        course: formData.course,
        branch: formData.branch,
        year_of_study: formData.year_of_study,
        graduation_year: parseInt(formData.graduation_year),
        skills: formData.skills,
        career_interest: formData.career_interest || null,
        linkedin_url: formData.linkedin_url || null,
        github_url: formData.github_url || null,
      }).select('learner_number').single();

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Registered",
            description: "This email is already registered. Please use a different email.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        return;
      }

      // Store learner number for success page
      if (data?.learner_number) {
        localStorage.setItem('jkkn_learner_number', data.learner_number.toString());
      }

      navigate('/jkkn/register/success');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-fresh-green-dark flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="fresh-label">Full Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
              className="fresh-input"
              required
            />
          </div>
          <div>
            <Label className="fresh-label">Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@example.com"
              className="fresh-input"
              required
            />
          </div>
          <div>
            <Label className="fresh-label">Phone Number *</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+91 98765 43210"
              className="fresh-input"
              required
            />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-fresh-green-dark flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Academic Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="fresh-label">JKKN College *</Label>
            <Select
              value={formData.college}
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                college: value,
                course: '',
                branch: ''
              }))}
            >
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Select your college" />
              </SelectTrigger>
              <SelectContent>
                {jkknColleges.map((college) => (
                  <SelectItem key={college.name} value={college.name}>
                    {college.short_name} - {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="fresh-label">Course *</Label>
            <Select
              value={formData.course}
              onValueChange={(value) => setFormData(prev => ({ ...prev, course: value }))}
              disabled={!formData.college}
            >
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {selectedCollege?.courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="fresh-label">Branch/Specialization *</Label>
            <Select
              value={formData.branch}
              onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}
              disabled={!formData.college}
            >
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {selectedCollege?.branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="fresh-label">Year of Study *</Label>
            <Select
              value={formData.year_of_study}
              onValueChange={(value) => setFormData(prev => ({ ...prev, year_of_study: value }))}
            >
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearsOfStudy.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year} Year
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="fresh-label">Graduation Year *</Label>
            <Select
              value={formData.graduation_year}
              onValueChange={(value) => setFormData(prev => ({ ...prev, graduation_year: value }))}
            >
              <SelectTrigger className="fresh-input">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {graduationYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-fresh-green-dark flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Skills & Career Interest
        </h3>
        <div>
          <Label className="fresh-label">Skills</Label>
          <div className="flex gap-2 mb-3">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Type a skill and press Add"
              className="fresh-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(skillInput);
                }
              }}
            />
            <Button 
              type="button"
              onClick={() => handleAddSkill(skillInput)}
              variant="outline"
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.skills.map((skill) => (
              <Badge 
                key={skill} 
                className="bg-fresh-green-medium text-white px-3 py-1 gap-1"
              >
                {skill}
                <button 
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 hover:bg-white/20 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {popularSkills.filter(s => !formData.skills.includes(s)).slice(0, 8).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleAddSkill(skill)}
                className="px-2.5 py-1 text-xs bg-fresh-green-bg text-fresh-green-dark rounded-full hover:bg-fresh-green-light hover:text-white transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="fresh-label">Career Interest</Label>
          <Textarea
            value={formData.career_interest}
            onChange={(e) => setFormData(prev => ({ ...prev, career_interest: e.target.value }))}
            placeholder="e.g., Looking for software development internships, interested in AI/ML..."
            className="fresh-input min-h-[100px]"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-fresh-green-dark">
          Social Profiles (Optional)
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="fresh-label flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              LinkedIn URL
            </Label>
            <Input
              value={formData.linkedin_url}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
              placeholder="https://linkedin.com/in/yourprofile"
              className="fresh-input"
            />
          </div>
          <div>
            <Label className="fresh-label flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub URL
            </Label>
            <Input
              value={formData.github_url}
              onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
              placeholder="https://github.com/yourusername"
              className="fresh-input"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full btn-fresh-primary text-lg py-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Registering...
          </>
        ) : (
          <>
            <User className="w-5 h-5 mr-2" />
            Register as JKKN Learner
          </>
        )}
      </Button>
    </form>
  );
}
