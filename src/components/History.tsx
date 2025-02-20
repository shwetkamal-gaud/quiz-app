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
                    <div className="relative max-h-[80vh] overflow-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Name</th>
                                    <th scope="col" className="px-6 py-3">Score</th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Time Taken (seconds)</th>
                                    <th scope="col" className="px-6 py-3">Attempted Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((attempt, index) => (
                                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-6 py-4">{attempt.quizName}</td>
                                        <td className="px-6 py-4">{attempt.score}</td>
                                        <td className="px-6 py-4">{attempt.timeTaken?.toFixed(2)}s</td>
                                        <td className="px-6 py-4">{new Date(attempt.date).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            )}
        </div>
    );
};

export default History;
