import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Pagination({ prevLink, nextLink, currentPage }) {
    return (
        <div className="join">
            <Link
                href={prevLink}
                disabled={!prevLink}
                className="join-item btn"
            >
                «
            </Link>
            <Link href="" className="join-item btn">
                Page {currentPage}
            </Link>
            <Link
                href={nextLink}
                disabled={!nextLink}
                className="join-item btn"
            >
                »
            </Link>
        </div>
    );
}
