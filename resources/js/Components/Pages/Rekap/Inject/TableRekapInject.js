import React from "react";
import Table from "@/Components/Table/Table";

import { FaEye } from "react-icons/fa";
import {
    getTotalBagusBalok,
    getTotalBagusinject,
    getTotalBeratInjectFormExpander,
    getTotalRusakinject,
    getStatus,
} from "@/Helper";
import Indicator from "@/Components/Indicator";

export default function TableRekapInject({ rows, onDetail }) {
    const headerTableInject = [
        "Kode Bahan",
        "Density",
        "Berat (kg)",
        "Produk",
        "Total Bagus",
        "Total Rusak",
        "Total Hasil",
        "Berat Hasil",
        "Status",
        "Action",
    ];

    return (
        <Table header={headerTableInject}>
            {rows.map((row) => {
                const totalbagus = getTotalBagusinject(row.injects);
                const totalrusak = getTotalRusakinject(row.injects);
                const totalBerat = getTotalBeratInjectFormExpander(row.injects);
                return (
                    <tr className=" border-slate-300">
                        <td className="">{row["kode_bahan"]}</td>
                        <td>{row["density"]}</td>
                        <td>{row["banyak_kg"]}</td>
                        <td>{row["untuk_produk"]}</td>
                        <td>{totalbagus}</td>
                        <td>{totalrusak}</td>
                        <td>{totalbagus + totalrusak}</td>
                        <td>{totalBerat}</td>
                        <td>
                            <Indicator
                                status={getStatus(row["banyak_kg"], totalBerat)}
                            />
                        </td>
                        <td>
                            <div className=" flex gap-3">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        onDetail(row["no_expander"]);
                                    }}
                                >
                                    <FaEye size={24} color="blue" />
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            })}
        </Table>
    );
}
