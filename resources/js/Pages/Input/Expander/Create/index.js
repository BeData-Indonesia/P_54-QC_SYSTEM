import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import SelectInput from "@/Components/Form/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function CreateExpander(props) {
    const { errors, post, data, setData } = useForm({
        kode_bahan: "tess",
        banyak_kg: 1,
        no_silo: 0,
        shift: "1",
        untuk_produk: "2323",
        berat_jenis: 0,
        density: 0,
        keterangan: "232",
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
                <div className=" text-xl font-bold my-8">Inject Expander</div>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={data.kode_bahan}
                        onChange={(e) => setData("kode_bahan", e.target.value)}
                        name="kode_bahan"
                        label="Kode Bahan"
                        className=""
                        placeholder={"AB2111"}
                        type="text"
                        size="md"
                    />
                    <Input
                        value={data.banyak_kg}
                        onChange={(e) => setData("banyak_kg", e.target.value)}
                        name="banyak_kg"
                        label="Banyak KG"
                        className=""
                        placeholder={"0"}
                        type="number"
                        size="sm"
                    />
                    <SelectInput
                        value={data.shift}
                        onChange={(e) => setData("shift", e.value)}
                        name="shift"
                        label="Shift"
                        className=""
                        placeholder={"0"}
                        type="number"
                        size="sm"
                        options={[
                            { label: 1, value: 1 },
                            { label: 2, value: 2 },
                            { label: 3, value: 3 },
                        ]}
                    />
                    <Input
                        value={data.no_silo}
                        onChange={(e) => setData("no_silo", e.target.value)}
                        name="no_silo"
                        label="No silo"
                        className=""
                        placeholder={"1"}
                        type="text"
                        size="sm"
                    />
                    <Input
                        value={data.untuk_produk}
                        onChange={(e) =>
                            setData("untuk_produk", e.target.value)
                        }
                        name="untuk_produk"
                        label="Produk"
                        className=""
                        placeholder={"AAB!"}
                        type="text"
                        size="sm"
                    />
                    <Input
                        value={data.berat_jenis}
                        onChange={(e) => setData("berat_jenis", e.target.value)}
                        name="berat_jenis"
                        label="Berat Jenis"
                        className=""
                        placeholder={"11.01"}
                        type="number"
                        step="0.01"
                        size="sm"
                    />
                    <Input
                        value={data.density}
                        onChange={(e) => setData("density", e.target.value)}
                        name="density"
                        label="Density"
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
                        placeholder={"Produk A adalah"}
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
