import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#why", label: "为什么" },
  { href: "/#features", label: "能力" },
  { href: "/#stack", label: "组件" },
  { href: "/#quickstart", label: "快速开始" },
  { href: "/#hardware", label: "硬件" },
  { href: "/#extend", label: "扩展" },
  { href: "/#docs", label: "文档" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "glass border-b border-line"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="主导航"
        className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5 sm:px-8"
      >
        <a href="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl font-bold tracking-tight">
            ODS
          </span>
          <span className="hidden text-xs text-faint transition-colors group-hover:text-muted sm:block">
            Osmantic 部署系统
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/Osmantic/ODS"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto hidden rounded-full border border-line bg-base-800/70 px-4 py-2 font-mono text-xs tracking-wide text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-amber/60 hover:text-amber active:scale-[0.98] lg:ml-0 lg:block"
        >
          GitHub
        </a>

        <button
          type="button"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-amber/60 lg:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-opacity duration-200 ${
                open ? "top-1.5 opacity-0" : "top-1.5 opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-base-950/95 px-5 pb-8 pt-4 lg:hidden"
        >
          <ul className="flex flex-col divide-y divide-line">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-base text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/Osmantic/ODS"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center rounded-full border border-line px-4 py-3 font-mono text-sm text-amber"
          >
            在 GitHub 上查看
          </a>
        </div>
      )}
    </header>
  );
}
