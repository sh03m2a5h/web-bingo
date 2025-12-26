# Vite + React

This is a [Vite](https://vitejs.dev) project together with React.

[![Edit in CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/codesandbox/codesandbox-template-vite-react/main)

[Configuration](https://codesandbox.io/docs/projects/learn/setting-up/tasks) `.codesandbox/tasks.json` has been added to optimize it for [CodeSandbox](https://codesandbox.io/dashboard).

## Resources

- [CodeSandbox — Docs](https://codesandbox.io/docs/learn)
- [CodeSandbox — Discord](https://discord.gg/Ggarp3pX5H)
- [Vite — GitHub](https://github.com/vitejs/vite)
- [Vite — Docs](https://vitejs.dev/guide/)

## GitHub Pages デプロイ（Firebase 設定は Secrets/Variables から注入）

このプロジェクトの Firebase 設定（`apiKey` など）はリポジトリに直書きせず、ビルド時に GitHub の `Secrets and variables` から環境変数として注入します。

### 1) GitHub 側の設定

1. `Settings` → `Pages` → `Source` を **GitHub Actions** に設定
2. `Settings` → `Secrets and variables` → `Actions` で以下を設定

※ `Environments` → `github-pages` に Secrets/Variables を設定している場合でも動くように、Workflow 側で `environment: github-pages` を build/deploy 両方に指定しています。

- **Secrets**
	- `VITE_FIREBASE_API_KEY`

- **Variables**
	- `VITE_FIREBASE_AUTH_DOMAIN`
	- `VITE_FIREBASE_PROJECT_ID`
	- `VITE_FIREBASE_STORAGE_BUCKET`
	- `VITE_FIREBASE_MESSAGING_SENDER_ID`
	- `VITE_FIREBASE_APP_ID`

設定後、`main` へ push すると GitHub Actions（[.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)）が走って Pages にデプロイされます。

※ Vite の `import.meta.env` は **ビルド時に値が埋め込まれます**。デプロイ後に GitHub 側で値を変えても、再ビルド/再デプロイしない限り反映されません。

### 2) ローカル開発（.env）

リポジトリ直下に `.env` を作って以下を設定してください（`.env` は git 追跡しません）。

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

起動:

```bash
pnpm install
pnpm dev
```
