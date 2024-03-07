export default function CustomButton({
  type,
  onClick,
  disabled,
  label,
  className,
}: {
  type: string;
  onClick?: any;
  disabled?: boolean;
  label?: string;
  className?: string;
}) {
  switch (type) {
    case "previous":
      return (
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={`py-2.5 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
            disabled
              ? "cursor-not-allowed pointer-events-none opacity-50" // Adjust styling for disabled state
              : ""
          }`}
        >
          Previous
        </button>
      );
    case "next":
      return (
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
            disabled
              ? "cursor-not-allowed pointer-events-none opacity-50" // Adjust styling for disabled state
              : ""
          }`}
        >
          <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Next
          </span>
        </button>
      );
    case "gradient":
      return (
        <button
          type="button"
          className={`inline-flex items-center justify-center p-0.5 mb-2 me-2 text-sm font-medium text-white rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 focus:outline-none `}
        >
          <span
            className={`px-3 py-2.5 transition-all ease-in duration-75 bg-white rounded-md bg-opacity-0`}
          >
            {label}
          </span>
        </button>
      );
    default:
      return (
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={`${className} inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" ${
            disabled
              ? "cursor-not-allowed pointer-events-none opacity-50" // Adjust styling for disabled state
              : ""
          }`}
        >
          <span
            className={`${className} px-3 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0`}
          >
            {label}
          </span>
        </button>
      );
  }
}
