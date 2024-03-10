import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({
  items,
  selectItems,
  multiple = false,
  specialItem = false,
}: {
  items: any;
  selectItems: any;
  multiple?: boolean;
  specialItem?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    selectItems(selectedItems);
  }, [selectedItems, selectItems]);

  const handleItemClick = (item: any) => {
    if (multiple) {
      setSelectedItems((prevSelectedItems: any) => {
        const itemIndex = prevSelectedItems.indexOf(item);
        if (itemIndex >= 0) {
          return [
            ...prevSelectedItems.slice(0, itemIndex),
            ...prevSelectedItems.slice(itemIndex + 1),
          ];
        } else {
          return [...prevSelectedItems, item];
        }
      });
    } else {
      setSelectedItems(item);
      setIsOpen(false);
    }
    selectItems(item);
  };

  const handleSpecialItemClick = (extra: Option) => {
    if (extra.title === "No that's all!" || extra.title === "No sauce") {
      setSelectedItems([extra]);
    } else {
      if (Array.isArray(selectedItems)) {
        if (
          selectedItems.some(
            (e: { title: string }) =>
              e.title === "No that's all!" || e.title === "No sauce"
          )
        ) {
          setSelectedItems([extra]);
        } else {
          const index = selectedItems.findIndex(
            (e: { title: string }) => e.title === extra.title
          );
          if (index !== -1) {
            setSelectedItems(selectedItems.filter((_, i) => i !== index));
          } else {
            setSelectedItems([...selectedItems, extra]);
          }
        }
      } else {
        setSelectedItems([extra]);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-base text-gray-800 bg-white border border-gray-300 rounded-md py-2 px-4 w-full text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden"
      >
        <div className="truncate pr-10">
          {multiple
            ? Array.isArray(selectedItems) && selectedItems.length > 0
              ? selectedItems
                  .map((item, index) => (
                    <React.Fragment key={index}>
                      {item.title}
                      {index < selectedItems.length - 1 ? ", " : ""}
                    </React.Fragment>
                  ))
                  .reduce((prev: any, curr) => [prev, "", curr], "")
              : "Please choose.."
            : selectedItems && selectedItems !== "Please choose.."
            ? selectedItems.title
            : "Please choose.."}
        </div>

        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
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
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto border border-gray-300 rounded-md">
          <ul className="my-1 px-2">
            {items.map((item: any, index: number) => (
              <li
                key={index}
                className={`list-none my-1 py-0 hover:bg-gray-100 cursor-pointer ${
                  multiple && selectedItems.includes(item) ? "bg-gray-200" : ""
                }`}
                onClick={
                  specialItem
                    ? () => handleSpecialItemClick(item)
                    : () => handleItemClick(item)
                }
              >
                <span className="text-gradient">
                  {item.title} - {item.kcal} kcal
                </span>
                <span className="block pt-1 pb-2 text-sm font-semibold text-gray-500 border-b border-gray-300">
                  Protein: {item.protein}g - Carbs: {item.carbs}g - Fats:{" "}
                  {item.fats}g
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
