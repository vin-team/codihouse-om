'use client'
import LogsHeader from '@/components/logs/Header';
import LogsFilter from '@/components/logs/Filter';
import LogsList from '@/components/logs/List';
import React from 'react';

interface LogsProps { }

const Logs: React.FC<LogsProps> = ({ }) => {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <LogsHeader />
      <LogsFilter />
      <LogsList />
    </div>
  );
};

export default Logs;