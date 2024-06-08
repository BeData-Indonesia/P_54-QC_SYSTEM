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
                value={data.kode_bahan}
                onChange={(e) => setData("kode_bahan", e.target.value)}
                name="kode_bahan"
                label="Kode Bahan"
                className=""
                placeholder={"Masukkan kode bahan"}
                type="text"
                size="md"
                errors={errors.kode_bahan}
                disabled={method == "put"}
            />
            <Input
                value={data.banyak_kg}
                onChange={(e) => setData("banyak_kg", e.target.value)}
                name="banyak_kg"
                label="Banyak KG"
                className=""
                placeholder={"Masukkan berat expander"}
                type="number"
                size="sm"
                step="0.01"
                errors={errors.banyak_kg}
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
                    value: data.jenis_bahan,
                    label: data.jenis_bahan,
                }}
                onChange={(selectedOption) =>
                    setData("jenis_bahan", selectedOption.value)
                }
                isClearable={true}
                isSearchable={true}
                placeholder="Masukkan Jenis Bahan"
                label="Jenis Bahan"
                name="jenis_bahan"
                isDisabled={method == "put" && true}
                options={[
                    { value: "inject", label: "Inject" },
                    { value: "balok", label: "Balok" },
                ]}
                errors={errors.jenis_bahan}
                value={data.jenis_bahan}
            />

            <SelectInput
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{
                    value: data.untuk_produk,
                    label: data.untuk_produk,
                }}
                onChange={(selectedOption) =>
                    setData("untuk_produk", selectedOption.value)
                }
                isClearable={true}
                isSearchable={true}
                placeholder="Masukkan Produk"
                label="Produk"
                name="untuk_produk"
                options={optionProducts}
                errors={errors.untuk_produk}
                value={data.untuk_produk}
                isCreateable={true}
            />
            <Input
                value={data.no_silo}
                onChange={(e) => setData("no_silo", e.target.value)}
                name="no_silo"
                label="No silo"
                className=""
                placeholder={"Masukkan no silo"}
                type="text"
                size="sm"
                errors={errors.no_silo}
            />

            <Input
                value={data.berat_jenis}
                onChange={(e) => setData("berat_jenis", e.target.value)}
                name="berat_jenis"
                label="Berat Jenis"
                className=""
                placeholder={"Masukkan berat jenis"}
                type="number"
                step="0.01"
                size="sm"
                errors={errors.berat_jenis}
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
                value={data.keterangan}
                onChange={(e) => setData("keterangan", e.target.value)}
                name="keterangan"
                label="Keterangan"
                className=""
                placeholder={"Masukkan keterangan (opsional)"}
                type="text-area"
                size="sm"
                errors={errors.keterangan}
            />
            <div className=" my-8 w-full items-end flex justify-end">
                <Button type="submit" children={"Submit"} />
            </div>
        </form>
    );
}
