export default function TestPage() {
  return (
    <div style={{ padding: '20px', background: 'lightblue' }}>
      <h1>Test Page - If you see this, Next.js is working!</h1>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  )
}
