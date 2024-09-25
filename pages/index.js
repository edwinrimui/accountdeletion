import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <Link href="/account-deletion" className="text-blue-500 hover:underline">
        Request Account Deletion
      </Link>
    </div>
  )
}