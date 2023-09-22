import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from '@clerk/themes'

function Topbar() {
  return (
    <nav className="topbar">

      <Link href='/' className="flex items-center gap-2">

        <Image src="/assets/darwin-logo.png" alt="Darwin's Logo" width={32} height={32} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Darwin</p>
      </Link>

      <div className="flex items-center gap-1">

        <div className="block md:hidden">

          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <img src="/assets/logout.svg" alt="Logout" width={24} height={24} />
              </div>
            </SignOutButton>
          </SignedIn>

        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4"
            }
          }} />
      </div>
    </nav>
  )
}

export default Topbar;