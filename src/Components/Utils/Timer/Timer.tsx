import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

interface TimerProps {
    genericKey: number;
  timeLimit: number;
  onTimeout: () => void;
}


export function Timer({ genericKey, timeLimit, onTimeout } : TimerProps) {
    const [progress, setProgress] = useState(100);
  
    useEffect(() => {
      const interval = 100; // Adjust the interval for smoother animation
      const steps = timeLimit * (1000 / interval);
  
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            onTimeout(); // Trigger timeout callback
            return 0;
          }
          return prev - 100 / steps;
        });
      }, interval);
  
      return () => { //lifetime event for end of timer rendering.
        clearInterval(timer);
      };
    }, [genericKey]);
  
    // Reset progress only when timeLimit changes
    useEffect(() => {
      setProgress(100);
    }, [genericKey]);
  
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    );
  };
  
  export default Timer;
  