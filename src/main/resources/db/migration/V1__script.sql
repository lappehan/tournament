create TABLE users
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255)  NOT NULL,
    surname VARCHAR(255)  NOT NULL,
    major VARCHAR(255)  NOT NULL,
    password VARCHAR(255) NOT NULL,
    tournament_id BIGINT
--     user_profiles_id BIGINT,
--     foreign key (user_profiles_id) references user_profile (id)

);

create table user_fact
(
    id BIGSERIAL not null primary key,
    fact VARCHAR(255) not null ,
    learned_material varchar(255),
    id_of_feedbacker bigint not null,
    user_fact_id BIGINT,
    foreign key (user_fact_id) references users(id)
);


create TABLE tournaments
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_date date not null,
    started_date date,
    finished_date date,
    user_id BIGINT,
    owner_id bigint,
    admin_owner boolean


);


create table round
(
    id BIGSERIAL NOT NULL primary key,
    tournament_id bigint,
    stage int,
    foreign key (tournament_id) references tournaments (id)


);

create table match
(
    id BIGSERIAL NOT NULL primary key,
    user_id1 BIGINT,
    user_id2 BIGINT,
    winner bigint,
    round_id bigint,
    match_date date,
    foreign key (round_id) references round (id)

);

create table roles
(
    id   INTEGER     NOT NULL PRIMARY KEY,
    name VARCHAR(80) not null
);

create table users_roles
(
    user_id bigint not null,
    role_id integer not null,
    primary key (user_id, role_id),
    foreign key (user_id) references users (id),
    foreign key (role_id) references roles (id)

);

