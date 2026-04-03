import { Metadata } from 'next'

import { META } from '@/lib/constants/meta'

export const metadata: Metadata = {
  ...META,
  title: 'Dashboard | Your Website Name',
}

export default function DashboardPage() {
  return <div>DashboardPage</div>
}
