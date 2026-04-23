import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import GuideCard from './components/GuideCard';
import Walkthrough from './components/Walkthrough';
import { Smartphone, LayoutGrid, HelpCircle } from 'lucide-react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  // Fetch FAQ data
  useEffect(() => {
    fetch('/data/faqs.json')
      .then(response => response.json())
      .then(data => setFaqs(data))
      .catch(error => console.error("Error loading FAQs:", error));
  }, []);

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return faqs;
    const lowerQuery = query.toLowerCase();
    
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(lowerQuery) || 
      faq.answer.toLowerCase().includes(lowerQuery) ||
      faq.category.toLowerCase().includes(lowerQuery)
    );
  }, [faqs, query]);

  return (
    <div className="app-container">
      {showWalkthrough && (
        <Walkthrough onComplete={() => setShowWalkthrough(false)} />
      )}

      <header className="header container">
        <div className="logo-container">
          <Smartphone size={48} className="logo-icon animate-fade-in-up" />
        </div>
        <h1 className="animate-fade-in-up delay-100">Android Master Guide</h1>
        <p className="subtitle animate-fade-in-up delay-200">
          Everything you need to know about using your smart phone, explained simply.
        </p>
        
        <div className="action-buttons animate-fade-in-up delay-300">
          <button 
            className="action-btn"
            onClick={() => setShowWalkthrough(true)}
          >
            <LayoutGrid size={18} /> Quick Tour
          </button>
        </div>
      </header>

      <main className="container">
        <SearchBar query={query} setQuery={setQuery} />
        
        <div className="results-container">
          {filteredFaqs.length > 0 ? (
            <div className="guides-list">
              {filteredFaqs.map((faq, index) => (
                <GuideCard 
                  key={faq.id} 
                  guide={faq} 
                  delay={index < 5 ? (index + 4) * 100 : 0} // Cascade animation for first few
                />
              ))}
            </div>
          ) : (
            <div className="no-results glass animate-fade-in-up">
              <HelpCircle size={48} className="no-results-icon" />
              <h3>No matching guides found</h3>
              <p>We couldn't find anything matching "{query}". Try using different keywords or browsing the categories.</p>
              <button 
                className="btn-clear" 
                onClick={() => setQuery('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
