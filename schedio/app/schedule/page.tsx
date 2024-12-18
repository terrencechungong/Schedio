"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './schedule.module.scss'
import { SidebarTrigger } from '@/components/ui/sidebar';
import React, { useEffect, useState } from 'react';
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';
import { addMonths, subMonths, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import FullCalendarWrapper from '../posts/calandertest';
// app/schedule/page.tsx

export default function SchedulePage() {



    return (
        // <div style={{maxWidth:'100%', width:'100%', height:'100%', maxHeight:'100%'}}>
            <FullCalendarWrapper />
        // </div>
    );
};