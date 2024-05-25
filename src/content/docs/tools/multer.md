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
import express from 'express';

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
const app = express();

app.post('/upload/document', uploader.single('document'), , (req, res, next) => {
  // req.file is the `document` file
  // req.body will hold the text fields, if there were any
});

app.listen(3000);
```

## Express examples

For more Express examples, read the [multer docs](https://www.npmjs.com/package/multer). 