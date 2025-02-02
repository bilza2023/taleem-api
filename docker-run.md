sudo docker run  -d  \
--name local_mongo \
--network=host \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
-v mongodb_data:/data/db \
mongo:latest

connection string for a single mongodb running 

mongodb://admin:password@localhost:27017/?authSource=admin


