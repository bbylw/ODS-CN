## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Preview

预览与 dev 服务器一律通过 **portless** 提供稳定 HTTPS 命名 URL，禁止使用裸 `localhost:<port>`：

```bash
portless ods-cn astro dev     # 显式命名；或零配置 portless（运行 dev script）
```

- 启动后以 `portless list` 输出的实际 URL 为准（名称可能被 git worktree 等转换），不要凭猜测
- 本机为 Windows：验证用 `curl.exe -I --ssl-no-revoke https://ods-cn.localhost`（Schannel 对本地 CA 需要 `--ssl-no-revoke`）
- 完整规范见用户级 skill：`C:\Users\bbylw\.agents\skills\portless\SKILL.md`

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
