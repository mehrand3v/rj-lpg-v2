// src/components/layout/RootLayout.jsx
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  CubeIcon,
  BanknotesIcon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, Outlet, useLocation } from "react-router-dom";
import useTheme from "@/hooks/useTheme";

// Navigation items matching your route structure
const navigation = [
  { name: "Customers", href: "/", icon: HomeIcon },
  { name: "Sales", href: "/sales", icon: BanknotesIcon },
  { name: "Products", href: "/products", icon: CubeIcon },
  { name: "Users", href: "/users", icon: UsersIcon },
  { name: "Orders", href: "/orders", icon: ShoppingCartIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Inventory", href: "/inventory", icon: CubeIcon },
  { name: "Transactions", href: "/transactions", icon: BanknotesIcon },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useTheme();

  // Get current page title from navigation
  const getCurrentPageTitle = () => {
    const currentPath =
      location.pathname === "/" ? "/" : `/${location.pathname.split("/")[1]}`;
    const currentPage = navigation.find(
      (item) =>
        item.href === currentPath || (currentPath === "/" && item.href === "/")
    );
    return currentPage ? currentPage.name : "Dashboard";
  };

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component for mobile */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 ring-1 ring-gray-200 dark:ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <h1 className="text-xl font-serif italic tracking-wide text-indigo-600 dark:text-indigo-400">
                    Rana Jehanzeb
                  </h1>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          const isActive =
                            (location.pathname === "/" && item.href === "/") ||
                            (location.pathname !== "/" &&
                              item.href !== "/" &&
                              location.pathname.startsWith(item.href));

                          return (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={classNames(
                                  isActive
                                    ? "bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={classNames(
                                    isActive
                                      ? "text-indigo-600 dark:text-indigo-400"
                                      : "text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
                                    "h-6 w-6 shrink-0"
                                  )}
                                />
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component for desktop */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 border-r border-gray-200 dark:border-gray-700">
            <div className="flex h-16 shrink-0 items-center">
              <h1 className="text-xl font-serif italic tracking-wide text-indigo-600 dark:text-indigo-400">
                Rana Jehanzeb
              </h1>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive =
                        (location.pathname === "/" && item.href === "/") ||
                        (location.pathname !== "/" &&
                          item.href !== "/" &&
                          location.pathname.startsWith(item.href));

                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={classNames(
                              isActive
                                ? "bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400"
                                : "text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                isActive
                                  ? "text-indigo-600 dark:text-indigo-400"
                                  : "text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
                                "h-6 w-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              {/* Page title */}
              <div className="flex-1 flex items-center">
                <h1 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                  {getCurrentPageTitle()}
                </h1>
              </div>

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Theme toggle button */}
                <button
                  type="button"
                  className="rounded-full bg-white dark:bg-gray-800 p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={toggleTheme}
                >
                  <span className="sr-only">Toggle theme</span>
                  {theme === "dark" ? (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="Profile"
                      src="/src/assets/profile2.png"
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-300 data-[focus]:bg-gray-50 dark:data-[focus]:bg-gray-700"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10 bg-white dark:bg-gray-900">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
