import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

import DashboardLayout from "@/Layouts/DashboardLayout";

import FormInject from "@/Components/Pages/Inject/Inject/FormInject";

export default function CreateInject(props) {
    const mappingOption = () => {
        const expanders = props.expanders;
        const convertExpanders = expanders.map((expander) => {
            return { value: expander.no_expander, label: expander.kode_bahan };
        });
        return convertExpanders;
    };
    let optionExpander = mappingOption();
    const { errors, post, data, setData } = useForm({
        spasi: null,
        nama_barang: "",
        type: "",
        total: null,
        bagus: null,
        rusak: null,
        cycle_time: null,
        aging_time: null,
        berat_kering: null,
        keterangan: "",
        date: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        post("/input/injects/create", data);
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" text-xl font-bold my-8">Input Inject</div>
                <FormInject
                    data={data}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    setData={setData}
                    method={"post"}
                    optionExpander={optionExpander}
                />
            </DashboardLayout>
        </Authenticated>
    );
}
