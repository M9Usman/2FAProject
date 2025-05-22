# My File Structure will look like: 
```

├── prisma/
│   └── schema.prisma
src/
├── models/           # Database models/entities
├── repositories/     # Data access layer
├── exceptions/       # Custom error classes
├── constants/        # App-wide constants
├── interfaces/       # TypeScript interfaces
└── tests/           # Unit and integration tests
├── config/
│   ├── client.ts/ #👈 prisma
├── controllers/
│   ├── auth-controller.ts
│   ├── user-controller.ts
├── dto/
│   ├── login-dto.ts
│   ├── register-dto.ts
├── middleware/
│   ├── logger-middleware.ts
│   ├── validate-middleware.ts
├── routes/
│   ├── auth-route.ts
│   ├── user-route.ts
├── service/
│   ├── auth-service.ts
├── types/
├── utils/
│   ├── async-handler.ts
│   ├── jwt.ts
├── validators/
│   ├── login-validator.ts
├── database/        # DB-related files
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── app.ts
├── server.ts
/.env
/.env.example
/.gitignore
/package-lock.json
/package.json
/tsconfig.json

```