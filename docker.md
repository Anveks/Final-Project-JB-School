# Docker

Docker is an open-source platform that allows you to automate the deployment, scaling, and management of applications using containerization. Containers are lightweight, isolated environments that package an application and its dependencies, allowing it to run consistently across different computing environments.

Docker is widely used in software development and deployment workflows, as it simplifies the process of packaging and distributing applications, improves scalability, and ensures consistent environments across different stages of the development lifecycle.

## Main OS

The main operating system of a PC.

## Docker Container

A standalone, executable package that includes everything needed to run an application, including the code, system libraries, and dependencies. Containers provide isolation and consistency, ensuring that an application runs the same way regardless of the underlying infrastructure.

## Docker Image

A read-only template that contains the instructions for creating a container. It includes the application code, runtime, libraries, and any other dependencies required. Docker images are built from a set of instructions called a Dockerfile.

NB: If your project is Multi-Service based then in case of extreme pressure on one of the REST API's you can tell Docker to multiply it in order to balance its performance. Same as Kubernetes.

## Dockerfile

Is a text file that contains a set of instructions for building a Docker image. It specifies the base image to use, the application code to include, the environment variables, and other configuration settings.

## Port Binding:

