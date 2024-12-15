import React from "react";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";


export default function FormProduct({
    handleSubmit,
    data,
    setData,
    errors,
    method,
    products,
}) {
    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                name="name"
                label="Produk"
                className=""
                placeholder={"Masukkan kode nama produk"}
                type="text"
                size="md"
                errors={errors.name}
            />
          
            <div className=" my-8 w-full items-end flex justify-end">
                <Button type="submit" children={"Submit"} />
            </div>
        </form>
    );
}
