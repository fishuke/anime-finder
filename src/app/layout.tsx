'use client';
import './globals.css'
import React from "react";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="w-full h-full flex flex-row">
        <nav className="w-48">
            <Sidebar/>
        </nav>
        <main className="w-full p-6 mb-12">
            {children}
        </main>
        </body>
        </html>
    )
}

function Sidebar() {
    return (
        <div className="p-4 bg-purple-500 h-full rounded-r-xl flex flex-col gap-6">
            <h1 className="text-center text-white text-xl font-bold">
                Logo
            </h1>
            <div className="flex flex-col gap-4">
                <button className="bg-white rounded-2xl p-2">
                    Home
                </button>
            </div>
        </div>
    )
}
