"use client";

import { useState, useEffect } from "react";

// Example component for debugging demonstration
export function DebugExample() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Debug this effect
  useEffect(() => {
    console.log("Component mounted, count:", count);
    
    // Add breakpoint here to debug useEffect
    if (count > 0) {
      debugger; // Execution will pause here when count > 0
      fetchData();
    }
    
    return () => {
      console.log("Component cleanup");
    };
  }, [count]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Add breakpoint here to debug API call
      debugger;
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const result = await response.json();
      setData(result.title);
      
      // Add breakpoint here to see data after fetch
      debugger;
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    // Add breakpoint here to debug button click
    debugger;
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
    setData(null);
  };

  return (
    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Debug Example Component
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Increment Count
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Count: <span className="font-bold">{count}</span>
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Data: <span className="font-bold">{data || "No data"}</span>
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Loading: <span className="font-bold">{loading ? "Yes" : "No"}</span>
          </p>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium mb-2">Debug Instructions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Set breakpoints on lines with `debugger` statements</li>
            <li>Use F5 to start debugging session</li>
            <li>Click "Increment Count" to trigger breakpoints</li>
            <li>Check Variables panel in VSCode debugger</li>
          </ul>
        </div>
      </div>
    </div>
  );
}