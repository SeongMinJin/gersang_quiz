'use client'

import Image from "next/image";
import { ChangeEvent, Dispatch, FormEvent, KeyboardEvent, MouseEvent, SetStateAction, useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
interface Quiz {
	id: number,
	title: string,
	description: string,
	thumbnail: Buffer,
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
			<div className="relative w-full min-w-[300px] py-10 px-5 flex justify-center">
				<div className="relative w-full h-fit grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:w-[1536px]">
					{
						quiz.map((quiz: Quiz) =>{
							console.log(new Blob([quiz.thumbnail]));
							return (
								<div key={quiz.id} className="w-full rounded-sm shadow-2xl h-96">
									<Image
										src={`/quiz/thumbnail/${quiz.id}`}
										alt="Thumbnail of Quiz"
										width={300}
										height={400}
										style={{
											aspectRatio: "3/4",
											objectFit: "cover"

										}}
									/>
								</div>
							)
						}
						)
					}
					<div onClick={() => setOpen(true)} className="relative flex items-center justify-center w-full transition-all duration-300 rounded-sm shadow-2xl h-96 hover:-translate-y-2 hover:bg-[#cfcfcf] cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-blue-500">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
				</div>
			</div>
			{
				open ? <CreateQuizModal setQuiz={setQuiz} setOpen={setOpen} /> : null
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
	setOpen,
	setQuiz
}: {
	setOpen: Dispatch<SetStateAction<boolean>>
	setQuiz: Dispatch<SetStateAction<Quiz[]>>
}) {
	const [thumbnail, setThumbnail] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");

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

				if (description === "") {
					ToastWraper("warn", "설명을 입력해주세요.");
					document.getElementById("description")?.focus();
					return;
				}


				const newForm = new FormData();
				newForm.append("thumbnail", new Blob([await fetch(thumbnail).then(res => res.blob())], {type: "image/*"}));
				newForm.append("title", title);
				newForm.append("description", description);

				try {
					const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/quiz/create`, {
						method: "post",
						body: newForm,
					}).then(res => res.json());

					if (res.success) {
						ToastWraper("success", "새로운 퀴즈가 만들어졌습니다.");
						setQuiz(res.data);
					} else {
						ToastWraper("error", res.message);
					}

				} catch {
					ToastWraper("error", "서버가 아파요 :(");
				}
				
				URL.revokeObjectURL(thumbnail);
				setThumbnail("");
				setTitle("");
				setDescription("");
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
				<div className="relative w-full mt-4">
					<textarea id="description" value={description} onChange={(e: ChangeEvent) => setDescription((e.target as HTMLInputElement).value)} className="w-full transition-colors duration-300 border-2 rounded-sm resize-none focus:outline-none focus:border-blue-500" placeholder="퀴즈 설명" name="description" rows={2}></textarea>
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