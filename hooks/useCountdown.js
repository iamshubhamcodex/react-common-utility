import React, { useEffect, useState } from "react";

const useCountdown = (timer = 30) => {
  const [timerCount, setTimerCount] = useState(timer);
  const [reset, setReset] = useState(false)

  function resetCounter () {
    setTimerCount(timer);
    setReset(prev => !prev)
  }

  useEffect(() => {
    let timerInterval = setInterval(() => {
      setTimerCount((prev) => {
        if (prev === 0) clearInterval(timerInterval);
        else if (prev > 0) return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [reset]);

  return { timerCount, resetCounter };
};

export default useCountdown;
