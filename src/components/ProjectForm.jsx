import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFolder, FiLink, FiUpload } from 'react-icons/fi';
import './ProjectForm.css';
import logo from '../assets/logo-short.svg';

function ProjectForm() {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState('Website');
  const words = ['Website', 'Product', 'Campaign', 'Agency'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    link: '',
    file: null
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setCurrentWord(words[(currentIndex + 1) % words.length]);
        setIsAnimating(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === 'description' && value.trim()) {
      setError('');
    }
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.description.trim()) {
      setError('Please tell us what you want to promote');
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('description', formData.description);
      submitData.append('link', formData.link);
      if (formData.file) {
        submitData.append('file', formData.file);
      }

      // 打印要发送的数据
      console.log('Sending data:', {
        description: formData.description,
        link: formData.link,
        file: formData.file ? formData.file.name : null
      });

      const response = await fetch('http://127.0.0.1:5000/api/analyze', {
        method: 'POST',
        // 使用 FormData 时不要手动设置 Content-Type，让浏览器自动设置
        body: submitData
      });

      // 打印响应状态
      console.log('Response status:', response.status);

      if (!response.ok) {
        // 尝试读取错误信息
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Server response data:', result);

      // 导航到分析结果页面，并传递数据
      navigate('/analyze', { state: { analysisData: result['result'] } });
    } catch (error) {
      console.error('Submit error:', error);
      setError('Submit failed, please try again later');
    }
  };

  return (
    <div className="project-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="project-logo" />
        </div>
        <button className="new-project-btn">New Project</button>
        <div className="projects-list">
          <div className="project-item">
            <span className="project-icon"><FiFolder /></span>
            Projects
          </div>
          <div className="project-item">
            <span className="project-icon"><FiFolder /></span>
            Projects
          </div>
          <div className="project-item">
            <span className="project-icon"><FiFolder /></span>
            Projects
          </div>
          <div className="project-item">
            <span className="project-icon"><FiFolder /></span>
            Projects
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="form-container">
          <div className="title-container">
            <div className="title-content">
              <h1 className="title title-first-line">
                Tell me about
              </h1>
              <div className="title-second-line">
                <h1 className="title">
                  your
                </h1>
                <h1 className="title animated-word-container">
                  <span className={`animated-word ${isAnimating ? 'slide-out' : ''}`}>
                    {currentWord}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <textarea
              className={`description-input ${error ? 'error' : ''}`}
              placeholder="What do you want to promote?"
              value={formData.description}
              onChange={(e) => {
                handleInputChange('description', e.target.value);
                handleTextareaResize(e);
              }}
              onInput={handleTextareaResize}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Website or Product Link (optional)</label>
            <div className="link-input-container">
              <span className="link-icon"><FiLink /></span>
              <input
                type="text"
                className="form-input"
                placeholder="http://example.com"
                value={formData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Upload File (optional)</label>
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button 
              className="upload-btn"
              onClick={() => document.getElementById('file-input').click()}
            >
              <span className="upload-icon"><FiUpload /></span>
              {formData.file ? formData.file.name : 'Choose File'}
            </button>
          </div>
          
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm; 