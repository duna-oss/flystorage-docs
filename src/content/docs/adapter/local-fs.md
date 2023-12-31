---
title: Local FS
description: Flystorage adapter for the local filesystem
---

This package contains the Flystorage adapter for the local filesystem.

## Installation

```bash
npm install --save @flystorage/file-storage @flystorage/local-fs
```

## Setup

```typescript
import {FileStorage} from '@flystorage/file-storage';
import {LocalStorageAdapter} from '@flystorage/local-fs';

const rootDirectory = resolve(process.cwd(), 'my-files');
const adapter = new LocalStorageAdapter(rootDirectory);
const storage = new FileStorage(adapter);
```