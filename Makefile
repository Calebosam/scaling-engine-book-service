IMAGE=scaling-book-service
CONTAINER_NAME=book-service

build:
	docker build -t $(IMAGE) .

start:
	docker run -p 3001:3001 --name $(CONTAINER_NAME) -d $(IMAGE)

stop:
	docker rm -f $(CONTAINER_NAME)
