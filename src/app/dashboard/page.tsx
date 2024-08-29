

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChefHat, Contact, LibraryBig, PackageIcon, SettingsIcon, ShoppingCartIcon, UserPlusIcon, UsersIcon, View } from 'lucide-react'

export default function Component() {
  return (
    <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 w-full overflow-hidden">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">


          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardDescription>Total User</CardDescription>
                  <CardTitle className="text-4xl">10</CardTitle>
                </div>
                <UsersIcon className="w-10 h-10" />
              </div>
            </CardHeader>

            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardDescription>Total Staff</CardDescription>
                  <CardTitle className="text-4xl">10</CardTitle>
                </div>
                <ChefHat className="w-10 h-10" />
              </div>
            </CardHeader>

            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
            <div className="flex justify-between items-center"> 
              <div>
              <CardDescription>Total Menu</CardDescription>
              <CardTitle className="text-4xl">10</CardTitle>
              </div>
              <PackageIcon className="w-10 h-10"/>
              </div>
            </CardHeader>

            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
            <div className="flex justify-between items-center"> 
              <div>
              <CardDescription>Total Dinning</CardDescription>
              <CardTitle className="text-4xl">10</CardTitle>
              </div>
              <View className="w-10 h-10"/>
              </div>
            </CardHeader>

            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
            <div className="flex justify-between items-center"> 
              <div>
              <CardDescription>Total Reservation</CardDescription>
              <CardTitle className="text-4xl">10</CardTitle>
              </div>
              <LibraryBig className="w-10 h-10"/>
              </div>
            </CardHeader>

            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
            <div className="flex justify-between items-center"> 
              <div>
              <CardDescription>Total Services</CardDescription>
              <CardTitle className="text-4xl">10</CardTitle>
              </div>
              <Contact className="w-10 h-10"/>
              </div>
            </CardHeader>

            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>


        </div>
        
      </div>
    </main>
  )
}

