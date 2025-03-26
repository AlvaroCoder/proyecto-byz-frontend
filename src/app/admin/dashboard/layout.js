import { SidebarNavigationDashboard, TopBarNavigationDashboard } from '@/components/Navigation'
import React from 'react'

export default function DashboardLayout({children}) {
  return (
    <div
        className='w-full min-h-screen flex flex-row overflow-hidden'
    >
        <SidebarNavigationDashboard/>
        <section
          className='w-full  flex flex-col bg-gray-100 overflow-hidden'
        >
          <TopBarNavigationDashboard/>
          <section className='overflow-y-auto max-h-screen'>
            {children}
          </section>
        </section>
    </div>
  )
}
