---
sidebar_position: 10
title: Configuration
---

This document describes Configuration Management for Nexus Graph.

Context
-------

Configuration management is essential for every application that will be deployed into multiple environments, which is pretty much the majority of Apps and APIs. Focusing on React Apps in this post, we will cover how to store
configurations in Nexus Graph, how to configure them, and finally how to read them.

Configuration Types
-------------------

There are different types of configurations in Nexus Graph

### Environment Dependent

Those are configurations that change from one environment to the other. A good example would be FQDNs (Fully Qualified Domain Names). A URL in local dev environment, might point to https://localhost:6500, however the same URL in
production, would point to https://theresa-api.com.

#### Storing Environment Dependent Configs

The way we manage these types of configurations is through **env files**. We maintain a separate env file for each 
environment.

We have:

- **.env**: for local dev environment
- **.env.test**: for test environment
- **.env.production**: for production

When the application is packaged for each environment by WebPack, the right configuration file will be picked up. 
The content of such file is key-value pair, such as below:

```conf
HTTPS=true
PORT=8500
HOST=localhost
REACT_APP_API_URL=https://localhost:6011
REACT_APP_API_PORTAL_SUBSCRIPTION=NotRequiredForLocalUse
REACT_APP_INSTRUMENTATION_KEY=NotApplication
PUBLIC_URL=https://localhost:8500
EXTEND_ESLINT = true
REACT_APP_Environment=development
```

:::caution

The content of .env files in any environment should be considered public knowledge, and there should not be any risk
in exposing them to public.

:::

For .env.(environment), we should have the same set of keys in each file, with different values specific to that
environment.

#### Reading from .env File

To access these config values, we simply use **process.env.(key-name)**

### Static Configurations

Static configurations are the ones that don't change from one environment to the other. Examples would be telephone 
numbers, company names, messages and copies, etc. We simply store these values in a separate file, as they might be 
subject to change from time to time, and this makes it easier to find and change them.

#### Storing Static Configuration Values

One way to manage these configs, is to store them in simple json file, such as below:

```json
{
  "locations": {
    "fetchCountriesUrl": "v1/countries"
  },
  "seo": {
    "domain": "https://test.com",
    "siteName": "Test",
    "defaultTitle": "Test | Fast Engineering Eco-Systems with No Compromise",
    "defaultDescription": "Build and transform your software products with Pellerex scalable engineering solutions and save months of product development time.",
    "contact": {
      "email": "info@test.com",
      "phone": "+61 2 816238786"
    },
    "address": {
      "streetAddress": "U7 678 Orouke Rd",
      "addressLocality": "RedFern",
      "addressRegion": "NSW",
      "addressCountry": "Australia",
      "postalCode": "2000"
    }
  }
}
```

JSON structure also enables us to store the values in a specific hierarchy which makes it easier to manage.

#### Reading Static Config Values

All we need to do to access such config values, is to import it in our `.ts/.tsx` files and access the values like 
any other json object:

```typescript
import config from '../../config.json';
```

and then I can write:

```typescript
config.locations.fetchCountriesUrl
```

### Constants

The other alternative to manage static values in code, is through TS objects. We typically manage two types of 
values using TS objects:

- To store/read those values that are highly unlikely to change from time to time, but we want to keep them separate 
  from our code anyway
- To store/read those values that won't be stored in JSON files as they are (and not as strings), such as Regular 
  Expressions (RegEx)

An example would look like below, and you can read them exactly like Option 2, as above:

```typescript
export const Auth = {
    PasswordRegEx: /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/,
    PasswordFailMessage: "Passwords must have at least 8 characters, 1 lowercase, 1 upper case, 1 number, and 1 special character."
}
```
