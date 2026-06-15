# Use the official lightweight Nginx image
FROM nginx:alpine

# Copy the static website files to the default Nginx public folder
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY mockData.js /usr/share/nginx/html/
COPY newMockTenders.js /usr/share/nginx/html/

# Expose port 8080 (Cloud Run expects the container to listen on $PORT, typically 8080)
EXPOSE 8080

# Overwrite the default Nginx config to listen on port 8080
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
