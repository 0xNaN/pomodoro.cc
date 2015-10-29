#!/bin/bash

PRODUCTION=true app/opt/build
opt/docker.build
docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS
docker push christianfei/pomodoro-app
docker push christianfei/pomodoro-api
ssh pigeon@146.185.167.197 'cd /pomodoro.cc && git fetch --all && git reset --hard origin/master'
ssh pigeon@146.185.167.197 '/pomodoro.cc/opt/docker.pull'
ssh pigeon@146.185.167.197 '/pomodoro.cc/opt/docker.rm'
ssh pigeon@146.185.167.197 '/pomodoro.cc/opt/docker.run'
ssh pigeon@146.185.167.197 '/pomodoro.cc/opt/docker.clean || true'
