import React, { useEffect, useState } from "react";
import Login from "./login";
import HistoryTable from "./historytable";
import URL from "./url";
import CsvTable from "./csvtable";
import axios from "axios";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userName, setUserName] = useState();

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getHistory?username=${userName}`
        );
        setHistoryData(response.data);
        console.log(historyData);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistoryData();
  }, [userName]);

  // Callback function to handle successful login
  const handleSuccessfulLogin = (data) => {
    setLoggedIn(true);
    setUserName(data);
    console.log(`Logged in as ${data}`);
  };

  // Callback function to handle login failure
  const handleLoginFailure = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.reddit.com/r/all/top/.json"
        );
        const data = response.data.data.children.slice(0, 8);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data from Reddit:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-body bubbles">
      <div className="grid">
        <div id="sec1" className="section left">
          {loggedIn ? (
            <>
              <URL userName={userName} />
              <CsvTable />
            </>
          ) : (
            <Login
              onSuccessfulLogin={handleSuccessfulLogin}
              onLoginFailure={handleLoginFailure}
            />
          )}
          {showAlert && (
            <div className="alert alert-danger" role="alert">
              Login failed. Please check your username and password.
            </div>
          )}
        </div>

        <div id="sec2" className="section right-up">
          <h1 className="text-center">TRENDING</h1>
          <div className="content">
            <table className="trending-table">
              <thead>
                <tr className="text-center px-2">
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Reddit Post</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{post.data.title}</td>
                    <td className="text-center">
                      <a
                        href={post.data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div id="sec3" className="section right-down">
          <h1 className="text-center">HISTORY</h1>
          <HistoryTable historyData={historyData} /> x
        </div>
      </div>
    </div>
  );
};

export default Index;
