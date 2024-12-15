import React from "react";

export default function Modal({ ref, children, modalOpen, onModalClose }) {
    return (
        <>
            <dialog
                ref={ref}
                className="modal p-4 "
                style={{
                    borderRadius: "8px",
                    padding: "20px",
                    minWidth: "400px",
                    position: "fixed",
                    top: "45%",
                    zIndex: 41,
                }}
                id="my_modal_1"
                open={modalOpen}
            >
                {children}
            </dialog>
            {modalOpen && (
                <div
                    onClick={onModalClose}
                    style={{
                        background: "rgba(43, 43, 43, 0.322)",
                        width: "100vw",
                        height: "100vh",
                        position: "fixed",
                    }}
                    className=" w-screen h-screen bg-black absolute top-0 left-0  z-40"
                >
                    tes
                </div>
            )}
        </>
    );
}
