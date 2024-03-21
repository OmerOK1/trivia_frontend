import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import store from '../../../Redux/Store';

interface TimerProps {
    timeLimit: number;
    onTimeout: () => void;
}


function TimerAdv({ timeLimit, onTimeout }: TimerProps) {
    const [progress, setProgress] = useState(100);
    const bonusTime = (store.getState().gameReducer.bonusTime ? store.getState().gameReducer.bonusTime! : 0) / timeLimit * 100;
    const [userAnswerLength, setUserAnswerLength] = useState(store.getState().gameReducer.userAnswers.length);

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
    }, []);

    // useEffect(() => {
    //     if (store.getState().gameReducer.bonusTime === 0) { return }
    //     const unsubscribe = store.subscribe(() => {
    //         if (store.getState().gameReducer.userAnswers.length && store.getState().gameReducer.questionIndex) {
    //             if (store.getState().gameReducer.userAnswers[store.getState().gameReducer.userAnswers.length - 1].isCorrect) {
    //                 setProgress((prev) => { return (prev + bonusTime < 100) ? prev + bonusTime : 100 })
    //             }
    //         }
    //     })
    //     return unsubscribe;
    // }, [])

    useEffect(() => {
        if (store.getState().gameReducer.bonusTime === 0) {
            return;
        }
        const unsubscribe = store.subscribe(() => {
            console.log(
                "length is: " + store.getState().gameReducer.userAnswers.length
            )
            setUserAnswerLength(store.getState().gameReducer.userAnswers.length);
        })
        return unsubscribe;
    }, [])

    useEffect(() => {
        if (store.getState().gameReducer.userAnswers[store.getState().gameReducer.userAnswers.length - 1]?.isCorrect) {
            setProgress((prev) => { return (prev + bonusTime < 100) ? prev + bonusTime : 100 })
        }
    }, [userAnswerLength])

    // useEffect(() => {
    //   setProgress(100);
    // }, [genericKey]);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

export default TimerAdv;
