import { SidebarNavigationDashboard, TopBarNavigationDashboard } from '@/components/Navigation'
import React from 'react'

export default function DashboardLayout({children}) {
  return (
    <div
        className='w-full min-h-screen flex flex-row'
    >
        <SidebarNavigationDashboard/>
        <section
          className='w-full h-screen flex flex-col bg-gray-100 overflow-y-hidden'
        >
          <TopBarNavigationDashboard/>
          {children}
        </section>
    </div>
  )
}
