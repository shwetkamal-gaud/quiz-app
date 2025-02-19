import { useEffect, useState } from "react";
import { saveQuizAttempt } from "../db/indexDb";
import { questions } from "../json/questionsJson";
import ScoreCard from "./ScoreCard";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionValue, setOptionValue] = useState("");
    const [userAnswers, setUserAnswers] = useState<{ question: string; selected: string | null; correct: string }[]>([]);
    const [completed, setCompleted] = useState(false);
    const [isQuiz, setIsQuiz] = useState(false);
    const [err, setErr] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        if (isQuiz && startTime === null) {
            setStartTime(Date.now());
        }
    }, [isQuiz]);

    const handleAnswer = () => {
        if (optionValue.length === 0) {
            setErr("Please select an option before submitting");
            return;
        }

        const isCorrect = optionValue === questions[currentQuestion].correct;
        setUserAnswers((prev) => [
            ...prev,
            { question: questions[currentQuestion].question, selected: optionValue, correct: questions[currentQuestion].correct }
        ]);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setOptionValue("");
        } else {
            setCompleted(true);
            if (startTime) {
                const totalTime = Math.floor((Date.now() - startTime) / 1000);
                setTimeTaken(totalTime);

                const correctAnswers = userAnswers.filter((ans) => ans.selected === ans.correct).length + (isCorrect ? 1 : 0);

                saveQuizAttempt({
                    quizName: "Sample Quiz",
                    score: correctAnswers,
                    date: new Date().toISOString(),
                    timeTaken: totalTime
                });
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-[100%] h-full">
            {!isQuiz ? (
                <form onSubmit={()=> setIsQuiz(true)}>
                    <input type="text"  />
                    <button
                        style={{ borderRadius: "15px" }}
                        className="bg-blue-500 px-8 py-2 text-white"
                        type="submit"
                    >
                        Start Quiz
                    </button>
                </form>
            ) : (
                <div className="p-5 card border border-blue-100 w-100 rounded-lg">
                    {completed ? (
                        <ScoreCard userAnswers={userAnswers} timeTaken={timeTaken} />
                    ) : (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl">{questions[currentQuestion].question}</h2>
                            <div className="flex flex-col gap-3">
                                {questions[currentQuestion].options.map((option) => (
                                    <div key={option} className="flex gap-1 items-center ">
                                        <input
                                            id={option}
                                            value={option}
                                            onChange={(e) => {
                                                setOptionValue(e.target.value);
                                                setErr("");
                                            }}
                                            checked={option === optionValue}
                                            type="radio"
                                        />
                                        <label htmlFor={option}>{option}</label>
                                    </div>
                                ))}
                            </div>
                            {err.length > 0 && <span className="text-red-500">{err}</span>}
                            <div className="flex gap-2 text-white">
                                {currentQuestion !== 0 && (
                                    <button className="bg-blue-500 rounded-lg px-2 py-1" onClick={() => setCurrentQuestion((prev) => prev - 1)}>
                                        Previous
                                    </button>
                                )}
                                <button className="bg-blue-500 rounded-lg px-2 py-1" disabled={optionValue.length === 0} onClick={() => setOptionValue("")}>
                                    Reset
                                </button>
                                <button onClick={handleAnswer} className="bg-blue-500 rounded-lg px-2 py-1">
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
