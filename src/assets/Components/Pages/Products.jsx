import React, { useState, useEffect } from "react";
import { FaTh, FaList } from "react-icons/fa";

const Products = ({ addToCart, activeCategory }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [isGridView, setIsGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); // Adjust this based on viewport size
    const [showPagination, setShowPagination] = useState(false);

    useEffect(() => {
        fetch("/items.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                setItems(data);
                setFilteredItems(data); // Set all items initially
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Filter items based on active category
        const filtered = items.filter((item) =>
            activeCategory === "ALL" || item.category === activeCategory
        );
        setFilteredItems(filtered);
    }, [activeCategory, items]);

    useEffect(() => {
        const filtered = items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [searchTerm, items]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (item) => {
        addToCart(item);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Update pagination visibility based on screen size and number of items
    useEffect(() => {
        if (isGridView) {
            const rows = Math.ceil(filteredItems.length / (isGridView ? 7 : 1)); // Assuming 7 items per row in grid view for lg
            setShowPagination(rows > 3);
        }
    }, [filteredItems, isGridView]);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className="w-full sm:w-3/4 ml-3 p-4">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[85%] p-2 border bg-slate-100 border-gray-400 rounded-l-md focus:outline-none focus:bg-slate-200"
                />
                <div className="mx-8">
                    <button
                        className="px-3"
                        onClick={() => setIsGridView(true)}
                        aria-label="Grid View"
                    >
                        <FaTh className={`lg:text-3xl ${isGridView ? "text-blue-500" : "text-gray-500"}`} />
                    </button>
                    <button
                        className="pl-3"
                        onClick={() => setIsGridView(false)}
                        aria-label="List View"
                    >
                        <FaList className={`lg:text-3xl ${!isGridView ? "text-blue-500" : "text-gray-500"}`} />
                    </button>
                </div>
            </div>

            <div className={isGridView ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4" : "space-y-4"}>
                {currentItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex ${isGridView ? "flex-col items-center rounded-sm lg:w-[9vw] lg:h-[18vh] justify-center content-center" : "flex-row items-center p-4 rounded-lg shadow-md"}`}
                        style={{ backgroundColor: item.color }}
                        onClick={() => handleClick(item)}
                    >
                        {isGridView ? (
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold text-white">{item.name}</p>
                                <p className="text-sm mt-2 font-semibold text-white">${item.price.toFixed(2)}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <p className="text-md font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {showPagination && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="mx-4">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;
