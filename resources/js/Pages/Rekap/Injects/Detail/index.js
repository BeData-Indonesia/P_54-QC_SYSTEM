import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/inertia-react";
import TableRekapInjectDetail from "@/Components/Pages/Rekap/Inject/Detail/TableRekapInjectDetail";

export default function index(props) {
    const { injects } = props;
    const onDeleteRow = () => {};
    const onEditRow = () => {};
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" flex flex-col gap-6">
                    <h2 className=" text-xl font-bold">
                        Detail Rekap Expander {props.expander.kode_bahan}
                    </h2>
                    <div className=" flex flex-col gap-6">
                        {injects.length > 0 ? (
                            <>
                                <TableRekapInjectDetail
                                    rows={injects}
                                    onDelete={onDeleteRow}
                                    onEdit={onEditRow}
                                />
                            </>
                        ) : (
                            <div>Tidak ada data</div>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </Authenticated>
    );
}
