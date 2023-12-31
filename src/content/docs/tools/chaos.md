---
title: Chaos (for testing)
description: Flystorage adapter for chaos engineering
---

This package contains an adapter decorator that causes instrumented failures. This is useful for
when you want to make sure your application code can deal with failures gracefully.

Use the chaos adapter decorator to wrap your actual adapter and instruct it to throw errors. Use
it to validate retry mechanisms, logging, and metric collection to gain better insights into the
functioning of your application.

## Installation

```bash
npm install --save @flystorage/file-storage @flystorage/chaos
```

## Setup

```typescript
import {FileStorage} from '@flystorage/file-storage';
import {ChaosStorageAdapterDecorator, TriggeredErrors} from '@flystorage/chaos';

const strategy = new TriggeredErrors();
const adapter = new ChaosStorageAdapterDecorator(
    createActualAdapter(),
    strategy,
);
const storage = new FileStorage(adapter);
```

## Usage

```typescript

import {TriggeredErrors} from '@flystorage/chaos';

const strategy = new TriggeredErrors();

// error on all write calls
strategy.on('write', () => new Error());

// error on first 2 stat calls
strategy.on('stat', () => new Error(), {times: 2});

// error after first 2 deleteFile calls
strategy.on('deleteFile', () => new Error(), {after: 2});

// error on 2nd and 3rd call to any method
strategy.on('*', () => new Error(), {after: 1, times: 2});
```