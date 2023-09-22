Nexus Graph Server
==================

Nexus Graph Server is a **mocking** backend used for _decoupling frontend and backend developments_, as well as _making
tests more self-contained_.

To start server:

```bash
cd packages/nexusgraph-server
yarn
yarn start
```

When we see `listening on port 3000`, it means server is up and running.

Setup
-----

### Step 1: Having Dev or Tests Point to nexusgraph-server

> By "Pointing" we mean a real outgoing backend request, instead of hitting remote over network, simply hit this local
> nexusgraph-server server

In order to do so, add the following contents to the **.env** file at the root of nexusgraph project:

```env
EXPAND_API_URL=http://localhost:3000/expand
ENTITY_EXTRACTION_API_URL=http://localhost:3000/entityExtraction
```

### Step 2: Creating a Data File

nexusgraph-server is backed by [lowdb]. To define/modify mock data, simply create a **db.json** file under _src_
directory of _nexusgraph-server_ package

Our data file should be a standard JSON file containing, for example, the following contents:

```json
{
  "nodes": [
    {
      "id": "person-1",
      "fields": {
        "name": "Amy"
      }
    },
    {
      "id": "person-2",
      "fields": {
        "name": "Jane"
      }
    }
  ],
  "links": [
    {
      "source": "person-1",
      "target": "person-2",
      "fields": {
        "label": "is a friend of"
      }
    }
  ]
}
```

### Entity Extraction Request

```bash
curl --location 'localhost:3000/entityExtraction' \
--header 'Content-Type: application/json' \
--data '{
    "documents": [
        "I have a pen",
        "I have an apple"
    ]
}'
```

[lowdb]: https://github.com/typicode/lowdb
