# Этап сборки
FROM node:18-alpine AS build
WORKDIR /app

# Устанавливаем зависимости, включая devDependencies (нужны для сборки)
COPY package.json ./
RUN npm install

# Копируем остальные файлы и собираем проект
COPY . .
RUN npm run build

# Финальный образ
FROM nginx:1.21-alpine
WORKDIR /usr/share/nginx/html

# Удаляем дефолтные файлы nginx
RUN rm -rf ./*

# Копируем только собранные файлы
COPY --from=build /app/dist .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]