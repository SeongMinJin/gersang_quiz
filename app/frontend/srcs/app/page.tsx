export default function Home() {
  return (
    <main className="relative w-full h-screen">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="relative max-w-5xl w-full max-h h-auto bg-[#f3f3f3] shadow-lg font-noto-sans-kr">
          <h1 className=" bg-blue-500 text-2xl text-white font-bold text-center py-2">소리로 맞히는 거상 테스트</h1>
          <div className="relative w-full py-20 flex justify-center items-center">
            <button className=" px-10 py-4 rounded-sm bg-white hover:text-white hover:bg-blue-500  font-semibold duration-200 transition-colors">
              시작하기
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
