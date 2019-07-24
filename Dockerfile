FROM php:7-fpm

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
        libzip-dev \
        unzip \
    && docker-php-ext-install -j$(nproc) pdo_mysql zip

RUN apt-get update && \
    apt-get install -y --no-install-recommends git zip

WORKDIR /var/www/html

RUN curl --silent --show-error https://getcomposer.org/installer | php

WORKDIR /fantasy-calendar

COPY . .

RUN ["/usr/local/bin/php", "/var/www/html/composer.phar", "install", "-d", "/fantasy-calendar/"]