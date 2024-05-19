import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

import FormExpander from "@/Components/Pages/Inject/Expander/FormExpander";

export default function EditExpander(props) {
    const { errors, post, data, setData, put } = useForm({
        kode_bahan: props?.data?.kode_bahan,
        banyak_kg: props.data.banyak_kg,
        no_silo: props.data.no_silo,
        shift: props.data.shift,
        untuk_produk: props.data.untuk_produk,
        berat_jenis: props.data.berat_jenis,
        jenis_bahan: props.data.jenis_bahan,
        density: props.data.density,
        keterangan: props.data.keterangan,
        date: props.data.date,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/input/expanders/edit/${props.data.no_expander}`);
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
                                Edit Expander
                            </div>
                            <FormExpander
                                data={data}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                setData={setData}
                                method={"put"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
