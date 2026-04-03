import { PropsWithChildren } from 'react'

import SidebarLayout from '@/components/layout/sidebar/layout'
import { requireSession } from '@/lib/auth/handler'

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  await requireSession()

  return <SidebarLayout>{children}</SidebarLayout>
}
