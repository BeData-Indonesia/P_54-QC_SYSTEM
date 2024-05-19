import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import SelectInput from "@/Components/Form/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import FormExpander from "../../../../Components/Pages/Inject/Expander/FormExpander";

export default function CreateExpander(props) {
    const { errors, post, data, setData } = useForm({
        kode_bahan: "A08/01",
        banyak_kg: 4000,
        no_silo: 2,
        shift: 1,
        untuk_produk: "BALOK D - 14  103 CM  ( 38 - 40 )",
        jenis_bahan: "",
        berat_jenis: 10.8,
        density: 10.8,
        keterangan: "Tidak ada",
        date: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/input/expanders/create");
    };
    React.useEffect(() => {
        console.log({ data });
    }, [data]);

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
                />
            </DashboardLayout>
        </Authenticated>
    );
}
