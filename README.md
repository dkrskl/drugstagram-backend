# How To Setup
- Duplicate `.env.template` file to `.env`
- Run `docker compose up` and start the containers
- Run `docker-compose exec api sh -c "npm run migrate up"`
- Run `docker-compose exec api sh -c "npm run prisma:introspect"`
- Run `docker-compose exec api sh -c "npm run seed"`
- Have Fun! 🚀
