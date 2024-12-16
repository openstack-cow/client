import { useState } from 'react';
import "./plan.css"
import { useGlobalMessageContext } from '../../components/GlobalMessageContext';
import { useNavigate, useParams} from 'react-router-dom';

const DeploymentConfig = () => {
  const [buildScript, setBuildScript] = useState('npm ci && npm run build');
  const [startScript, setStartScript] = useState('npm run start');
  const [port, setPort] = useState(1024);
  const [file, setFile] = useState<File | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [licenseCode, setLicenseCode] = useState('');
  const { setGlobalMessage, setGlobalMessageType } = useGlobalMessageContext();
  const navigate = useNavigate();
  const { planId } = useParams();

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

    setShowDialog(true);
  };

  const handleDialogSubmit = () => {
    if (licenseCode !== "1234") { 
      setGlobalMessage('Invalid license code. Please contact vutunglaminfo@gmail.com to purchase a valid code.');
      setGlobalMessageType('error');
      setShowDialog(false);
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
    setGlobalMessage('Config successfully and website is implementing');
    setShowDialog(false);
    navigate(`/websites/${planId}`);
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
                  if (!(e.target.files && e.target.files.length)) {
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

      {/* Dialog for license input */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>License Verification</h3>
            <p>Please contact <a href="mailto:vutunglaminfo@gmail.com">vutunglaminfo@gmail.com</a> to purchase a valid license code.</p>
            <div className="input-group-dialog">
              <label>
                Enter License Code:
                <input
                  type="text"
                  value={licenseCode}
                  onChange={(e) => setLicenseCode(e.target.value)}
                />
              </label>
            </div>
            <div className="dialog-buttons">
              <button onClick={handleDialogSubmit}>Submit</button>
              <button onClick={() => setShowDialog(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DeploymentConfig;
