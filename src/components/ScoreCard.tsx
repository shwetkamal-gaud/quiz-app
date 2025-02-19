interface ScoreCardProps {
    userAnswers: { question: string; selected: string | null; correct: string }[];
    timeTaken: number;
}

const ScoreCard = ({ userAnswers, timeTaken }: ScoreCardProps) => {
    const totalQuestions = userAnswers.length;
    const correctAnswers = userAnswers.filter((ans) => ans.selected === ans.correct).length;
    const incorrectAnswers = userAnswers.filter((ans) => ans.selected !== ans.correct && ans.selected !== null).length;
    const unattempted = userAnswers.filter((ans) => ans.selected === null).length;

    return (
        <div className="p-5  border-blue-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Quiz Scorecard</h2>
            <p className="text-lg">📊 <strong>Score:</strong> {correctAnswers} / {totalQuestions}</p>
            <p className="text-lg">✅ <strong>Correct Answers:</strong> {correctAnswers}</p>
            <p className="text-lg">❌ <strong>Incorrect Answers:</strong> {incorrectAnswers}</p>
            <p className="text-lg">⚪ <strong>Unattempted Questions:</strong> {unattempted}</p>
            <p className="text-lg">⏳ <strong>Time Taken:</strong> {timeTaken} seconds</p>

            <h3 className="text-xl font-bold mt-4">Detailed Breakdown</h3>
            <table className="w-full rounded-lg border-collapse border border-gray-300 mt-2">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Question</th>
                        <th className="border p-2">Your Answer</th>
                        <th className="border p-2">Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {userAnswers.map((ans, index) => (
                        <tr key={index} className="text-center">
                            <td className="border p-2">{ans.question}</td>
                            <td className={`border p-2 ${ans.selected === ans.correct ? "text-green-600" : "text-red-600"}`}>
                                {ans.selected || "Not Attempted"}
                            </td>
                            <td className="border p-2">{ans.correct}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScoreCard;
