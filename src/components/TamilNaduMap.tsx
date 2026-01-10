import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface District {
  id: string;
  label: string;
  color: string;
  emoji: string;
}

interface TamilNaduMapProps {
  districts: District[];
  selectedLocations: string[];
  onToggleLocation: (id: string) => void;
}

// Simplified SVG positions for Tamil Nadu districts (approximate geographic layout)
const districtPositions: Record<string, { x: number; y: number; width: number; height: number }> = {
  // North TN
  chennai: { x: 78, y: 22, width: 18, height: 18 },
  vellore: { x: 58, y: 18, width: 22, height: 20 },
  kanchipuram: { x: 70, y: 32, width: 20, height: 18 },
  krishnagiri: { x: 42, y: 18, width: 20, height: 18 },
  dharmapuri: { x: 32, y: 22, width: 20, height: 18 },
  // Central TN
  salem: { x: 35, y: 34, width: 22, height: 20 },
  erode: { x: 22, y: 34, width: 20, height: 18 },
  namakkal: { x: 32, y: 44, width: 20, height: 18 },
  tiruchirappalli: { x: 48, y: 52, width: 24, height: 22 },
  karur: { x: 38, y: 52, width: 18, height: 16 },
  // West TN
  coimbatore: { x: 12, y: 44, width: 24, height: 22 },
  tirupur: { x: 18, y: 52, width: 18, height: 16 },
  dindigul: { x: 30, y: 62, width: 20, height: 18 },
  // East Coast
  cuddalore: { x: 72, y: 42, width: 18, height: 18 },
  villupuram: { x: 65, y: 35, width: 18, height: 18 },
  thanjavur: { x: 60, y: 58, width: 22, height: 20 },
  nagapattinam: { x: 72, y: 60, width: 18, height: 18 },
  // South TN
  madurai: { x: 42, y: 72, width: 22, height: 20 },
  sivaganga: { x: 55, y: 70, width: 18, height: 16 },
  ramanathapuram: { x: 65, y: 78, width: 20, height: 18 },
  tirunelveli: { x: 38, y: 84, width: 22, height: 18 },
  thoothukudi: { x: 52, y: 85, width: 18, height: 16 },
  kanyakumari: { x: 35, y: 94, width: 20, height: 18 },
  // Special
  tamilnadu: { x: 40, y: 50, width: 0, height: 0 }, // Center point, not rendered
};

