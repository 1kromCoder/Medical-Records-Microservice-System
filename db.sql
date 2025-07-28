-- Doctor service uchun database
CREATE DATABASE doctor_service;

-- Patient service uchun database
CREATE DATABASE patient_service;

-- Avval doctor_service bazasiga o'tamiz
\c doctor_service;

CREATE TABLE "doctor" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL
);

-- Avval patient_service bazasiga o'tamiz
\c patient_service;

-- patient jadvali
CREATE TABLE "patient" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "dob" DATE NOT NULL,
  "doctorId" INTEGER NOT NULL
);

-- visit jadvali
CREATE TABLE "visit" (
  "id" SERIAL PRIMARY KEY,
  "visitDate" DATE NOT NULL,
  "patientId" INTEGER NOT NULL,
  CONSTRAINT "fk_patient" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE
);

-- note jadvali
CREATE TABLE "note" (
  "id" SERIAL PRIMARY KEY,
  "text" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "visitId" INTEGER NOT NULL,
  CONSTRAINT "fk_visit" FOREIGN KEY ("visitId") REFERENCES "visit"("id") ON DELETE CASCADE
);

CREATE TYPE "user_role_enum" AS ENUM ('ADMIN', 'DOCTOR', 'USER');
ALTER TYPE "user_role_enum" ADD VALUE 'USER';


CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "role" "user_role_enum",
  "doctorId" INTEGER,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "user" ("name", "email", "password", "role")
VALUES ('Ikromxon', 'ikrom@example.com', 'hashedpassword', 'ADMIN');


