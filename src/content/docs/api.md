---
title: FileStorage API
---

## Write Files

Writing file using the `write` method:

```typescript
try {
    await storage.write('path/to/file.txt', contents);
} catch (err) {
    if (err instanceof UnableToWriteFile) {
        // handle error
    }
}
```

The `write` method accepts a `string`, `Uint8Array` (or `Buffer`), or any `Readable` stream.
When writing a file, any of the parent directories are automatically created if the underlying
storage implementation requires directories to exist.

You can specify visibility of a file when writing it:

```typescript
import {VISIBILITY} from '@flystorage/file-storage';

await storage.write('path/to/file.txt', contents, {
    visibility: Visibility.PUBLIC,
});
```

---

## Read Files

Read a file using the `read`, `readToString`, `readToBuffer`, or `readToUint8Array` methods:

```typescript
try {
    /**
     * @type {Readable}
     */
    const contents = await storage.read('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToReadFile) {
        // handle error
    }
}
```

---

## Delete Files

Delete a file using the `delete` method. Deleting files deletes files _if_ they exist. To simplify
common scenarios, there is no error when you try to delete a non-existing file.

```typescript
try {
    await storage.deleteFile('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToDeleteFile) {
        // handle error
    }
}
```

---

## Create Directories

The `createDirectory` method allows you to explicitly create directories. Some implementations do
not support the creation of actual or virtual directories, in those cases this method is a no-op.

```typescript
try {
    await storage.createDirectory('path/to/directory');
} catch (err) {
    if (err instanceof UnableToCreateDirectory) {
        // handle error
    }
}
```

In cases the filesystem requires nested directories, all encapsulated directories are implicitly
created.

---

## Delete Directories

The `deleteDirectory` method allows you to delete a directory. Any contents of the directory is
implicitly deleted as well. Only use this method if you want to delete everything contained in the
directory.

```typescript
try {
    await storage.deleteDirectory('path/to/directory');
} catch (err) {
    if (err instanceof UnableToDeleteDirectory) {
        // handle error
    }
}
```

For storage implementation that do not support directories, these implementations emulate  the
deletion of anything that matches the directory prefix. This produces consistent behaviour
across adapters.

---

## File or directory info

Use the `stat` or `statFile` methods to retrieve _stat_ information for a file or directory.

```typescript
try {
    const stat = await storage.stat('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToGetStat) {
        // handle error
    }
}
```

The `stat` method has normalised behaviour across implementation for files. Some implementations
do not support directories, in which case you'll get an error. The `statFile` method ensures the
returned stat entry is a `FileInfo` and fails if the returned stat entry is a `DirectoryInfo`.

---

## Moving Files

Files can be moved using the `moveFile` method. The _visibility_ is a file is retained, unless the
`retainVisibility` option is set to `false`. When set to `false` the default visibility is used.
You can also explicitly set the `visibility` option to set it, which prevents a call to resolve it
from the existing file. This may be beneficial for performance.


```typescript
try {
    await storage.moveFile('from/here.txt', 'to/there.txt', {
        visibility: Visibility.PRIVATE,
    });
} catch (err) {
    if (err instanceof UnableToMoveFile) {
        // handle error
    }
}
```

Moving files works reliably across implementations. Some implementation support moving of directories
this behaviour is _not_ normalised across implementations.

---

## Copying Files

Files can be copied using the `copyFile` method. The _visibility_ is a file is retained, unless the
`retainVisibility` option is set to `false`. When set to `false` the default visibility is used.
You can also explicitly set the `visibility` option to set it, which prevents a call to resolve it
from the existing file. This may be beneficial for performance.


```typescript
try {
    await storage.copyFile('from/here.txt', 'to/there.txt', {
        visibility: Visibility.PRIVATE,
    });
} catch (err) {
    if (err instanceof UnableToCopyFile) {
        // handle error
    }
}
```

---

## Change visibility

The _visibility_ of files can be changed using the `changeVisibility` method. To understand visibility,
read up on the [visibility documentation](/visibility/).

```typescript
try {
    await storage.changeVisibility('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToCopyFile) {
        // handle error
    }
}
```

Some implementations, like [Azure Storage Blob](/adapter/aws-storage-blob/), do not support visibility
and may throw an error.

---

## Determine visibility

The _visibility_ of files can be resolved using the `visibility` method. To understand visibility,
read up on the [visibility documentation](/visibility/).

```typescript
try {
    const visibility = await storage.visibility('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToGetVisibility) {
        // handle error
    }
}
```

