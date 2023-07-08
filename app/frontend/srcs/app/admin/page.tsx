'use client'

import Image from "next/image";
import Link from "next/link";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"

interface Quiz {
	id: number,
	title: string,
	thumbnail: string,
}

export default function Admin() {
	const [quiz, setQuiz] = useState<Quiz[]>([]);
	const [open, setOpen] = useState<boolean>(true);

	useEffect(() => {
		async function initQuiz() {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/quiz`).then(res => res.json());
				setQuiz(res);
			} catch (err) {

			}
		}
		initQuiz();
	}, [])

	return (
		<main className="relative flex justify-center w-full h-screen">
			<div className="relative w-full grid min-w-[300px] gap-4 py-10 px-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:w-[1536px]">
				<div className="relative w-full h-full">
					{
						// quiz.map((quiz: Quiz) =>
						// 	<Link key={quiz.id} href={`/admin/${quiz.id}`}>
						// 		<Image
						// 			src={`/quiz/${quiz.id}/thumbnail`}
						// 			width={300}
						// 			height={300}
						// 			alt="Thumbnail of Quiz"
						// 		/>
						// 	</Link>
						// )
					}
					<div onClick={() => setOpen(true)} className="relative flex items-center justify-center w-full transition-all duration-300 rounded-sm shadow-2xl h-96 hover:-translate-y-4 hover:bg-[#cfcfcf] cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-blue-500">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
				</div>
			</div>
			{
				open ? <CreateQuizModal setOpen={setOpen} /> : null
			}
		</main>
	)
}


function CreateQuizModal({
	setOpen
}: {
	setOpen: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<div className="fixed z-[1] bg-opacity-50 bg-[#b9b9b9] w-full h-full flex justify-center items-center">
			<form onSubmit={(e: FormEvent) => {e.preventDefault(); }} className="relative w-[300px] h-[400px] bg-white shadow-2xl rounded-sm flex flex-col p-4 gap-y-2">

				<div className="relative flex items-center justify-center w-full h-full border-2 rounded-lg">
					<input required className="w-full" name="thumnail" type="file" accept="image/*"/>
				</div>

				<div className="w-full mt-4 relatvie">
					<input required name="title" type="text" placeholder="퀴즈 제목" className="w-full transition-colors duration-300 border-b-2 focus:border-blue-500 focus:outline-none" />
				</div>
				<div className="flex justify-between w-full h-[100px] items-end">
					<button onClick={(e) => {e.preventDefault(); setOpen(false);}} className="px-4 py-1 text-white bg-[#ea3a3a] duration-200 rounded-sm font-noto-sans-kr hover:bg-[#aa2626]">닫기</button>
					<button className="px-4 py-1 text-white bg-[#334ed6] duration-200 rounded-sm font-noto-sans-kr hover:bg-[#1a2c87]">확인</button>
				</div>
			</form>
		</div>
	)
}