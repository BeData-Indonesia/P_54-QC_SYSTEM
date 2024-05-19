import * as React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TableInject from "@/Components/Pages/Inject/Inject/TableInject";
import ModalDelete from "@/Components/Modal/ModalDelete";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination/Pagination";
export default function Inject(props) {
    const { injects } = props;
    console.log(injects);
    const [modalDeleteOpen, setModalDeleteOpen] = React.useState(false);
    const [idDelete, setIdDelete] = React.useState();
    const onDeleteRow = (id) => {
        onModalDeleteopen();
        setIdDelete(id);
    };
    const onEditRow = (id) => {
        Inertia.get(`/input/injects/edit/${id}`);
    };
    const onModalDeleteClose = () => {
        setModalDeleteOpen(false);
    };
    const onModalDeleteopen = () => {
        setModalDeleteOpen(true);
    };
    const onDataDelete = () => {
        if (idDelete) {
            Inertia.delete(`/input/injects/${idDelete}`);
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
                <h2 className=" text-xl font-bold">Inject</h2>
                <div className="my-6 flex justify-end">
                    <Link href="/input/injects/create" className="btn w-24">
                        Create
                    </Link>
                </div>
                <TableInject
                    rows={injects}
                    onDelete={onDeleteRow}
                    onEdit={onEditRow}
                />
                <div className=" flex justify-center my-4">
                    <Pagination
                        prevLink={props.injects.links.prev}
                        nextLink={props.injects.links.next}
                        currentPage={props.injects.meta.current_page}
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
