import { useEffect, useState } from "react";
import { getQuizHistory } from "../db/indexDb";

const History = () => {
    const [history, setHistory] = useState<{ quizName: string; score: number; date: string }[]>([]);

    useEffect(() => {
        getQuizHistory().then(setHistory);
    }, []);

    return (
        <div>
            <h2>Quiz History</h2>
            <ul>
                {history.map((quiz, index) => (
                    <li key={index}>
                        {quiz.quizName} - Score: {quiz.score} - Date: {new Date(quiz.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default History