const TamilNaduMap = ({ districts, selectedLocations, onToggleLocation }: TamilNaduMapProps) => {
  const visibleDistricts = districts.filter(d => d.id !== 'tamilnadu');
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Map Title */}
      <div className="text-center mb-3">
        <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
          🗺️ Click on districts to select
        </span>
      </div>
      
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-emerald-50/50 via-blue-50/30 to-amber-50/50 rounded-2xl p-4 border border-muted/50">
        {/* Tamil Nadu Outline - Simplified Shape */}
        <svg viewBox="0 0 100 100" className="w-full h-auto" style={{ minHeight: '280px' }}>
          {/* Background state shape */}
          <defs>
            <linearGradient id="tnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142, 76%, 95%)" />
              <stop offset="50%" stopColor="hsl(199, 89%, 95%)" />
              <stop offset="100%" stopColor="hsl(45, 93%, 95%)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Simplified TN outline */}
          <path
            d="M 25 10 
               Q 50 5, 85 15 
               Q 95 30, 90 50 
               Q 85 70, 70 85 
               Q 50 95, 30 90 
               Q 15 80, 10 60 
               Q 5 40, 15 25 
               Q 20 15, 25 10 Z"
            fill="url(#tnGradient)"
            stroke="hsl(142, 40%, 70%)"
            strokeWidth="0.5"
            className="opacity-60"
          />
          
          {/* Bay of Bengal indicator */}
          <text x="88" y="40" className="fill-blue-300 text-[4px] font-light">
            Bay of
          </text>
          <text x="86" y="45" className="fill-blue-300 text-[4px] font-light">
            Bengal
          </text>
          
          {/* District nodes */}
          {visibleDistricts.map((district) => {
            const pos = districtPositions[district.id];
            if (!pos) return null;
            
            const isSelected = selectedLocations.includes(district.id);
            const isNamakkal = district.id === 'namakkal';
            
            return (
              <g key={district.id}>
                {/* Connection lines to nearby districts */}
                {district.id === 'coimbatore' && (
                  <>
                    <line x1={pos.x + 8} y1={pos.y + 8} x2={35} y2={40} stroke="hsl(200, 20%, 80%)" strokeWidth="0.3" strokeDasharray="2,1" />
                    <line x1={pos.x + 8} y1={pos.y + 8} x2={25} y2={42} stroke="hsl(200, 20%, 80%)" strokeWidth="0.3" strokeDasharray="2,1" />
                  </>
                )}
                
                {/* District bubble */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 * visibleDistricts.indexOf(district), duration: 0.3 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onToggleLocation(district.id)}
                >
                  {/* Glow effect for selected */}
                  {isSelected && (
                    <circle
                      cx={pos.x + 8}
                      cy={pos.y + 8}
                      r="12"
                      className="animate-pulse"
                      fill={`url(#gradient-${district.id})`}
                      opacity="0.3"
                    />
                  )}
                  
                  {/* Namakkal special ring */}
                  {isNamakkal && (
                    <circle
                      cx={pos.x + 8}
                      cy={pos.y + 8}
                      r="11"
                      fill="none"
                      stroke="hsl(45, 93%, 58%)"
                      strokeWidth="1"
                      strokeDasharray="3,2"
                      className="animate-spin"
                      style={{ animationDuration: '10s' }}
                    />
                  )}
                  
                  {/* Main circle */}
                  <circle
                    cx={pos.x + 8}
                    cy={pos.y + 8}
                    r={isSelected ? "9" : "7"}
                    fill={isSelected ? `url(#gradient-${district.id})` : "white"}
                    stroke={isSelected ? "white" : "hsl(200, 20%, 80%)"}
                    strokeWidth={isSelected ? "1.5" : "0.8"}
                    filter={isSelected ? "url(#glow)" : undefined}
                    className="transition-all duration-300"
                  />
                  
                  {/* Emoji or Check */}
                  <text
                    x={pos.x + 8}
                    y={pos.y + 10.5}
                    textAnchor="middle"
                    className="text-[6px] pointer-events-none select-none"
                  >
                    {isSelected ? '✓' : district.emoji}
                  </text>
                  
                  {/* District label */}
                  <text
                    x={pos.x + 8}
                    y={pos.y + 20}
                    textAnchor="middle"
                    className={`text-[3.5px] font-medium pointer-events-none select-none ${
                      isSelected ? 'fill-foreground' : 'fill-muted-foreground'
                    }`}
                  >
                    {district.label}
                  </text>
                </motion.g>
                
                {/* Gradient definitions for each district */}
                <defs>
                  <linearGradient id={`gradient-${district.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={getGradientColor(district.color, 'start')} />
                    <stop offset="100%" stopColor={getGradientColor(district.color, 'end')} />
                  </linearGradient>
                </defs>
              </g>
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-white border border-muted-foreground/30"></span>
            Available
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-green-600"></span>
            Selected
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-400"></span>
            JKKN Hub
          </span>
        </div>
      </div>
      
      {/* Selection count badge */}
      {selectedLocations.filter(loc => visibleDistricts.some(d => d.id === loc)).length > 0 && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-lg"
        >
          {selectedLocations.filter(loc => visibleDistricts.some(d => d.id === loc)).length} selected
        </motion.div>
      )}
    </div>
  );
};

// Helper function to extract colors from Tailwind gradient classes
function getGradientColor(colorClass: string, position: 'start' | 'end'): string {
  const colorMap: Record<string, { start: string; end: string }> = {
    'from-emerald-500 to-green-600': { start: 'hsl(160, 84%, 39%)', end: 'hsl(142, 71%, 35%)' },
    'from-rose-500 to-pink-600': { start: 'hsl(350, 89%, 60%)', end: 'hsl(333, 71%, 51%)' },
    'from-blue-500 to-indigo-600': { start: 'hsl(217, 91%, 60%)', end: 'hsl(239, 84%, 53%)' },
    'from-amber-500 to-orange-600': { start: 'hsl(38, 92%, 50%)', end: 'hsl(25, 95%, 53%)' },
    'from-purple-500 to-violet-600': { start: 'hsl(271, 91%, 65%)', end: 'hsl(263, 70%, 50%)' },
    'from-slate-500 to-gray-600': { start: 'hsl(215, 16%, 47%)', end: 'hsl(215, 14%, 34%)' },
    'from-yellow-500 to-amber-600': { start: 'hsl(45, 93%, 47%)', end: 'hsl(32, 95%, 44%)' },
    'from-cyan-500 to-teal-600': { start: 'hsl(189, 94%, 43%)', end: 'hsl(175, 77%, 35%)' },
    'from-fuchsia-500 to-pink-600': { start: 'hsl(292, 84%, 61%)', end: 'hsl(333, 71%, 51%)' },
    'from-green-500 to-emerald-600': { start: 'hsl(142, 71%, 45%)', end: 'hsl(160, 84%, 33%)' },
    'from-lime-500 to-green-600': { start: 'hsl(84, 81%, 44%)', end: 'hsl(142, 71%, 35%)' },
  };
  
  const colors = colorMap[colorClass] || { start: 'hsl(142, 71%, 45%)', end: 'hsl(142, 71%, 35%)' };
  return colors[position];
}

export default TamilNaduMap;
