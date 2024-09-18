import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

import DashboardLayout from "@/Layouts/DashboardLayout";

import FormInject from "@/Components/Pages/Inject/Inject/FormInject";

export default function EditInject(props) {
    const { inject } = props;
    const mappingOption = () => {
        const expanders = props.expanders;
        const convertExpanders = expanders.map((expander) => {
            return {
                value: expander.no_expander,
                label: expander.material_code,
            };
        });
        return convertExpanders;
    };
    let optionExpander = mappingOption();
    const { errors, post, data, setData, put } = useForm({
        spasi: inject.spasi,
        nama_barang: inject.nama_barang,
        type: inject.type,
        total: inject.total,
        bagus: inject.bagus,
        rusak: inject.rusak,
        cycle_time: inject.cycle_time,
        aging_time: inject.aging_time,
        berat_kering: inject.berat_kering,
        keterangan: inject.keterangan,
        date: inject.date,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/input/injects/edit/${inject.no_inject}`, data);
    };

    React.useEffect(() => {}, [data]);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" text-xl font-bold my-8">Input Inject</div>
                <FormInject
                    data={data}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    method={"put"}
                    optionExpander={optionExpander}
                    setData={setData}
                />
            </DashboardLayout>
        </Authenticated>
    );
}
