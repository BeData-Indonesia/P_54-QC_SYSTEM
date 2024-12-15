import React from "react";
import Table from "@/Components/Table/Table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from "../../Button";

export default function TableUser({ rows, onDelete, actived }) {
    const headerTableInject = [
        "No",
        "email",
        "status",
        "action",
    ];
    const getStatus =(status)=>{
        if (status){
            return (
            <div className="bg-blue-600 text-white rounded-md  p-1 w-fit">
            active
            </div>
            )
        }else{
            return (
            <div className="bg-red-600 text-white rounded-md  p-1 w-fit">
            not active
            </div>
            )
        }
    }
    return (
        <Table header={headerTableInject}>
            { rows.map((row, index) => {
                return (
                    <tr className=" border-slate-300">
                        <td className="">{index+1}</td>
                        <td className="">{row.email}</td>
                        <td className="">{getStatus(row.verified_user)}</td>
                        <td>
                            <div className=" flex gap-3">
                                {
                                    !row.verified_user&&(
                                        <div
                                        className="cursor-pointer"
                                        onClick={()=>{actived(row.id)}}
                                        >
                                    <button className="bg-blue-600 text-white rounded-md  p-1" > activate </button>
                                </div>
                                )
                                }
                                <div
                                    className=" cursor-pointer"
                                    onClick={()=>{onDelete(row.id)}}
                                >
                                    <MdDelete size={24} color="red" />
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            })}
        </Table>
    );
}
