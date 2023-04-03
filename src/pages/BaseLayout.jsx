import Navbar from '../components/Navbar'

export default function BaseLayout({ children }) {
  return (
    <main className='flex min-h-screen bg-slate-700 text-white'>
      <Navbar />

      <section className='mx-auto flex max-h-screen max-w-screen-xl flex-1 flex-col gap-4 overflow-y-auto'>
        {children}
      </section>
    </main>
  )
}
