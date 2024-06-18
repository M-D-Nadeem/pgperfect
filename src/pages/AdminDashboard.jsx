import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintsChart from "./complainsChart";
import { useDispatch } from "react-redux";
import { getAllProperty } from "../redux/slice/propertySlice";

function AdminDashboard() {
    const navigate = useNavigate();
    const [propertyData, setPropertyData] = useState([]);
    const dispatch = useDispatch();

    async function loadProperties() {
        const response = await dispatch(getAllProperty());
        if (response?.payload?.success) {
            setPropertyData(response?.payload?.data);
        }
    }

    useEffect(() => {
        loadProperties();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTenant = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-[100%] h-[100%]">
            <div className="w-[100%] h-[25%]">
                <header className="bg-gray-300 shadow">
                    <div className="flex justify-between w-full py-4 px-10">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Welcome, Admin
                        </h1>
                        <div>
                            <div className="p-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAddTenant}
                                >
                                    Add Tenant
                                </button>

                                {isModalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                        <div className="modal-box bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                            <div className="modal-content">
                                                <h2 className="text-lg font-bold mb-4 text-center">Select Property</h2>
                                                <ul className="divide-y divide-gray-200">
                                                    {propertyData && propertyData.map((data) => (
                                                        <li key={data.id} className="py-2">
                                                            <button
                                                                onClick={() => navigate("/adduser", { state: { cards: { ...data } } })}
                                                                className="btn btn-outline btn-accent w-full"
                                                            >
                                                                {data.name}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="modal-action mt-4">
                                                <button
                                                    className="btn btn-primary w-full"
                                                    onClick={handleCloseModal}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <main className="flex items-center gap-6 w-[100%] h-[580px] px-10 py-6">
                <div className="bg-slate-200 flex flex-col justify-center items-center w-[50%] h-[100%] border-2 rounded-md shadow-lg px-4 py-6">
                    <div className="chart-container flex justify-center items-center w-full h-full">
                        <div className="chart-3 w-full h-full hover:scale-110 transition-transform duration-500">
                            <ComplaintsChart />
                        </div>
                    </div>
                </div>
                <div className="bg-slate-200 flex flex-col justify-start items-center w-[25%] h-[100%] border-2 rounded-lg shadow-lg px-4 py-6 gap-8">
                    <button
                        onClick={() => navigate("/addbuilding")}
                        className="w-full h-1/2 bg-blue-600 text-white hover:text-black hover:bg-white rounded-md hover:outline hover:outline-blue-600 duration-500 p-4"
                    >
                        Add building
                    </button>
                    <button
                        onClick={() => navigate("/listbuilding")}
                        className="w-full h-1/2 bg-blue-600 text-white hover:text-black hover:bg-white rounded-md hover:outline hover:outline-blue-600 duration-500 p-4"
                    >
                        View Building Data &rarr;
                    </button>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
