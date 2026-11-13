# juniorz-registration-api

A backend project that simulates user registration. It validates the full name and the email: the name must not be empty, and the email must not be empty and must match a valid email format. Once the input is valid, the user is saved to the database. If someone tries to register with an email that already exists, they receive a 409 error, meaning a duplicate. Postman is used instead of a client side, to send requests to the server's API.

## Tech stack
- Node.js
- TypeScript
- NestJS
- Prisma ORM
- SQLite
- `class-validator` and `class-transformer` (input validation)
- Postman (manual testing)

## Prerequisites
- Node.js v26 (developed with v26.13.0). `npm` comes with it.
- Git

## Getting started
1. Clone the repository and enter the project folder:
   ```bash
   git clone https://github.com/VicaBenko/juniorz-registration-api.git
   cd juniorz-registration-api
   ```
2. Install all the packages listed in `package.json`:
   ```bash
   npm install
   ```
3. Create a `.env` file by copying `.env.example`. It holds the database address (`DATABASE_URL`).
4. Build the database from the migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Generate the Prisma client (the generated code is not committed to the repository):
   ```bash
   npx prisma generate
   ```
6. Start the server:
   ```bash
   npm run start:dev
   ```
The server runs on `http://localhost:3000`.

## API

### `POST /users`
Registers a new user.

**Request body:**
```json
{
  "fullName": "Dana Cohen",
  "email": "dana@mail.com"
}
```
Both fields must be strings and must not be empty. The email must be in a valid email format.

**Responses:**
- `201 Created`: the user was saved. Returns the saved user (`fullName` and `email`).
- `400 Bad Request`: the input is not valid (for example, an empty name or an invalid email). Returns a list of what is wrong.
- `409 Conflict`: a user with this email already exists.

## Manual Testing (Postman)
The endpoint was manually verified using Postman across three scenarios:
1. **Valid registration:** Sending a valid `fullName` and a new `email` returns `201 Created` with the saved user data.
2. **Duplicate email:** Sending an `email` that is already registered returns `409 Conflict`.
3. **Invalid input:** Sending an empty `fullName`, a malformed `email`, or non-string values returns `400 Bad Request` with clear validation error details.

## Notes
Decisions I made and why:
- **Duplicate email check:**
  - *My approach:* I try to save the user directly. If the email already exists, the database rejects it with a unique-constraint error (Prisma code `P2002`). I catch this error and return `409 Conflict`. If two requests with the same email arrive at the same time, the first one is saved and the second one gets a 409.
  - *The other approach:* first ask the database whether the email exists, and only then save the user.
  - *Why I didn't use it:* if two requests with the same email arrive at the same time, both can pass the check before either one is saved. The database still rejects the second one, but that error is not handled, so the user gets a 500 instead of a 409. The database is the final judge, so catching its error guarantees a 409 even for parallel requests.
- **Route:** `POST /users`. The path describes the resource (`users`), and the method describes the action (create).
- **Email as the primary key:** different people can have the same name, so I chose the email to be the unique identifier.
- **Separate Prisma module:** the database module has no controller, so nobody can bypass the business logic from outside. It exports `PrismaService`, so one shared instance can be used by any module that needs the database.
- **Trimming input:** both the name and the email are trimmed before validation, so a name made only of spaces is rejected, and an email pasted with extra spaces is accepted.
- **Lowercase email:** the email is converted to lowercase, so `Dana@Mail.com` and `dana@mail.com` are treated as the same email and count as a duplicate.
- **Non-string input:** the trim only runs on strings. Any other type (a number, for example) is passed as is to the validation, which returns 400 instead of crashing with 500.
- **Email validation limits:** `IsEmail` checks only the format of the address, not that it really exists. In a real system, I would send a verification email.
- **Node.js version:** developed with Node.js v26, so others should use the same version to avoid compatibility issues.
