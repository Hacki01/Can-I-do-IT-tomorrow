import type { Metadata } from "next";

import {TasksProvider} from '../TasksStore/provider'
import LocalStorageLoader from '../TasksStore/localstorageLoader' 

import Daily from "@/components/daily";
import Header from "@/components/header"

import { Lato, Outfit } from 'next/font/google'
const lato = Lato({ variable:'--font-lato', subsets: ['latin'], weight: ["100","300","400","700","900"]})
const outfit = Outfit({ subsets:['latin'], weight:['100','200','300','400','500','600','700','800','900']})

import '../styles/Base.scss'

export const metadata: Metadata = {
  title: "Maybe Now?",
  description: "Simple personal tasks organizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${outfit.className} ${lato.variable}`} suppressHydrationWarning>
      <body>
        <TasksProvider >
          <Header />
          <Daily />
          <LocalStorageLoader>
            {children}
          </LocalStorageLoader>
        </TasksProvider>
      </body>
    </html>
  );
}
