import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TableRekapBalok from "@/Components/Pages/Rekap/Balok/TableRekapBalok";
import CardDashboard from "@/Components/Card/CardDashboard";
import SelectInput from "../../../Components/Form/SelectInput";
import { optionsBulan, optionsTahun } from "../../../Const";
import queryString from "query-string";
import { toNumber } from "lodash";
import TableRekapInject from "../../../Components/Pages/Rekap/Inject/TableRekapInject";

export default function Rekapbaloks(props) {
    console.log(props);
    const { get } = useForm();
    const setUrl = (key, value) => {
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        params.set(key, value);
        url.search = params.toString();
        get(
            "/rekap/baloks" + params.toString() && "?" + params.toString(),
            {},
            { preserveState: true, queryString: params.toString() }
        );
    };
    const getParamsbyKey = (key) => {
        let params = queryString.parse(location.search);
        return params[key];
    };
    const { rekap } = props;

    const getDefaultValueBulan = (value) => {
        if (!value) {
            return undefined;
        }
        let label = "";
        optionsBulan.forEach((option) => {
            if (option.value == toNumber(value)) {
                label = option.label;
            }
        });
        return { label: label, value: value };
    };

    const getDefaultValueTahun = (value) => {
        if (!value) {
            return undefined;
        }
        return { label: value, value: value };
    };
    console.log(getDefaultValueBulan(getParamsbyKey("bulan")));
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div className=" flex flex-col gap-6">
                    <h2 className=" text-xl font-bold my-2">Rekap Inject</h2>
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
