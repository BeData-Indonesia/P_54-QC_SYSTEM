import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import CardDashboard from "@/Components/Card/CardDashboard";
import SelectInput from "@/Components/Form/SelectInput";
import TableRekapInject from "@/Components/Pages/Rekap/Inject/TableRekapInject";
import Button from "@/Components/Button";
import { utils, writeFile } from "xlsx";
import { optionsBulan, optionsTahun } from "@/Const";
import {
    getDefaultValueBulan,
    getDefaultValueTahun,
    getParamsbyKey,
    setUrl,
} from "@/Helper";

export default function Rekapbaloks(props) {
    const { get } = useForm();

    const { rekap } = props;

    const generateArrayRekapInject = (rekap) => {
        const returnRekap = [];

        rekap.forEach((expander) => {
            let total_berat = 0;

            if (expander.injects.length > 0) {
                expander.injects.forEach((product, index) => {
                    total_berat += product.berat_kering * product.bagus;
                    returnRekap.push([
                        index == 0 ? expander.kode_bahan : null,
                        index == 0 ? expander.updated_at : null,
                        index == 0 ? expander.density : null,
                        index == 0 ? expander.banyak_kg : null,
                        index == 0 ? expander.untuk_produk : null,
                        product.berat_kering,
                        product.bagus,
                        product.rusak,
                        product.bagus + product.rusak,
                        product.berat_kering * product.bagus,
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
                    null,
                    null,
                    total_berat,
                ]);
            }

            if (expander.injects.length == 0) {
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
                null,
                null,
            ]);
        });
        return returnRekap;
    };

    const handleExportRekapInject = () => {
        const ws = utils.aoa_to_sheet([
            [
                "Kode Bahan",
                "Tanggal",
                "Density",
                "Berat Total Expander (KG)",
                "Produk",
                "Berat perProduk (KG)",
                "Jumlah Bagus",
                "Jumlah Rusak",
                "Jumlah Total perHari",
                "Berat Hasil Produksi",
                "Subtotal",
            ],
            ...generateArrayRekapInject(rekap),
        ]);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");

        writeFile(wb, "RekapInject.xlsx");
    };
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" flex flex-col gap-6">
                    <div className=" flex justify-between">
                        <h2 className=" text-xl font-bold my-2">
                            Rekap Inject
                        </h2>
                        <Button onClick={handleExportRekapInject}>
                            Export
                        </Button>
                    </div>
                    <div className=" flex">
                        <SelectInput
                            defaultValue={getDefaultValueBulan(
                                getParamsbyKey("bulan")
                            )}
                            label={"Bulan"}
                            onChange={(option) => {
                                setUrl("bulan", option.value);
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
                                setUrl("tahun", option.value);
                            }}
                            value={getParamsbyKey("tahun")}
                            options={optionsTahun}
                            className={""}
                        />
                    </div>
                    <div class=" flex gap-4">
                        <CardDashboard
                            title="Bahan Inject"
                            unit={"Kg"}
                            value={props?.total_berat_expander}
                        />
                        <CardDashboard
                            title="Total Masak"
                            unit={"Kg"}
                            value={props?.total_berat_masak_inject}
                        />
                        <CardDashboard
                            title="Waste Produksi"
                            unit={"Kg"}
                            value={props?.waste_produksi}
                        />
                        <CardDashboard
                            title="Waste Produksi Percent"
                            unit={"%"}
                            value={props?.waste_production_percent}
                        />
                    </div>
                    <TableRekapInject
                        rows={rekap}
                        onDetail={(id) => {
                            get(`injects/detail/${id}`);
                        }}
                    />
                </div>
            </DashboardLayout>
        </Authenticated>
    );
}
