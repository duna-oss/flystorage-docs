---
title: Mime-type of stream
---

The `@flystorage/stream-mime-type` package provides a utility to determine the mime-type of
a stream in a non-destructive way.

Underneath, the package uses the `file-type` and `mime-types` packages to resolve the mime-type
of the stream. It first tries to determine the mime-type based on the file contents and will fall
back to resolving it based on the file extension.

## Installation

```bash
npm install --save @flystorage/stream-mime-type
```

## Usage

Resolve a mime-type:

```typescript
import {resolveMimeType} from '@flystorage/stream-mime-type';

const originalStream = fs.createReadStream(pathToFile);

const [mimetype, stream] = resolveMimeType(filename, originalStream);
```

Sampling the start of a stream:

```typescript
import {streamHead} from '@flystorage/stream-mime-type';

const originalStream = fs.createReadStream(pathToFile);

const [sample, stream] = streamHead(originalStream, sizeInBytes);
```