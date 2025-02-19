import { useState } from "react";
import { saveQuizAttempt } from "../db/indexDb";
import { questions } from "../json/questionsJson";


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionValue, setOptionValue] = useState('')
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [isQuiz, setIsQuiz] = useState(false)
    const handleAnswer = (answer: string) => {
        if (answer === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCompleted(true);
            saveQuizAttempt({ quizName: "Sample Quiz", score, date: new Date().toISOString() });
        }
    };
    console.log("optoins", optionValue)
    return (
        <div className="flex items-center justify-center w-[100%] h-full">
            {!isQuiz ?
                <button style={{ borderRadius: '15px' }} className="bg-blue-500 px-8 py-2 text-white" onClick={() => setIsQuiz(true)}>
                    Start Quiz
                </button>
                :
                <div className="p-5 card border border-blue-100 w-100 rounded-lg">
                    {completed ? (
                        <h2>Quiz Complete! Your Score: {score}/{questions.length}</h2>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl">{questions[currentQuestion].question}</h2>
                            <div className="flex flex-col gap-3">
                                {questions[currentQuestion].options.map((option) => (
                                    <div key={option} onClick={() => handleAnswer(option)} className="flex gap-1 items-center ">
                                        <label htmlFor={option}></label>
                                        <input id={option} value={option} onChange={(e)=>  setOptionValue(e.target.value)} checked={option === optionValue} type="radio" />
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>}
        </div>
    );
}

export default Quiz