import React from "react";

export default function Sidebar() {
    return (
        <ul className="menu  bg-base-200 w-56 min-h-screen">
            <li>
                <details open>
                    <summary>Inject</summary>
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
            {/* <li>
                <a>Item 3</a>
            </li> */}
        </ul>
    );
}
