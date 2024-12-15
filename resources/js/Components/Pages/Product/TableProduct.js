import React from "react";
import Table from "@/Components/Table/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TableProduct({ rows, onEdit, onDelete }) {
    const headerTableInject = ["No", "Nama Produk", "Action"];
    return (
        <Table header={headerTableInject}>
            {rows.map((row, index) => {
                return (
                    <tr className=" border-slate-300">
                        <td className="">{index + 1}</td>
                        <td className="">{row["name"]}</td>
                        <td className=" flex gap-3s">
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                onEdit(row["id"]);
                            }}
                            >
                            <FaEdit size={24} color="blue" />
                        </div>
                        <div
                            className=" cursor-pointer"
                            onClick={() => onDelete(row["id"])}
                            >
                            <MdDelete size={24} color="red" />
                        </div>
                            </td>
                    </tr>
                );
            })}
        </Table>
    );
}
