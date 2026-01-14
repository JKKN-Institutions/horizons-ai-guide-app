import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, Plus, Trash2, PiggyBank, TrendingUp, AlertCircle } from 'lucide-react';
import { countries } from './data';

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: 'income' | 'expense';
  type: string;
}

const defaultExpenses = [
  { name: 'Rent', type: 'Fixed', amount: 800 },
  { name: 'Food & Groceries', type: 'Variable', amount: 300 },
  { name: 'Transport', type: 'Variable', amount: 100 },
  { name: 'Phone & Internet', type: 'Fixed', amount: 50 },
  { name: 'Utilities', type: 'Fixed', amount: 100 },
  { name: 'Entertainment', type: 'Variable', amount: 100 },
  { name: 'Health Insurance', type: 'Fixed', amount: 150 },
  { name: 'Miscellaneous', type: 'Variable', amount: 100 },
];

export const BudgetPlanner = () => {
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [partTimeHours, setPartTimeHours] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(15);
  const [items, setItems] = useState<BudgetItem[]>(
    defaultExpenses.map((e, i) => ({
      id: `expense-${i}`,
      name: e.name,
      amount: e.amount,
      category: 'expense' as const,
      type: e.type,
    }))
  );

  const country = countries.find(c => c.id === selectedCountry);
  const monthlyIncome = partTimeHours * 4 * hourlyRate;
  const totalExpenses = items.reduce((sum, item) => sum + item.amount, 0);
  const balance = monthlyIncome - totalExpenses;
  const savingsPercent = monthlyIncome > 0 ? Math.round((balance / monthlyIncome) * 100) : 0;

  const updateItem = (id: string, field: 'name' | 'amount', value: string | number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addItem = () => {
    setItems(prev => [...prev, {
      id: `expense-${Date.now()}`,
      name: 'New Expense',
      amount: 0,
      category: 'expense',
      type: 'Variable',
    }]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Card className="border-2 border-emerald-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-emerald-500" />
          Monthly Budget Planner
        </CardTitle>
        <CardDescription>Plan your monthly expenses while studying abroad</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Settings */}
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
            <label className="text-sm font-medium">Part-time hours/week</label>
            <Input
              type="number"
              value={partTimeHours}
              onChange={(e) => setPartTimeHours(Number(e.target.value))}
              max={20}
            />
            <p className="text-xs text-gray-500">Max allowed: {country?.workHours}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Hourly rate ($)</label>
            <Input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Income Summary */}
        <div className="bg-emerald-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold">Monthly Part-time Income</span>
            </div>
            <span className="text-2xl font-bold text-emerald-700">${monthlyIncome.toLocaleString()}</span>
          </div>
        </div>

        {/* Expenses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Monthly Expenses</h4>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="w-4 h-4 mr-1" /> Add Expense
            </Button>
          </div>
          
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="flex-1"
                />
                <Badge variant="outline" className="shrink-0">{item.type}</Badge>
                <div className="relative w-28">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    value={item.amount}
                    onChange={(e) => updateItem(item.id, 'amount', Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <div className="text-sm text-gray-600 mb-1">Total Income</div>
            <div className="text-2xl font-bold text-blue-700">${monthlyIncome}</div>
          </div>
          <div className="p-4 bg-red-50 rounded-xl text-center">
            <div className="text-sm text-gray-600 mb-1">Total Expenses</div>
            <div className="text-2xl font-bold text-red-700">${totalExpenses}</div>
          </div>
          <div className={`p-4 rounded-xl text-center ${balance >= 0 ? 'bg-emerald-50' : 'bg-red-100'}`}>
            <div className="text-sm text-gray-600 mb-1">Balance</div>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
              ${balance}
            </div>
          </div>
        </div>

        {balance < 0 && (
          <div className="flex items-start gap-2 p-4 bg-red-100 rounded-xl text-red-700">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div>
              <span className="font-semibold">Budget Deficit!</span>
              <p className="text-sm">Your expenses exceed your income. Consider reducing non-essential expenses or increasing work hours.</p>
            </div>
          </div>
        )}

        {balance >= 0 && savingsPercent > 0 && (
          <div className="flex items-center gap-2 p-4 bg-emerald-100 rounded-xl text-emerald-700">
            <TrendingUp className="w-5 h-5" />
            <span>You can save <strong>{savingsPercent}%</strong> of your income (${balance}/month)</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
