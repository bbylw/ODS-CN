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
      await navigator.clipboard.writeText(tab.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="panel overflow-hidden">
      <div
        role="tablist"
        aria-label="安装方式"
        className="flex flex-wrap gap-1 border-b border-line bg-base-950/50 p-1.5"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-3.5 py-2 font-mono text-[11px] tracking-wide transition-all duration-200 active:scale-[0.98] ${
              t.id === active
                ? "bg-amber/15 text-amber shadow-[inset_0_1px_0_rgba(224,162,74,0.25)]"
                : "text-faint hover:text-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={copy}
          className="absolute right-3 top-3 z-10 rounded-full border border-line bg-base-800/90 px-3 py-1.5 font-mono text-[11px] text-muted transition-all duration-200 hover:border-amber/60 hover:text-amber active:scale-[0.98]"
        >
          {copied ? "已复制 ✓" : "复制"}
        </button>
        <pre className="overflow-x-auto px-5 pb-5 pt-4 text-[12.5px] leading-[1.85] sm:text-[13px]">
          <code className="font-mono text-ink/90">
            <span className="select-none text-faint">$ </span>
            {tab.code}
          </code>
        </pre>
      </div>

      <p
        aria-live="polite"
        className="border-t border-line bg-base-950/40 px-5 py-3.5 text-[13px] leading-relaxed text-muted"
      >
        {tab.hint}
      </p>
    </div>
  );
}
