import * as React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

import FormProduct from "@/Components/Pages/Product/FormProduct";

export default function EditProduct(props) {
    const { errors, post, data, setData, put } = useForm({
        name: props?.data?.name,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/products/edit/${props.data.id}`);
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <div className=" py-8  w-full overflow-hidden">
                <div className="  mx-auto sm:px-6 lg:px-8 w">
                    <div className="bg-white  shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200   ">
                            <div className=" text-xl font-bold my-8">
                                Edit Product
                            </div>
                            <FormProduct
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
