import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '거상 고인물 테스트',
  description: '거상 고인물 테스트',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
				<link href="https://fonts.cdnfonts.com/css/helvetica-neue-55" rel="stylesheet"></link>
				<link href="https://fonts.cdnfonts.com/css/trial-oceanic" rel="stylesheet"></link>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com"></link>
				<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;300;400;500;600;700;900&display=swap" rel="stylesheet"></link>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com"></link>
				<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
			</head>
      <body>{children}</body>
      
    </html>
  )
}
