import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Results = () => {
    const drawTimes = [
        "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15",
        "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15",
        "12:30", "12:45", "01:00", "01:15", "01:30", "01:45", "02:00", "02:15", "02:30",
        "02:45", "03:00", "03:15", "03:30", "03:45", "04:00", "04:15", "04:30", "04:45",
        "05:00", "05:15", "05:30", "05:45", "06:00", "06:15", "06:30", "06:45", "07:00",
        "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15",
        "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30"
    ];

    const yantraGroups = ["NV06", "RR26", "RY58 ", "CH33"];

    const [selectedDate, setSelectedDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSearch = () => {
        setCurrentDate(selectedDate);
    };

    const getCurrentDate = () => {
        if (currentDate) {
            return new Date(currentDate).toLocaleDateString();
        } else {
            return 'No date selected';
        }
    };

    return (
        <div className="p-10 md:p-10 mr-20 ml-20 text-center font-times min-h-screen">
            <div className="flex flex-wrap items-center mt-4 gap-4 w-full justify-center">
                <div className="w-full max-w-xs sm:w-auto sm:max-w-none">
                    <input
                        type="date"
                        className="w-full px-2 py-1 sm:px-3 sm:py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="w-full max-w-xs sm:w-auto sm:max-w-none">
                    <button
                        className="w-full uppercase px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 text-black rounded-md border focus:outline-none hover:bg-gray-300 text-xs sm:text-sm"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-semibold my-4">Date: {getCurrentDate()}</h2>

            <div className="table-container  max-h-full ">
                <table className="w-full border-2 border-gray-800  border-separate border-collapse border-double bg-white border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="text-customRed">
                            <th className="border-2 border-gray-800  border-separate border-collapse border-double text-xs text-center py-2">DRAW TIME</th>
                            <th colSpan={4} className="border-2 border-gray-800  border-separate border-collapse border-double text-xs py2 text-center">YANTRA GROUP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drawTimes.map((time, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border-2 border-gray-800  border-separate border-collapse border-double text-xs font-bold py-2 text-center">{time}</td>
                                <td className="border-2 border-gray-800  border-separate border-collapse border-double text-xs font-bold py-2 text-center">{yantraGroups[index % yantraGroups.length]}</td>
                                <td className="border-2 border-gray-800  border-separate border-collapse border-double text-xs font-bold py-2 text-center">{yantraGroups[index % yantraGroups.length]}</td>
                                <td className="border-2 border-gray-800  border-separate border-collapse border-double text-xs font-bold py-2 text-center">{yantraGroups[index % yantraGroups.length]}</td>
                                <td className="border-2 border-gray-800  border-separate border-collapse border-double text-xs font-bold py-2 text-center">{yantraGroups[index % yantraGroups.length]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/live-result" className="block w-full text-center mb-2 py-5">
                    <button className="py-2 px-5 bg-customVoilet hover:bg-green-500 text-white rounded font-times  text-xs shadow-md">
                        LIVE RESULT
                    </button>
                </Link>
            </div>
            {/* Fixed buttons at the bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-800 flex justify-center space-x-10">
                <Link to="/login">
                    <button className="text-customRed font-semibold">LOGIN</button>
                </Link>
                <Link to="/results">
                    <button className="text-customRed font-semibold">RESULTS</button>
                </Link>
                <Link to="/register">
                    <button className="text-customRed font-semibold">REGISTER</button>
                </Link>
            </div>
        </div>
    );
}

export default Results;
