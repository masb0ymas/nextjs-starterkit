import { PropsWithChildren } from 'react'

import MainLayout from '@/components/layout/public/main-layout'

export default function PublicLayout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>
}
