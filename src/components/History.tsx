import { useEffect, useState } from "react";
import { getQuizHistory } from "../db/indexDb";

interface QuizAttempt {
    quizName: string;
    score: number;
    date: string;
    timeTaken: number;
}

const History = () => {
    const [history, setHistory] = useState<QuizAttempt[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getQuizHistory();
            setHistory(data.reverse()); 
        };
        fetchHistory();
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Quiz Attempt History</h2>
            {history.length === 0 ? (
                <p>No quiz attempts yet.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Score</th>
                            <th className="border p-2">Time Taken (seconds)</th>
                            <th className="border p-2">Attempt Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((attempt, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-2">{attempt.quizName}</td>
                                <td className="border p-2">{attempt.score}</td>
                                <td className="border p-2">{attempt.timeTaken}s</td>
                                <td className="border p-2">{new Date(attempt.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default History;
