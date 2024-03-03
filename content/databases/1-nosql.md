---
title: "NoSQL"
date: "2024-02-16"
author: "Aryan"
---

# Why NOSQL?

## Mongodb

**Installation and setup**

```
docker pull arm64v8/mongo
docker network create NET1
docker volume create VOL1
docker run -d --network NET1 -h mongo --name mongo -p 27017:27017 -v VOL1:/data/db mongo
```


