FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

VOLUME /usr/share/nginx/html
VOLUME /usr/share/nginx/descargas

EXPOSE 80
EXPOSE 443
