import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/files/list");
      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setFiles(res.data);
      } else {
        setFiles([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    await axios.post("http://localhost:5001/api/files/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    fetchFiles();
  };

  return (
    <div className="p-6">
      <h2>Upload File</h2>

      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <h3 className="mt-4">Uploaded Files</h3>

      <ul>
        {files.map((f) => (
          <li key={f._id}>
            <a href={f.url} target="_blank" rel="noopener noreferrer">
              {f.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
