insert into "users" ("username", "hashedPassword", "firstName", "lastName", "email", "location", "createdAt")
values ('JJPhoto', '1234', 'John', 'Johnson', 'john_johnson@surfr.com', 'Sydney, Australia', now()),
       ('Iceman', '1234', 'Chris', 'Burkard', 'Chris_Burkard@surfr.com', 'Pismo Beach, California', now());

insert into "photos" ("userId", "imageUrl", "createdAt")
values (1, '/images/gallery-images/example1.jpg', now()),
       (1, '/images/gallery-images/example2.jpg', now()),
       (1, '/images/gallery-images/example3.jpg', now()),
       (2, '/images/gallery-images/example4.jpg', now()),
       (1, '/images/gallery-images/example5.jpg', now()),
       (2, '/images/gallery-images/example6.jpg', now()),
       (2, '/images/gallery-images/example7.jpg', now()),
       (1, '/images/gallery-images/example8.jpg', now()),
       (2, '/images/gallery-images/example9.jpg', now()),
       (2, '/images/gallery-images/example10.jpg', now()),
       (2, '/images/gallery-images/example11.jpg', now());
