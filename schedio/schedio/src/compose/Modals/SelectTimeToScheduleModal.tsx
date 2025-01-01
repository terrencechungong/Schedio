import { useModalStatesContext } from '@/app/layout';
import { motion } from "framer-motion";
import styles from '../ScssModules/selecttimetoschedulemodal.module.scss'
import { useState } from "react";
import { addDays, addMonths, endOfMonth, endOfWeek, format, isBefore, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, CloudSun, Moon, Sun, Sunrise } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function isBeforeToday(date: Date, today = startOfDay(new Date())) {
    // const today = startOfDay(new Date()); // Start of the current day
    const ret = isBefore(date, today);
    return ret
}


export const SelectTimeToScheduleModal = () => {
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        overflowY: 'auto',
        paddingTop: '78px',
        zIndex: 20
    };
    const calendarWrapperStyle: React.CSSProperties = {
        width: '98%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingBottom: '23px', borderBottom: '0.5px solid WhiteSmoke'
    }
    const [value, setValue] = useState("01");
    const quickActionButtons= { border: '0.5px solid lightgrey',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor:'pointer' };
    const handleChange = (e, max: number) => {
        let inputValue = e.target.value;

        // Ensure the input is numeric
        if (!/^\d+$/.test(inputValue) && inputValue !== "") return;
        console.log(Math.max(parseInt(inputValue || "0", 10), 0))
        // Clamp the value between 0 and 12
        const numericValue = Math.min(Math.max(parseInt(inputValue || "0", 10), 0), max);

        // Add leading zero for single digits
        setValue(numericValue < 10 ? `0${numericValue}` : `${numericValue}`);
    };
    const todayObject = new Date();
    const [date, setDate] = useState<Date | undefined>(new Date())
    const { setShowSelectPostTimeModal } = useModalStatesContext();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const updateSelectedDate = (cloneDay: Date) => {
        if (isBeforeToday(cloneDay)) {
            return
        }
        if ((!isSameMonth(cloneDay, selectedDate))) {
            setCurrentMonth(cloneDay)
        }
        setSelectedDate(cloneDay)
    }

    const renderHeader = () => {
        const monthIsSame = isSameMonth(currentMonth, todayObject);

        return (
            <div className="flex justify-between items-center mb-4" style={{
                display: 'flex', paddingTop: '15px', paddingBottom: '8px',
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '93%'
            }}>
                <button
                    style={{ cursor: monthIsSame ? 'not-allowed' : '' }}
                    disabled={monthIsSame} onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    <ChevronLeft className={`${monthIsSame ? "text-purple-300" : "text-primary"}`} />
                </button>
                <h2 className="text-lg font-semibold m-0 p-0">
                    {format(currentMonth, "MMM yyyy")}
                </h2>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    <ChevronRight className="text-primary" />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        return (
            <div className="grid grid-cols-7 mb-2 gap-2 pb-3">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="text-center font-medium text-gray-600">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(addDays(startDate, 41));
        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                days.push(
                    <div
                        key={day}
                        onClick={() => {
                            updateSelectedDate(cloneDay)
                        }}
                        className={`px-0 py-2 text-center cursor-pointer 
                  ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""} 
                  ${isSameDay(day, selectedDate) ? "bg-primary text-white" : ""} 
                  ${isSameDay(cloneDay, todayObject) && !isSameDay(todayObject, selectedDate) ? "hover:text-white text-primary" : ""} 
                  ${isBeforeToday(day) ? "hover:bg-purple-200 text-gray-400 hover:text-white" : "hover:bg-primary hover:text-white"}`}
                        style={{ borderRadius: '5px', }}
                    >
                        {format(day, "d")}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div
                    style={{ gap: '5px' }}
                    key={day} className="grid grid-cols-7">
                    {days}
                </div>
            );
            days = [];
        }
        return <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>{rows}</div>;
    };
    return (
        <div
            style={containerStyle}
            onClick={() => setShowSelectPostTimeModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div style={calendarWrapperStyle}>
                    <div className="bg-white rounded-lg w-full" style={{ display: 'flex', flexDirection: 'column' }}>
                        {renderHeader()}
                        {renderDays()}
                        {renderCells()}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', width: '98%', borderBottom: '0.5px solid WhiteSmoke', padding: '0 27px 17px' }}>
                    <p style={{ alignSelf: 'center', color: 'gray', fontSize: '19px', fontWeight: '500' }}>Quick Action</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={quickActionButtons} className="rounded-full h-12 w-12 transition-transform duration-200 hover:bg-accent">
                                <Sunrise size={25} />
                            </div>
                            <p style={{ color: "#606060" }}>Morning</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={quickActionButtons} className="rounded-full h-12 w-12 transition-transform duration-200 hover:bg-accent">
                                <Sun size={25} />
                            </div>
                            <p style={{ color: "#606060" }}>Noon</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={quickActionButtons} className="rounded-full h-12 w-12 transition-transform duration-200 hover:bg-accent">
                                <CloudSun size={25} />
                            </div>
                            <p style={{ color: "#606060" }}>Afternoon</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={quickActionButtons} className="rounded-full h-12 w-12 transition-transform duration-200 hover:bg-accent">
                                <Moon size={25} />
                            </div>
                            <p style={{ color: "#606060" }}>Evening</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems:'center', borderBottom: '0.5px solid WhiteSmoke', padding: '10px 25px 24px', width: '98%', justifyContent: 'center' }}>
                    <p style={{fontSize:'18px'}}>Time</p>
                    <div style={{ borderRadius: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '5px', border: '0.5px solid lightgrey' }}>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e, 12)}
                            className="focus:text-primary"
                            style={{ width: "40px", textAlign: "center", border: 'none', outline: 'none' }}
                        />
                        <p>:</p>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e, 59)}
                            className="focus:text-primary"
                            style={{ width: "40px", textAlign: "center", border: 'none', outline: 'none' }}
                        />
                    </div>
                    <AmOrPmSelector />
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%', gap:'15px', height:'100%', padding:'0px 5px 0'}}>
                    <Button 
                    onClick={() => setShowSelectPostTimeModal(false)}
                    className="bg-white hover:bg-accent text-black shadow-none w-full h-full rounded-md">Cancel</Button>
                    <Button className="bg-primary text-white hover:brightness-90 w-full h-full rounded-md">Pick time</Button>
                </div>
            </motion.div >
        </div >

    )
}


const AmOrPmSelector = () => {

    return (
        <Select>
            <SelectTrigger className="w-[67px] shadow-none" style={{borderColor:'lightgrey'}}>
                <SelectValue placeholder="AM" />
            </SelectTrigger>
            <SelectContent className="w-[64px] shadow-none">
                <SelectGroup>
                    <SelectItem value="am">AM</SelectItem>
                    <SelectItem value="pm">PM</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}