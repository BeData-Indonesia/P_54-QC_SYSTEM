import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SelectInput from "@/Components/Form/SelectInput";
import FormBalok from "@/Components/Pages/Inject/Balok/FormBalok";

export default function EditBalok(props) {
    const { balok } = props;
    const mappingOption = () => {
        const expanders = props.expanders;
        const convertExpanders = expanders.map((expander) => {
            return { value: expander.no_expander, label: expander.kode_bahan };
        });
        return convertExpanders;
    };
    let optionExpander = mappingOption();
    const { errors, post, data, setData, put } = useForm({
        type: balok.type,
        density: balok.density,
        jumlah_balok: balok.jumlah_balok,
        berat_kg: balok.berat_kg,
        keterangan: balok.keterangan,
        date: balok.date,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/input/baloks/edit/${balok.no_balok}`, data);
    };

    React.useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" text-xl font-bold my-8">Input Balok</div>
                <FormBalok
                    data={data}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    method="put"
                    setData={setData}
                    optionExpander={optionExpander}
                />
            </DashboardLayout>
        </Authenticated>
    );
}
