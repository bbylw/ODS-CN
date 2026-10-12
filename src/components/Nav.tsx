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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "glass border-b border-line shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="主导航"
        className="mx-auto flex h-16 max-w-350 items-center gap-6 px-5 sm:px-8"
      >
        <a href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-2 w-2">
            <span className="animate-live-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-moss" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-amber">
            ODS
          </span>
          <span className="hidden font-mono text-[11px] text-faint tracking-wider transition-colors group-hover:text-muted sm:block">
            Osmantic 部署系统
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-1.5 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] text-muted transition-all duration-150 hover:bg-base-800/70 hover:text-ink active:scale-[0.97]"
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
          aria-label="在 GitHub 上查看 ODS 仓库"
          className="btn-tactile ml-auto hidden items-center gap-2 rounded-full border border-line bg-base-800/80 px-4 py-1.5 font-mono text-xs text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-amber/50 hover:text-amber lg:ml-0 lg:inline-flex"
        >
          <svg
            className="h-3.5 w-3.5 fill-current"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span>GitHub</span>
        </a>

        <button
          type="button"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="btn-tactile ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink hover:border-amber/60 lg:hidden"
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
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-base-950/98 backdrop-blur-xl px-5 pb-8 pt-4 lg:hidden"
        >
          <ul className="flex flex-col divide-y divide-line">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-base text-muted transition-colors hover:text-ink active:text-amber"
                >
                  {link.label}
                  <span className="font-mono text-xs text-faint">→</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/Osmantic/ODS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-line bg-base-900/80 px-4 py-3 font-mono text-sm text-amber"
          >
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>在 GitHub 上查看</span>
          </a>
        </div>
      )}
    </header>
  );
}
