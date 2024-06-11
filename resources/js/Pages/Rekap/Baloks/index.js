import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TableRekapBalok from "@/Components/Pages/Rekap/Balok/TableRekapBalok";
import CardDashboard from "@/Components/Card/CardDashboard";
import SelectInput from "@/Components/Form/SelectInput";
import { optionsBulan, optionsTahun } from "@/Const";
import Button from "@/Components/Button";
import { utils, writeFile } from "xlsx";
import {
    getDefaultValueBulan,
    getDefaultValueTahun,
    getParamsbyKey,
    setUrl,
} from "@/Helper";

export default function Rekapbaloks(props) {
    const { get } = useForm();
    const { rekap } = props;

    const generateArrayRekapBalok = (rekap) => {
        const returnRekap = [];

        rekap.forEach((expander) => {
            let total_berat = 0;

            if (expander.baloks.length > 0) {
                expander.baloks.forEach((product, index) => {
                    total_berat += product.berat_kg * product.jumlah_balok;
                    returnRekap.push([
                        index == 0 ? expander.kode_bahan : null,
                        index == 0 ? expander.updated_at : null,
                        index == 0 ? expander.density : null,
                        index == 0 ? expander.banyak_kg : null,
                        index == 0 ? expander.untuk_produk : null,
                        product.berat_kg,
                        product.jumlah_balok,
                        product.berat_kg * product.jumlah_balok,
                        null,
                    ]);
                });
                returnRekap.push([
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    total_berat,
                ]);
            }

            if (expander.baloks.length == 0) {
                returnRekap.push([
                    expander.kode_bahan,
                    expander.updated_at,
                    expander.density,
                    expander.banyak_kg,
                    expander.untuk_produk,
                    null,
                    null,
                    null,
                    null,
                    null,
                ]);
                returnRekap.push([
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    0,
                ]);
            }

            returnRekap.push([
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            ]);
        });
        return returnRekap;
    };

    const handleExportRekapBalok = () => {
        const ws = utils.aoa_to_sheet([
            [
                "Kode Bahan",
                "Tanggal",
                "Density",
                "Berat Total Expander (KG)",
                "Produk",
                "Berat perProduk (KG)",
                "Jumlah Produksi",
                "Berat Hasil Produksi",
                "Subtotal",
            ],
            ...generateArrayRekapBalok(rekap),
        ]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");

        writeFile(wb, "RekapBalok.xlsx");
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" flex flex-col gap-6">
                    <div className=" flex justify-between">
                        <h2 className=" text-xl font-bold my-2">Rekap Balok</h2>
                        <Button onClick={handleExportRekapBalok}>Export</Button>
                    </div>
                    <div className=" flex">
                        <SelectInput
                            defaultValue={getDefaultValueBulan(
                                getParamsbyKey("bulan")
                            )}
                            label={"Bulan"}
                            onChange={(option) => {
                                setUrl("bulan", option.value, get);
                            }}
                            value={getParamsbyKey("bulan")}
                            options={optionsBulan}
                            className={""}
                        />
                        <SelectInput
                            defaultValue={getDefaultValueTahun(
                                getParamsbyKey("tahun")
                            )}
                            label={"Tahun"}
                            onChange={(option) => {
                                setUrl("tahun", option.value, get);
                            }}
                            value={getParamsbyKey("tahun")}
                            options={optionsTahun}
                            className={""}
                        />
                    </div>
                    <div class=" flex gap-4">
                        <CardDashboard
                            title="Bahan Balok"
                            unit={"Kg"}
                            value={props?.total_berat_expander}
                        />
                        <CardDashboard
                            title="Total Masak"
                            unit={"Kg"}
                            value={props?.total_berat_masak_balok}
                        />
                        <CardDashboard
                            title="Waste Produksi"
                            unit={"Kg"}
                            value={props?.waste_produksi}
                        />
                        <CardDashboard
                            title="Persentase Waste Produksi"
                            unit={"%"}
                            value={props?.waste_production_percent}
                        />
                    </div>
                    <TableRekapBalok
                        rows={rekap}
                        onDetail={(id) => {
                            get(`baloks/detail/${id}`);
                        }}
                    />
                </div>
            </DashboardLayout>
        </Authenticated>
    );
}
