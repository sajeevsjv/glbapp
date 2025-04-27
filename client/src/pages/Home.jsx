import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModelViewer from '../components/ModelViewer';

const Home = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try{
      const res = await axios.get('http://localhost:4000/getall');
      console.log('res :', res);
      setModels(res.data.data);
      }
      catch(err){
        console.log('ERROR' , err.response.data.message ? err.response.data.message :  err) ;
      }
    };
    fetchModels();
  }, []);

  console.log("models :",models);

  return (
    <div style={{ padding: 20 }}>
      <h1>3D Models</h1>
      {models.length === 0 && <p>No models uploaded.</p>}
      {models.map((model) => (
        <div key={model._id} style={{ marginBottom: 50 }}>
          <h2>{model.name}</h2>
          <p>{model.description}</p>
            <ModelViewer url={`http://localhost:4000/${model.file.replace(/\\/g, "/")}`} />

        </div>
      ))}
    </div>
  );
};

export default Home;
