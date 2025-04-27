import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.glb')) {
      setFormData((prev) => ({ ...prev, file }));
      setError('');
    } else {
      setFormData((prev) => ({ ...prev, file: null }));
      setError('Only .glb files are allowed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      setError('Please upload a valid .glb file');
      return;
    }

    try {
      let response = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        },
      )
      console.log("ressss :", response);
      let message = response.data.message;
      alert(message);
    }
    catch (error) {
      console.error("error response :", error.response.data);
      setError('Error uploading file. Please try again.');
    }
    console.log('Submitting form:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Upload .glb File</h2>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">GLB File</label>
        <input
          type="file"
          accept=".glb"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-500 file:text-white
          hover:file:bg-blue-600"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
