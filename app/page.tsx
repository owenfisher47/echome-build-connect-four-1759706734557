import ConnectFour from '@/components/ConnectFour'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Connect Four
        </h1>
        <ConnectFour />
      </div>
    </main>
  )
}