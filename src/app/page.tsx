// src/app/page.tsx
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import PollCreationForm from './components/PollCreationForm';
import PollList from './components/PollList';

const Page = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('/api/polls');
        console.log(response.data);
        setPolls(response.data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };
    fetchPolls();
  }, []);
  

  return (
    <div>
      <PollCreationForm onCreate={(newPoll) => setPolls([...polls, newPoll])} />
      <PollList polls={polls} />
    </div>
  );
};

export default Page;
