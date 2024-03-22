---
title: ""
date: "2024-03-07"
author: "Aryan"
---

# Installing HBase on m1

```
$ docker pull dajobe/hbase
$ docker run -d --name hbase-container -h hbase-docker -p 16000:16000 -p 16010:16010 dajobe/hbase
```
