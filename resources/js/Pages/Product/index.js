import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import { utils, writeFile } from "xlsx";
import TableProduct from "@/Components/Pages/Product/TableProduct";

export default function Product(props) {
    const handleDownloadTemplate = () => {
        const ws = utils.aoa_to_sheet([["product a"], ["product b"]]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");

        writeFile(wb, "products.xlsx");
    };
    const { errors, post, data, setData, reset } = useForm({ file: null });
    const handleImportProducts = (e) => {
        e.preventDefault();
        post("/products", data);
        reset("file");
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            status={props.status}
        >
            <Head title="Dashboard" />
            <DashboardLayout>
                <h2 className=" text-xl font-bold">Products</h2>
                <div className=" flex justify-between my-4 flex-row">
                    <div>
                        <form action="" onSubmit={handleImportProducts}>
                            <input
                                className=""
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                type="file"
                                onChange={(e) =>
                                    setData("file", e.target.files[0])
                                }
                                size="sm"
                                errors={errors.file}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                    <Button onClick={handleDownloadTemplate}>
                        Download Template
                    </Button>
                </div>
                <div>
                    <TableProduct rows={props.products} />
                </div>
            </DashboardLayout>
        </Authenticated>
    );
}
