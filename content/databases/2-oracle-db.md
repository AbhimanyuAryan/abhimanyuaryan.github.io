---
title: "Oracle DB"
date: "2024-02-16"
author: "Aryan"
---

Downloading Oracle DB:

1. Create an account.
2. Accept terms and condition on Docker registry: https://container-registry.oracle.com

click on database > enterprise > accept t&c

![accept terms and conditions](/oracle-db/terms_and_condition.gif)

3. login to registry `docker login container-registry.oracle.com`
4. Pull the image `docker pull container-registry.oracle.com/database/enterprise:19.19.0.0` for macos m1

4.1) Create a container from image

```
docker run -d --name my_oracle_db -p 1521:1521 -p 5500:5500 -e ORACLE_PWD=12345 -e ORACLE_CHARACTERSET=AL32UTF8 container-registry.oracle.com/database/enterprise:19.19.0.0
```

4.2) Check logs

```
docker logs my_oracle_db
```

wait for the message `DATABASE IS READY TO USE!`

4.3) Change sys password

```
docker exec my_oracle_db ./setPassword.sh 12345;
```

4.4) Connect to database

```
docker exec -it my_oracle_db sqlplus sys/12345@ORCLCDB as sysdba
```

4.5) Create a user

```
CREATE USER c##abhimanyuaryan IDENTIFIED BY 12345;
```

4.6) Grant ALL privileges

```
GRANT ALL PRIVILEGES TO c##abhimanyuaryan;
```

Now login to sql developer with the following credentials:

```
username: c##abhimanyuaryan
password: 12345
role: default
Service Name: ORCLCDB
```

Enjoy :)
