# Security Policy and Review Notes

## Supported use

Travlr Getaways is maintained as an academic portfolio project. It is not supported as a production booking or administrative service.

## Reporting a vulnerability

Please do not open a public issue containing credentials, tokens, private data, or a working exploit. Contact the repository owner privately through the account information on the GitHub profile and include the affected component, reproduction conditions, and potential impact.

## Configuration requirements

- Never commit `.env`, database credentials, or a real JWT signing secret.
- Use a long, randomly generated `JWT_SECRET` for development and a managed secret in deployment.
- Restrict `CLIENT_ORIGIN` to the deployed administrative client.
- Use a least-privileged MongoDB account and a protected connection string.
- Keep `ALLOW_REGISTRATION=false` unless registration is intentionally enabled in a controlled development environment.
- Treat browser storage as exposed to client-side script; do not place sensitive data inside JWT payloads.

## Known hardening work

A real deployment would still require centralized request validation, rate limiting, security headers, audit logging, a production identity lifecycle, dependency monitoring, database access controls, TLS, and integration/security testing.

This document records those limits explicitly and does not claim that the course project is production ready.
