import React from 'react'

export default function AdminLayout({children}) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
