import React from 'react';
import './QuestionModal.css';

function QuestionModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  let question = '';
  let answer = '';

  const handleSubmit = () => {
    onSubmit(question, answer);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Question</h2>
        <label>
          Question:
          <input type="text" onChange={(e) => (question = e.target.value)} />
        </label>
        <label>
          Answer:
          <input type="text" onChange={(e) => (answer = e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default QuestionModal;