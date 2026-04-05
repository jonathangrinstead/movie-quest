import Navbar from "@/components/navbar";
import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-white antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-border py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-textMuted text-sm">
            MovieQuest — Level up your film taste
          </div>
        </footer>
      </body>
    </html>
  );
}