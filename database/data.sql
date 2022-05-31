insert into "users" ("username", "hashedPassword", "email", "location", "createdAt")
values ('John Johnson', '1234', 'john_johnson@surfr.com', 'Sydney, Australia', now()),
       ('Chris Burkard', '1234', 'Chris_Burkard@surfr.com', 'Pismo Beach, California', now());

insert into "photos" ("userId", "imageUrl", "createdAt")
values (1, '/images/example1.jpg', now()),
      (1, '/images/example2.jpg', now()),
      (1, '/images/example3.jpg', now()),
      (2, '/images/example4.jpg', now()),
      (1, '/images/example5.jpg', now()),
      (2, '/images/example6.jpg', now()),
      (2, '/images/example7.jpg', now()),
      (1, '/images/example8.jpg', now()),
      (2, '/images/example9.jpg', now()),
      (2, '/images/example10.jpg', now()),
      (2, '/images/example11.jpg', now());
