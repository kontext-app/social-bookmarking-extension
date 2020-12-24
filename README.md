# Social Bookmarking Browser Extension

## Getting Started

### Prerequisites

- node@14.x
- yarn@^1.22.10

### Install

```bash
git clone git@github.com:kontext-app/social-bookmarking-extension.git
cd social-bookmarking-extension
yarn
```

### Set Environmental Variables

Copy the distributed `.env` into a local env file with the name `.env.local` and set the variables accordingly.

### Start Development Server

```bash
yarn watch
```

### Build Production Bundle

```bash
yarn build
```

### Install Browser Extension

Currently only Firefox and Chrome are supported.

#### Firefox

1. Open the `about:debugging` page.
2. Click "This Firefox" (in newer versions of Firefox).
3. Click "Load Temporary Add-on", then select any file in your extension's directory, i.e. `<PROJECT_ROOT>/build`.

#### Chrome

1. Open `chrome://extensions` page.
2. Enable Developer Mode by clicking the toggle switch next to "Developer mode".
3. Click the "Load unpacked" button and select the extension directory, i.e. `<PROJECT_ROOT>/build`
