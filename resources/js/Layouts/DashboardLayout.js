import React from "react";

export default function DashboardLayout({ children }) {
    return (
        <div className=" py-8  w-full">
            <div className="  mx-auto sm:px-6 lg:px-8 w">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200  ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
