import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SelectInput from "@/Components/Form/SelectInput";

export default function CreateBalok(props) {
    const [optionExpander, setOptionExpander] = React.useState([]);
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
        const expanders = props.expanders;
        const convertExpanders = expanders.map((expander) => {
            return { value: expander.kode_bahan, label: expander.kode_bahan };
        });
        setOptionExpander([...convertExpanders]);
    }, []);

    React.useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" text-xl font-bold my-8">Input Balok</div>
                <form onSubmit={handleSubmit}>
                    <SelectInput
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={optionExpander[0]}
                        onChange={(selectedOption) =>
                            setData("type", selectedOption.value)
                        }
                        isClearable={true}
                        isSearchable={true}
                        placeholder="Masukkan Kode Bahan"
                        label="Type"
                        name="expander"
                        options={optionExpander}
                    />
                    <Input
                        value={data.density}
                        onChange={(e) => setData("density", e.target.value)}
                        name="density"
                        label="Density"
                        className=""
                        placeholder={"Insert density here"}
                        step="0.01"
                        type="number"
                        size="md"
                    />
                    <Input
                        value={data.jumlah_balok}
                        onChange={(e) =>
                            setData("jumlah_balok", e.target.value)
                        }
                        name="jumlah_balok"
                        label="Jumlah Balok"
                        className=""
                        placeholder={1}
                        type="number"
                        size="sm"
                    />

                    <Input
                        value={data.berat_kg}
                        onChange={(e) => setData("berat_kg", e.target.value)}
                        name="berat_kg"
                        label="Berat (kg)"
                        className=""
                        placeholder={"1"}
                        type="number"
                        size="sm"
                    />
                    <Input
                        value={data.keterangan}
                        onChange={(e) => setData("keterangan", e.target.value)}
                        name="keterangan"
                        label="Keterangan"
                        className=""
                        placeholder={"Masukkan keterangan"}
                        type="text-area"
                        size="sm"
                    />
                    <div className=" my-8 w-full items-end flex justify-end">
                        <Button type="submit" children={"Submit"} />
                    </div>
                </form>
            </DashboardLayout>
        </Authenticated>
    );
}
