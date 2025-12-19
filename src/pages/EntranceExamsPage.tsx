import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EntranceExams } from '@/components/EntranceExams';

const EntranceExamsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, hsl(153 40% 95%) 0%, hsl(153 35% 93%) 25%, hsl(48 100% 94%) 50%, hsl(153 35% 93%) 75%, hsl(153 40% 95%) 100%)' }}>
      {/* Header */}
      <header 
        className="py-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, hsl(153 69% 33%) 0%, hsl(163 64% 26%) 50%, hsl(153 79% 22%) 100%)' }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            📝 Entrance Exams Guide
          </h1>
          <p className="text-amber-300 font-tamil mt-2">நுழைவுத் தேர்வு வழிகாட்டி</p>
        </div>
      </header>

      {/* Entrance Exams Component */}
      <div className="container mx-auto px-4 py-8">
        <EntranceExams />
      </div>
    </div>
  );
};

export default EntranceExamsPage;