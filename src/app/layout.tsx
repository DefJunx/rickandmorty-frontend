import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Rick and Morty",
  description: "Rick and morty frontface done with ❤️ using NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-[#40b5cb]/20`}>
        <main className=" h-screen container mx-auto pt-24">{children}</main>
      </body>
    </html>
  );
}
