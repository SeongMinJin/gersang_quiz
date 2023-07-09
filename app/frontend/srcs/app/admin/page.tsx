'use client'

import { ChangeEvent, Dispatch, FormEvent, KeyboardEvent, MouseEvent, SetStateAction, useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
interface Quiz {
	id: number,
	title: string,
	thumbnail: string,
}

export default function Admin() {
	const [quiz, setQuiz] = useState<Quiz[]>([]);
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		async function initQuiz() {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/quiz`).then(res => res.json());
				setQuiz(res);
			} catch (err) {
				ToastWraper("error", "서버가 아파요 :(");
			}
		}
		initQuiz();
	}, [])

	return (
		<main className="relative flex justify-center w-full h-screen">
			<div className="relative w-full grid min-w-[300px] gap-4 py-10 px-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:w-[1536px]">
				<div className="relative w-full h-full">
					{
						quiz.map((quiz: Quiz) =>
							<div className="w-full rounded-sm shadow-2xl h-96">

							</div>
						)
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
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</main>
	)
}


function CreateQuizModal({
	setOpen
}: {
	setOpen: Dispatch<SetStateAction<boolean>>
}) {
	const [thumbnail, setThumbnail] = useState<string>("");
	const [title, setTitle] = useState<string>("");

	return (
		<div className="fixed z-[1] bg-opacity-50 bg-[#b9b9b9] w-full h-full flex justify-center items-center">
			<form onKeyDown={(e: KeyboardEvent) => e.key === "Enter" ? e.preventDefault() : null} onSubmit={async (e: FormEvent) => {
				e.preventDefault();

				if (thumbnail === "") {
					ToastWraper("warn", "썸네일 이미지를 선택해주세요.")
					return;
				}

				if (title === "") {
					ToastWraper("warn", "제목을 입력해주세요.");
					document.getElementById("title")?.focus();
					return;
				}


				const newForm = new FormData();
				newForm.append("thumbnail", new Blob([thumbnail], {type: "image/*"}));
				newForm.append("title", title);

				try {
					const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/quiz/create`, {
						method: "post",
						body: newForm,
					}).then(res => res.json());
				} catch {
					
				}
				
				URL.revokeObjectURL(thumbnail);
				setThumbnail("");
				setTitle("");
				setOpen(false);
			}} className="relative w-[400px] h-[500px] bg-white shadow-2xl rounded-sm flex flex-col p-4 gap-y-2">
				<div style={{
					backgroundImage: `url("${thumbnail}")`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}} className={`relative flex flex-col items-center justify-center w-full h-full border-2 rounded-lg bg-cover`}>
					<label htmlFor="thumbnail" className="cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="duration-300 w-12 h-12 text-[#bebebee2] hover:text-black">
							<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
						</svg>
					</label>
					<input onChange={(e: ChangeEvent) => {
						const files = (e.target as HTMLInputElement).files as FileList;
						if (files.length)
							setThumbnail(URL.createObjectURL(files[0]));
					}} className="hidden" id="thumbnail" name="thumbnail" type="file" accept="image/*" />
				</div>

				<div className="w-full mt-4 relatvie">
					<input id="title" value={title} onChange={(e: ChangeEvent) => setTitle((e.target as HTMLInputElement).value)} name="title" type="text" placeholder="퀴즈 제목" className="w-full transition-colors duration-300 border-b-2 focus:border-blue-500 focus:outline-none" />
				</div>
				<div className="flex justify-between w-full h-[100px] items-end">
					<button onClick={(e: MouseEvent) => { e.preventDefault(); setOpen(false); }} className="px-4 py-1 text-white bg-[#ea3a3a] duration-200 rounded-sm font-noto-sans-kr hover:bg-[#aa2626]">닫기</button>
					<button className="px-4 py-1 text-white bg-[#334ed6] duration-200 rounded-sm font-noto-sans-kr hover:bg-[#1a2c87]">확인</button>
				</div>
			</form>
		</div>
	)
}

export function ToastWraper(type: string, message: string) {
	switch (type) {
		case "error":
			return toast.error(message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			})
		case "warn":
			return toast.warn(message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			})
		case "success":
			return toast.success(message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			})
		default:
			return;
	}
}