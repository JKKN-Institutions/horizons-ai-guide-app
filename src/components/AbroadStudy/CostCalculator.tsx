import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calculator, DollarSign, Home, Utensils, Bus, BookOpen, Plane, Heart } from 'lucide-react';
import { countries } from './data';

const exchangeRates: Record<string, number> = {
  usa: 83.5,     // USD to INR
  uk: 105.8,     // GBP to INR
  canada: 61.2,  // CAD to INR
  australia: 54.3, // AUD to INR
  germany: 90.5,   // EUR to INR
  ireland: 90.5,   // EUR to INR
  newzealand: 50.1, // NZD to INR
  singapore: 62.3,  // SGD to INR
};

const livingCosts: Record<string, { rent: number; food: number; transport: number; misc: number }> = {
  usa: { rent: 1200, food: 400, transport: 100, misc: 300 },
  uk: { rent: 800, food: 250, transport: 80, misc: 200 },
  canada: { rent: 900, food: 300, transport: 100, misc: 200 },
  australia: { rent: 1000, food: 350, transport: 120, misc: 250 },
  germany: { rent: 500, food: 200, transport: 50, misc: 150 },
  ireland: { rent: 700, food: 250, transport: 80, misc: 180 },
  newzealand: { rent: 800, food: 300, transport: 90, misc: 200 },
  singapore: { rent: 1000, food: 400, transport: 100, misc: 250 },
};

export const CostCalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [duration, setDuration] = useState(2);
  const [tuition, setTuition] = useState(30000);
  const [lifestyle, setLifestyle] = useState<'budget' | 'moderate' | 'comfortable'>('moderate');

  const country = countries.find(c => c.id === selectedCountry);
  const rate = exchangeRates[selectedCountry];
  const costs = livingCosts[selectedCountry];
  
  const lifestyleMultiplier = lifestyle === 'budget' ? 0.7 : lifestyle === 'comfortable' ? 1.3 : 1;
  
  const monthlyLiving = (costs.rent + costs.food + costs.transport + costs.misc) * lifestyleMultiplier;
  const annualLiving = monthlyLiving * 12;
  const totalTuition = tuition * duration;
  const totalLiving = annualLiving * duration;
  const oneTimeCosts = 3500; // visa, flights, insurance etc
  const total = totalTuition + totalLiving + oneTimeCosts;
  const totalINR = total * rate;

  return (
    <Card className="border-2 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-green-500" />
          Cost Calculator
        </CardTitle>
        <CardDescription>Estimate your total study abroad expenses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.flag} {c.name.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration: {duration} year(s)</label>
            <Slider
              value={[duration]}
              onValueChange={([v]) => setDuration(v)}
              min={1}
              max={4}
              step={1}
              className="mt-4"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Lifestyle</label>
            <div className="flex gap-2">
              {(['budget', 'moderate', 'comfortable'] as const).map(l => (
                <Button
                  key={l}
                  variant={lifestyle === l ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLifestyle(l)}
                  className="flex-1 capitalize"
                >
                  {l}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Annual Tuition: ${tuition.toLocaleString()}</label>
          <Slider
            value={[tuition]}
            onValueChange={([v]) => setTuition(v)}
            min={5000}
            max={70000}
            step={1000}
          />
        </div>

        {/* Cost Breakdown */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-600">Monthly Living Costs ({country?.flag})</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2"><Home className="w-4 h-4 text-blue-500" /> Rent</span>
                <span>${Math.round(costs.rent * lifestyleMultiplier)}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2"><Utensils className="w-4 h-4 text-orange-500" /> Food</span>
                <span>${Math.round(costs.food * lifestyleMultiplier)}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2"><Bus className="w-4 h-4 text-green-500" /> Transport</span>
                <span>${Math.round(costs.transport * lifestyleMultiplier)}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-pink-500" /> Misc</span>
                <span>${Math.round(costs.misc * lifestyleMultiplier)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg font-semibold">
                <span>Monthly Total</span>
                <span>${Math.round(monthlyLiving)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-600">Total Cost Summary</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-500" /> Tuition ({duration}yr)</span>
                <span>${totalTuition.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2"><Home className="w-4 h-4 text-blue-500" /> Living ({duration}yr)</span>
                <span>${Math.round(totalLiving).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2"><Plane className="w-4 h-4 text-purple-500" /> One-time Costs</span>
                <span>${oneTimeCosts.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg font-bold text-lg">
                <span>Grand Total</span>
                <span className="text-green-700">${Math.round(total).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-100 rounded-lg font-bold">
                <span>In INR (₹)</span>
                <span className="text-amber-700">₹{Math.round(totalINR).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          * Estimates based on average costs. Actual costs may vary based on city and personal choices.
        </div>
      </CardContent>
    </Card>
  );
};
