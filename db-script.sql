CREATE TABLE USERS (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(40) UNIQUE NOT NULL,
    name VARCHAR(40) NOT NULL,
    password VARCHAR NOT NULL
);
CREATE TABLE TOKEN (
    token_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content VARCHAR UNIQUE NOT NULL,
    user_id UUID NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    timestamp TIMESTAMP without time zone NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE cascade
);
select * from token
select * from users
select * from chat
select * from message 

CREATE TABLE CHAT (
    chat_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_user_id UUID NOT NULL,
    second_user_id UUID NOT NULL,
    
    FOREIGN KEY (first_user_id) REFERENCES USERS(user_id) ON DELETE cascade,
    FOREIGN KEY (second_user_id) REFERENCES USERS(user_id) ON DELETE cascade
);

CREATE TABLE MESSAGE (
    message_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID NOT NULL,
    chat_id UUID NOT null,
    content VARCHAR(1000) NOT NULL,
    timestamp TIMESTAMP without time zone NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (sender_id) REFERENCES USERS(user_id) ON DELETE cascade,
    FOREIGN KEY (chat_id) REFERENCES CHAT(chat_id) ON DELETE cascade
);

