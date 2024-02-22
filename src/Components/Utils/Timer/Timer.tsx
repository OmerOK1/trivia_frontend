import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

interface TimerProps {
    key: number;
  timeLimit: number;
  onTimeout: () => void;
}


const Timer: React.FC<TimerProps> = ({ key, timeLimit, onTimeout }) => {
    const [progress, setProgress] = useState(100);
  
    useEffect(() => {
      const interval = 500; // Adjust the interval for smoother animation
      const steps = timeLimit * (1000 / interval);
  
      setProgress(100); // Reset progress when timeLimit changes
  
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
  
      return () => {
        clearInterval(timer);
      };
    }, [key]);
  
    // Reset progress only when timeLimit changes
    useEffect(() => {
      setProgress(100);
    }, [key]);
  
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    );
  };
  
  export default Timer;
  