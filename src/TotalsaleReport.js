import React from 'react';

function TotalsaleReport() {
    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 w-full">
            <div className="text-lg sm:text-xl lg:text-2xl text-center font-bold text-black">
                Total Sale Report
            </div>
            <div className="flex flex-wrap items-center mt-4 gap-4 w-full justify-center">
                <div className="w-full max-w-xs sm:w-auto sm:max-w-none">
                    <input
                        type="date"
                        className="w-full px-2 py-1 sm:px-3 sm:py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                    />
                </div>
                <div className="w-full max-w-xs sm:w-auto sm:max-w-none">
                    <button className="w-full uppercase px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 text-black rounded-md border focus:outline-none hover:bg-gray-300 text-xs sm:text-sm">
                        Search
                    </button>
                </div>
            </div>

            <div className="w-full mt-8 overflow-x-auto">
                <div className="min-w-full">
                    <table className="w-full border-collapse border border-black text-xs sm:text-sm">
                        <thead>
                            <tr>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">Draw Time</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">Game Name</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">0-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">1-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">2-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">3-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">4-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">5-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">6-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">7-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">8-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">9-0</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">Qty.</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">Amount</th>
                                <th className="uppercase border border-black p-2 sm:p-2 text-center">Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="uppercase border border-black p-2 sm:p-2 text-end" colSpan="12">Total</td>
                                <td className="uppercase border border-black p-2 sm:p-2 text-center">0</td>
                                <td className="uppercase border border-black p-2 sm:p-2 text-center">0</td>
                                <td className="uppercase border border-black p-2 sm:p-2 text-center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TotalsaleReport;
