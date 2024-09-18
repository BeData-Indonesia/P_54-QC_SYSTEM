import React from "react";
import Table from "@/Components/Table/Table";
import { formatDate } from "@/Helper/formatDate";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TableInject({ rows, onDelete, onEdit }) {
    const headerTableInject = [
        "No Inject",
        "Spasi",
        "Nama Barang",
        "Type",
        "Total",
        "Bagus",
        "Rusak",
        "Cycle Time",
        "Aging Time",
        "Berat kering",
        "Date",
        "Action",
    ];
    return (
        <Table header={headerTableInject}>
            {rows.data.map((row) => {
                return (
                    <tr className=" border-slate-300">
                        <td className="">{row["no_inject"]}</td>
                        <td>{row["spasi"]}</td>
                        <td>{row["expander"]["product"]}</td>
                        <td>{row["expander"]["material_code"]}</td>
                        <td>{row["bagus"] + row["rusak"]}</td>
                        <td className=" max-w-5">{row["bagus"]}</td>
                        <td className=" max-w-5">{row["rusak"]}</td>
                        <td className=" max-w-5">{row["cycle_time"]}</td>
                        <td className=" max-w-5">{row["aging_time"]}</td>
                        <td className=" max-w-5">{row["berat_kering"]}</td>
                        <td className="truncate max-w-11">{row["date"]}</td>
                        <td>
                            <div className=" flex gap-3">
                                <div
                                    className=" cursor-pointer"
                                    onClick={() => onDelete(row["no_inject"])}
                                >
                                    <MdDelete size={24} color="red" />
                                </div>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        onEdit(row["no_inject"]);
                                    }}
                                >
                                    <FaEdit size={24} color="blue" />
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            })}
        </Table>
    );
}
