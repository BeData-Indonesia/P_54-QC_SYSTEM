import React from "react";

export default function CardDashboard({
    title = "Produksi",
    value = 800,
    percent,
    unit,
}) {
    const plus = true;
    return (
        <div class="p-5 bg-white rounded shadow-lg">
            <div class="text-base text-gray-400 ">{title}</div>
            <div class="flex items-center pt-1">
                <div class="text-2xl font-bold text-gray-900 flex gap-1 ">
                    <div>{value.toFixed(2)}</div>
                    <div>{unit}</div>
                </div>
                {percent && plus && (
                    <span class="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-green-600 bg-green-100  ">
                        <svg
                            class="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 15L12 9L6 15"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                        <span>{percent}%</span>
                    </span>
                )}
                {percent && !plus && (
                    <span class="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-red-600 bg-red-100 ">
                        <svg
                            class="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                        <span>2.5%</span>
                    </span>
                )}
            </div>
        </div>
    );
}
