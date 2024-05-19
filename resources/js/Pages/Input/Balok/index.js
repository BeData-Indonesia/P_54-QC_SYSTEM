import * as React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardLayout from "@/Layouts/DashboardLayout";
import ModalDelete from "@/Components/Modal/ModalDelete";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination/Pagination";
import TableBalok from "@/Components/Pages/Inject/Balok/TableBalok";
export default function Balok(props) {
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
                <div className="my-6 flex justify-end">
                    <Link href="/input/baloks/create" className="btn w-24">
                        Create
                    </Link>
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
