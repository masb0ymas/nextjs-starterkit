'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { capitalizeFirstLetter } from '@/lib/string'

import AppSidebar from './app-sidebar'

export default function SidebarLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const renderBreadcrumb = () => {
    const pathSegments = pathname.split('/').filter(Boolean)

    if (pathSegments.length === 0) {
      return null
    }

    if (pathSegments.length === 1) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                {capitalizeFirstLetter(pathSegments[0])}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    }

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1
            const href = '/' + pathSegments.slice(0, index + 1).join('/')
            const displaySegment = capitalizeFirstLetter(segment)

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  {isLast ? (
                    <BreadcrumbPage className="font-medium">{displaySegment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className="font-medium" href={href} asChild>
                      <Link href={href}>{displaySegment}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar role="admin" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="my-auto mr-2 data-[orientation=vertical]:h-4"
            />
            {renderBreadcrumb()}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
