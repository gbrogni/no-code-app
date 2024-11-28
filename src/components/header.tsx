import Link from 'next/link';
import { ThemeSwitcher } from './theme/theme-switcher';
import { AccountMenu } from './account-menu';

export async function Header() {
  return (
    <div className="border-b">
      <div className="flex h-12 md:h-16 items-center gap-4 md:gap-6 px-4 md:px-6">
        <nav className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
          <Link href="/">
            No code API
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}