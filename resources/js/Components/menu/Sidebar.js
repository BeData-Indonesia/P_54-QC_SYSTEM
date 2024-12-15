import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Sidebar({admin}) {
    const menus = [
        ...(admin ? [{ name: "Users", link: "/users", child: [] }] : []),
        { name: "Product", link: "/products", child: [] },
        {
            name: "Input",
            link: "/input/expanders",
            child: [
                { name: "Expander", link: "/input/expanders" },
                { name: "Inject", link: "/input/injects" },
                { name: "Balok", link: "/input/baloks" },
            ],
        },
        {
            name: "Recap",
            link: "/rekap",
            child: [
                { name: "Balok", link: "/rekap/baloks" },
                { name: "Injects", link: "/rekap/injects" },
            ],
        },
    ];

    return (
        <ul className="menu  bg-base-200 w-56 min-h-screen hidden lg:flex">
            {menus.map((menu) => {
                if (menu.child.length > 0) {
                    return (
                        <li>
                            <details open>
                                <summary>{menu.name}</summary>
                                <ul>
                                    {menu.child.map((childmenu) => {
                                        return (
                                            <li>
                                                <Link href={childmenu.link}>
                                                    {childmenu.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </details>
                        </li>
                    );
                }
                return (
                    <li>
                        <Link href={menu.link}>{menu.name}</Link>
                    </li>
                );
            })}
        </ul>
    );
}
