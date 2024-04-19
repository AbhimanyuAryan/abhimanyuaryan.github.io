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
docker run -d --name my_oracle_db -p 1521:1521 -p 5500:5500 -e ORACLE_PWD=<your_password> -e ORACLE_CHARACTERSET=AL32UTF8 container-registry.oracle.com/database/enterprise:19.19.0.0
```

where my_oracle_db is the name of the container

5. Connect to my docker container `docker exec -it my_oracle_db bash -c "source /home/oracle/.bashrc; sqlplus /nolog"`
6. Connect to DB

```
SQL> connect sys as sysdba;
Enter password:
Connected.
```

7. Alter the session

```
SQL> alter session set "_ORACLE_SCRIPT"=true;

Session altered.
```

8. Create a new user aryan

```
SQL> create user aryan identified by aryan;

User created.
```

9. Grant all preveleges to that user

```
SQL> GRANT ALL PRIVILEGES TO aryan;

Grant succeeded.
```

9. Exec docker container

```
docker exec -it my_oracle_db bash
```

10. Connect to your new user

```
sqlplus aryan/aryan@localhost:1521/ORCLPDB1
```

DEFAULT SID: ORCLCDB (from docs)

11. Now that you are connect with user aryan with password aryan. You can create a table

```sql
SQL> CREATE TABLE publisher
  2  (
  3  "id_publisher" NUMBER(3, 0) NOT NULL ENABLE,
  4  "name" VARCHAR2(200 byte) NOT NULL ENABLE,
  5  CONSTRAINT "PUBLISHER_PK" PRIMARY KEY ("id_publisher")
  6  );

Table created.
```

12. See what tables are accessible to aryan user

```sql
SQL> SELECT table_name FROM user_tables;

TABLE_NAME
------------------------------------------------------------
PUBLISHER
```

13. Showing the table

```sql
SQL> DESC publisher
 Name					   Null?    Type
 ----------------------------------------- -------- ----------------------------
 id_publisher				   NOT NULL NUMBER(3)
 name					   NOT NULL VARCHAR2(200)
```

14. Inserting to the table

```sql
 SQL> INSERT INTO publisher ("id_publisher", "name") VALUES (2, 'Another Publisher');

1 row created.
```

15. Updated the record on second ID

```sql
SQL> UPDATE publisher SET "name" = 'novo nome da editora' WHERE "id_publisher" = 2;

1 row updated.
```
