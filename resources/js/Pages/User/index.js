import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TableUser from "@/Components/Pages/User/TableUser";
import ModalDelete from "@/Components/Modal/ModalDelete";
import { Inertia } from "@inertiajs/inertia";


export default function User(props) {
    const [modalDeleteOpen, setModalDeleteOpen] = React.useState(false);
    const [idDelete, setIdDelete] = React.useState();
    const onDeleteRow = (id) => {
        onModalDeleteopen();
        setIdDelete(id);
    };
    const actived = (id) => {
        Inertia.put(`/users/${id}`);
    };
    const onModalDeleteClose = () => {
        setModalDeleteOpen(false);
    };
    const onModalDeleteopen = () => {
        setModalDeleteOpen(true);
    };
    const onDataDelete = () => {
        if (idDelete) {
            Inertia.delete(`/users/${idDelete}`);
        }
        setIdDelete(null);
        setModalDeleteOpen(false);
    };
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <DashboardLayout>
                <div>
                <TableUser rows={props.users} onDelete={onDeleteRow} actived={actived} />
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
