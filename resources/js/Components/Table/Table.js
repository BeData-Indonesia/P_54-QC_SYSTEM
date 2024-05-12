import React from "react";

export default function Table({ children, header }) {
    return (
        <div className=" card border overflow-x-auto ">
            <table className="table  card-body ">
                <thead className="pt-6">
                    <tr className="">
                        {header.map((headerTitle) => {
                            return (
                                <th className=" pt-8  text-base text-black font-bold">
                                    {headerTitle}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className=" rounded-none">{children}</tbody>
            </table>
        </div>
    );
}
