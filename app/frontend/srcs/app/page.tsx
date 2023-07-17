'use client'

import Image from "next/image";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from "react";

enum Type {
  AUDIO = "AUDIO",
  IMAGE = "IMAGE"
}

interface Quiz {
  type: string;
  answer: string;
  selection: string[];
}


export default function Home() {

  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const quizJson = require('../quiz.json');
  const [score, setScore] = useState<number>(0);

  return (
    <main className="relative w-full h-screen">
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative max-w-5xl w-full max-h h-auto bg-[#f3f3f3] shadow-lg font-noto-sans-kr">
          {
            start ?
              quizJson.quizs[stage].type === Type.AUDIO ?

                <AudioQuiz quiz={quizJson.quizs[stage]} stage={stage} setStage={setStage} score={score} setScore={setScore} setStart={setStart} setEnd={setEnd}/>
                :
                <ImageQuiz quiz={quizJson.quizs[stage]} stage={stage} setStage={setStage} score={score} setScore={setScore} setStart={setStart} setEnd={setEnd}/>

              :
              end ?
                <Result score={score} />
                :
                <>
                  <h1 className="py-2 text-2xl font-bold text-center text-white bg-blue-500 ">거상 고인물 테스트</h1>
                  <div className="relative flex items-center justify-center w-full py-20">
                    <button onClick={() => setStart(!start)} className="px-10 py-4 font-semibold transition-colors duration-200 bg-white rounded-sm hover:text-white hover:bg-blue-500">
                      시작하기
                    </button>
                  </div>
                </>
          }
        </div>
      </div>
    </main>
  )
}


function AudioQuiz({
  quiz,
  stage,
  setStage,
  score,
  setScore,
  setStart,
  setEnd
}: {
  quiz: Quiz,
  stage: number,
  setStage: Dispatch<SetStateAction<number>>,
  score: number,
  setScore: Dispatch<SetStateAction<number>>,
  setStart: Dispatch<SetStateAction<boolean>>,
  setEnd: Dispatch<SetStateAction<boolean>>
}) {
  const [done, setDone] = useState<boolean>(false);
  return (
    <div className="relative flex flex-col w-full h-full p-10 gap-y-4">
      <h3 className="text-xl">{stage + 1}. 소리 듣고 문제 맞히기 </h3>

      <div className="">
        <audio className="border-2 rounded-full" controls src={`/${stage + 1}/문제.mp3`}></audio>
      </div>
      <fieldset className="grid grid-cols-2 gap-10">
        {
          quiz.selection.map((selection, index) => (
            <div key={selection} className="w-fit">
              <label htmlFor={`${index + 1}번`}>{index + 1}. {selection}
                <Image
                  src={`/${stage + 1}/${selection}.png`}
                  alt="Image of Quiz selection"
                  width={100}
                  height={100}
                  style={{
                    width: "auto"
                  }}
                  id={selection}
                  className="border-4 border-white"
                />
              </label>
              <input onClick={(e: MouseEvent) => {
                e.preventDefault();
                if (done)
                  return;
                
                setDone(true);
                const value = (e.target as HTMLInputElement).value;
                const answer = quiz.answer;
                const valueElem = document.getElementById(value);
                const answerElem = document.getElementById(answer);

                if (value === answer) {
                  valueElem?.classList.remove("border-white");
                  valueElem?.classList.add("border-green-500");
                  setScore(score + 1);
                } else {
                  valueElem?.classList.remove("border-white");
                  valueElem?.classList.add("border-red-500");
                  answerElem?.classList.remove("border-white");
                  answerElem?.classList.add("border-blue-500");
                }
                setTimeout(() => {
                  if (stage === 39) {
                    setStart(false);
                    setEnd(true);
                  } else {
                    setStage(stage + 1);
                    setDone(false);
                  }
                }, 1000);
                setTimeout(() => setStage(stage + 1), 1000);
              }} className="hidden" value={selection} id={`${index + 1}번`} type="radio" name={`${stage + 1}`} />
            </div>
          ))
        }
      </fieldset>
    </div>
  )
}

function ImageQuiz({
  quiz,
  stage,
  setStage,
  score,
  setScore,
  setStart,
  setEnd
}: {
  quiz: Quiz,
  stage: number,
  setStage: Dispatch<SetStateAction<number>>,
  score: number,
  setScore: Dispatch<SetStateAction<number>>,
  setStart: Dispatch<SetStateAction<boolean>>,
  setEnd: Dispatch<SetStateAction<boolean>>
}) {

  const [done, setDone] = useState<boolean>(false);
  return (
    <div className="relative flex flex-col w-full h-full p-10 gap-y-4">
      <h3 className="text-xl">{stage + 1}. 옳바른 이름을 고르시오. </h3>

      <div className="">
        <Image
          src={`/${stage + 1}/${quiz.answer}.png`}
          width={200}
          height={200}
          alt="Image of Quiz Problem"
        />
      </div>
      <fieldset className="grid grid-cols-2 gap-10">
        {
          quiz.selection.map((selection, index) => (
            <div key={selection} className="w-fit">
              <label className="text-xl" id={selection} htmlFor={`${index + 1}번`}>{index + 1}. {selection}</label>
              <input onClick={(e: MouseEvent) => {
                e.preventDefault();
                if (done)
                  return;
                setDone(true);
                const value = (e.target as HTMLInputElement).value;
                const answer = quiz.answer;

                const valueElem = document.getElementById(value);
                const answerElem = document.getElementById(answer);
                if (value === answer) {
                  valueElem?.classList.add("text-green-500", "font-bold");
                  setScore(score + 1);
                } else {
                  valueElem?.classList.add("text-red-500", "font-bold");
                  answerElem?.classList.add("text-blue-500", "font-bold");
                }
                if (stage === 39) {
                  setStart(false);
                  setEnd(true);
                  return;
                }
                setTimeout(() => {
                  if (stage === 1) {
                    setStart(false);
                    setEnd(true);
                  } else {
                    setStage(stage + 1);
                    setDone(false);
                  }
                }, 1000);
              }} className="hidden" value={selection} id={`${index + 1}번`} type="radio" name={`${stage + 1}`} />
            </div>
          ))
        }
      </fieldset>
    </div>
  )
}

function Result ({
  score
}: {
  score: number
}) {
  return (
    <div className="relative w-full h-full p-4">

      <h2 className="text-3xl text-center">맞힌 문제 : {score} / 40</h2>

    </div>
  )
}