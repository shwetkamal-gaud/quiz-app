import { useEffect, useState } from "react";

interface TimerProps {
  time: number;
  onTimeUp: () => void;
}
const Timer = ({ time, onTimeUp }: TimerProps) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onTimeUp();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  return <div>Time Left: {seconds}s</div>;
}

export default Timer