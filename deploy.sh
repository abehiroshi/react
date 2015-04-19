#!/bin/sh -e

alias tutum='docker run -e TUTUM_USER=$TUTUM_USER -e TUTUM_APIKEY=$TUTUM_APIKEY -v $(pwd):/app abehiroshi/tutum-cli'

echo "tutum stack update"
tutum stack update -f /app/tutum.yml ${TUTUM_STACKNAME} || NEW_STACK=true && true

echo "docker push"
docker login -u $DOCKER_USER -p $DOCKER_PASSWORD -e $DOCKER_EMAIL $DOCKER_REGISTRY
docker push $IMAGE_NAME:${IMAGE_TAG-latest}

if ${NEW_STACK-false}; then
  echo "tutum stack up"
  tutum stack up -n ${TUTUM_STACKNAME} -f /app/tutum.yml 
fi
