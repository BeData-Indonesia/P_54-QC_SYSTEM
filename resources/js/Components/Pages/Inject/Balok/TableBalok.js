import React from "react";
import Table from "@/Components/Table/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TableBalok({ rows, onDelete, onEdit }) {
    const headerTableInject = [
        "No Balok",
        "Type",
        "Density",
        "Jumlah Balok",
        "Berat (kg)",
        "Date",
        "Keterangan",
        "Action",
    ];

    return (
        <Table header={headerTableInject}>
            {rows.data.map((row) => {
                return (
                    <tr className=" border-slate-300">
                        <td className="">{row["no_balok"]}</td>
                        <td>{row["expander"]["material_code"]}</td>
                        <td>{row["density"]}</td>
                        <td>{row["jumlah_balok"]}</td>
                        <td>{row["berat_kg"]}</td>
                        <td>{row["date"]}</td>
                        <td className="truncate max-w-11">
                            {row["keterangan"]}
                        </td>
                        <td>
                            <div className=" flex gap-3">
                                <div
                                    className=" cursor-pointer"
                                    onClick={() => onDelete(row["no_balok"])}
                                >
                                    <MdDelete size={24} color="red" />
                                </div>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        onEdit(row["no_balok"]);
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
