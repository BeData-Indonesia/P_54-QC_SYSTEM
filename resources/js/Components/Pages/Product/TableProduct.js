import React from "react";
import Table from "@/Components/Table/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TableProduct({ rows }) {
    const headerTableInject = ["No", "Nama Produk"];

    return (
        <Table header={headerTableInject}>
            {rows.map((row, index) => {
                return (
                    <tr className=" border-slate-300">
                        <td className="">{index + 1}</td>
                        <td className="">{row["name"]}</td>
                    </tr>
                );
            })}
        </Table>
    );
}
