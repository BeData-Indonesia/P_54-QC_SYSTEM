import React from "react";
import Table from "@/Components/Table/Table";
import { formatDate } from "@/Helper/formatDate";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TableExpander({ rows, onDelete, onEdit }) {
    const headerTableExpanders = [
        "Kode Bahan",
        "Shift",
        "Berat",
        "No Silo",
        "Produk",
        "Density",
        "Keterangan",
        "Date",
        "Action",
    ];

    return (
        <Table header={headerTableExpanders}>
            {rows.data.map((row) => {
                return (
                    <>
                        <tr className=" border-slate-300">
                            <td className="">{row["material_code"]}</td>
                            <td>{row["shift"]}</td>
                            <td>{row["weight"]} kg</td>
                            <td>{row["silo_code"]}</td>
                            <td>{row["product"]}</td>
                            <td className=" max-w-5">
                                {row["density"].toFixed(2)}
                            </td>
                            <td className="truncate max-w-11">
                                {row["description"]}
                            </td>
                            <td>{formatDate(row["date"])}</td>
                            <td>
                                <div className=" flex gap-3">
                                    <div
                                        className=" cursor-pointer"
                                        onClick={() =>
                                            onDelete(row["no_expander"])
                                        }
                                    >
                                        <MdDelete size={24} color="red" />
                                    </div>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => {
                                            onEdit(row["no_expander"]);
                                        }}
                                    >
                                        <FaEdit size={24} color="blue" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </>
                );
            })}
        </Table>
    );
}
