'use client'

import { useEffect, useState } from "react";

interface Problem {

}

export default function Page({
	params
}: {
	params: {
		quizId: string
	}
}) {

	const [problem, setProblem] = useState()

	useEffect(() => {

	}, [])

	return (
		<div className="relative w-full h-screen bg-[#dedede] flex flex-col items-center py-10">
			<h1 className="text-3xl font-bold font-noto-sans-kr">문제 리스트</h1>
			<div className="w-[1024px] p-4 flex flex-col gap-y-4">



				<div className="flex items-center justify-center w-full p-10 bg-white shadow-xl">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-blue-500">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
			</div>
		</div>
	);
}
