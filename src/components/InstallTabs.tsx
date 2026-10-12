import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  hint: string;
  lang: string;
  code: string;
};

const TABS: Tab[] = [
  {
    id: "unix",
    label: "Linux / macOS",
    hint: "需已安装并运行 Docker。一条命令完成安装、模型选择与服务启动。",
    lang: "bash",
    code: "curl -fsSL https://install.osmantic.com/ods.sh | bash",
  },
  {
    id: "windows",
    label: "Windows",
    hint: "打开普通的 PowerShell 窗口（不要“以管理员身份运行”）。无需预装任何东西，安装器会准备好 WSL2、Ubuntu 与 Docker Desktop，并需要重启一次。",
    lang: "powershell",
    code: `& {
    $ErrorActionPreference = 'Stop'
    $ProgressPreference = 'SilentlyContinue'
    $odsSrc = Join-Path $env:TEMP ('ods-install-' + [guid]::NewGuid().ToString('N'))
    $odsZip = Join-Path $odsSrc 'ods-main.zip'
    New-Item -ItemType Directory -Path $odsSrc | Out-Null
    Invoke-WebRequest -UseBasicParsing 'https://github.com/Osmantic/ODS/archive/refs/heads/main.zip' -OutFile $odsZip
    Expand-Archive -LiteralPath $odsZip -DestinationPath $odsSrc
    $odsEntry = Join-Path $odsSrc 'ODS-main\\install.ps1'
    if (-not (Test-Path -LiteralPath $odsEntry -PathType Leaf)) { throw 'The downloaded archive does not contain the ODS installer.' }
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    & $odsEntry
}`,
  },
  {
    id: "cloud",
    label: "无 GPU · 云端模式",
    hint: "同样是一整套技术栈，只是用 OpenAI / Anthropic / Together 的 API 代替本地推理。",
    lang: "bash",
    code: "./install.sh --cloud",
  },
  {
    id: "uninstall",
    label: "卸载",
    hint: "Linux、macOS 与 Windows/WSL 安装，从对应的终端执行。",
    lang: "bash",
    code: `# Linux / macOS / Windows(WSL)
cd ~/ods
./ods-uninstall.sh --force

# 仅原生 Windows 安装
cd "$env:USERPROFILE\\ods"
.\\ods.ps1 uninstall --force`,
  },
];

export default function InstallTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const [copied, setCopied] = useState(false);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  const copy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(tab.code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  const isPowerShell = tab.lang === "powershell";

  return (
    <div className="panel noise overflow-hidden shadow-[0_24px_64px_-24px_rgba(0,0,0,0.7)]">
      {/* 终端控制窗口栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-base-950/80 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80"></span>
          </div>
          <span className="h-3 w-px bg-line" aria-hidden="true"></span>
          <span className="font-mono text-[11px] text-faint tracking-wider">
            ods-installer — {isPowerShell ? "powershell.exe" : "bash"}
          </span>
        </div>

        {/* 标签切换栏 */}
        <div
          role="group"
          aria-label="选择安装系统与模式"
          className="flex flex-wrap gap-1 rounded-full border border-line/80 bg-base-900/90 p-1"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={t.id === active}
              onClick={() => setActive(t.id)}
              className={`btn-tactile rounded-full px-3 py-1 font-mono text-[11px] tracking-wide transition-all duration-150 ${
                t.id === active
                  ? "border border-amber/40 bg-amber/15 text-amber shadow-[inset_0_1px_0_rgba(224,162,74,0.3)]"
                  : "border border-transparent text-faint hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 代码预览区域 */}
      <div className="relative group bg-base-950/60" role="region" aria-label={`${tab.label}安装命令`}>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "已复制到剪贴板" : `复制${tab.label}安装命令`}
          className={`btn-tactile absolute right-3.5 top-3.5 z-10 gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
            copied
              ? "border-moss/60 bg-moss/15 text-moss shadow-[0_0_12px_rgba(147,176,118,0.25)]"
              : "border-line bg-base-800/90 text-muted hover:border-amber/50 hover:text-amber"
          }`}
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>已复制</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
              <span>复制</span>
            </>
          )}
        </button>

        <pre className="overflow-x-auto px-5 pb-5 pr-24 pt-4 text-[12.5px] leading-[1.85] sm:text-[13px]">
          <code className="font-mono text-ink/90">
            <span className="select-none font-bold text-amber/80">
              {isPowerShell ? "PS> " : "$ "}
            </span>
            {tab.code}
          </code>
        </pre>
      </div>

      {/* 底部提示说明 */}
      <div
        aria-live="polite"
        className="flex items-start gap-2.5 border-t border-line bg-base-950/40 px-5 py-3 text-[13px] leading-relaxed text-muted"
      >
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-amber/80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>
        <p>{tab.hint}</p>
      </div>
    </div>
  );
}
