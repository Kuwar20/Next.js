"use client"; // This enables React hooks in Next.js App Router

import { useState, useEffect } from "react";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch data from the fake store API (same as your CodePen example)
    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch("https://fakestoreapi.com/products");
            const response = await fetch("/api/names");
            const data = await response.json();
            setProducts(data);
        };

        fetchData();
    }, []);

    // Search function
    const searchedProduct = products.filter(
        (product) =>
            product.title &&
            product.title.toLowerCase().includes(search.toLowerCase())
    );

    // Sort function
    const sortProduct = (productToSort) => {
        return productToSort.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
    };

    const sortedProducts = sortProduct([...searchedProduct]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = sortedProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search products..."
                    className="border p-2 rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Sort Button */}
                <button
                    className="ml-4 bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={() =>
                        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
                    }
                >
                    Sort {sortOrder === "asc" ? "↑" : "↓"}
                </button>
            </div>

            {/* Products List */}
            <ul>
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <li key={product.id} className="mb-2">
                            <h2 className="font-bold">{product.title}</h2>
                            <p>Price: ${product.price}</p>
                        </li>
                    ))
                ) : (
                    <p className="font-bold">No Result</p>
                )}
            </ul>

            {/* Pagination Controls */}
            <div className="mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
