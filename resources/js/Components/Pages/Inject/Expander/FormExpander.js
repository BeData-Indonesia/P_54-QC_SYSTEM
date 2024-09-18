import React from "react";
import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import SelectInput from "@/Components/Form/SelectInput";
import { generateValueLabel } from "@/Helper";

export default function FormExpander({
    handleSubmit,
    data,
    setData,
    errors,
    method,
    products,
}) {
    const optionProducts = generateValueLabel("name", "name", products);
    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={data.material_code}
                onChange={(e) => setData("material_code", e.target.value)}
                name="material_code"
                label="Kode Bahan"
                className=""
                placeholder={"Masukkan kode bahan"}
                type="text"
                size="md"
                errors={errors.material_code}
                disabled={method == "put"}
            />
            <Input
                value={data.weight}
                onChange={(e) => setData("weight", e.target.value)}
                name="weight"
                label="Berat"
                className=""
                placeholder={"Masukkan berat expander"}
                type="number"
                size="sm"
                step="0.01"
                errors={errors.weight}
            />
            <SelectInput
                defaultValue={{
                    label: data.shift,
                    value: data.shift,
                }}
                isClearable={true}
                isSearchable={true}
                value={data.shift}
                onChange={(e) => setData("shift", e.value)}
                name="shift"
                label="Shift"
                className=""
                placeholder={"tes"}
                type="number"
                size="sm"
                options={[
                    { label: 1, value: 1 },
                    { label: 2, value: 2 },
                    { label: 3, value: 3 },
                ]}
                errors={errors.shift}
            />
            <SelectInput
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{
                    value: data.material_type,
                    label: data.material_type,
                }}
                onChange={(selectedOption) =>
                    setData("material_type", selectedOption.value)
                }
                isClearable={true}
                isSearchable={true}
                placeholder="Masukkan Jenis Bahan"
                label="Jenis Bahan"
                name="material_type"
                isDisabled={method == "put" && true}
                options={[
                    { value: "inject", label: "Inject" },
                    { value: "balok", label: "Balok" },
                ]}
                errors={errors.material_type}
                value={data.material_type}
            />

            <SelectInput
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{
                    value: data.product,
                    label: data.product,
                }}
                onChange={(selectedOption) =>
                    setData("product", selectedOption.value)
                }
                isClearable={true}
                isSearchable={true}
                placeholder="Masukkan Produk"
                label="Produk"
                name="product"
                options={optionProducts}
                errors={errors.product}
                value={data.product}
                isCreateable={true}
            />
            <Input
                value={data.silo_code}
                onChange={(e) => setData("silo_code", e.target.value)}
                name="silo_code"
                label="No silo"
                className=""
                placeholder={"Masukkan no silo"}
                type="text"
                size="sm"
                errors={errors.silo_code}
            />
            <Input
                value={data.density}
                onChange={(e) => setData("density", e.target.value)}
                name="density"
                label="Density"
                className=""
                placeholder={"Masukkan density"}
                type="number"
                step="0.01"
                size="sm"
                errors={errors.density}
            />

            <Input
                value={data.date}
                onChange={(e) => setData("date", e.target.value)}
                name="date"
                label="Date"
                className=""
                placeholder={"11.01"}
                type="date"
                size="sm"
                width={400}
                errors={errors.date}
            />

            <Input
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                name="Keterangan"
                label="Keterangan"
                className=""
                placeholder={"Masukkan keterangan (opsional)"}
                type="text-area"
                size="sm"
                errors={errors.description}
            />
            <div className=" my-8 w-full items-end flex justify-end">
                <Button type="submit" children={"Submit"} />
            </div>
        </form>
    );
}
