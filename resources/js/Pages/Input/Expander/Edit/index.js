import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import Select from "@/Components/Form/Select";

export default function EditExpander(props) {
    console.log(props);
    const { errors, post, data, setData, put } = useForm({
        kode_bahan: props?.data?.kode_bahan,
        banyak_kg: props.data.banyak_kg,
        no_silo: props.data.no_silo,
        shift: props.data.shift,
        untuk_produk: props.data.untuk_produk,
        berat_jenis: props.data.berat_jenis,
        density: props.data.density,
        keterangan: props.data.keterangan,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/input/expanders/edit/${data.kode_bahan}`);
    };
    React.useEffect(() => {
        console.log({ data });
    }, [data]);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <div className=" py-8  w-full overflow-hidden">
                <div className="  mx-auto sm:px-6 lg:px-8 w">
                    <div className="bg-white  shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200   ">
                            <div className=" text-xl font-bold my-8">
                                Inject Expander
                            </div>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    disabled={true}
                                    value={data.kode_bahan}
                                    onChange={(e) =>
                                        setData("kode_bahan", e.target.value)
                                    }
                                    name="kode_bahan"
                                    label="Kode Bahan"
                                    className=""
                                    placeholder={"AB2111"}
                                    type="text"
                                    size="md"
                                />
                                <Input
                                    value={data.banyak_kg}
                                    onChange={(e) =>
                                        setData("banyak_kg", e.target.value)
                                    }
                                    name="banyak_kg"
                                    label="Banyak KG"
                                    className=""
                                    placeholder={"0"}
                                    type="number"
                                    size="sm"
                                />
                                <Select
                                    value={data.shift}
                                    onChange={(e) =>
                                        setData("shift", e.target.value)
                                    }
                                    name="shift"
                                    label="Shift"
                                    className=""
                                    placeholder={"0"}
                                    type="number"
                                    size="sm"
                                    options={[
                                        { name: 1, value: 1 },
                                        { name: 2, value: 2 },
                                        { name: 3, value: 3 },
                                    ]}
                                />
                                <Input
                                    value={data.no_silo}
                                    onChange={(e) =>
                                        setData("no_silo", e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setData("berat_jenis", e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setData("density", e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setData("keterangan", e.target.value)
                                    }
                                    name="keterangan"
                                    label="Keterangan"
                                    className=""
                                    placeholder={"Produk A adalah"}
                                    type="text-area"
                                    size="sm"
                                />
                                <div className=" my-8 w-full items-end flex justify-end">
                                    <Button type="submit" children={"Edit"} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
