import React from "react";
import SelectInput from "@/Components/Form/SelectInput";
import Input from "@/Components/Form/Input";
import { getLabelFromValue } from "@/Helper/formatDate";
import Button from "@/Components/Button";

export default function FormBalok({
    handleSubmit,
    data,
    setData,
    errors,
    optionExpander,
}) {
    return (
        <form onSubmit={handleSubmit}>
            <SelectInput
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{
                    value: data.type,
                    label: getLabelFromValue(optionExpander, data.type),
                }}
                onChange={(selectedOption) =>
                    setData("type", selectedOption.value)
                }
                isClearable={true}
                isSearchable={true}
                placeholder="Masukkan Kode Bahan"
                label="Type"
                name="type"
                options={optionExpander}
                errors={errors.type}
                value={data.type}
            />
            <Input
                value={data.density}
                onChange={(e) => setData("density", e.target.value)}
                name="density"
                label="Density"
                className=""
                placeholder={"Masukkan density"}
                step="0.01"
                type="number"
                size="md"
                errors={errors.density}
            />
            <Input
                value={data.jumlah_balok}
                onChange={(e) => setData("jumlah_balok", e.target.value)}
                name="jumlah_balok"
                label="Jumlah Balok"
                className=""
                placeholder={"Masukkan jumlah balok"}
                type="number"
                size="sm"
                errors={errors.jumlah_balok}
            />

            <Input
                value={data.berat_kg}
                onChange={(e) => setData("berat_kg", e.target.value)}
                name="berat_kg"
                label="Berat (kg)"
                className=""
                placeholder={"Masukkan total berat balok"}
                type="number"
                size="sm"
                step="0.01"
                errors={errors.berat_kg}
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
                errors={errors.keterangan}
            />
            <Input
                value={data.date}
                onChange={(e) => setData("date", e.target.value)}
                name="date"
                label="Date"
                className=""
                placeholder={"Masukkan date"}
                type="date"
                size="sm"
                errors={errors.date}
            />
            <div className=" my-8 w-full items-end flex justify-end">
                <Button type="submit" children={"Submit"} />
            </div>
        </form>
    );
}
