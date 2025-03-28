# TDTestTask

## Description

Test Task from Traffic Devils

## Fast start

```bash
# Up all services
$ docker-compose up -d
```

## Seeds

```js
mockUser = {
  email: "test@gmail.com",
  password: "01010101",
  username: "testuser",
};
```

This project includes:

- **Authentication details (only access token(that live 60m) without refresh tokens, sessions, roles)**
- **work with CSV files**
