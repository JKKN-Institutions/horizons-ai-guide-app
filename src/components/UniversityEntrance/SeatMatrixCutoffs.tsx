import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, TrendingDown, Info } from 'lucide-react';
import { SeatMatrix, YearCutoff } from '@/data/university-entrance-data';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SeatMatrixCutoffsProps {
  seatMatrix?: SeatMatrix;
  cutoffs?: YearCutoff[];
  courseName: string;
}

const categoryColors: Record<string, string> = {
  general: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  obc: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  bcMbc: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  sc: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  st: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  ews: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
};

const categoryLabels: Record<string, { en: string; ta: string }> = {
  general: { en: 'General (OC)', ta: 'பொது (OC)' },
  obc: { en: 'OBC', ta: 'OBC' },
  bcMbc: { en: 'BC/MBC/DNC', ta: 'BC/MBC/DNC' },
  sc: { en: 'SC', ta: 'SC' },
  st: { en: 'ST', ta: 'ST' },
  ews: { en: 'EWS', ta: 'EWS' },
};

export const SeatMatrixCutoffs = ({ seatMatrix, cutoffs, courseName }: SeatMatrixCutoffsProps) => {
  if (!seatMatrix && (!cutoffs || cutoffs.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Seat Matrix Section */}
      {seatMatrix && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                  <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <span className="text-foreground">Seat Matrix</span>
                  <p className="text-xs font-normal text-muted-foreground mt-0.5">
                    இருக்கைகள் விவரம் • Total Seats Available
                  </p>
                </div>
                <Badge className="ml-auto bg-emerald-500 text-white text-base px-3 py-1">
                  {seatMatrix.total} Seats
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Object.entries(seatMatrix)
                  .filter(([key]) => key !== 'total')
                  .map(([category, seats], index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 rounded-xl text-center ${categoryColors[category] || 'bg-gray-100'}`}
                    >
                      <div className="text-2xl font-bold">{seats}</div>
                      <div className="text-xs font-medium mt-1">
                        {categoryLabels[category]?.en || category.toUpperCase()}
                      </div>
                      <div className="text-xs opacity-75 font-tamil">
                        {categoryLabels[category]?.ta || ''}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Cutoffs Section */}
      {cutoffs && cutoffs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-background">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                  <TrendingDown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <span className="text-foreground">Previous Year Cutoffs</span>
                  <p className="text-xs font-normal text-muted-foreground mt-0.5">
                    கடந்த ஆண்டு கட்-ஆஃப் மதிப்பெண்கள் • Last 3 Years
                  </p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground ml-auto cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-[200px]">
                        Cutoff marks are indicative and may vary based on difficulty and applicant pool each year.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-4 px-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-amber-50 dark:bg-amber-900/20">
                      <TableHead className="font-bold text-amber-900 dark:text-amber-200">Year</TableHead>
                      <TableHead className="text-center font-semibold">General</TableHead>
                      <TableHead className="text-center font-semibold">OBC</TableHead>
                      <TableHead className="text-center font-semibold">BC/MBC</TableHead>
                      <TableHead className="text-center font-semibold">SC</TableHead>
                      <TableHead className="text-center font-semibold">ST</TableHead>
                      {cutoffs.some(c => c.ews) && (
                        <TableHead className="text-center font-semibold">EWS</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cutoffs.map((cutoff, index) => (
                      <motion.tr
                        key={cutoff.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-amber-50/50 dark:hover:bg-amber-900/10"
                      >
                        <TableCell className="font-bold text-amber-700 dark:text-amber-300">
                          {cutoff.year}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={categoryColors.general}>
                            {cutoff.general}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={categoryColors.obc}>
                            {cutoff.obc}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={categoryColors.bcMbc}>
                            {cutoff.bcMbc}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={categoryColors.sc}>
                            {cutoff.sc}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={categoryColors.st}>
                            {cutoff.st}
                          </Badge>
                        </TableCell>
                        {cutoffs.some(c => c.ews) && (
                          <TableCell className="text-center">
                            <Badge variant="outline" className={categoryColors.ews}>
                              {cutoff.ews || '-'}
                            </Badge>
                          </TableCell>
                        )}
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Trend Analysis */}
              <div className="mt-4 p-3 bg-gradient-to-r from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <span className="font-semibold">💡 Tip:</span> Compare your expected score with cutoffs to estimate your chances. 
                  Lower cutoff in recent years may indicate increased seat availability or higher difficulty.
                </p>
                <p className="text-xs text-amber-700/80 dark:text-amber-300/70 mt-1 font-tamil">
                  உங்கள் எதிர்பார்க்கும் மதிப்பெண்களை கட்-ஆஃப் உடன் ஒப்பிட்டு உங்கள் வாய்ப்புகளை மதிப்பிடுங்கள்.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
