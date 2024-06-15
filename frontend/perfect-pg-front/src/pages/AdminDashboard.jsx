import React from "react";
import { LineGraph } from "./charts/Line";
import { BarChart } from "./charts/BarChart";
import { PieChart } from "./charts/Pie";
import { Link, useNavigate } from "react-router-dom";



function AdminDashboard() {
    const navigate=useNavigate()
  return (
    <>
      <div className="w-[100%] h-[100%]">
        <div className="w-[100%] h-[25%]">
  

          <header className="bg-gray-300 shadow">
            <div className=" flex justify-between w-full py-4 px-10">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome, Admin
              </h1>
            </div>
          </header>
        </div>
        <main className="flex  items-center gap-6 w-[100%] h-[580px] px-10 py-6">
          <div className=" bg-slate-200 flex justify-evenly items-center w-[25%]] h-[100%] border-2 rounded-md shadow-lg px-4 py-6 w-3/4">
            <div className="flex flex-col gap-16">
              <h2 className="text-2xl font-bold">Complaint</h2>
              <div classname="bg-white chart-1 hover:scale-110">
                <LineGraph width="900px" />
              </div>
              <div className="hover:scale-110">
                <BarChart />
              </div>
            </div>
            <div className="chart-3 mt-16 hover:scale-110">
              <PieChart />
            </div>
          </div>
          <div className="bg-slate-200 flex flex-col justify-start items-center w-[25%] h-[100%] border-2 rounded-lg shadow-lg px-4 py-6 gap-8">
            <button onClick={()=>navigate("/addbuilding")} className="w-full h-1/2 bg-blue-600 text-white hover:text-black hover:bg-white rounded-md hover:outline hover:outline-blue-600 duration-500 p-4">
              Add building
            </button>
            <button onClick={()=>navigate("/listbuilding")} className="w-full h-1/2 bg-blue-600 text-white hover:text-black hover:bg-white rounded-md hover:outline hover:outline-blue-600 duration-500 p-4">
              View Building Data &rarr;
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;