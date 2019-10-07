FROM node:10.16-alpine
# カレントディレクトリを app に
WORKDIR /app
COPY ./api /app
# デフォルトで node が起動するので sh を代わりに起動
RUN npm install
CMD ["node", "main.js"]
EXPOSE 8080