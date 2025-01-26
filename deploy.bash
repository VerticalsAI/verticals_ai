#!/usr/env/bin bash

git stash
git pull
git stash pop

docker compose -f compose.prod.yaml -f compose.deps.yaml up -d --build app
