---
title: Visibility
---

Flystorage generalised over ACLs and permissions using **visibility**. The default provided
`Visibility` enum specifies _public_ and _private_ visibility, which is respected by all
implemented adapters.

The API does accepts a `string` input for visibility, allowing you to create more specialised
visibility handling strategies if you need it.

## What is public and private?

Public and private visibility is different depending on which adapter you use. For the local
filesystem, public files are readable by webserver whereas private files are not. For AWS S3,
public files can be read using public URLs whereas private files require a temporary URL to
be downloaded by a browser or HTTP client.