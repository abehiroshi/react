#!/bin/sh -e

echo "docker push $IMAGE_NAME:${IMAGE_TAG-latest}"
docker login -u $DOCKER_USER -p $DOCKER_PASSWORD -e $DOCKER_EMAIL $DOCKER_REGISTRY
docker push $IMAGE_NAME:${IMAGE_TAG-latest}
