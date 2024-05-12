import * as React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import TableExpander from "@/Components/Pages/Inject/Expander/TablesExpander";
import Pagination from "@/Components/Pagination/Pagination";
import ModalDelete from "@/Components/Modal/ModalDelete";
import { Inertia } from "@inertiajs/inertia";
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
        Inertia.get(`/inject/expanders/edit/${id}`);
    };
    const onModalDeleteClose = () => {
        setModalDeleteOpen(false);
    };
    const onModalDeleteopen = () => {
        setModalDeleteOpen(true);
    };
    const onDataDelete = () => {
        if (idDelete) {
            Inertia.delete(`/inject/expanders/${idDelete}`);
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
            <div className=" py-8  w-full overflow-hidden">
                <div className="  mx-auto sm:px-6 lg:px-8 w">
                    <div className="bg-white  shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200   ">
                            <h2 className=" text-xl font-bold">Expander</h2>
                            <div className="my-6 flex justify-end">
                                <Link
                                    href="/inject/expanders/create"
                                    className="btn w-24"
                                >
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
                                    currentPage={
                                        props.expanders.meta.current_page
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
