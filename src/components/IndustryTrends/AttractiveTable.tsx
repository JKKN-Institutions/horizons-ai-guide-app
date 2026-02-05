 import React from 'react';
 import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
 
 // Attractive Table Component with colorful headers
 export const AttractiveTable = ({ 
   title,
   headers, 
   children,
   headerColor = 'from-rose-400 to-rose-500'
 }: { 
   title?: string;
   headers: string[];
   children: React.ReactNode;
   headerColor?: string;
 }) => (
   <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-card">
     {title && (
       <div className={`bg-gradient-to-r ${headerColor} px-6 py-4`}>
         <h3 className="text-white font-bold text-lg">{title}</h3>
       </div>
     )}
     <Table>
       <TableHeader>
         <TableRow className={`${!title ? `bg-gradient-to-r ${headerColor}` : 'bg-muted/30 border-b'}`}>
           {headers.map((header, idx) => (
             <TableHead 
               key={idx} 
               className={`font-semibold py-4 px-5 ${!title ? 'text-white' : 'text-foreground'}`}
             >
               {header}
             </TableHead>
           ))}
         </TableRow>
       </TableHeader>
       <TableBody className="divide-y divide-border/50">
         {children}
       </TableBody>
     </Table>
   </div>
 );
 
 // Time Badge Component - elegant pill styling
 export const TimeBadge = ({ time }: { time: string }) => (
   <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
     {time}
   </span>
 );
 
 // Salary Badge Component - gradient styling
 export const SalaryBadge = ({ salary }: { salary: string }) => (
   <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-400 dark:border-emerald-800">
     {salary}
   </span>
 );
 
 // Skills Badge Component
 export const SkillsBadge = ({ skills, color = 'purple' }: { skills: string; color?: 'purple' | 'orange' | 'blue' }) => {
   const colorClasses = {
     purple: 'from-purple-50 to-violet-50 text-purple-700 border-purple-200 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-400 dark:border-purple-800',
     orange: 'from-orange-50 to-amber-50 text-orange-700 border-orange-200 dark:from-orange-900/30 dark:to-amber-900/30 dark:text-orange-400 dark:border-orange-800',
     blue: 'from-blue-50 to-indigo-50 text-blue-700 border-blue-200 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400 dark:border-blue-800',
   };
   
   return (
     <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r border ${colorClasses[color]}`}>
       {skills}
     </span>
   );
 };
 
 // Groups Badge Component
 export const GroupsBadge = ({ groups }: { groups: string }) => (
   <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary border border-secondary/20">
     {groups}
   </span>
 );