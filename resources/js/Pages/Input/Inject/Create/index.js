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
        spasi: 1,
        nama_barang: "BOX WAWAN BSR ( 150 - 155 )",
        type: "",
        total: 1808,
        bagus: 1792,
        rusak: 16,
        cycle_time: 10,
        aging_time: 22,
        berat_kering: 21,
        keterangan: "tidak ada",
        date: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        post("/input/injects/create", data);
    };

    React.useEffect(() => {
        console.log(optionExpander);
        console.log(data);
    }, [data]);

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
