# Full Stack Real-time Chat Application with Authentication Using React JS and Supabase (2025)

> ⚠️ Work in Progress: This project is currently being developed and partially functional.

## Overview

This is a full-stack real-time chat application built with **React JS** for the frontend and **Supabase** for backend services, including authentication, database, and storage.

Initially, the project was intended to use **Firebase**, but due to the requirement of credit card details for the free tier, I decided to switch to **Supabase** and explore it independently. Supabase provides a free tier with PostgreSQL database, authentication, and row-level security without the need for payment details.

The application currently supports:

- User sign-up with email and password
- User login and logout
- Storing user profile information in the database (`users` table)
- Creating empty chat records in the `chats` table
- Supabase Auth handles password hashing and session management

---

## Tech Stack

- **Frontend:** React JS, React Toastify (for notifications)
- **Backend:** Supabase (Auth + PostgreSQL)
- **Styling:** CSS / Custom styles

---

## Current Status

- ✅ User sign-up is functional
- ✅ User login and logout are functional
- ✅ Users and chats tables are connected and working
- ⚠️ Email verification is optional and currently disabled
- ⚠️ Real-time messaging is not yet implemented
- ⚠️ Some UI features may still be in progress

---
