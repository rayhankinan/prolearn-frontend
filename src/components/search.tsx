import React, { useState } from "react";

type Props = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
};

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    };

    return (
    <form className="relative w-64">
        <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 mb-4 text-gray-700 bg-gray-200 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
            value={searchTerm}
            onChange={handleInputChange}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg
            className="h-5 w-5 fill-current text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>
        </button>
        </form>
    );
};

export default SearchBar;
