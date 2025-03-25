import {  X } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface SearchBarProps {
  onClose: () => void; // Add onClose prop
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  // Receive onClose
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  function toggleActiveSearchOff() {
    onClose(); // Call the onClose callback
  }

  function handleSearch() {
    setHasSearched(true);
    axios
      .post("http://localhost/maggiebeautyhome-backend/search-products.php", {
        searchTerm: searchTerm,
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          const parsedResult = response.data.map((item: any) => ({
            ...item,
            price: parseFloat(item.price),
          }));
          setSearchResults(parsedResult);
        } else {
          console.error("API did not return an array:", response.data);
          setSearchResults([]);
        }
      })
      .catch((error) => {
        console.error("Error searching:", error);
        setSearchResults([]);
      });
  }

  return (
    <main
      className={`w-full h-screen p-3 z-50 fixed top-0 left-0 bg-primary/40 flex items-center justify-center`}
    >
      <section className="rounded-2xl max-w-md border w-full relative bg-white h-fit space-y-4">
        <div className="py-3 border-b flex items-center p-4 justify-between gap-4">
          <input
            type="text"
            placeholder="What are we searching for?.."
            className="p py-2 outline-none bg-transparent text-gray-600 inter-500 rounded-md text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <div className="" onClick={toggleActiveSearchOff}>
            <button className="w-6 h-6 flex items-center justify-center rounded-md text-gray-500">
              <X />
            </button>
          </div>
        </div>

        <div className="search-header flex items-center justify-between px-4">
          <h1 className="inter-500 text-gray-600 text-sm">Suggestions</h1>
          <p className="text-sm text-gray-500">{searchTerm}</p>
        </div>
        <div className="border-t w-full"></div>
        <div className="product-search-results  py-4 max-h-[300px] max-w-[95%] overflow-auto text-sm px-4">
          {hasSearched ? (
            searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 mb-2"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-8 w-8 rounded object-cover"
                  />
                  <Link to={`/product/${product.id}`}>
                    <p className="text-sm text-gray-700">{product.name}</p>
                    {typeof product.price === "number" ? (
                      <p className="text-sm text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                    ) : (
                      <p>Price Unavailable</p>
                    )}
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 animate-shake">
                <picture className="w-16 h-16">
                  <source
                    srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.webp"
                    type="image/webp"
                  />
                  <img
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.gif"
                    alt="😭"
                    width="15"
                    height="15"
                  />
                </picture>
                <p className="text-sm mt-2">
                  Sorry, not found. Please try changing your search.
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500">
              <picture className="w-16 h-16">
                <source
                  srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1fae3/512.webp"
                  type="image/webp"
                />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1fae3/512.gif"
                  alt="🫣"
                  width="32"
                  height="32"
                />
              </picture>
              <p className="text-sm mt-2 text-center">
                Search to find results...
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
