CREATE TABLE USERS (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(40) UNIQUE NOT NULL,
    name VARCHAR(40) NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE CHAT (
    chat_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id UUID NOT NULL,
    email VARCHAR(40) NOT NULL,
    name VARCHAR(40) NOT NULL,
    
    FOREIGN KEY (contact_id) REFERENCES USERS(user_id) ON DELETE cascade
);

CREATE TABLE MESSAGE (
    message_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID NOT NULL,
    chat_id UUID NOT null,
    content VARCHAR(1000) NOT NULL,
    date timestamp without time zone not null,
    
    FOREIGN KEY (sender_id) REFERENCES USERS(user_id) ON DELETE cascade,
    FOREIGN KEY (chat_id) REFERENCES CHAT(chat_id) ON DELETE cascade
);