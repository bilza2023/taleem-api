
server {
    server_name taleem.help www.taleem.help;

    access_log /var/log/nginx/access.log;

    location /api/ {
        proxy_pass http://localhost:5000/;  # Keep the trailing slash
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "Content-Type, Authorization";
        add_header Access-Control-Expose-Headers "Content-Length, Content-Range";

        # Increase file upload size limit
        client_max_body_size 50M;

        # Handle OPTIONS requests properly
        if ($request_method = OPTIONS) {
            return 204;
        }
    }


    location / {
        proxy_pass http://localhost:3000;
        include /etc/nginx/proxy_params;  # Include common proxy parameters if needed
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/taleem.help/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/taleem.help/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.taleem.help) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = taleem.help) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name taleem.help www.taleem.help;
    return 404; # managed by Certbot
}
