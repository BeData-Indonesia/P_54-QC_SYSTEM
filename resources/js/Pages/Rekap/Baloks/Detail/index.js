import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/inertia-react";
import TableBalok from "../../../../Components/Pages/Inject/Balok/TableBalok";
import TableRekapBalokDetail from "../../../../Components/Pages/Rekap/Balok/Detail/TableRekapBalokDetail";

export default function index(props) {
    const { baloks } = props;

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
                        {baloks.length > 0 ? (
                            <TableRekapBalokDetail
                                rows={baloks}
                                onDelete={onDeleteRow}
                                onEdit={onEditRow}
                            />
                        ) : (
                            <div>Tidak ada data</div>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </Authenticated>
    );
}
