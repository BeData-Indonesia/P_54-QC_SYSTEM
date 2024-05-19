import * as React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import TableExpander from "@/Components/Pages/Inject/Expander/TablesExpander";
import Pagination from "@/Components/Pagination/Pagination";
import ModalDelete from "@/Components/Modal/ModalDelete";
import { Inertia } from "@inertiajs/inertia";
import DashboardLayout from "@/Layouts/DashboardLayout";
export default function Expander(props) {
    const modalDeleteRef = React.useRef(null);
    const [modalDeleteOpen, setModalDeleteOpen] = React.useState(false);
    const [idDelete, setIdDelete] = React.useState();
    const { expanders } = props;
    const onDeleteRow = (id) => {
        onModalDeleteopen();
        setIdDelete(id);
    };
    const onEditRow = (id) => {
        Inertia.get(`/input/expanders/edit/${id}`);
    };
    const onModalDeleteClose = () => {
        setModalDeleteOpen(false);
    };
    const onModalDeleteopen = () => {
        setModalDeleteOpen(true);
    };
    const onDataDelete = () => {
        if (idDelete) {
            Inertia.delete(`/input/expanders/${idDelete}`);
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
                <h2 className=" text-xl font-bold">Expander</h2>
                <div className="my-6 flex justify-end">
                    <Link href="/input/expanders/create" className="btn w-24">
                        Create
                    </Link>
                </div>
                <TableExpander
                    rows={expanders}
                    onDelete={onDeleteRow}
                    onEdit={onEditRow}
                />
                <div className=" flex justify-center my-4">
                    <Pagination
                        prevLink={props.expanders.links.prev}
                        nextLink={props.expanders.links.next}
                        currentPage={props.expanders.meta.current_page}
                    />
                </div>
            </DashboardLayout>
            <ModalDelete
                ref={modalDeleteRef}
                onModalClose={onModalDeleteClose}
                onModalDeleteopen={onModalDeleteopen}
                modalDeleteOpen={modalDeleteOpen}
                onDelete={onDataDelete}
            />
        </Authenticated>
    );
}
