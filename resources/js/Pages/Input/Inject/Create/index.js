import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SelectInput from "@/Components/Form/SelectInput";

export default function CreateInject(props) {
    console.log(props);
    const [optionExpander, setOptionExpander] = React.useState([]);
    const { errors, post, data, setData } = useForm({
        spasi: 1,
        nama_barang: "barang a",
        type: "",
        counter: 5,
        hasil: 2,
        rusak: 2,
        cycle_time: 1,
        aging_time: 22,
        berat_kering: 21,
        keterangan: "tidak ada",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post("/input/injects/create", data);
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
                <div className=" text-xl font-bold my-8">Input Inject</div>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={data.spasi}
                        onChange={(e) => setData("spasi", e.target.value)}
                        name="spasi"
                        label="Spasi"
                        className=""
                        placeholder={"0"}
                        type="number"
                        size="md"
                    />
                    <Input
                        value={data.nama_barang}
                        onChange={(e) => setData("nama_barang", e.target.value)}
                        name="nama_barang"
                        label="Nama Barang"
                        className=""
                        placeholder={"Plastik ABC"}
                        type="text"
                        size="sm"
                    />

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
                        value={data.counter}
                        onChange={(e) => setData("counter", e.target.value)}
                        name="counter"
                        label="Counter"
                        className=""
                        placeholder={"1"}
                        type="number"
                        size="sm"
                    />
                    <Input
                        value={data.hasil}
                        onChange={(e) => setData("hasil", e.target.value)}
                        name="hasil"
                        label="Hasi"
                        className=""
                        placeholder={23}
                        type="number"
                        size="sm"
                    />
                    <Input
                        value={data.rusak}
                        onChange={(e) => setData("rusak", e.target.value)}
                        name="rusak"
                        label="Rusak"
                        className=""
                        placeholder={"11"}
                        type="number"
                        size="sm"
                    />
                    <Input
                        value={data.cycle_time}
                        onChange={(e) => setData("cycle_time", e.target.value)}
                        name="cycle_time"
                        label="Cycle Time"
                        className=""
                        placeholder={"11.01"}
                        type="number"
                        step="0.01"
                        size="sm"
                    />
                    <Input
                        value={data.aging_time}
                        onChange={(e) => setData("aging_time", e.target.value)}
                        name="aging_time"
                        label="Aging Time"
                        className=""
                        placeholder={"11.01"}
                        type="number"
                        step="0.01"
                        size="sm"
                    />
                    <Input
                        value={data.berat_kering}
                        onChange={(e) =>
                            setData("berat_kering", e.target.value)
                        }
                        name="berat_kering"
                        label="Berat Kering"
                        className=""
                        placeholder={"11.01"}
                        type="number"
                        step="0.01"
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
