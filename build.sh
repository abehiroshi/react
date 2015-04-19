#!/bin/sh -e

docker build -t ${IMAGE_NAME-$(basename $(pwd))} $(dirname $0)
