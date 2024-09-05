import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'
import Link from "next/link"



import { ChefHat, Contact, HandPlatter, LayoutDashboard, LibraryBig, LineChartIcon, MenuIcon, Package2Icon, PackageIcon, SearchIcon, SettingsIcon, ShoppingCartIcon, UserPlusIcon, UsersIcon, View } from "lucide-react"

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className="flex w-full">
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Link
            href="/staffDashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            prefetch={false}
          >
            <LayoutDashboard className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Dashboard</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/staffDashboard/layout/users"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <UsersIcon className="h-5 w-5" />
                <span className="sr-only">Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Users</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/staffDashboard/layout/menus"
                
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <PackageIcon className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Menu</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/staffDashboard/layout/reservations"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <LibraryBig className="h-5 w-5" />
                <span className="sr-only">Reservation</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Reservation</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/staffDashboard/layout/contacts"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <Contact className="h-5 w-5" />
                <span className="sr-only">Contact</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Contact</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/staffDashboard/layout/services"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <HandPlatter className="h-5 w-5" />
                <span className="sr-only">Service</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Service</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <SettingsIcon className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
    
  </div>
    
  )
}

export default Sidebar