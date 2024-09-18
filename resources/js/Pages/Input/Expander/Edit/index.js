import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

import FormExpander from "@/Components/Pages/Inject/Expander/FormExpander";

export default function EditExpander(props) {
    const { errors, post, data, setData, put } = useForm({
        material_code: props?.data?.material_code,
        weight: props.data.weight,
        silo_code: props.data.silo_code,
        shift: props.data.shift,
        product: props.data.product,
        material_type: props.data.material_type,
        density: props.data.density,
        description: props.data.description,
        date: props.data.date,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/input/expanders/edit/${props.data.no_expander}`);
    };

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
                                products={props?.products}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
