import * as React from "react";
import { Head } from "@inertiajs/inertia-react";
import Table from "@/Components/Table/Table";
import Authenticated from "@/Layouts/Authenticated";

export default function Balok(props) {
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <div className=" py-8  w-full">
                <div className="  mx-auto sm:px-6 lg:px-8 w">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200  ">
                            {/* You're logged in!
                            <button className="btn btn-primary">
                                Secondary
                            </button> */}
                            <Table />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
