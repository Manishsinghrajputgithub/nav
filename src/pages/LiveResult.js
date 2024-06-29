import React from 'react';
import { Link } from 'react-router-dom';

const LiveResult = () => {
    return (
        <div className="bg-customYellow p-2 font-times">
            <h1 className="text-start text-base mt-10 text-customRed mx-auto">
                Golden Navratna Coupon & Navratna Coupon | Results Chart Today...
            </h1>

            <div className="flex justify-center mt-4">
                <table className="w-1/3 border-1 border-customRed border-separate border-collapse border shadow-lg">
                    <thead>
                        <tr className="text-customRed">
                            <th className="border-1 border-gray-600 border-separate border-collapse border text-sm text-start py-1 p-2">Date : 29/06/2024</th>
                            <th className="border-1 border-gray-600 border-separate border-collapse border text-sm py-1 text-center"> Time : 14:00 </th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-5">
                <div className="max-w-xs mx-2 my-1 text-center">
                    <p className="mb-2">
                        <span className="text-customRed font-times text-2xl font-bold">Product Code:</span> <span className="text-customBlue font-times text-3xl font-bold">NV41</span>
                    </p>
                    <img src="img/NV86.webp" alt="NV41" className="w-3/4 mx-auto" />
                </div>
                <div className="max-w-xs mx-2 my-1 text-center">
                    <p className="mb-2">
                        <span className="text-customRed font-times text-2xl font-bold">Product Code:</span> <span className="text-customBlue font-times text-3xl font-bold">RR21</span>
                    </p>
                    <img src="img/CH21.webp" alt="RR21" className="w-3/4 mx-auto rounded-lg shadow-md" />
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                <div className="max-w-xs mx-2 my-1 text-center">
                    <p className="mb-2">
                        <span className="text-customRed font-times text-2xl font-bold">Product Code:</span> <span className="text-customBlue font-times text-3xl font-bold">RY19</span>
                    </p>
                    <img src="img/RR06.webp" alt="RY19" className="w-3/4 mx-auto rounded-lg shadow-md" />
                </div>
                <div className="max-w-xs mx-2 my-1 text-center">
                    <p className="mb-2">
                        <span className="text-customRed font-times text-2xl font-bold">Product Code:</span> <span className="text-customBlue font-times text-3xl font-bold">CH69</span>
                    </p>
                    <img src="img/RY04.webp" alt="CH69" className="w-3/4 mx-auto rounded-lg shadow-md" />
                </div>
            </div>

            <Link to="/results" className="block w-full text-center mb-2 py-5">
                    <button className="py-2 px-5 bg-customVoilet text-white rounded font-times  text-sm shadow-md">
                         RESULT
                    </button>
                </Link>
        </div>
    );
}

export default LiveResult;
