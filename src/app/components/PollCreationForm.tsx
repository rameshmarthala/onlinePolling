"use client";
import { useState } from 'react';
import axios from 'axios';
const PollCreationForm = ({ onCreate }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleCreatePoll = async () => {
    try {
      const response = await axios.post('/api/polls', { question, options });
      onCreate(response.data);
      setQuestion('');
      setOptions(['', '']);
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Create a Poll</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
          Poll Question
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your poll question"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--input-text-color)' }}
        />
      </div>
      {options.map((option, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`option-${index}`}>
            Option {index + 1}
          </label>
          <input
            type="text"
            id={`option-${index}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            placeholder={`Option ${index + 1}`}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: 'var(--input-bg-color)', color: 'var(--input-text-color)' }}
          />
        </div>
      ))}
      <button 
        onClick={handleCreatePoll}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Create Poll
      </button>
    </div>
  );
};

export default PollCreationForm;
