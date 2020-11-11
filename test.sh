#!/bin/bash

curl -X POST http://localhost:3000/issues -H "content-type: application/json" --data '{"title": "Issue no 1", "description": "DESCRIPTION"}' | jq && \
curl -X PUT http://localhost:3000/issues/123 -H "content-type: application/json" --data '{"title": "Issue no 123", "state": "PENDING", "description": "DESCRIPTION"}' | jq && \
curl -X PUT http://localhost:3000/issues/123 -H "content-type: application/json" --data '{"title": "Issue no 123", "state": "OPEN", "description": "DESCRIPTION"}' | jq && \
curl -X PATCH http://localhost:3000/issues/123 -H "content-type: application/json" --data '{"state": "CLOSED"}' | jq && \
curl -X PATCH http://localhost:3000/issues/123 -H "content-type: application/json" --data '{"state": "OPEN"}' | jq && \
curl -X GET http://localhost:3000/issues/123 | jq && \
curl -X DELETE http://localhost:3000/issues/123 | jq && \
curl -X GET http://localhost:3000/issues | jq
