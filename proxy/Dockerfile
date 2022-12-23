FROM tiangolo/nginx-rtmp

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/gke.crt /etc/ssl/gke.crt
COPY ./ssl/gke.key /etc/ssl/gke.key


EXPOSE 443