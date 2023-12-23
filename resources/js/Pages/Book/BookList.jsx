import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Pagination from "@/Shared/Pagination";
import Book from "./Book";
import "./BookList.css";

// Move filters outside the component
const filters = {
    latest: "Latest",
    popular_last_month: "Popular Last Month",
    popular_last_6months: "Popular Last 6 Months",
    highest_rated_last_month: "Highest Rated Last Month",
    highest_rated_last_6months: "Highest Rated Last 6 Months",
};

export default function BookList({ auth, books, title, filter }) {
    const { data: formData, setData, get, processing } = useForm();

    function submit(e) {
        e.preventDefault();
        get(`/books`);
    }

    const { data, links } = books;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Books
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={submit}
                            className="mb-4 flex items-center space-x-2 p-6"
                        >
                            <input
                                className="input h-10"
                                type="text"
                                placeholder="Search by title"
                                defaultValue={title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn h-10"
                            >
                                Search
                            </button>
                            <Link
                                href={route("books.index")}
                                className="btn h-10"
                            >
                                Clear
                            </Link>
                        </form>

                        <div className={"filter-container p-6"}>
                            {Object.entries(filters).map(([key, label]) => (
                                <Link
                                    key={key}
                                    href={route("books.index", {
                                        filter: key,
                                        title: title || "",
                                    })}
                                    className={`filter-item ${
                                        (!filter && key === "latest") ||
                                        filter === key
                                            ? "filter-item-active"
                                            : ""
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        <div className="p-6 text-gray-900">
                            <Book books={data} />
                            <div className="flex flex-col items-center">
                                <Pagination links={links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
