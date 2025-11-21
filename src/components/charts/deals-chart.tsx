"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dealsByStage } from '@/lib/dummy-data';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function DealsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deals by Stage</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dealsByStage}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ stage, count }) => `${stage}: ${count}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {dealsByStage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, 'Deals']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}