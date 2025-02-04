

sudo docker run -d --network=host --restart=unless-stopped \
    --name=taleem-api \
    -e JWT_SECRET="eea2c1ce3117d5bbba96b9e6791d97d98ca5efd90d242e96927e7ecf79fe97ddf05f071f2ef2352715008adaa4cb2163a647fd0e9cf2343728052be0ceecbfd3" \
    -e MONGO_URI="mongodb://admin:password@taleem.help:27017/taleemDB?authSource=admin" \
    taleemhelp/api:indep
