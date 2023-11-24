import React, { useState } from "react";
import axios from "axios";

function URL({userName}) {
    const [url, setURL] = useState("");
    const [username,setUserName]=useState("")

    const handleURLSubmit = async () => {
        setUserName(userName);
        const data = {
            username, 
            url,
        };

        try {
            // Send a POST request to the Flask endpoint
            const response = await axios.post("http://localhost:5000/storeURL", data);

            if (response.data.success) {
                // If URL submission is successful, clear the input
                setURL("Safe");
                alert("URL submitted successfully");
            } 
        } catch (error) {
            console.error("URL submission error:", error);
            alert("URL submission failed");
        }
    }

    return (
        <div>
            <h1 className="text-center">Website URL Submission</h1>
            <div className="container-form">
                <form className="my-4">
                    <div className="container mx-auto">
                        <div className="form-group mt-4 mx-auto text-center">
                            <label htmlFor="url">URL:</label>
                            <input
                                type="text"
                                style={{ width: '70%' }}
                                className="form-control col-md-4 mx-auto"
                                id="url"
                                name="url"
                                required
                                value={url}
                                onChange={(e) => setURL(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn btn-info btn-block my-3"
                            style={{ borderRadius: 50, fontWeight: 1000 }}
                            type="button"
                            onClick={handleURLSubmit}
                        >
                            SUBMIT URL
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default URL;
