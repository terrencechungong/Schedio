"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './schedule.module.scss'
import { SidebarTrigger } from '@/components/ui/sidebar';
import React, { useState } from 'react';
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';
// app/schedule/page.tsx

export default function SchedulePage() {

    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 })); // week starts on Sunday

    // Function to get the days in the current week
    const getWeekDays = () => {
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

    const times = Array.from({ length: 48 }, (_, i) => {
        if (i % 2 == 1) {
            return ''
        }
        const hour = i % 12 || 12; // Converts 0 to 12, 13 to 1, etc.
        const period = i < 12 ? 'AM' : 'PM';
        return `${hour}:00 ${period}`;
    });

    return (
        <div style={{ height: '100vh', backgroundColor: '#F5F5F5' }}>
            <div className={styles.container}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h1 style={{ backgroundColor: 'none' }}><SidebarTrigger className="-ml-1 scale-125" />Schedule</h1>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px', paddingLeft: '5px' }}>
                        <ChevronLeft
                            onClick={() => handlePrevWeek()}
                            className={styles.chevron} />
                        <p style={{ margin: 0, padding: 0 }}>{`${format(getWeekDays()[0], 'MMM d')} - ${format(getWeekDays()[getWeekDays().length - 1], 'MMM d')}`}</p>
                        <ChevronRight
                            onClick={() => handleNextWeek()}
                            className={styles.chevron} />
                    </div>
                </div>
                <div className={styles.scrollableTable}>
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
                </div>
            </div>
        </div>
    );
};