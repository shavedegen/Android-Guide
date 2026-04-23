import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, X } from 'lucide-react';
import './Walkthrough.css';

const walkthroughSteps = [
  {
    title: "Welcome to Android!",
    content: "Your smartphone is a powerful tool. Let's cover the very basics of how to get around.",
    icon: "👋"
  },
  {
    title: "The Home Screen",
    content: "This is your starting point. You can arrange apps here, see your wallpaper, and access everything else.",
    icon: "🏠"
  },
  {
    title: "Navigating",
    content: "Use buttons at the bottom (Back, Home, Recent) or swipe gestures to move between apps and screens.",
    icon: "👆"
  },
  {
    title: "Quick Settings",
    content: "Swipe down from the very top of your screen to access Wi-Fi, Bluetooth, Flashlight, and notifications.",
    icon: "⬇️"
  },
  {
    title: "You're Ready!",
    content: "Search below for specific tasks like taking a photo, downloading an app, or making a call.",
    icon: "🚀"
  }
];

const Walkthrough = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="walkthrough-overlay">
      <div className="walkthrough-modal glass animate-fade-in-up">
        <button className="close-btn" onClick={onComplete} aria-label="Close walkthrough">
          <X size={24} />
        </button>
        
        <div className="walkthrough-content">
          <div className="step-icon">{walkthroughSteps[currentStep].icon}</div>
          <h2>{walkthroughSteps[currentStep].title}</h2>
          <p>{walkthroughSteps[currentStep].content}</p>
        </div>

        <div className="walkthrough-footer">
          <div className="progress-dots">
            {walkthroughSteps.map((_, index) => (
              <div 
                key={index} 
                className={`dot ${index === currentStep ? 'active' : ''}`}
              />
            ))}
          </div>
          
          <div className="navigation-buttons">
            <button 
              className="btn-secondary" 
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back
            </button>
            <button className="btn-primary" onClick={handleNext}>
              {currentStep === walkthroughSteps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < walkthroughSteps.length - 1 && <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;
