'use client'

import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react";

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
  const [stage, setStage] = useState<number>(0);
  const quizJson = require('../quiz.json');

  return (
    <main className="relative w-full h-screen">
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative max-w-5xl w-full max-h h-auto bg-[#f3f3f3] shadow-lg font-noto-sans-kr">
          {
            start ?
              quizJson.quizs[stage].type === Type.AUDIO ? <AudioQuiz stage={stage} quiz={quizJson.quizs[stage]} /> : <ImageQuiz stage={stage} quiz={quizJson.quizs[stage]} />
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
  stage,
  quiz
}: {
  stage: number,
  quiz: Quiz
}) {
  return (
    <div className="relative flex flex-col w-full h-full p-10 gap-y-4">
      <h3 className="text-xl">{stage + 1}. 소리 듣고 문제 맞히기 </h3>

      <div className="">
        <audio className="border-2 rounded-full" controls src={`/${stage + 1}/문제.mp3`}></audio>
      </div>
      <fieldset className="grid grid-cols-2">
        {
          quiz.selection.map((selection, index) => (
            <div className="w-fit">
              <label htmlFor={`${index + 1}번`}>{index + 1}. {selection}
                <Image
                  src={`/${stage + 1}/${selection}.png`}
                  alt="Image of Quiz selection"
                  width={100}
                  height={100}
                />
              </label>
              <input onClick={(e: MouseEvent) => {
                alert((e.target as HTMLInputElement).value);
              }} className="hidden" value={selection} id={`${index + 1}번`} type="radio" name={`${stage + 1}`} />
            </div>
          ))
        }
      </fieldset>
    </div>
  )
}

function ImageQuiz({
  stage,
  quiz,
}: {
  stage: number,
  quiz: Quiz
}) {
  return (
    <div className="relative w-full h-full p-10">
      <h3 className="text-xl">{stage + 1}. 그림 보고 문제 맞히기 </h3>

    </div>
  )
}