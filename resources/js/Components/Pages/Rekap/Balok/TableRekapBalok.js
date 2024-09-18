import React from "react";
import Table from "@/Components/Table/Table";

import { FaEye } from "react-icons/fa";
import { getTotalBeratBalokFormExpander } from "@/Helper";
import { getTotalBagusBalok, getStatus } from "@/Helper";
import Indicator from "@/Components/Indicator";

export default function TableRekapBalok({ rows, onDetail }) {
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
                const totalbagus = getTotalBagusBalok(row.baloks);
                const totalBerat = getTotalBeratBalokFormExpander(row.baloks);
                return (
                    <tr className=" border-slate-300">
                        <td className="">{row["material_code"]}</td>
                        <td>{row["density"]}</td>
                        <td>{row["weight"]}</td>
                        <td>{row["product"]}</td>
                        <td>{totalbagus}</td>
                        <td>{0}</td>
                        <td>{totalbagus}</td>
                        <td>{totalBerat?.toFixed(2)}</td>
                        <td>
                            <Indicator
                                status={getStatus(row["weight"], totalBerat)}
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
