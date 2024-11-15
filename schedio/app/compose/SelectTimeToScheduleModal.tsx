import { useModalStatesContext } from "../layout";
import { motion } from "framer-motion";
import styles from './selecttimetoschedulemodal.module.scss'
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";

export const SelectTimeToScheduleModal = () => {
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '78px',
        zIndex: 20
    }
    const [date, setDate] = useState<Date | undefined>(new Date())
    const { setShowSelectPostTimeModal } = useModalStatesContext();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    
    const renderHeader = () => {
        return (
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              {"<"}
            </button>
            <h2 className="text-lg font-semibold">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              {">"}
            </button>
          </div>
        );
      };
    
      const renderDays = () => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
          <div className="grid grid-cols-7 mb-2">
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
        const endDate = endOfWeek(addDays(startDate, 41)); // Ensures 6 rows (42 days)
        const rows = [];
        let days = [];
        let day = startDate;
    
        while (day <= endDate) {
          for (let i = 0; i < 7; i++) {
            const cloneDay = day;
            days.push(
              <div
                key={day}
                onClick={() => setSelectedDate(cloneDay)}
                className={`p-2 text-center border border-gray-200 cursor-pointer 
                  ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""} 
                  ${isSameDay(day, selectedDate) ? "bg-blue-500 text-white" : ""} 
                  hover:bg-blue-100`}
              >
                {format(day, "d")}
              </div>
            );
            day = addDays(day, 1);
          }
          rows.push(
            <div key={day} className="grid grid-cols-7">
              {days}
            </div>
          );
          days = [];
        }
        return <div>{rows}</div>;
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

                <div className="bg-white rounded-lg w-full">
                    {renderHeader()}
                    {renderDays()}
                    {renderCells()}
                </div>
            </motion.div>
        </div>

    )
}