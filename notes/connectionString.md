
# MongoDB Connection Strings for Docker Container (taleem-mongo)

| Scenario                               | Connection String                                                   |
|----------------------------------------|--------------------------------------------------------------------|
| Without Auth (Default)                 | mongodb://localhost:27017                                         |
| Without Auth (Docker Bridge)           | mongodb://taleem-mongo:27017                                      |
| With Auth (Localhost)                  | mongodb://admin:password@localhost:27017                         |
| With Auth (Docker Bridge)              | mongodb://admin:password@taleem-mongo:27017                      |
| With Auth & Database                   | mongodb://admin:password@localhost:27017/mydb                    |
| With Auth & Database (Docker Bridge)   | mongodb://admin:password@taleem-mongo:27017/mydb                 |
| With Replica Set (if configured)       | mongodb://admin:password@taleem-mongo:27017,another-node:27017/?replicaSet=myReplicaSet |
| Connection with MongoDB Driver (Node.js) | mongodb+srv://admin:password@taleem-mongo:27017/?retryWrites=true&w=majority |
