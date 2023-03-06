import React, { useState, useEffect } from "react";

function DropdownMenu({
  options,
  selectedOption,
  handleOptionClick,
  searchTerm,
  setSearchTerm,
  buttonClassName,
  listClassName,
  listItemClassName,
  isOpen,
  toggleMenu,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredOptions =
    options &&
    options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`${buttonClassName} ${selectedOption ? "bg-gray-800" : ""}`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        {selectedOption ? selectedOption.label : "Select an option"}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className={`${listClassName}`}
          role="menu"
          aria-labelledby="options-menu"
        >
          <div className="p-4">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              className="text-sm font-normal w-full border-gray-300 rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
          </div>
          {filteredOptions && filteredOptions.length > 0 ? (
            <div className="py-1" role="none">
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`${listItemClassName} inline-flex ${
                    selectedOption && selectedOption.value === option.value
                      ? "bg-gray-100"
                      : ""
                  }`}
                  role="menuitem"
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-gray-600">
              No search results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
