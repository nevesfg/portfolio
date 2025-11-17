import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "</Victor Neves>",
    description: "\"Se você pode sonhar, você pode realizar.\" — Walt Disney",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    );
}
