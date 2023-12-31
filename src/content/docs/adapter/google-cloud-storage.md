---
title: Google Cloud Storage
description: Flystorage adapter for Google Cloud Storage
---

This package contains the Flystorage adapter for Google Cloud Storage.

## Installation

```bash
npm install --save @flystorage/file-storage @flystorage/google-cloud-storage @google-cloud/storage
```

## Setup

```typescript
import {FileStorage} from '@flystorage/file-storage';
import {GoogleCloudStorageStorageAdapter} from '@flystorage/google-cloud-storage';
import {Storage} from '@google-cloud/storage';

const client = new Storage();
const bucket = googleStorage.bucket('{bucket-name}}', {
    userProject: '{user-project}}',
});
const adapter = new GoogleCloudStorageStorageAdapter(bucket, {
    prefix: '{optional-path-prefix}',
});
const storage = new FileStorage(adapter);
```

## Visibility

Setting and retrieving visibility is only meaningful for legacy buckets. To use this functionality
with Flystorage, pass the legacy visibility handling to the constructor:

```typescript
import {GoogleCloudStorageStorageAdapter, LegacyVisibilityHandling} from '@flystorage/google-cloud-storage';

const adapter = new GoogleCloudStorageStorageAdapter(bucket, {
    prefix: '{optional-path-prefix}',
}, new LegacyVisibilityHandling(
    'allUsers', // acl entity, optional
    'publicRead', // acl for Visibility.PUBLIC, optional,
    'projectPrivate', // acl for Visibility.PRIVATE, optional,
));
```
