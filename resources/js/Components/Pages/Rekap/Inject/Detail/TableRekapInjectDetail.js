import React from "react";
import Table from "@/Components/Table/Table";

export default function TableRekapInjectDetail({ rows }) {
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
        ,
    ];
    return (
        <Table header={headerTableInject}>
            {rows.map((row) => {
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
                        <td className=" max-w-11">{row["date"]}</td>
                    </tr>
                );
            })}
        </Table>
    );
}
