---
title: Architecture
---

Flystorage is designed to abstract away the differences of underlying storage solutions as much
as possible. Most operations are entirely consistent across implementations. Some more specialised
operations, such as URL generation, moving files, and directory handling is _not_ normalised. A
pragmatic approach is taken for smoothing over behavioural differences.

## Normalised Behaviour

In general, the behaviour for operations on files are normalised across the board. For directories
case-by-case decisions are made. The most prominent exceptions are:

1. Passing a directory path to the `moveFile` method may result in a directory being moved on the
   local filesystem.
2. Explicitly creation a directory (which is not needed) may result in a no-op.

## Software Design Rationale

Flysystem implements the adapter pattern to enable an consistent experience across implementations.
The outer `FileStorage` class provides the top-level interface to which you are expected to
integrate against. The inner `StorageAdapter` implementations are designed to smooth other
provider-specific differences, but ultimately do not directly concern themselves with end-user
usability.

## Encapsulation

As much as possible, Flystorage encapsulates storage concerns. Implementation  differences are
normalised, but it also aims to hide any technical configuration from the application code.

Configuration, such as the root directory, are contained in the adapters as configuration. This
makes usage more portable than if they were to be exposed to the application code. You're advised
to leverage this as much as possible. The full path of a file can be cut into two pieces:

```text
[/path/to/root/directory]/[path/to/file.txt]
^ configuration           ^ known to app code
```

Hiding these details from application code gives you full mobility. You can move locations
and even storage solutions without changing application code.
