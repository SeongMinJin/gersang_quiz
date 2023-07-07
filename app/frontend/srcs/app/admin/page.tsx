'use client'

import Link from "next/link";
import { useEffect, useState } from "react"

interface Quiz {
	id: number,
	title: string,
}

export default function Admin() {
	const [quiz, setQuiz] = useState<Quiz[]>([
		{
			id: 1,
			title: '소리 듣고 몬스터 맞히기',
		}
	]);
	useEffect(() => {
		async function initQuiz() {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/quiz`).then(res => res.json());
				setQuiz(res);
			} catch (err) {

			}
		}
	}, [quiz])

	return  (
		<main className="relative w-full h-screen p-20">
			<div className="relative w-full h-full">
				{
					quiz.map((quiz: Quiz) => <Link key={quiz.id} href={`/admin/${quiz.id}`}>{quiz.title}</Link>)
				}
			</div>
		</main>
	)
}