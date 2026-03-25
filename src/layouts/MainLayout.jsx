import Sidebar from './Sidebar'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
