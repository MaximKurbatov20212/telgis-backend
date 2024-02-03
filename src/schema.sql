create table users (
    login  varchar(255) primary key not null,
    password varchar(255) not null,

    latitude float,
    longitude float
);

create table statuses (
    id serial primary key,
    name varchar(255) not null
);

create table users_friends (
    id serial primary key,

    userLogin varchar(255),
    friendLogin varchar(255),
    statusID int,

    foreign key (userLogin) references users (login),
    foreign key (friendLogin) references users (login),
    foreign key (statusID) references statuses (id)
);