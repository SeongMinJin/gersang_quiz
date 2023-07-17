'use client'

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

interface Problem {

}

export default function Page({
	params
}: {
	params: {
		quizId: string
	}
}) {
	const [open, setOpen] = useState<boolean>(false);
	const [problem, setProblem] = useState();

	useEffect(() => {
	}, [])

	return (
		// <div className="relative w-full h-screen bg-[#dedede] flex flex-col items-center">
		// 	<h1 className="mt-10 text-3xl font-bold whitespace-nowrap font-noto-sans-kr">문제 리스트</h1>
		// 	<div className="relatvie w-full lg:w-[1024px] p-4 flex flex-col gap-y-4">
		// 		<div onClick={() => setOpen(true)} className="flex items-center justify-center w-full py-4 bg-white shadow-xl">
		// 			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-blue-500">
		// 				<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
		// 			</svg>
		// 		</div>
		// 	</div>

		// 	{
		// 		open ? <CreateProblemModal setOpen={setOpen} /> : null
		// 	}
		// </div>
		<></>
	);
}

interface Selection {
	id: number;
	title: string;
	type: string;
	buffer: Buffer;
}


function CreateProblemModal({
	setOpen
}: {
	setOpen: Dispatch<SetStateAction<boolean>>
}) {
	const [selection, setSelection] = useState<Selection[]>([]);
	const [type, setType] = useState<string>("");


	return (
		<></>
		// <div className="fixed z-[1] bg-opacity-50 p-4 bg-[#b9b9b9] w-full h-full flex items-center  font-noto-sans-kr">
		// 	<form className="relative flex flex-col items-center justify-start w-full h-full p-20 bg-white gap-y-10">
		// 		<button onClick={() => setOpen(false)} className="absolute top-5 right-5">
		// 			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
		// 				<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
		// 			</svg>
		// 		</button>

		// 		<fieldset className="flex w-full">
		// 			<legend className="text-xl whitespace-nowrap">타입</legend>
		// 			<div className="flex gap-x-4">
		// 				<div>
		// 					<input onChange={(e: ChangeEvent) => setType((e.target as HTMLInputElement).value)} type="radio" id="text" name="type" value="text"/>
		// 					<label htmlFor="text">텍스트</label>
		// 				</div>

		// 				<div>
		// 					<input onChange={(e: ChangeEvent) => setType((e.target as HTMLInputElement).value)} type="radio" id="audio" name="type" value="audio" />
		// 					<label htmlFor="radio">소리</label>
		// 				</div>

		// 				<div>
		// 					<input onChange={(e: ChangeEvent) => setType((e.target as HTMLInputElement).value)} type="radio" id="image" name="type" value="image" />
		// 					<label htmlFor="image">그림</label>
		// 				</div>
		// 			</div>
		// 		</fieldset>

		// 		<div className="w-full">
		// 		</div>
		// 	</form>
		// </div>
	)
}