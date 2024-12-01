import type { Metadata } from "next";

import {TasksProvider} from '../TasksStore/provider'

import Daily from "@/components/daily";

import { Lato } from 'next/font/google'
const lato = Lato({ subsets: ['latin'], weight: ["100","300","400","700","900"]})

import '../styles/Base.scss'

export const metadata: Metadata = {
  title: "Can I do IT tommorow?",
  description: "Simple personal tasks organizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={lato.className}>
      <body>
        <TasksProvider >
          <header className="navbar">
            <div className='text-3xl p-3'>Can <span className='text-orange-500 font-bold'>I</span> do <span className='text-blue-500 font-bold'>IT</span> tommorow?</div>
          </header>
          <Daily />
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
