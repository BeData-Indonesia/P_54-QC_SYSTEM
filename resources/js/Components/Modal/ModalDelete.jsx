import React from "react";
import Modal from "./Modal";
import Button from "@/Components/Button";

export default function ModalDelete({
    ref,
    modalDeleteOpen,
    onModalClose,
    onDelete,
}) {
    return (
        <Modal
            ref={ref}
            modalOpen={modalDeleteOpen}
            onModalClose={onModalClose}
        >
            <div className="modal-box">
                <h3 className="font-bold text-lg">yakin hapus data ini</h3>
                <p className="py-4">Klik delete untuk menghapus data ini</p>
                <div className="modal-action flex justify-between">
                    <form method="dialog">
                        <button className="btn">Cancel</button>
                    </form>
                    <div onClick={onDelete}>
                        <Button
                            // onClick={onDelete}
                            variant="danger"
                            className="btn-danger"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
