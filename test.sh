#!/bin/bash

while true; do
	# Use curl to make the request to localhost:3000 with a 5-second timeout
	curl -m 2 -o /dev/null http://localhost:3000

	# Sleep for 5 seconds before making the next request
	sleep 5
done
