FROM postgres:14-alpine

COPY ./init.sql /docker-entrypoint-initdb.d/

# Adding entrypoint script to image
#COPY ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint
#RUN chmod +x /usr/local/bin/docker_entrypoint

#ENTRYPOINT [ "docker_entrypoint"]

EXPOSE 5432