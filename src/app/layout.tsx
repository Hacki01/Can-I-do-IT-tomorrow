import type { Metadata } from "next";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

import Providers from '../TasksStore/providers' 

import Daily from "@/components/header/daily";
import Header from "@/components/header"

import { Lato, Outfit } from 'next/font/google'
const lato = Lato({ variable:'--font-lato', subsets: ['latin'], weight: ["100","300","400","700","900"]})
const outfit = Outfit({ subsets:['latin'], weight:['100','200','300','400','500','600','700','800','900']})

import '../styles/Base.scss'

export const metadata: Metadata = {
  title: "Maybe Now?", 
  keywords: ["task planner", "daily planner", "to-do list", "tasks", "schedule"],
  authors: [{name:"Szymon Matloch", url:"https://matloch.vercel.app"}],
  publisher: "Szymon Matloch",
  description: "Plan your daily duties with this curious tasks planner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${outfit.className} ${lato.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <Daily />
          {children}
        </Providers>
      </body>
    </html>
  );
}