Some implementations, like [Azure Storage Blob](/adapter/aws-storage-blob/), do not support visibility
and may throw an error.

---

## File Existence

You can check if a file exists using the `fileExists` method.


```typescript
try {
    const exists = await storage.fileExists('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToCheckFileExistence) {
        // handle error
    }
}
```

---

## Directory Existence

You can check if a directory exists using the `directoryExists` method.

```typescript
try {
    const exists = await storage.directoryExists('path/to/directory');
} catch (err) {
    if (err instanceof UnableToCheckDirectoryExistence) {
        // handle error
    }
}
```

When the underlying implementation does not support _actual_ directories, the behaviour is emulated
by using the least expensive way to list files that match the directory prefix. 

---

## List Directory Contents

The contents is a directory can be listed using the `list` method. Recursive or deep listings can be
fetched by setting the `deep` option to true.

```typescript
try {
    const listing = storage.list('path/to/directory', {deep: true});
} catch (err) {
    if (err instanceof UnableToCheckDirectoryExistence) {
        // handle error
    }
}
```

### Looping over listings

The returned directory listing is an `AsyncIterable` and can be used to loop over the contents.

```typescript
for await (const entry of listing) {
    if (entry.type === 'file' || entry.isFile) {
        // handle the file
    }
    
    if (entry.type === 'directory' || entry.isDirectory) {
        // handle a directory
    }
}
```

You can check the type of the entry using the `type` property (`file` or `directory`) or by using the
`isFile` and/or `isDirectory` properties.

### Collect a listing as an array

Listings come with convenience method to make handling them easier. The `toArray` method collects
the entries and returns them as an array.

```typescript
const listingAsArray = await listing.toArray();
```

---

```typescript
try {
    const exists = await storage.directoryExists('path/to/directory');
} catch (err) {
    if (err instanceof UnableToCheckDirectoryExistence) {
        // handle error
    }
}
```

When the underlying implementation does not support _actual_ directories, the behaviour is emulated
by using the least expensive way to list files that match the directory prefix. 

---

## Public URLs

The `publicUrl` method resolves the public URL of a file.

```typescript
try {
    const url = await storage.publicUrl('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToGetPublicUrl) {
        // handle error
    }
}
```

Implementation that do not support public URLs may throw an error. Some adapter may require you to inject
a public url resolving strategy to enable them to produce public URLs.

---

## Temporary URLs

The `temporaryUrl` method resolves a temporary URL to a file. The second argument accepts either a
`Date` or a `number` (millisecond precise timestamp) to indicate when the link should expire.

```typescript
try {
    const expiresAt = Date.now() + 24 * 60 * 1000;
    const url = await storage.temporaryUrl('path/to/file.txt', expiresAt);
} catch (err) {
    if (err instanceof UnableToGetTemporaryUrl) {
        // handle error
    }
}
```

Implementation that do not support temporary URLs may throw an error. Some adapter may require you to inject
a temporary url resolving strategy to enable them to produce temporary URLs.

---

## Last Modified

The `lastModified` method resolves the last modification time of a file.

```typescript
try {
    const timestamp = await storage.lastModified('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToGetLastModified) {
        // handle error
    }
}
```

---

## Mime-type

The `mimeType` method resolves the mime-type of a file.

```typescript
try {
    const mimetype = await storage.mimeType('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToGetMimeType) {
        // handle error
    }
}
```

---

## File Size

The `fileSize` method resolves the size of a file.

```typescript
try {
    const size = await storage.fileSize('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToGetFileSize) {
        // handle error
    }
}
```

---

## Checksums

The `checksum` method resolves the hash/checksum/etag of a file. Optionally, an `algo` option can be
passed if a specific type of checksum should be retrieved.

```typescript
try {
    const checksum = await storage.checksum('path/to/file.txt', optionalOptions);
} catch (err) {
    if (err instanceof UnableToGetChecksum) {
        // handle error
    }
}
```

When the underlying storage solution does not expose pre-computed checksums, a checksum is calculated
in-memory. This involves streaming the entire file, which may be a costly operation.

When checksums are calculated, the resulting hash is encoded. By default `hex` is used, you can specify
any suitable `BinaryToTextEncoding` value using the `encoding` option.

---

```typescript
try {
    await storage.deleteFile('path/to/file.txt');
} catch (err) {
    if (err instanceof UnableToDeleteFile) {
        // handle error
    }
}
```