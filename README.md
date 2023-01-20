# jerky
REST API for dried meat store.

The chosen structure is a monorepository managed by Nx workspace and the NestJs framework for its structure.

Built on a microservice architecture using the CQRS pattern.

Implemented JWT RBAC authorization.  CRUD operations with users and primary domain units.

For interaction between services, the RMQ message broker is used.  PostgreSQL main database.

Used contracts: external and internal.  Full data validation is present.

In the process of writing: services: order, shopping cart, promo/discounts, event processing and log service.  Swagger.



```shell
# clone this repository

# install dependencies
npm ci
# base envs for docker-compose
cp .env.example .env
# base envs for apps
cp .env-cmdrc.json.example .env-cmdrc.json
# launch containers
docker-compose up -d
# generate prisma clients
npm run prisma:generate
# migrate to db in dev mode
npm run prisma:migrate:dev
# run apps in dev mode
npm run dev
```
