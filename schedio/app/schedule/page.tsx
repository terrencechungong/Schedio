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
// app/schedule/page.tsx

export default function SchedulePage() {

    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 })); // week starts on Sunday
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [view, setView] = useState(0);
    // Function to get the days in the current week
    const getWeekDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(addDays(currentWeekStart, i));
        }
        return days;
    };

    const getMonthDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(addDays(currentWeekStart, i));
        }
        return days;
    };

    // Handle clicking the left chevron to go to the previous week
    const handlePrevWeek = () => {
        setCurrentWeekStart(prev => subWeeks(prev, 1));
    };

    // Handle clicking the right chevron to go to the next week
    const handleNextWeek = () => {
        setCurrentWeekStart(prev => addWeeks(prev, 1));
    };

    const getCalendarDates = () => {
        const startOfCurrentMonth = startOfMonth(currentMonth);
        const endOfCurrentMonth = endOfMonth(currentMonth);

        // Find the starting Sunday before or on the start of the month
        const calendarStart = startOfWeek(startOfCurrentMonth, { weekStartsOn: 0 });
        // Find the ending Saturday after or on the end of the month
        const calendarEnd = endOfWeek(endOfCurrentMonth, { weekStartsOn: 0 });

        // Generate 42 days from the calendarStart date
        const days = [];
        let day = calendarStart;
        while (days.length < 42) {
            days.push(day);
            day = addDays(day, 1);
        }
        return days;
    };

    const dayOfWeekStyle: React.CSSProperties = {borderRight:'0.5px solid #ddd', textAlign: 'center',padding:'5px'};
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const times = Array.from({ length: 48 }, (_, i) => {
        if (i % 2 == 1) {
            return ''
        }
        const hour = i % 12 || 12; // Converts 0 to 12, 13 to 1, etc.
        const period = i < 12 ? 'AM' : 'PM';
        return `${hour}:00 ${period}`;
    });

    const purpleText = { margin: 0, padding: 0, color: '#7C3AED' };

    return (
        <div style={{ height: '100vh', backgroundColor: '#F7FAFC', width:'100%' }}>
            <div style={{ position: 'absolute', top: 0, left: '4px' }}>
                <SidebarTrigger className="-ml-1 scale-125" />
            </div>

            <div className={styles.container}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px', paddingLeft: '5px' }}>
                        <ChevronLeft
                            onClick={() => {
                                if (!view) handleNextWeek();
                                handleNextMonth()
                            }}
                            className={styles.chevron} />
                        {view == 0 && <p style={purpleText}>{`${format(getWeekDays()[0], 'MMM d')} - ${format(getWeekDays()[getWeekDays().length - 1], 'MMM d')}`}</p>}
                        {view == 1 && <p style={purpleText}>{`${format(getCalendarDates()[0], 'MMM d')} - ${format(getCalendarDates()[getCalendarDates().length - 1], 'MMM d')}`}</p>}
                        <ChevronRight
                            onClick={() => {
                                if (!view) handleNextWeek();
                                handleNextMonth()
                            }}
                            className={styles.chevron} />
                    </div>
                    <div>
                        <Tabs defaultValue="account" className="w-[350px]">
                            <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: '#f6edff' }}>
                                <TabsTrigger
                                    onClick={() => setView(0)}
                                    value="account" className="
                                                text-gray-700
                                                hover:text-gray-400
                                                data-[state=active]:bg-purple-600
                                                data-[state=active]:text-white
                                                data-[state=active]:hover:bg-purple-700
                                            ">Weekly</TabsTrigger>
                                <TabsTrigger
                                    onClick={() => setView(1)}
                                    value="password" className="
                                                text-gray-700
                                                hover:text-gray-400
                                                data-[state=active]:bg-purple-600
                                                data-[state=active]:text-white
                                                data-[state=active]:hover:bg-purple-700
                                            ">Monthly</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
                {view == 0 && <div className={styles.scrollableTable}>
                    <table className={styles.calendarTable}>
                        <thead>
                            <tr>
                                <th className={styles.timeHeader}></th>
                                {getWeekDays().map((day, index) => (
                                    <th key={index}>
                                        <p>{format(day, 'EEEE')}</p>  {/* Day name, e.g., "Saturday" */}
                                        <span>{format(day, 'MMM d, yyyy')}</span>  {/* Date, e.g., "Nov 23" */}
                                    </th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            {times.map((time) => (
                                <tr key={time}>
                                    <td className={styles.timeCell}>{time}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
                {
                    view == 1 && <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                            {daysOfWeek.map((day, index) => (<div key={index} style={dayOfWeekStyle}>{day}</div>))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', flexGrow: 1 }}>
                            {getCalendarDates().map((day, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: isSameDay(day, new Date()) ? 'rgb(245, 245, 245)' : 'white',
                                        color: isSameMonth(day, currentMonth) ? '#333' : 'rgb(175, 175, 175)',
                                        borderBottom: '0.5px solid #ddd',
                                        borderRight: '0.5px solid #ddd',
                                        borderLeft: index % 7 == 0 ? '0.5px solid #ddd' : '',
                                        borderTop: index < 7 ? '0.5px solid #ddd' : ''
                                    }}
                                >
                                    {format(day, 'd')}
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};