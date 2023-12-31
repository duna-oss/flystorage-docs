---
title: Setup
description: Setting up Flystorage
---

Flystorage is distributed through NPM. Install it using your favourite package manager.

```bash
npm install --save @flystorage/file-storage
```

Flystorage user the _adapter pattern_ to encapsulate storage. It's important not to interact
with an adapter directly. Instead, always interact with the main FileStorage class.

To get started install any of the pre-built adapters or build one yourself.
