import React from "react";
import Table from "@/Components/Table/Table";
import { formatDate } from "@/Helper/formatDate";
import { HiDotsVertical } from "react-icons/hi";

export default function TableExpander({ rows }) {
    const headerTableExpanders = [
        "Kode Bahan",
        "Shift",
        "Kg",
        "No Silo",
        "Produk",
        "Berat Jenis",
        "Density",
        "Keterangan",
        "Created at",
        "Action",
    ];

    return (
        <Table header={headerTableExpanders}>
            {rows.data.map((row) => {
                return (
                    <tr className=" border-slate-300">
                        <td className="">{row["kode_bahan"]}</td>
                        <td>{row["shift"]}</td>
                        <td>{row["banyak_kg"]}</td>
                        <td>{row["no_silo"]}</td>
                        <td>{row["untuk_produk"]}</td>
                        <td>{row["berat_jenis"]}</td>
                        <td className=" max-w-5">
                            {row["density"].toFixed(2)}
                        </td>
                        <td className="truncate max-w-11">
                            {row["keterangan"]}
                        </td>
                        <td>{formatDate(row["created_at"])}</td>
                        <td>
                            <HiDotsVertical />
                        </td>
                    </tr>
                );
            })}
        </Table>
    );
}
