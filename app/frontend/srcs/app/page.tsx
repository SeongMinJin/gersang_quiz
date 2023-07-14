export default function Home() {
  return (
    <main className="relative w-full h-screen">
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative max-w-5xl w-full max-h h-auto bg-[#f3f3f3] shadow-lg font-noto-sans-kr">
          <h1 className="py-2 text-2xl font-bold text-center text-white bg-blue-500 ">소리로 맞히는 거상 테스트</h1>
          <div className="relative flex items-center justify-center w-full py-20">
            <button className="px-10 py-4 font-semibold transition-colors duration-200 bg-white rounded-sm hover:text-white hover:bg-blue-500">
              시작하기
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
