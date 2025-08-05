import Link from 'next/link'

export default function NotFound() {
  return (
    <html>
      <body style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>Page Not Found</h2>
          <Link
            href="/dashboard"
            style={{
              color: '#007bff',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}>Return Dashboard</Link>
        </div>
      </body>
    </html>
  )
} 