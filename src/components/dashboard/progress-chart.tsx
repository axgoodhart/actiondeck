'use client';

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Task } from '@/lib/types';
import React, { useEffect, useState } from 'react';

export function ProgressChart({ tasks }: {tasks: Task[];}) {
  const [isClient, setIsClient] = useState(false);
  const [chartColors, setChartColors] = useState({ completed: '', pending: '' });

  useEffect(() => {
    setIsClient(true);
    // This is safe because it's in a useEffect, which only runs on the client.
    const computedStyle = getComputedStyle(document.documentElement);
    setChartColors({
      completed: `hsl(${computedStyle.getPropertyValue('--primary').trim()})`,
      pending: `hsl(${computedStyle.getPropertyValue('--muted').trim()})`
    });
  }, []);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const data = [
  { name: 'Tasks', completed: completed, pending: pending }];


  if (!isClient) {
    return <div data-style-id="stylo-91" id="el-37" className="h-[24px] w-full animate-pulse rounded-lg bg-muted" />;
  }

  return (
    <div data-style-id="stylo-92" id="el-38" style={{ width: '100%', height: '24px' }}>
            <ResponsiveContainer data-style-id="stylo-93" width="100%" height="100%">
                <BarChart data-style-id="stylo-94"
        layout="vertical"
        data={data}
        stackOffset="expand"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>

                    <XAxis data-style-id="stylo-95" hide type="number" />
                    <YAxis data-style-id="stylo-96" hide type="category" dataKey="name" />
                    <Tooltip data-style-id="stylo-97"
          cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
          contentStyle={{
            background: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)'
          }}
          formatter={(value, name) => {
            const label = String(name);
            return [`${value} tasks`, label.charAt(0).toUpperCase() + label.slice(1)];
          }} />

                    <Bar data-style-id="stylo-98" dataKey="completed" fill={chartColors.completed} stackId="a" radius={[5, 0, 0, 5]} />
                    <Bar data-style-id="stylo-99" dataKey="pending" fill={chartColors.pending} stackId="a" radius={[0, 5, 5, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>);

}