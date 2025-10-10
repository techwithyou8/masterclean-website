"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Er is een fout opgetreden</h2>
      <p className="mb-4">{error.message}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => reset()}
      >
        Probeer opnieuw
      </button>
    </div>
  )
}
