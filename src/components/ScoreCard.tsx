interface ScoreCardProps {
    userAnswers: { question: string; selected: string | null; correct: string }[];
    timeTaken: number;
    reAttempt: () => void
}

const ScoreCard = ({ userAnswers, timeTaken, reAttempt }: ScoreCardProps) => {
    const totalQuestions = userAnswers.length;
    const correctAnswers = userAnswers.filter((ans) => ans.selected === ans.correct).length;
    const incorrectAnswers = userAnswers.filter((ans) => ans.selected !== ans.correct && ans.selected !== null).length;
    const unattempted = userAnswers.filter((ans) => ans.selected === null || ans.selected === '').length;
    return (
        <div className="overflwo-auto flex flex-col gap-1  border-blue-200 rounded-lg">
            <h2 className="text-2xl font-bold">Quiz Scorecard</h2>
            <p className="text-lg">📊 <strong>Score:</strong> {correctAnswers} / {totalQuestions}</p>
            <p className="text-lg">✅ <strong>Correct Answers:</strong> {correctAnswers}</p>
            <p className="text-lg">❌ <strong>Incorrect Answers:</strong> {incorrectAnswers}</p>
            <p className="text-lg">⚪ <strong>Unattempted Questions:</strong> {unattempted}</p>
            <p className="text-lg">⏳ <strong>Time Taken:</strong> {timeTaken.toFixed(0)} seconds</p>

            <h3 className="text-xl font-bold mt-2">Detailed Breakdown</h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Question
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Your Answer
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Correct Answer
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAnswers.map((ans, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="px-6 py-4">{ans.question}</td>
                                <td className={`px-6 py-4 ${ans.selected === ans.correct ? "text-green-600" : "text-red-600"}`}>
                                    {ans.selected || "Not Attempted"}
                                </td>
                                <td className="px-6 py-4">{ans.correct}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
            <button className="py-2 px-4 rounded-lg bg-purple-500 text-white me-auto"
                onClick={reAttempt}
            >
                {correctAnswers === userAnswers.length ? 'Go to the Quiz' :'Reattempt'}
            </button>
        </div>
    );
};

export default ScoreCard;
