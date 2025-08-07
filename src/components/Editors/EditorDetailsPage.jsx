import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:1337/api/editors";

const EditorDetailsPage = () => {
  const { documentId } = useParams();
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/${documentId}`)
      .then(res => {
        setEditor(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load editor details");
        setLoading(false);
      });
  }, [documentId]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error || !editor) return <div className="text-center p-10 text-red-500">{error || "Editor not found"}</div>;

  const { Name, Email, createdAt } = editor;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">{Name}</h1>
        <p className="text-gray-600 mb-1"><strong>Email:</strong> {Email}</p>
        {/* <p className="text-gray-600 mb-1"><strong>Document ID:</strong> {documentId}</p> */}
        <p className="text-gray-500 text-sm mt-2">Created At: {new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EditorDetailsPage;
