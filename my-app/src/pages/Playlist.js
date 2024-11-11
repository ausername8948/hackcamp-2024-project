import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionModal from '../components/QuestionModal';
import './Playlist.css';

function Playlist() {
  const location = useLocation();
  const navigate = useNavigate();
  const [playlist, setPlaylist]  = useState(location.state.playlist);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState(playlist.questions);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  //Check if question is empty
  useEffect(() => {
    if (playlist && playlist.questions) {
      setQuestions(playlist.questions);
    }
  }, [playlist]);

  const handleNewQuestion = () => {
    setCurrentQuestion(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (index) => {
    setCurrentQuestion(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitQuestion = (question, answer) => {
    let updatedQuestions;
    if (currentQuestion !== null) {
      updatedQuestions = [...questions];
      updatedQuestions[currentQuestion] = { question, answer };
    } else {
      updatedQuestions = [...questions, { question, answer }];
    }
    setQuestions(updatedQuestions);

    const updatedPlaylist = { ...playlist, questions: updatedQuestions };
    setPlaylist(updatedPlaylist);
    fetch(`http://localhost:3000/playlists/${playlist._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlaylist),
    })
      .then((response) => response.json())
      .then(() => {
        setIsModalOpen(false);
      });
  };

  const handlePlay = () => {
    navigate('/play', { state: { playlist } });
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="playlist">
      <h1>{playlist.name}</h1>
      <button className="question-button" onClick={handleNewQuestion}>
        New Question
      </button>
      {questions.map((q, index) => (
        <button
          key={index}
          className="question-button"
          onClick={() => handleEditQuestion(index)}
        >
          {q.question}
        </button>
      ))}
      <button className="play-button" onClick={handlePlay}>
        Play
      </button>
      <button className="back-button" onClick={handleBackToHome}>
        Back to Home
      </button>
      <QuestionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitQuestion}
        initialQuestion={currentQuestion !== null ? questions[currentQuestion].question : ''}
        initialAnswer={currentQuestion !== null ? questions[currentQuestion].answer : ''}
      />
      
    </div>
  );
}

export default Playlist;
