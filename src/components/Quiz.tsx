import { useEffect, useState } from "react";
import { saveQuizAttempt } from "../db/indexDb";
import { questions } from "../json/questionsJson";
import ScoreCard from "./ScoreCard";
import Modal from "./Modal";

const TOTAL_TIME = 30;

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionValue, setOptionValue] = useState("");
    const [userAnswers, setUserAnswers] = useState<{ question: string; selected: string | null; correct: string }[]>([]);
    const [completed, setCompleted] = useState(false);
    const [isQuiz, setIsQuiz] = useState(false);
    const [err, setErr] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeTaken, setTimeTaken] = useState(0);
    const [show, setShow] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [name, setName] = useState("");
    const [isAnswered, setIsAnswered] = useState(false)

    useEffect(() => {
        if (isQuiz && !completed) {
            setTimeLeft(TOTAL_TIME);
            setStartTime(Date.now());
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        handleAnswer();
                        handleNext()
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isQuiz, currentQuestion, completed]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };
    const handleAnswer = () => {
        setUserAnswers(prev => {
            const isAlreadyRecorded = prev.some(ans => ans.question === questions[currentQuestion].question);
            if (isAlreadyRecorded) return prev;

            return [
                ...prev,
                {
                    question: questions[currentQuestion].question,
                    selected: optionValue || null,
                    correct: questions[currentQuestion].correct
                }
            ];
        });

        const questionTimeTaken = startTime ? (Date.now() - startTime) / 1000 : 0;
        setTimeTaken((prev) => prev + questionTimeTaken);

        if (!(currentQuestion + 1 < questions.length)) {
            setShow(true);
        }

        if (timeLeft > 0 && optionValue.length > 0) {
            setIsAnswered(true);
            setErr("");
        }
    };


    const handleSubmit = () => {
        setCompleted(true);

        const finalTimeTaken = timeTaken + (startTime ? (Date.now() - startTime) / 1000 : 0);

        const correctAnswers = userAnswers.filter(ans => ans.selected === ans.correct).length;

        saveQuizAttempt({
            quizName: name,
            score: correctAnswers,
            date: new Date().toISOString(),
            timeTaken: finalTimeTaken
        });

        setShow(false);
    };

    const handleNext = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setOptionValue("");
            setErr("");
            setTimeLeft(TOTAL_TIME);
            setStartTime(Date.now());
            setIsAnswered(false);
        }
    }

    const reAttempt = () => {
        setIsQuiz(false)
        setCompleted(false)
        setUserAnswers([])
        setCurrentQuestion(0)
        setOptionValue('')
        setTimeTaken(0)
        setTimeLeft(TOTAL_TIME)
        setName('')
        setStartTime(null)
        setIsAnswered(false)
        setErr('')
    }

    return (
        <div className="flex justify-center w-[100%] h-full px-3">
            {!isQuiz ? (
                <form onSubmit={(e) => { e.preventDefault(); setIsQuiz(true); }} className="max-w-sm my-auto flex flex-col">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Quiz Name or username" required />
                    </div>
                    <button type="submit" className="text-white mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start Quiz</button>
                </form>
            ) : (
                <div className="px-6 py-3 bg-white border border-gray-200 rounded-lg overflow-auto max-h-[85vh] shadow-sm md:my-auto mt-4 dark:bg-gray-800 dark:border-gray-700">
                    {completed ? (
                        <ScoreCard userAnswers={userAnswers} timeTaken={timeTaken} reAttempt={reAttempt} />
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">

                                <h2 className="text-2xl">{`${currentQuestion + 1}.${questions[currentQuestion].question}`}</h2>
                                <div className="text-red-500 text-lg font-bold">
                                    ⏳ Time Left: {formatTime(timeLeft)}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {questions[currentQuestion].isOption && questions[currentQuestion].options ? (

                                    questions[currentQuestion]?.options.map((option) => (
                                        <div key={option} className="flex gap-1 items-center">
                                            <input
                                                id={option}
                                                value={option}
                                                disabled={isAnswered}
                                                onChange={(e) => {
                                                    setOptionValue(e.target.value);
                                                    setErr("");
                                                }}
                                                checked={option === optionValue}
                                                type="radio"
                                            />
                                            <label htmlFor={option}>{option}</label>
                                        </div>
                                    ))
                                ) : (
                                    <input
                                        type="text"
                                        value={optionValue}
                                        disabled={isAnswered}
                                        onChange={(e) => { setOptionValue(e.target.value); setErr('') }}
                                        placeholder="Enter your answer"
                                        className="p-2 border border-gray-300 rounded-md"
                                    />
                                )}
                            </div>

                            {err.length > 0 && <span className="text-red-500">{err}</span>}
                            {isAnswered && (
                                <p className={`font-semibold ${userAnswers[currentQuestion]?.correct === userAnswers[currentQuestion]?.selected ? "text-green-500" : "text-red-500"}`}>
                                    {userAnswers[currentQuestion]?.correct === userAnswers[currentQuestion]?.selected ? "✅ Correct Answer!" : "❌ Incorrect. The correct answer is: " + questions[currentQuestion].correct}
                                </p>
                            )}
                            <div className="flex gap-2 text-white">
                                        <button className={optionValue.length === 0 || isAnswered ?'bg-gray-500 rounded-lg px-2 py-1':"bg-blue-500 rounded-lg px-2 py-1"} disabled={optionValue.length === 0 || isAnswered} onClick={() => setOptionValue("")}>
                                    Reset
                                </button>
                                        <button disabled={optionValue.length === 0} onClick={() => handleAnswer()} className={optionValue.length === 0 ?'bg-gray-500 rounded-lg px-2 py-1' : `bg-blue-500 rounded-lg px-2 py-1`}>
                                    Submit
                                </button>
                                        {currentQuestion + 1 < questions.length && <button disabled={!isAnswered} onClick={() => handleNext()} className={isAnswered ? "bg-blue-500 rounded-lg px-2 py-1" :'bg-gray-500 rounded-lg px-2 py-1'}>
                                    Next
                                </button>}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <Modal timeLeft={timeLeft} isOpen={show} header="Confirmation" onClose={() => setShow((prev) => !prev)} handleSubmit={handleSubmit} />
        </div>
    );
};

export default Quiz;
