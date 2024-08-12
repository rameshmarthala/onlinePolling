// src/app/components/PollList.tsx
"use client";
import { useState } from 'react';
import axios from 'axios';
const PollList = ({ polls }) => {
  const [responses, setResponses] = useState({});

  const handleChange = (pollId, optionId) => {
    setResponses((prevResponses) => ({
      
      [pollId]: optionId,
    }));
  };
  const handleSubmit = async (pollId) => {
    const selectedOptionId = responses[pollId];
    if (!selectedOptionId) {
      alert('Please select an option');
      return;
    }

    try {
      await axios.post(`/api/polls/${pollId}/response`, {
        optionId: selectedOptionId,
      });
      alert('Response submitted successfully');
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Failed to submit response');
    }
  };
  return (
    <div style={{textAlign:'center'}}>
      <h1>Available Polls</h1>
      {polls.map((poll, index) => (
        <div key={poll.id}>
          <h2>{index + 1}. {poll.question}</h2>
          {poll.options?.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                id={`${poll.id}-${option.id}`}
                name={`poll-${poll.id}`}
                value={option.id}
                checked={responses[poll.id] === option.id}
                onChange={() => handleChange(poll.id, option.id)}
              />
              <label htmlFor={`${poll.id}-${option.id}`}>{option.text}</label>
            </div>
          )) || <p>No options available</p>}
          <button onClick={() => handleSubmit(poll.id)} 
          style={{ padding: '12px', border: '2px solid red', borderRadius: '50px', backgroundColor: 'black', color: 'white' }}>
            Submit Response
          </button>
        </div>
      ))}
    </div>
  );
};

export default PollList;
