import { useState, useEffect } from 'react';
import headerLogo from './assets/img/Breighton Flat Logo FC-8.png'; 
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    teamName: '',
    location: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field !== '').length;
    setProgress((filledFields / fields.length) * 100);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxcP7YN3ov1N9AmsPp_XGl_BgtAlKgnWBS8nGC1fvC2MeaMGxNSvGxgkl-2KaxV724O/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
    }
  } catch (error) {
    console.error("Error submitting to spreadsheet:", error);
    alert("Submission failed. Please check your connection.");
  }
};

  if (submitted) {
  return (
    <div className="browser-container">
      <div className="form-card success-view">
        <div className="success-icon">✓</div>
        <h1 className="form-title">Success!</h1>
        <p>Your daily log has been submitted successfully.</p>
      </div>
    </div>
  );
}

  return (
    <div className="browser-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      
      <div className="viewport-content">
        {/* Centered Logo Section */}
        <div className="brand-header">
          <img src={headerLogo} alt="Breighton Logo" className="logo-main" />
        </div>

        {/* Standard Sized Form Card */}
        <div className="form-card">
          <div className="card-top-accent"></div>
          <div className="card-padding">
            <header className="form-intro">
              <h1 className="form-title">Agent Attendance Form</h1>
              <p className="form-subtitle">Daily Log • Breighton Land Inc.</p>
            </header>

            <form onSubmit={handleSubmit} className="actual-form">
              <div className="input-block">
                <label>Full Name <span className="req">*</span></label>
                <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="input-block">
                <label>Contact Number <span className="req">*</span></label>
                <input type="tel" name="contactNumber" placeholder="09XX XXX XXXX" value={formData.contactNumber} onChange={handleChange} required />
              </div>

              <div className="input-block">
                <label>Team Name <span className="req">*</span></label>
                <select name="teamName" className="standard-select" value={formData.teamName} onChange={handleChange} required>
                  <option value="" disabled>Select your team</option>
                  <option value="Phoenix">Phoenix</option>
                  <option value="Alpha">Alpha</option>
                  <option value="Optimum">Optimum</option>
                  <option value="Catalyst">Catalyst</option>
                </select>
              </div>

              <div className="input-block">
  <label>Current Location <span className="req">*</span></label>
  <div className="radio-group">
    <label className="radio-label">
      <input 
        type="radio" 
        name="location" 
        value="BFE (Bellefort Estate)" 
        checked={formData.location === "BFE (Bellefort Estate)"} 
        onChange={handleChange} 
        required 
      />
      <span>BFE (Bellefort Estate)</span>
    </label>
    
    <label className="radio-label">
      <input 
        type="radio" 
        name="location" 
        value="VSA (Victoria South of Alabang)" 
        checked={formData.location === "VSA (Victoria South of Alabang)"} 
        onChange={handleChange} 
        required 
      />
      <span>VSA (Victoria South of Alabang)</span>
    </label>
  </div>
</div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">Submit</button>
                <span className="clear-link" onClick={() => setFormData({name:'', contactNumber:'', teamName:'', location:''})}>
                  Clear form
                </span>
              </div>
            </form>
          </div>
        </div>
        <footer className="browser-footer">© 2026 Breighton Real Estate Group</footer>
      </div>
    </div>
  );
}

export default App;