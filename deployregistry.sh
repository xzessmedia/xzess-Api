#!/bin/sh

CONTAINER_NAME="xapi"
BRANCH="staging"
REGISTRY_URL=""
REGISTRY_USER=""
REGISTRY_PW=""

echo "Compiling API"
npm run compile

echo "Building Container"
docker build -t $CONTAINER_NAME:$BRANCH .

echo "Tagging Docker Container Image for $CONTAINER_NAME"
docker tag $CONTAINER_NAME:$BRANCH $REGISTRY_URL/$REGISTRY_USER/$CONTAINER_NAME:$BRANCH

echo "Pushing to private Registry"
docker login https://$REGISTRY_URL -u $REGISTRY_USER --password-stdin $REGISTRY_PW
docker commit $CONTAINER_NAME:$BRANCH $REGISTRY_URL/$REGISTRY_USER/$CONTAINER_NAME:$BRANCH
docker push $REGISTRY_URL/$REGISTRY_USER/$CONTAINER_NAME:$BRANCH
