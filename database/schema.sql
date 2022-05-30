set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"location" TEXT NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
	"profileImageUrl" TEXT NOT NULL DEFAULT '/profileImage.jpg',
	"coverImageUrl" TEXT NOT NULL DEFAULT '/coverImage.jpg',
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "photos" (
	"photoId" serial NOT NULL,
	"userId" serial NOT NULL,
	"imageUrl" TEXT NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "photos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
