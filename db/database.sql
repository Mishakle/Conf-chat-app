CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    profileImage VARCHAR
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    roomImage VARCHAR
);

CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	author_id INT,
	room_id INT,
	text VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id)
);

CREATE TABLE users_in_rooms (
	id SERIAL PRIMARY KEY,
	room_id INT,
	user_id INT,
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);