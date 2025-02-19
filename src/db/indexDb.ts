import { openDB } from "idb";

const DB_NAME = "QuizDB";
const HISTORY_STORE = "quizHistory";
const PROGRESS_STORE = "quizProgress";

const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(HISTORY_STORE)) {
                db.createObjectStore(HISTORY_STORE, { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
                db.createObjectStore(PROGRESS_STORE, { keyPath: "id" });
            }
        },
    });
};

export const saveQuizAttempt = async (quizData: {
    quizName: string;
    score: number;
    date: string;
    timeTaken: number
}) => {
    const db = await initDB();
    const tx = db.transaction(HISTORY_STORE, "readwrite");
    await tx.objectStore(HISTORY_STORE).add(quizData);
};


export const getQuizHistory = async () => {
    const db = await initDB();
    return db.getAll(HISTORY_STORE);
};

export const saveQuizProgress = async (progress: {
    id: string;
    currentQuestion: number;
    userResponses: { question: string; selected: string | null; correct: string }[];
    timeLeft: number
}) => {
    const db = await initDB();
    const tx = db.transaction(PROGRESS_STORE, "readwrite");
    await tx.objectStore(PROGRESS_STORE).put(progress);
};

export const getQuizProgress = async (): Promise<{
    currentQuestion: number;
    userResponses: { question: string; selected: string | null; correct: string }[];
    timeLeft: number
} | null> => {
    const db = await initDB();
    return db.get(PROGRESS_STORE, "progress") ?? null;
};

export const clearQuizProgress = async () => {
    const db = await initDB();
    await db.delete(PROGRESS_STORE, "progress");
};
