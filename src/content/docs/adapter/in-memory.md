---
title: In-Memory
description: Flystorage adapter that uses only memory
---

This package contains the Flystorage adapter that uses only memory.

## Installation

Install all the required packages

```bash
npm install --save @flystorage/file-storage @flystorage/in-memory
```

## Setup

```typescript
import {FileStorage} from '@flystorage/file-storage';
import {InMemoryStorageAdapter} from '@flystorage/in-memory';

const adapter = new InMemoryStorageAdapter();
const storage = new FileStorage(adapter);
```