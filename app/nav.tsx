"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "about" },
  { href: "/cv", label: "cv" },
  { href: "/writing", label: "writing" },
  { href: "/projects", label: "projects" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 bg-neutral-50 -mx-4 -mt-4 px-4 mb-8 border-b border-neutral-200 pb-4 text-base leading-5 xs:static xs:mx-0 xs:mt-0 xs:px-0 xs:z-auto xs:mr-6 xs:border-none xs:mb-0 xs:pb-0 sm:mr-8 md:mr-12">
      {/* Mobile patti strip */}
      <div
        className="xs:hidden h-4 -mx-4 mb-3 overflow-hidden"
        style={{
          backgroundImage: "url(/patterns/kullu-patti-1.png)",
          backgroundRepeat: "repeat-x",
          backgroundSize: "48px auto",
          backgroundPosition: "left center",
        }}
      />
      <div className="flex items-baseline justify-between xs:block xs:sticky xs:top-6 sm:top-12 md:top-24">
        <Link
          href="/"
          className="font-display text-neutral-900 text-sm shrink-0 xs:block xs:mb-4 xs:text-right"
        >
          shivesh.me
        </Link>
        <menu className="flex flex-wrap justify-end gap-4 xs:flex-col xs:justify-start xs:gap-1 xs:text-right">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-active={isActive}
                  className="font-display italic text-neutral-400 transition-colors hover:text-neutral-900 data-[active=true]:text-neutral-900"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </menu>
      </div>
    </nav>
  );
}
