import React from "react";
import SelectInput from "../../../Form/SelectInput";

import Input from "@/Components/Form/Input";
import Button from "@/Components/Button";
import { getLabelFromValue } from "../../../../Helper/formatDate";

export default function FormInject({
    handleSubmit,
    data,
    setData,
    errors,
    method,
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
                isDisabled={method == "put" ? true : false}
            />
            <Input
                value={data.spasi}
                onChange={(e) => setData("spasi", e.target.value)}
                name="spasi"
                label="Spasi"
                className=""
                placeholder={"Masukkan spasi"}
                type="number"
                size="md"
                errors={errors.spasi}
            />

            <Input
                value={data.bagus}
                onChange={(e) => setData("bagus", e.target.value)}
                name="bagus"
                label="Bagus"
                className=""
                placeholder={"Masukkan jumlah produk yang bagus"}
                type="number"
                size="sm"
                errors={errors.bagus}
            />
            <Input
                value={data.rusak}
                onChange={(e) => setData("rusak", e.target.value)}
                name="rusak"
                label="Rusak"
                className=""
                placeholder={"Masukkan jumlah produk yang rusak"}
                type="number"
                size="sm"
                errors={errors.rusak}
            />
            <Input
                value={data.cycle_time}
                onChange={(e) => setData("cycle_time", e.target.value)}
                name="cycle_time"
                label="Cycle Time"
                className=""
                placeholder={"Masukkan cycle time"}
                type="number"
                step="0.01"
                size="sm"
                errors={errors.cycle_time}
            />
            <Input
                value={data.aging_time}
                onChange={(e) => setData("aging_time", e.target.value)}
                name="aging_time"
                label="Aging Time"
                className=""
                placeholder={"Masukkan aging time"}
                type="number"
                step="0.01"
                size="sm"
                errors={errors.aging_time}
            />
            <Input
                value={data.berat_kering}
                onChange={(e) => setData("berat_kering", e.target.value)}
                name="berat_kering"
                label="Berat Kering"
                className=""
                placeholder={"Masukkan berat kering"}
                type="number"
                step="0.01"
                size="sm"
                errors={errors.berat_kering}
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
                placeholder={"Masukkan Date"}
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
