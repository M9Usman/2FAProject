# My File Structure will look like: 
```
src/
├── auth/
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── role.guard.ts
│   └── utils/
│       └── jwt.ts
├── common/
│   ├── enums/
│   │   └── roles.enum.ts
│   ├── interceptors/
│   │   └── response.interceptor.ts
│   ├── middleware/
│   │   └── logger.middleware.ts
│   └── types/
│       └── express.d.ts
├── prisma/
│   └── client.ts
│   └── schema.prisma
├── user/
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── routes/
│   │   └── user.routes.ts
├── app.ts
├── server.ts
/.env
/.gitignore
/package-lock.json
/package.json
/tsconfig.json
```