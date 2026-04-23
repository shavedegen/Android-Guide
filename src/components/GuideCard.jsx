import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import './GuideCard.css';

const GuideCard = ({ guide, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isExpanded) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  return (
    <div className={`guide-card glass animate-fade-in-up delay-${delay}`}>
      <div 
        className="guide-header" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <span className="category-badge">{guide.category}</span>
          <h3 className="guide-question">{guide.question}</h3>
        </div>
        <button className="expand-button" aria-label="Expand guide">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      <div 
        className="guide-content-wrapper" 
        style={{ height: `${height}px` }}
      >
        <div className="guide-content" ref={contentRef}>
          <p className="guide-answer">{guide.answer}</p>
          <div className="steps-container">
            <h4>Step-by-Step Instructions:</h4>
            <ul className="steps-list">
              {guide.steps.map((step, index) => (
                <li key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <span className="step-text">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
