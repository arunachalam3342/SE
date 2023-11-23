import React, { useState, useEffect, useRef } from "react";
import Records from "../assets/data/final_analysis.json";

const CsvTable = () => {
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayRows, setDisplayRows] = useState(1);
  const tableRef = useRef(null);

  useEffect(() => {
    setJsonData(Records);
  }, []);
  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setDisplayRows((prevDisplayRows) => prevDisplayRows + 10);
        setIsLoading(false);
      }, 1000); // Simulate a delay, replace this with actual data fetching logic
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => observer.disconnect();
  }, [tableRef]);

  const getColorBasedOnResult = (result) => {
    const percentage = Math.round(result * 100);
    if (percentage > 0) {
      return "green";
    } else if (percentage==0) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <div>
      <table className="tableFixHead" ref={tableRef}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>POST</th>
            <th colSpan={2}>Intent</th>
            <th colSpan={2}>Result</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex+1}</td> 
              <td>{row.Post}</td>
              <td>{row.Intent_Analysis}</td>
              <td style={{ fontWeight:600,color:"black",backgroundColor: getColorBasedOnResult(row.Result)}}>{Math.round(row.Result*100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default CsvTable;
