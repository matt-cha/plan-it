set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Events" (
	"name" TEXT NOT NULL,
	"eventId" serial NOT NULL,
	"startDate" timestamp with time zone NOT NULL,
	"endDate" timestamp with time zone NOT NULL,
	"location" TEXT,
	"details" TEXT,
	"image" TEXT,
	CONSTRAINT "Events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Tasks" (
	"taskId" serial NOT NULL,
	"taskName" TEXT NOT NULL,
	CONSTRAINT "Tasks_pk" PRIMARY KEY ("taskId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Guests" (
	"guestId" serial NOT NULL,
	"guestName" TEXT NOT NULL,
	"phoneNumber" TEXT NOT NULL,
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



CREATE TABLE "public"."EventTasks" (
	"eventId" int NOT NULL,
	"taskId" int NOT NULL,
	CONSTRAINT "EventTasks_pk" PRIMARY KEY ("eventId","taskId")
) WITH (
  OIDS=FALSE
);






ALTER TABLE "EventGuests" ADD CONSTRAINT "EventGuests_fk0" FOREIGN KEY ("eventId") REFERENCES "Events"("eventId");
ALTER TABLE "EventGuests" ADD CONSTRAINT "EventGuests_fk1" FOREIGN KEY ("guestId") REFERENCES "Guests"("guestId");

ALTER TABLE "EventTasks" ADD CONSTRAINT "EventTasks_fk0" FOREIGN KEY ("eventId") REFERENCES "Events"("eventId");
ALTER TABLE "EventTasks" ADD CONSTRAINT "EventTasks_fk1" FOREIGN KEY ("taskId") REFERENCES "Tasks"("taskId");
