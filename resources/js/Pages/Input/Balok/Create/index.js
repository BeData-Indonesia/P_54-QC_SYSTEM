import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SelectInput from "@/Components/Form/SelectInput";
import { getLabelFromValue } from "@/Helper/formatDate";
import FormBalok from "../../../../Components/Pages/Inject/Balok/FormBalok";

export default function CreateBalok(props) {
    const mappingOption = () => {
        const expanders = props.expanders;
        const convertExpanders = expanders.map((expander) => {
            return { value: expander.no_expander, label: expander.kode_bahan };
        });
        return convertExpanders;
    };
    let optionExpander = mappingOption();
    const { errors, post, data, setData } = useForm({
        type: "",
        density: 23,
        jumlah_balok: 24,
        berat_kg: 5,
        keterangan: "tidak ada",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/input/baloks/create", data);
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
                    method="post"
                    setData={setData}
                    optionExpander={optionExpander}
                />
            </DashboardLayout>
        </Authenticated>
    );
}
