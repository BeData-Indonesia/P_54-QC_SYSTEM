import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Sidebar() {
    return (
        <ul className="menu  bg-base-200 w-56 min-h-screen">
            <li>
                <details open>
                    <summary>Inject</summary>
                    <ul>
                        <li>
                            <Link href="/inject/expanders">Expander</Link>
                        </li>
                        <li>
                            <Link href="/inject/injects">Inject</Link>
                        </li>
                        <li>
                            <Link href="/inject/baloks">Balok</Link>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <details open>
                    <summary>Rekap</summary>
                    <ul>
                        <li>
                            <a>Submenu 1</a>
                        </li>
                        <li>
                            <a>Submenu 2</a>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    );
}
