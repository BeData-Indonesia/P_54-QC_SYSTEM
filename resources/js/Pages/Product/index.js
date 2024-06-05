import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import { utils, writeFile } from "xlsx";

export default function Product(props) {
    const handleDownloadTemplate = () => {
        const ws = utils.aoa_to_sheet([["product a"], ["product b"]]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");

        writeFile(wb, "products.xlsx");
    };
    const { post } = useForm({});
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <h2 className=" text-xl font-bold">Products</h2>

                <div className=" flex justify-between my-4">
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <Button onClick={handleDownloadTemplate}>
                        Download Template
                    </Button>
                </div>
            </DashboardLayout>
        </Authenticated>
    );
}
