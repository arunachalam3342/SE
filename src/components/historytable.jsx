import React from "react";


const HistoryTable = ({ historyData }) => {
  
  return (
    <div className="content">
      <table className="trending-table">
        <thead>
          <tr className="">
            <th>S.No</th>   
            <th>URL</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              
              <td>
                <a href={entry.url} target="_blank" rel="noopener noreferrer">
                  {entry.url}
                </a>
              </td>
              <td>{entry.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
