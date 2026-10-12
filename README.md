<div align="center">

# ODS V3 预发布版

**Osmantic 部署系统**

**在 V3 正式发布前的公开测试与打磨阶段。**

<p align="center">
  <a href="https://osmantic.com" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/Osmantic/ODS/raw/main/ods/docs/images/osmantic-lockup.png" alt="Osmantic" width="800">
  </a>
</p>

**把你的 PC、Mac 或 Linux 机器变成一台私有 AI 服务器。**

AI 服务器与家庭实验室的搭建，正迅速成为一件已被解决的问题。
对所有人来说，它本该就是这个感觉。

[![License: Apache 2.0 + Pixel ODS-only](https://img.shields.io/badge/License-Apache%202.0%20%2B%20Pixel%20ODS--only-blue.svg)](https://github.com/Osmantic/ODS/blob/main/ods/LICENSING.md)
[![GitHub Stars](https://img.shields.io/github/stars/Osmantic/ODS)](https://github.com/Osmantic/ODS/stargazers)
[![ODS V3 Pre-Release](https://img.shields.io/badge/ODS-V3%20Pre--Release-orange)](https://github.com/Osmantic/ODS/blob/main/ods/docs/RELEASE_NOTES_3.0.0.md)
[![Release](https://img.shields.io/badge/release-v3.0.0-blue)](https://github.com/Osmantic/ODS/releases/tag/v3.0.0)

[![观看演示](https://img.shields.io/badge/Demo-在%20YouTube%20上观看-red?logo=youtube)](https://youtu.be/nO8xFNHX-HA)

</div>

ODS 会安装并串联起你在本地运行 AI 所需的全部组件，因此你不必再手动拼装 Ollama、Open WebUI、n8n、ComfyUI 以及各种隐私工具：

- **本地模型推理** — 在你自己的硬件上运行开源模型
- **ChatGPT 风格的 Web 界面** — 在任意浏览器中与你的模型对话
- **控制台（Dashboard）** — 从一处集中管理模型、服务、安装、GPU 状态与扩展
- **语音、智能体与工作流** — 构建能够听、说、调用工具并真正完成工作的自动化
- **RAG 与搜索** — 连接本地文档、私有搜索与检索工作流
- **图像生成** — 运行本地图像工具，而不把提示词发往任何托管 API
- **隐私与运维** — 将服务鉴权、密钥、可观测性与诊断集中在一个本地技术栈中

无需上云。无需订阅。推理过程、聊天记录与你的文件都留在你自己的机器上，ODS 不收集任何遥测数据。默认情况下，它只在以下情况联网：下载模型与容器镜像、到 GitHub 检查 ODS 更新，以及运行 Portal 智能体为你发起的网络搜索；[常见问题（FAQ）](https://github.com/Osmantic/ODS/blob/main/ods/FAQ.md#is-my-data-private)对每一条都做了说明，并告诉你如何关闭。当你需要时，云端与混合 API 模式是可选的。

> **状态：V3 预发布。** 下面的安装器安装的是当前的 `main`
> 分支，它会持续接收修复，但并非已签名的发布版本；
> [已验证安装器预览](https://github.com/Osmantic/ODS/blob/main/ods/docs/VERIFIED_INSTALL_PREVIEW.md)
> 会保持独立，直到某个已签名的版本通过端到端测试。
> 已有的安装可以通过重新运行安装器来获取代码修复
> （[方法](https://github.com/Osmantic/ODS/blob/main/ods/SECURITY.md#updating-an-existing-installation)）；`ods update` 只刷新
> 容器镜像。`v3.0.0` 是最新发布的源代码版本；在
> [安全公告](https://github.com/Osmantic/ODS/security/advisories)
> 中锁定该版本之前请谨慎。已知限制与验证
> 状态见：[V3 发布说明](https://github.com/Osmantic/ODS/blob/main/ods/docs/RELEASE_NOTES_3.0.0.md)、
> [发布验证](https://github.com/Osmantic/ODS/blob/main/ods/docs/RELEASE_VALIDATION.md)、
> [发布渠道](https://github.com/Osmantic/ODS/blob/main/ods/docs/RELEASE_CHANNELS.md) 以及
> [安装器信任](https://github.com/Osmantic/ODS/blob/main/ods/docs/INSTALLER_TRUST.md)。

仓库根目录放置本 README、安装器、安全策略与
CI 工作流；`ods/` 才是产品本身：服务、安装器各阶段、compose 文件、
控制台、CLI、测试与运维文档。

## 快速开始

选择你的系统，复制对应代码块，在普通终端中运行即可。ODS 会安装整个技术栈，为你的硬件挑选一个模型，启动各项服务，并为你提供本地 Web 界面。

**Linux 或 macOS**

```bash
curl -fsSL https://install.osmantic.com/ods.sh | bash
```

**Windows PowerShell** — 由引导流程完成 Ubuntu/WSL2 安装，并集成 Pixel/Portal

```powershell
& {
    $ErrorActionPreference = 'Stop'
    $ProgressPreference = 'SilentlyContinue'
    $odsSrc = Join-Path $env:TEMP ('ods-install-' + [guid]::NewGuid().ToString('N'))
    $odsZip = Join-Path $odsSrc 'ods-main.zip'
    New-Item -ItemType Directory -Path $odsSrc | Out-Null
    Invoke-WebRequest -UseBasicParsing 'https://github.com/Osmantic/ODS/archive/refs/heads/main.zip' -OutFile $odsZip
    Expand-Archive -LiteralPath $odsZip -DestinationPath $odsSrc
    $odsEntry = Join-Path $odsSrc 'ODS-main\install.ps1'
    if (-not (Test-Path -LiteralPath $odsEntry -PathType Leaf)) { throw 'The downloaded archive does not contain the ODS installer.' }
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    & $odsEntry
}
```

Linux 与 macOS：必须先安装并运行 Docker。

Windows：打开一个**普通的 PowerShell 窗口**（不要“以管理员身份运行”），粘贴上面的代码块，并按提示回答。在此之前无需安装其他任何东西。安装器会：

1. 检查可用磁盘空间（40 GB）以及硬件虚拟化是否已开启。
2. 提供选项以启用 WSL2，并用 winget 安装 Docker Desktop。Windows 会请求管理员权限，然后**重启一次**；你重新登录后，安装会自动继续。
3. 提供选项下载 Ubuntu 24.04，并在 PowerShell 中向你询问新的 Ubuntu 用户名与密码。
4. 启动 Docker Desktop，并检查它是否已连接到 Ubuntu。若未连接，会提示你在 Docker Desktop 中开启那一个设置，一旦连通便立即继续。
5. 在 Ubuntu 内以 **`--pixel --no-hermes`** 安装 ODS。再次运行时不会带上 `--no-hermes`，因此你从扩展中额外添加的 Hermes 会保留。当 Ubuntu 询问你的 `[sudo] password` 时，输入 Ubuntu 密码即可；输入时屏幕上没有任何显示。
6. 验证 Pixel 与 Portal，然后在你的浏览器中打开 Portal，并向桌面添加一个 **ODS Portal** 快捷方式。

每一步在更改任何内容前都会先征求你的同意；若无法完成，会停下来并给出处理说明；修复后重新运行同一条命令即可。不存在回退到 Hermes 或原生 Windows 安装器的机制。在 NVIDIA 机器上，请先将 Windows 驱动更新到 570 或更高版本。若要使用已有的发行版，可追加 `-Distro <name>`（名称取自 `wsl -l -v`）。

已有的原生 Windows 安装不会被自动迁移或删除；在切换之前，请先阅读 [Windows 快速开始](https://github.com/Osmantic/ODS/blob/main/ods/docs/WINDOWS-QUICKSTART.md#existing-native-windows-installations)。

若另一台设备运行着你的 ODS 模型网关，而此 Windows PC 只需要
做图像生成，可使用 [独立的 ComfyUI 安装器](https://github.com/Osmantic/ODS/blob/main/ods/docs/WINDOWS-COMFYUI-STANDALONE.md)。
它会把自身的 Docker 项目与数据，同完整的 ODS 安装相互隔离。

托管的 Linux/macOS 端点是仓库 `main` 分支当前引导脚本的代理。
经审核的合并会在边缘缓存刷新后自动到达该端点。`ODS_REF` 用于选择
一个兼容的仓库检出。详见
[安装器信任](https://github.com/Osmantic/ODS/blob/main/ods/docs/INSTALLER_TRUST.md)，
以检查该脚本，或手动安装某个经过审计的提交；目前尚无任何发布版本
达到已验证渠道的要求。

Windows 用户不应从 PowerShell 运行那条 `curl ... | bash` 命令。上面的 PowerShell 代码块会下载公开的 ODS 源代码 ZIP，并将安装委托给 Ubuntu/WSL2。更多细节见 [Windows 快速开始](https://github.com/Osmantic/ODS/blob/main/ods/docs/WINDOWS-QUICKSTART.md)。

安装器成功完成后，Portal 会在 **http://localhost:3001/pixel** 打开（Windows 安装器会为你打开，并打印确切的 URL）。**http://localhost:3000** 是 Open WebUI，一个独立的界面。请验证 Portal 可用并发送一条消息；仅仅是加载出一个控制台，并不代表 Pixel 已就绪。若安装失败或 Portal 出现异常，请先按 [Windows 快速开始的检查项](https://github.com/Osmantic/ODS/blob/main/ods/docs/WINDOWS-QUICKSTART.md#verify-portalpixel) 处理，再继续。

WSL 的 GPU 访问必须单独检查。NVIDIA 需要受支持的 Windows 驱动，以及 WSL/Docker 内部的 GPU 访问权限。在 AMD 上，Windows 安装流程会通过绑定到所选 WSL 安装的 ODS 任务，运行 llama.cpp 的 `llama-server.exe`（Vulkan）。一旦该归属关系得到验证，控制台中的 **Models（模型）** 即支持兼容 GGUF 的下载（含 Hugging Face）、激活、上下文变更以及卸载/恢复。由安装流程未管理的模型服务器，会保持外部托管状态。若某次安装的 ODS 任务曾运行 Lemonade Server，当安装器再次运行时，会迁移到 llama.cpp；详见 [Windows 快速开始](https://github.com/Osmantic/ODS/blob/main/ods/docs/WINDOWS-QUICKSTART.md#manage-amd-models-from-portal)、[WSL2 GPU 指南](https://github.com/Osmantic/ODS/blob/main/ods/docs/WINDOWS-WSL2-GPU-GUIDE.md) 以及 [AMD GPU 现已可运行于 llama.cpp](https://github.com/Osmantic/ODS/blob/main/ods/docs/MIGRATION-LEMONADE-TO-LLAMACPP.md)。

对于 Linux、macOS 或推荐的 Windows/WSL 安装，请从对应的 Linux/macOS 终端卸载（在 Windows 上打开 Ubuntu）：

```bash
cd ~/ods
./ods-uninstall.sh --force
```

仅针对**原生 Windows** 安装：

```powershell
$installDir = "$env:USERPROFILE\ods"
cd $installDir
.\ods.ps1 uninstall --force
```

Windows 恢复提示：若运行时目录不完整且 `.\ods.ps1` 已缺失，可从源代码检出中运行同一条命令：`.\ods\installers\windows\ods.ps1 uninstall --force`。它会在移除资源前，先验证容器的 Compose 安装目录。共享的 `ods` 项目名称，并不授权移除另一个 Windows 或 WSL 安装。没有任何可验证归属方的未挂载卷会被保留，并附上标明该资源的错误提示；`--force` 不会跳过这一检查。

> **API 端点：** Linux 的 Docker 安装默认在 **http://localhost:11434** 暴露 llama-server（`OLLAMA_PORT`），而容器内部使用 `llama-server:8080`。macOS 原生 Metal 与 Windows 的 AMD `llama-server.exe` 使用 **http://localhost:8080**（除非被覆盖）；Windows 服务端需要其 API 密钥。Open WebUI 仍位于 **http://localhost:3000**。

> **没有 GPU？** ODS 也能以云端模式运行——同样是一整套技术栈，只是用 OpenAI/Anthropic/Together 的 API 代替本地推理：
> ```bash
> ./install.sh --cloud
> ```

> **端口冲突？** 每个端口都可以通过环境变量配置。完整列表见 [`.env.example`](https://github.com/Osmantic/ODS/blob/main/ods/.env.example)，也可以在安装时覆盖：
> ```bash
> WEBUI_PORT=9090 ./install.sh
> ```

**第一次接触？** 阅读 [友好指南](https://github.com/Osmantic/ODS/blob/main/ods/docs/HOW-ODS-SERVER-WORKS.md)，或[收听音频版本](https://open.spotify.com/episode/40MvqJ41bC8cEgvUyOyE3K)——它会完整讲解 ODS 是什么、如何运作，以及如何把它变成你自己的东西。无需任何技术背景。

---

## 一览

| 问题 | 回答 |
|----------|--------|
| **它是什么？** | 一套运行在你自己硬件上的本地 AI 服务器技术栈，配有 Linux/macOS 一键安装器，以及面向 Windows 的 PowerShell 安装器。 |
| **它面向谁？** | 希望在家中、实验室或工作站上拥有私有 AI，又不想手工串联十几个服务的人。 |
| **我能得到什么？** | 本地推理、Open WebUI 聊天、控制台、语音、智能体、工作流、RAG、搜索、图像生成、隐私工具、可观测性与开发者工具。 |
| **它运行在哪些平台上？** | Linux、带 WSL2/Docker Desktop 的 Windows，以及 macOS Apple Silicon。 |
| **必须上云吗？** | 不必。本地模式是默认项；云端与混合 API 模式均为可选。 |

| 如果你已经了解… | ODS 额外提供… |
|----------------|----------------------|
| **Ollama / llama.cpp** | 周边的服务器技术栈：聊天、控制台、语音、RAG、工作流、智能体、隐私与服务管理。 |
| **Open WebUI** | 围绕 Open WebUI 的一整套安装与控制平面，外加预先接好的本地服务。 |
| **AnythingLLM** | 超越 RAG 的更广义本地 AI 一体机行为：推理、聊天、语音、工作流、图像生成与运维。 |
| **n8n 自托管 AI 入门套件** | 工作流自动化，作为更大的私有 AI 服务器中的一部分。 |

---

> **当前平台支持情况**
>
> | 平台 | 状态 |
> |----------|--------|
> | **Linux**（NVIDIA + AMD Strix Halo） | **已支持** — 硬件与发行版限制见支持矩阵 |
> | **Linux + Intel Arc**（SYCL） | **实验性 / C 级** — 验证因硬件而异 |
> | **Windows**（NVIDIA + AMD） | **已支持** — 现在即可安装运行 |
> | **macOS**（Apple Silicon） | **已支持** — 现在即可安装运行 |
>
> **Linux 发行版：** CI 会在 Ubuntu 26.04/24.04/22.04、Debian 12、Linux Mint 21.3、Fedora 41、Rocky Linux 9、Arch Linux、Manjaro、CachyOS 以及 openSUSE Tumbleweed 上，对包管理器检测与安装器前置条件进行冒烟测试。更广泛的安装覆盖，在维护者的发行版实验室与硬件机群中进行，详见 [验证矩阵](https://github.com/Osmantic/ODS/blob/main/ods/docs/VALIDATION-MATRIX.md)。在 openSUSE 上，安装器会从发行版自带的软件包中安装 Docker。若你的发行版无法工作，请[提交 issue](https://github.com/Osmantic/ODS/issues)。
>
> **发布验证：** 涉及运行的变更，会经过一道发布级别的闸口，
> 覆盖零前置条件的引导、干净安装、产品行为、完整模型能力、
> 生命周期恢复以及用户级验收（User Green）。详见
> [发布验证](https://github.com/Osmantic/ODS/blob/main/ods/docs/RELEASE_VALIDATION.md) 与
> [验证矩阵](https://github.com/Osmantic/ODS/blob/main/ods/docs/VALIDATION-MATRIX.md)。
>
> **Windows：** 需要带 WSL2 后端的 Docker Desktop。NVIDIA GPU 使用 Docker 的 GPU 透传；AMD Strix Halo 走 Windows 安装器与支持矩阵中记录的特定平台加速路径。
>
> **macOS：** 需要 Apple Silicon（M1+）与 Docker Desktop。llama-server 使用原生 Metal 加速；Portal 的网关与受管主机辅助进程同样以原生方式运行。界面、入口、沙箱及支撑服务则在 Docker 中运行。详见 [macOS 快速开始](https://github.com/Osmantic/ODS/blob/main/ods/docs/MACOS-QUICKSTART.md)。
>
> 平台支持声明见 [支持矩阵](https://github.com/Osmantic/ODS/blob/main/ods/docs/SUPPORT-MATRIX.md)，
> 而用于验证这些声明的分层测试面，见 [验证矩阵](https://github.com/Osmantic/ODS/blob/main/ods/docs/VALIDATION-MATRIX.md)。

---

## 为什么选择 ODS？

少数几家公司掌控着全球绝大部分的 AI 流量——以及随之而来的你的数据、你的成本与你的可用性。你发往某个中心化服务商的每一条查询，都是一份你并不拥有的商业情报，跑在你无法控制的基础设施上，按你无法协商的条款计价。

如果 AI 正成为关键基础设施，它就不该被租用。自托管本地 AI 应当是一项与生俱来的人权，而不是一种职业选择。

因为运行你自己的 AI，本不该需要先拿到一个计算机学位，再花一整个周末去调试 CUDA 驱动。时至今日，搭建本地 AI 意味着把十几个项目缝合在一起，从零开始编写 Docker 配置，并祈祷它们彼此能对话。大多数人最终放弃，重新回去给 OpenAI 付费。

我们打造 ODS，就是为了让你可以不必如此。

- **一条命令** — 检测你的 GPU，挑选合适的模型，生成凭证，启动一切
- **尽早聊天** — 引导模式会在核心服务一上线时，就先启动一个小型模型，而你的完整模型则在后台下载
- **预先接好的服务** — 默认的 Core 安装会给你本地推理、控制台与一个聊天界面（在受支持的主机上是 Portal 智能体，其他环境则是 Open WebUI）；你可以从安装器菜单或扩展页中添加语音、工作流、搜索、RAG、图像生成、可观测性与开发者工具，它们彼此之间已经接好
- **完全可魔改** — 每个服务都是一个扩展。丢进一个文件夹，运行 `ods enable`，就完成了

<details>
<summary><b>手动安装（Linux）</b></summary>

```bash
git clone https://github.com/Osmantic/ODS.git
cd ODS/ods
./install.sh
```

</details>

<details>
<summary><b>Windows（PowerShell）</b></summary>

当 WSL2、Ubuntu 与 [Docker Desktop](https://www.docker.com/products/docker-desktop/) 缺失时，安装器会代为准备；在此之前无需安装任何东西。

打开一个普通的 **PowerShell** 会话（不要“以管理员身份运行”），然后运行：

```powershell
$ProgressPreference = "SilentlyContinue"
$odsSrc = Join-Path $env:TEMP ("ods-install-" + [guid]::NewGuid().ToString("N"))
$odsZip = Join-Path $odsSrc "ods-main.zip"
New-Item -ItemType Directory -Path $odsSrc | Out-Null
Invoke-WebRequest "https://github.com/Osmantic/ODS/archive/refs/heads/main.zip" -OutFile $odsZip
Expand-Archive -LiteralPath $odsZip -DestinationPath $odsSrc -Force
cd (Get-ChildItem -LiteralPath $odsSrc -Directory | Select-Object -First 1).FullName
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\install.ps1
```

> `Set-ExecutionPolicy` 命令允许安装器脚本在当前会话中运行。它不会改变你系统级的策略。
> 不建议以管理员身份运行安装器，因为 `.opencode`、`data/`、`.env` 这类用户级路径，可能会被创建为管理员所有的权限。

该命令会引导 WSL/Ubuntu 的准备过程，并在安装 Pixel 之前检查 systemd 与 Docker 的集成情况。详见 [Windows 快速开始](https://github.com/Osmantic/ODS/blob/main/ods/docs/WINDOWS-QUICKSTART.md)。运行时通常位于 Ubuntu 内的 `~/ods`；可在那里用 `ods status` 管理（或从 `~/ods` 运行 `./ods-cli status`）。在打印出的 URL 处打开 Portal 控制台（通常为 http://localhost:3001）。原生的 Windows `ods.ps1` 命令不管理这个 Linux 运行时。

</details>

<details>
<summary><b>macOS（Apple Silicon）</b></summary>

需要 Apple Silicon（M1+）与 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。
**请先安装 Docker Desktop，并确保在开始之前它已处于运行状态。**

```bash
git clone https://github.com/Osmantic/ODS.git ~/src/ODS
cd ~/src/ODS/ods
./install.sh
```

请将克隆目录放在你主文件夹的 `ods` 路径之外：macOS 磁盘不区分大小写，因此在 `~/ODS` 处的克隆，与默认安装目录 `~/ods` 是同一个文件夹。

安装器会检测你的芯片，为你的统一内存挑选合适的模型，以 Metal 加速原生启动 llama-server，并在 Docker 中启动其余所有服务。用 `./ods-macos.sh status` 进行管理。

详情见 [macOS 快速开始](https://github.com/Osmantic/ODS/blob/main/ods/docs/MACOS-QUICKSTART.md)。

</details>

---

## 盒子里有什么

### 聊天与推理
- **Open WebUI** — 功能完整的聊天界面，含对话历史、Web 搜索、文档上传，以及 [30+ 种语言](https://docs.openwebui.com)
- **llama-server** — 高性能 LLM 推理，支持连续批处理，会为你的 GPU 自动选择；Linux Docker 主机的 API 默认位于 `localhost:11434`，原生 macOS/Windows 路径使用 `localhost:8080`，容器内部 API 运行在 `8080`
- **LiteLLM** — 支持本地/云端/混合模式的 API 网关
- **TEI Embeddings** — 用于 RAG 与搜索工作流文本嵌入服务

### 语音
- **Whisper** — 语音转文本
- **Kokoro** — 文本转语音

### 智能体与自动化
- **Portal** — 捆绑的核心对话助手，见于 Apple Silicon macOS，以及合格的 Ubuntu 24.04/26.04 或 Debian 12 的 systemd 主机，包括通过 Linux 安装器完成的合格 WSL2 安装。无需私有仓库访问权限，也无需单独的许可证标志；可在控制台中，以及通过兼容的 Open WebUI 模型路由使用。原生 PowerShell 安装器不会安装 Portal 主机运行时。
- **Hermes Agent** — 独立的通用智能体，与 Portal 并存；包含记忆、技能，以及一个带可选所有者卡片门控的代理；默认直接访问
- **n8n** — 带 400+ 集成（Slack、邮件、数据库、API）的工作流自动化
- **APE** — 用于审计与治理自主工具调用的智能体策略引擎（Agent Policy Engine）
- **OpenCode** — 接入本地技术栈的浏览器版 AI 编程助手
- **Memory Shepherd** — 用于智能体记忆生命周期管理的宿主/systemd 辅助进程

### 知识与搜索
- **Qdrant** — 用于检索增强生成（RAG）的向量数据库
- **SearXNG** — 自托管的 Web 搜索（无追踪）
- **Perplexica** — 深度研究引擎
- **Brave Search** — 可选的付费 Brave Search API 集成

### 创意
- **ComfyUI** — 基于节点的图像生成

### 隐私与运维
- **Privacy Shield** — 用于 API 调用的 PII 擦除代理
- **Dashboard（控制台）** — 实时 GPU 指标、服务健康度、模型管理
- **Dashboard API（控制台 API）** — 控制台背后的服务健康、安装、状态、指标与管理 API
- **Token Spy** — 面向本地与代理 LLM 流量的令牌用量监视器
- **Langfuse** — 可选的 LLM 可观测性与链路追踪

---

## 硬件自动检测

安装器会检测你的 GPU，并首先分配一个确定性的硬件层级。随后 Linux 与 macOS 运行带版本的目录选择器（`ods/scripts/select-model.py`），而 Windows 则使用 `ods/installers/windows/lib/tier-map.ps1` 中的 PowerShell 目录选择器；二者都读取 `ods/config/model-library.json`，以在检测到的内存区间内挑选可安装的最佳 GGUF。最终选择会被写入 `.env` 中的 `LLM_MODEL`、`GGUF_FILE`、`MAX_CONTEXT` 与 `MODEL_RECOMMENDATION_*`。

`MODEL_PROFILE=qwen` 是默认的目录配置文件。`MODEL_PROFILE=gemma4` 会在可用处强制使用 Gemma 4，`MODEL_PROFILE=auto` 则会在 NVIDIA、AMD Strix Halo、Apple Silicon 与 Intel Arc 层级上使用 Gemma 4。用 `MODEL_PROFILE=gemma4 ./install.sh` 覆盖模型族。安装后你可以随时切换模型（详见[切换模型](#切换模型)）。

下表是目录选择器在当前默认配置文件、以及 64K 上下文下限（`python ods/scripts/select-model.py --profile qwen --installable-only --min-context 65536 …`）下，为常见硬件所挑选的结果。确切的挑选结果会因检测到的显存/内存、主机架构与已有下载而异。请在首次启动后，在你自己的机器上实测吞吐。

### NVIDIA

| 显存 | 默认选择 | 上下文 | 示例硬件 |
|--------|--------------|---------|------------------|
| 8–16 GB 显存 | Qwen3.5 9B (Q4_K_M) | 64K | RTX 4060、RTX 3060 12GB、RTX 4070 级别 |
| 24–32 GB 显存 | Qwen3.5 27B (Q4_K_M) | 64K | RTX 4090、RTX 5090 |
| 48 GB 显存 | Qwen3.6 35B-A3B (UD-Q4_K_M) | 128K | RTX 6000 Ada、L40S |
| 96 GB+ 显存 (x86_64) | Qwen3 Coder Next (Q4_K_M) | 128K | RTX PRO 6000、多 GPU |
| 128 GB 统一内存 (arm64) | Qwen3.6 35B-A3B (UD-Q4_K_M) | 128K | DGX Spark / GB10 |

### AMD Strix Halo（统一内存）

| 内存 | 默认选择 | 上下文 | 硬件 |
|--------|--------------|---------|----------|
| 64–128 GB 统一内存 | Qwen3.6 35B-A3B (UD-Q4_K_M) | 128K | Ryzen AI MAX+ 395 |

选择器会让统一内存主机避开 Qwen3 Coder Next，因为在这些后端上存在已记录的正确性问题的。

### Apple Silicon（统一内存，Metal）

| 内存 | 默认选择 | 上下文 | 示例硬件 |
|--------|--------------|---------|------------------|
| 8 GB | NVIDIA Nemotron3 Nano 4B (Q4_K_M) | 64K | M1/M2 基础款 |
| 16–36 GB | Qwen3.5 9B (Q4_K_M) | 64K | M4 Mac mini、M3 Pro |
| 48 GB+ | Qwen3.6 35B-A3B (UD-Q4_K_M) | 128K | M4 Pro/Max、Mac Studio |

### 仅 CPU

| 系统内存 | 默认选择 | 上下文 |
|------------|--------------|---------|
| 8–12 GB | Qwen3.5 2B (Q4_K_M) | 64K |
| 16–20 GB | Qwen3.5 4B (Q4_K_M) | 64K |
| 24 GB+ | Qwen3.5 9B (Q4_K_M) | 64K |

### Intel Arc（Linux，SYCL）

Intel Arc 属于实验性（C 级）。硬件检测目前还无法识别 Arc GPU，因此请自行传入层级：对 6–8 GB 的显卡用 `./install.sh --tier ARC_LITE`，对 16 GB 的显卡用 `--tier ARC`。详见 [Intel Arc 指南](https://github.com/Osmantic/ODS/blob/main/ods/docs/INTEL-ARC-GUIDE.md)。

---

## 引导模式

ODS 默认使用引导模式，这样你可以在大模型下载完成之前就开始使用：

1. 安装器下载 Qwen3.5 2B（约 1.3 GB）并启动它。
2. 核心服务一上线，你就可以开始聊天。
3. 适合你硬件的完整模型在后台下载。
4. 下载通过校验后，ODS 会以完整模型重启模型服务器。重启期间在途的请求需要重试。

引导模型以 64K 上下文窗口启动，以便智能体在首个会话中就能工作。交换完成后，ODS 会恢复完整模型的上下文目标。

跳过引导：`./install.sh --no-bootstrap`

---

## 切换模型

安装器会为你的硬件挑选一个模型，但你随时可以切换。推荐的方式是 **控制台 → Models（模型）**：它会列出适配你硬件的模型，以校验和验证方式下载并加载它们。若某个模型启动失败，ODS 会恢复为上一个模型。

命令行方式：

```bash
ods model current              # 现在正在运行的是哪个？
```

已经有一个想用的 GGUF 了？把单个 `.gguf` 文件放进
`data/models/`，然后打开 控制台 → Models（模型），加载这个本地条目。对于
无界面的维护操作，你也可以改为在 `.env` 中设置 `GGUF_FILE` 与 `LLM_MODEL`，
然后重启模型服务器：

```bash
ods restart llm
```

手动修改 `.env` 不具备自动回滚能力。若模型加载失败，
请把之前的值设回去，再重启一次。

---

## 可扩展性

ODS 的设计就是用来魔改的。每个服务都是一个扩展——一个带有 `manifest.yaml` 与 `compose.yaml` 的文件夹。控制台、CLI、健康检查与 compose 技术栈都会自动发现这些扩展。

```
extensions/services/
  my-service/
    manifest.yaml      # 元数据：名称、端口、健康端点、GPU 后端
    compose.yaml       # Docker Compose 片段（自动合并进技术栈）
```

```bash
ods enable my-service     # 启用它
ods disable my-service    # 禁用它
ods list                  # 查看全部
```

安装器本身也是模块化的——41 个库模块、一个共享的服务注册表，以及 14 个有序的阶段文件。想新增一个硬件层级、替换某个默认模型，或跳过某个阶段？请先从安装器架构图入手，这样你就能同步更新 Linux、macOS、Windows、升级与主机代理的编写者。

[完整扩展指南](https://github.com/Osmantic/ODS/blob/main/ods/docs/EXTENSIONS.md) | [安装器架构](https://github.com/Osmantic/ODS/blob/main/ods/docs/INSTALLER-ARCHITECTURE.md)

---

## ods-cli

`ods` CLI 管理你的整个技术栈：

```bash
ods status                # 健康检查 + GPU 状态
ods list                  # 所有服务及其状态
ods logs llm              # 跟踪日志（别名：llm、stt、tts）
ods restart [service]     # 重启一个或全部服务
ods start / stop          # 启动或停止技术栈

ods mode cloud            # 通过 LiteLLM 切换到云端 API
ods mode local            # 切回本地推理
ods mode hybrid           # 本地为主，云端兜底

ods model swap T3         # 切换到不同的硬件层级
ods enable n8n            # 启用一个扩展
ods disable whisper       # 禁用一个

ods config show           # 查看 .env（密钥已遮蔽）
ods preset save gaming    # 快照当前配置
ods preset load gaming    # 恢复它
```

---

## 它有何不同

ODS 建立在你可能已经在使用的工具之上，而不是取代它们。它安装这些工具，把它们串联起来，并给你一个统一的地方来运行它们。

| 如果你在用… | 它给你 | ODS 额外提供 |
|---|---|---|
| **Ollama、llama.cpp 或 LM Studio** | 本地模型服务 | 对硬件敏感的模型选择、周边服务，以及用于管理它们的控制台 |
| **Open WebUI** | 一个带 RAG、语音与图像生成集成的聊天界面 | 在本地推理、语音、搜索与图像服务旁边安装并配置它，并管理登录与网络暴露 |
| **LocalAI** | 一个兼容 OpenAI 的 API，含文本、音频与图像后端 | 控制台、Portal 智能体、工作流，以及围绕本地推理的一整套附加应用目录 |
| **n8n 的自托管 AI 入门套件** | 带本地模型的工作流自动化 | 工作流作为受管本地 AI 服务器的一部分 |

ODS 自身的着力点，是这些工具之外的一层：检测你的硬件、选择并验证模型、生命周期命令（安装、更新、备份、卸载），以及一个扩展目录。

---

## 文档

| | |
|---|---|
| [快速开始](https://github.com/Osmantic/ODS/blob/main/ods/QUICKSTART.md) | 带排障的逐步安装指南 |
| [文档索引](https://github.com/Osmantic/ODS/blob/main/ods/docs/README.md) | 面向运维、贡献者与审阅者的维护地图 |
| [Portal 运行时](https://github.com/Osmantic/ODS/blob/main/ods/docs/PIXEL.md) | 资格、许可证边界、架构、安装、安全、工具、回滚与资格认证 |
| [许可](https://github.com/Osmantic/ODS/blob/main/ods/LICENSING.md) | Apache-2.0 的 ODS 代码、Pixel 的仅限 ODS 授权，以及第三方声明 |
| [在 ODS 上构建](https://github.com/Osmantic/ODS/blob/main/ods/docs/BUILD-ON-ODS-SERVER.md) | 派生、自定义版本、扩展模板与下游验证 |
| [可派生性](https://github.com/Osmantic/ODS/blob/main/ods/docs/FORKABILITY.md) | 如何派生、审计、定制并独立运营 ODS |
| [维护者手册](https://github.com/Osmantic/ODS/blob/main/ods/docs/MAINTAINER_RUNBOOK.md) | 面向维护者与派生者的发布、回滚、验证与运维连续性指引 |
| [高风险变更图](https://github.com/Osmantic/ODS/blob/main/ods/docs/HIGH_RISK_CHANGE_MAP.md) | 哪些变更需要重点检查、机群验证或发布级闸口 |
| [无界面设置](https://github.com/Osmantic/ODS/blob/main/ods/docs/HEADLESS-SETUP.md) | 二维码引导、首次启动设置、AP 模式、mDNS 与本地智能体访问 |
| [支持矩阵](https://github.com/Osmantic/ODS/blob/main/ods/docs/SUPPORT-MATRIX.md) | 当前平台与 GPU 支持状态 |
| [发布验证](https://github.com/Osmantic/ODS/blob/main/ods/docs/RELEASE_VALIDATION.md) | 用户级验收闸口，以及发布级的机群/发行版验证策略 |
| [V3 发布说明](https://github.com/Osmantic/ODS/blob/main/ods/docs/RELEASE_NOTES_3.0.0.md) | 已发布的 V3 源代码身份与资格边界 |
| [2.6.0 发布说明](https://github.com/Osmantic/ODS/blob/main/ods/docs/RELEASE_NOTES_2.6.0.md) | 历史 2.6 发布说明、验证回执与已知验证边界 |
| [验证矩阵](https://github.com/Osmantic/ODS/blob/main/ods/docs/VALIDATION-MATRIX.md) | 经过脱敏的 CI、发行版实验室与真实硬件机群的发布就绪证据 |
| [验证可复现性](https://github.com/Osmantic/ODS/blob/main/ods/docs/VALIDATION_REPRODUCIBILITY.md) | 派生者与运维者如何在自己的硬件上复现验证故事 |
| [离线与时镜像](https://github.com/Osmantic/ODS/blob/main/ods/docs/OFFLINE_AND_MIRRORING.md) | 为独立运营而进行的版本钉固、镜像与发布产物留存 |
| [安装器信任](https://github.com/Osmantic/ODS/blob/main/ods/docs/INSTALLER_TRUST.md) | 先检查后安装的路径、引用钉固，以及当前的来源可信度限制 |
| [模型管理](https://github.com/Osmantic/ODS/blob/main/ods/docs/MODEL-MANAGEMENT.md) | 精选与 Hugging Face 的 GGUF 发现、已验证导入、切换与恢复 |
| [硬件指南](https://github.com/Osmantic/ODS/blob/main/ods/docs/HARDWARE-GUIDE.md) | 该买什么、层级建议 |
| [常见问题](https://github.com/Osmantic/ODS/blob/main/ods/FAQ.md) | 常见问题与配置 |
| [扩展](https://github.com/Osmantic/ODS/blob/main/ods/docs/EXTENSIONS.md) | 如何添加自定义服务 |
| [安装器架构](https://github.com/Osmantic/ODS/blob/main/ods/docs/INSTALLER-ARCHITECTURE.md) | 模块化安装器深度解析 |
| [安装器阶段契约](https://github.com/Osmantic/ODS/blob/main/ods/docs/INSTALLER_PHASE_CONTRACTS.md) | 阶段归属、幂等性、失败模式与验证预期 |
| [Compose 解析器契约](https://github.com/Osmantic/ODS/blob/main/ods/docs/COMPOSE_RESOLVER_CONTRACTS.md) | 关于 compose 层、扩展、后端、端口与模式覆盖的规则 |
| [更新日志](https://github.com/Osmantic/ODS/blob/main/ods/CHANGELOG.md) | 版本历史与发布说明 |
| [贡献](https://github.com/Osmantic/ODS/blob/main/CONTRIBUTING.md) | 如何参与贡献 |

---

## 贡献者与致谢

ODS 由一群不断壮大的贡献者共同打造，覆盖安装器、GPU 支持、控制台、安全、扩展、文档与发布验证。README 只聚焦于产品概览；长篇的致谢、上游鸣谢与贡献者历史，收录在 [CONTRIBUTORS.md](https://github.com/Osmantic/ODS/blob/main/CONTRIBUTORS.md)。

ODS 已获得本地 AI 与开发者社区的认可，包括 AMD 精选开发者（Featured Developer）认可、2026 年 5 月 AMD Lemonade 开发者挑战赛获奖者，以及在 Pennovation Works 举办的 [(Co)nnect: Philly's AI Ecosystem Summit](https://luma.com/xdwih64h) 上的专题展示。

---

## 许可证

ODS 代码采用 Apache-2.0，但捆绑的 Pixel 源代码除外，它拥有独立的
仅限 ODS 的使用与分发授权。详见 [许可](https://github.com/Osmantic/ODS/blob/main/ods/LICENSING.md)、
[许可证](https://github.com/Osmantic/ODS/blob/main/LICENSE)，以及 [Pixel 的许可证](https://github.com/Osmantic/ODS/blob/main/ods/vendor/pixel/LICENSE.md)。

---

<div align="center">

*由 [Osmantic](https://github.com/Osmantic) 与那群拒绝租用本应被拥有的东西的、不断壮大的抵抗者共同打造。*

</div>
