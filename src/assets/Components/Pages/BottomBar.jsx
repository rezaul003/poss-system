import { useState, useEffect } from "react";

const BottomBar = ({ onCancel, onPay, setActiveCategory }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [ "DIVERSE PRODUKTER", "DRIKKE", "KIOSKVARER", "MAT", "PIZZA"];

  // On component mount, load the active tab from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(Number(savedTab));
      setActiveCategory(tabs[Number(savedTab)]); // Pass the saved tab to the parent component
    } else {
      // Default to "All" if no saved tab exists
      setActiveCategory(tabs[0]);
    }
  }, []);

  // Save the active tab in localStorage when it changes
  const handleTabClick = (index, tab) => {
    setActiveTab(index); // Set active tab
    setActiveCategory(tab); // Pass selected tab to parent
    localStorage.setItem("activeTab", index); // Store the active tab in localStorage
  };

  return (
    <div className="mt-6 flex">
      <div className="flex items-center bg-gray-800 text-white shadow-lg w-3/4 mx-8">
        <button className="px-4 py-3">
          <span className="text-lg">❮</span>
        </button>
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(index, tab)}
              className={`flex-1 text-center px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-gray-700 ${index < tabs.length - 1 ? "border-r-4 border-gray-700" : ""
                } ${activeTab === index ? "bg-gray-700" : ""}`}
            >
              {tab}
            </div>
          ))}
        </div>
        <button className="px-4 py-2">
          <span className="text-lg">❯</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 mx-4">
        <div
          className="flex items-center justify-center bg-red-600 text-white w-1/5 px-8 h-16 rounded shadow-md cursor-pointer"
          onClick={onCancel}
        >
          <span className="text-3xl">🚫</span>
        </div>
        <div
          className="flex items-center justify-center bg-green-600 text-white w-4/5 px-28 py-4 rounded shadow-md cursor-pointer"
          onClick={onPay}
        >
          <span className="text-2xl mr-2 w-full">✔️</span>
          <span className="text-lg font-semibold">BETAL</span>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
