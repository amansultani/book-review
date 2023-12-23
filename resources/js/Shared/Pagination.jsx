import React from "react";
import { Link, usePage } from "@inertiajs/react";
import classNames from "classnames";

const PageLink = ({ active, label, url }) => {
    const className = classNames(
        [
            "mr-1 mb-1",
            "px-4 py-3",
            "border border-solid border-gray-300 rounded",
            "text-sm",
            "hover:bg-gray-200",
            "focus:outline-none focus:border-indigo-700 focus:text-indigo-700",
        ],
        {
            "bg-gray-200": active,
        }
    );
    return (
        <Link className={className} href={url} as="button" disabled={active}>
            <span dangerouslySetInnerHTML={{ __html: label }}></span>
        </Link>
    );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
    const className = classNames(
        "mr-1 mb-1 px-4 py-3 text-sm border rounded border-solid border-gray-300 text-gray"
    );
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: label }}
        />
    );
};

export default ({ links = [] }) => {
    const { title, filter } = usePage().props;
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null;
    return (
        <div className="flex flex-wrap mt-6 -mb-1">
            {links.map(({ active, label, url }) => {
                if (filter) url += `&filter=${filter}`;
                if (title) url += `&title=${title}`;
                return url === null ? (
                    <PageInactive key={label} label={label} />
                ) : (
                    <PageLink
                        key={label}
                        label={label}
                        active={active}
                        url={url}
                    />
                );
            })}
        </div>
    );
};
