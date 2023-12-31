---
title: Azure Storage Blob
description: Flystorage adapter for Azure Storage Blob
---

This package contains the Flystorage adapter for Azure Storage Blob.

## Installation

Install all the required packages

```bash
npm install --save @flystorage/file-storage @flystorage/azure-storage-blob @azure/storage-blob
```

## Usage

```typescript
import {FileStorage} from '@flystorage/file-storage';
import {AzureStorageBlobStorageAdapter} from '@flystorage/azure-storage-blob';

const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_DSN!);
const container = blobService.getContainerClient('flysystem');
const adapter = new AzureStorageBlobStorageAdapter(container);
const storage = new FileStorage(adapter);
```