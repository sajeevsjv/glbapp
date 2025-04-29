import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModelViewer from '../components/ModelViewer';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get(`https://glbapp.onrender.com/getall`);
        console.log('res :', res);
        setModels(res.data.data);
      } catch (err) {
        console.log('ERROR', err.response?.data?.message || err);
      }
    };
    fetchModels();
  }, []);

  const handleClick = (model) => {
    if (selectedModel && selectedModel._id === model._id) {
      setSelectedModel(null); // If the clicked model is already expanded, collapse it
    } else {
      setSelectedModel(model); // Expand the clicked model
    }
  };

  return (
    <>
    <nav className='bg-black p-3 flex justify-between items-center'>
        <h1 className="text-3xl font-semibold">GLB Models</h1>
        <button onClick={()=>navigate("/addfile")}>+ Add new</button>
      </nav>
    <div className="p-8">
      {models.length === 0 && <p className="text-lg text-gray-500">No models uploaded.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" key={selectedModel ? selectedModel._id : "grid"}>
        {models.map((model) => (
          <div
            key={model._id}
            className={`bg-white  border-2 border-gray-300 shadow-lg rounded-lg overflow-hidden ${selectedModel && selectedModel._id === model._id ? 'col-span-4' : ''
              }`}
            onClick={() => handleClick(model)}
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-green-600 mb-2">{model.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{model.description}</p>
            </div>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <ModelViewer
                url={`${process.env.REACT_APP_BACKEND_URL}/${model.file.replace(/\\/g, '/')}`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              {/* Optional buttons or additional information can go here */}
            </div>
          </div>
        ))}
      </div>
      {selectedModel && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"

        >
          <button className='p-3 bg-black text-white rounded-md absolute top-2 right-[16vw]' onClick={() => setSelectedModel(null)}><AiOutlineClose /></button>


          <div className="bg-white rounded-lg w-3/4 lg:w-2/3 p-6">
            <h2 className="text-2xl font-semibold mb-4">{selectedModel.name}</h2>
            <p className="text-gray-600 mb-4">{selectedModel.description}</p>
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <ModelViewer
                url={`http://localhost:4000/${selectedModel.file.replace(/\\/g, '/')}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
  
};

export default Home;
