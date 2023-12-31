---
title: Amazon S3
description: Flystorage adapter for AWS S3
---

This package contains the Flystorage adapter for AWS S3 using the V3 SDK.

## Installation

```bash
npm install --save @flystorage/file-storage @flystorage/aws-s3 @aws-sdk/client-s3
```

## Setup

```typescript
import {FileStorage} from '@flystorage/file-storage';
import {AwsS3StorageAdapter} from '@flystorage/aws-s3';
import {S3Client} from '@aws-sdk/client-s3';

const client = new S3Client();
const adapter = new AwsS3StorageAdapter(client, {
    bucket: '{your-bucket-name}',
    prefix: '{optional-path-prefix}',
});
const storage = new FileStorage(adapter);
```

