set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Events" (
	"name" TEXT NOT NULL,
	"eventId" serial NOT NULL,
	"startDate" DATE NOT NULL,
	"endDate" DATE NOT NULL,
	"location" TEXT NOT NULL,
	"details" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	CONSTRAINT "Events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Tasks" (
	"eventId" int NOT NULL,
	"taskId" serial NOT NULL,
	"task" TEXT NOT NULL,
	CONSTRAINT "Tasks_pk" PRIMARY KEY ("taskId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Guests" (
	"guestId" int NOT NULL,
	"guest" TEXT NOT NULL,
	"phoneNumber" int NOT NULL,
	CONSTRAINT "Guests_pk" PRIMARY KEY ("guestId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."EventGuests" (
	"eventId" int NOT NULL,
	"guestId" int NOT NULL,
	CONSTRAINT "EventGuests_pk" PRIMARY KEY ("eventId","guestId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_fk0" FOREIGN KEY ("eventId") REFERENCES "Events"("eventId");


ALTER TABLE "EventGuests" ADD CONSTRAINT "EventGuests_fk0" FOREIGN KEY ("eventId") REFERENCES "Events"("eventId");
ALTER TABLE "EventGuests" ADD CONSTRAINT "EventGuests_fk1" FOREIGN KEY ("guestId") REFERENCES "Guests"("guestId");
