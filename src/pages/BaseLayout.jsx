import Navbar from '../components/Navbar'

export default function BaseLayout({ children }) {
  return (
    <main className='flex min-h-screen bg-slate-700 text-white'>
      <Navbar />

      <section className='ml-14 flex min-h-screen max-w-screen-xl flex-1 flex-col gap-4 2xl:mx-auto '>
        {children}
      </section>
    </main>
  )
}
