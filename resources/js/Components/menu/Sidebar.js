import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Sidebar() {
    return (
        <ul className="menu  bg-base-200 w-56 min-h-screen">
            <li>
                <details open>
                    <summary>Input</summary>
                    <ul>
                        <li>
                            <Link href="/input/expanders">Expander</Link>
                        </li>
                        <li>
                            <Link href="/input/injects">Inject</Link>
                        </li>
                        <li>
                            <Link href="/input/baloks">Balok</Link>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <details open>
                    <summary>Rekap</summary>
                    <ul>
                        <li>
                            <Link href="/rekap/baloks">Balok</Link>
                        </li>
                        <li>
                            <Link href="/rekap/injects">Inject</Link>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    );
}
