import { useState } from 'react';
import "./plan.css"
import { useGlobalMessageContext } from '../../components/GlobalMessageContext';
const DeploymentConfig = () => {
  const [buildScript, setBuildScript] = useState('npm ci && npm run build');
  const [startScript, setStartScript] = useState('npm run start');
  const [port, setPort] = useState(1024);
  const [file, setFile] = useState<File | null>(null);
  const { setGlobalMessage, setGlobalMessageType } = useGlobalMessageContext();

  // const { planId } = useParams();
  
  const features_plan = {
    'language':'Node.js', 
    'cpu':'1 CPU core', 
    'ram':'250 MB RAM', 
    'storage':'300 MB storage'
  }; 

  

  const handleSubmit = () => {
    if (port < 1024) {
      setGlobalMessage('Port number should be greater than 1024');
      setGlobalMessageType('error');
      return;
    }
  
    if (!file) {
      setGlobalMessage('Please upload a file');
      setGlobalMessageType('error');
      return;
    }
  
    const configData = {
      buildScript,
      startScript,
      port,
      fileName: file,
    };
  
    console.log('Configuration Data:', configData);
    setGlobalMessageType('success');
    setGlobalMessage('Deployment started successfully');
  };

  return (
    <div className="main-container">
      <div className="card-container">
        {/* Left Container */}
        <div className="left-container">
          <h3>Plan Information</h3>
          <ul>
          {Object.entries(features_plan).map(([, value],index) => (
            <li key={index}>{value}</li>
          ))}
          </ul>
        </div>

        {/* Right Container */}
        <div className="right-container">
          <h3>Deployment Configuration</h3>

          <div className="input-group">
            <label>
              Build Script:
              <input
                type="text"
                value={buildScript}
                onChange={(e) => setBuildScript(e.target.value)}
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Start Script:
              <input
                type="text"
                value={startScript}
                onChange={(e) => setStartScript(e.target.value)}
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Port:
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Upload Source Code:
              <input
                type="file"
                accept=".zip"
                onChange={(e) => {
                  if (!(e.target.files && !e.target.files.length)) {
                    setFile(null);
                    return;
                  } 
                  setFile(e.target.files[0]);
                }}
              />
            </label>
          </div>

          <button className="submit-button" onClick={handleSubmit}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeploymentConfig;
