FROM node:18
COPY package.json package-lock.json index.mjs /
RUN npm ci --omit=dev
CMD ["node", "index.mjs"]
USER nobody:nogroup
