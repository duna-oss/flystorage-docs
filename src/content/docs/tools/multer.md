---
title: Multer Storage
---

The `@flystorage/multer-storage` package provides an storage implementation for multer,
which enables file uploads from express to any of the supported storage solutions.

## Installation

```bash
npm install --save @flystorage/file-storage @flystorage/multer-storage
```

## Usage

```typescript
import {FileStorage} from '@flystorage/file-storage';
import {FlystorageMulterStorageEngine} from '@flystorage/multer-storage';
import multer from 'multer';

const adapter = createYourAdapter();
const fileStorage = new FileStorage(adapter);

const storage = new FlystorageMulterStorageEngine(
    uploadStorage,
    async (action, _req: express.Request, file: Express.Multer.File) => {
        if (action === 'handle') {
            return file.originalname;
        } else {
            return file.destination;
        }
    }
);

const uploader = multer({storage});
```