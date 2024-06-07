import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

import DashboardLayout from "@/Layouts/DashboardLayout";
import FormExpander from "../../../../Components/Pages/Inject/Expander/FormExpander";

export default function CreateExpander(props) {
    const { errors, post, data, setData } = useForm({
        kode_bahan: "",
        banyak_kg: null,
        no_silo: null,
        shift: null,
        untuk_produk: "",
        jenis_bahan: "",
        berat_jenis: null,
        density: null,
        keterangan: "",
        date: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/input/expanders/create");
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" text-xl font-bold my-8">Input Expander</div>
                <FormExpander
                    data={data}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    setData={setData}
                    products = {props?.products}
                />
            </DashboardLayout>
        </Authenticated>
    );
}
