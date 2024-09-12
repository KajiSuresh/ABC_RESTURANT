
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Sidebar from './sidebar/page'
import Header from './header/page'


const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
       <div className="ml-10 p-0 mb-96 ">
          <Sidebar />
          <Header/>
        <div className='mt-16'>  {children}</div>
           
      
        </div>
      </div>
    
  )
}