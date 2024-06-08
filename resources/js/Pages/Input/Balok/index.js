import * as React from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardLayout from "@/Layouts/DashboardLayout";
import ModalDelete from "@/Components/Modal/ModalDelete";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination/Pagination";
import TableBalok from "@/Components/Pages/Inject/Balok/TableBalok";
import Search from "@/Components/Filter/Search";
import { optionsBulan, optionsTahun } from "@/Const";
import SelectInput from "@/Components/Form/SelectInput";
import {
    getDefaultValueBulan,
    getDefaultValueTahun,
    getParamsbyKey,
    setUrl,
} from "@/Helper";

export default function Balok(props) {
    const { get } = useForm();
    const { baloks } = props;
    const [modalDeleteOpen, setModalDeleteOpen] = React.useState(false);
    const [idDelete, setIdDelete] = React.useState();
    const onDeleteRow = (id) => {
        onModalDeleteopen();
        setIdDelete(id);
    };
    const onEditRow = (id) => {
        Inertia.get(`/input/baloks/edit/${id}`);
    };
    const onModalDeleteClose = () => {
        setModalDeleteOpen(false);
    };
    const onModalDeleteopen = () => {
        setModalDeleteOpen(true);
    };
    const onDataDelete = () => {
        if (idDelete) {
            Inertia.delete(`/input/baloks/${idDelete}`);
        }
        setIdDelete(null);
        setModalDeleteOpen(false);
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            status={props.status}
        >
            <Head title="Dashboard" />
            <DashboardLayout>
                <h2 className=" text-xl font-bold">Balok</h2>
                <div className="flex justify-between items-center gap-2">
                    <Link href="/input/baloks/create" className="btn w-24">
                        Create
                    </Link>

                    <Search />
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
                <TableBalok
                    rows={baloks}
                    onDelete={onDeleteRow}
                    onEdit={onEditRow}
                />
                <div className=" flex justify-center my-4">
                    <Pagination
                        prevLink={props.baloks.links.prev}
                        nextLink={props.baloks.links.next}
                        currentPage={props.baloks.meta.current_page}
                    />
                </div>
                <ModalDelete
                    onModalClose={onModalDeleteClose}
                    onModalDeleteopen={onModalDeleteopen}
                    modalDeleteOpen={modalDeleteOpen}
                    onDelete={onDataDelete}
                />
            </DashboardLayout>
        </Authenticated>
    );
}
