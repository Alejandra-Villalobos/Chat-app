CREATE TABLE public.users (
	user_id uuid NOT NULL DEFAULT gen_random_uuid(),
	email varchar(40) NOT NULL,
	"name" varchar(40) NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

CREATE TABLE public.verification (
	code_id uuid NOT NULL DEFAULT gen_random_uuid(),
	email varchar(40) NOT NULL,
	code varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	account_status bool NOT NULL DEFAULT false,
	"timestamp" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT code_pkey PRIMARY KEY (code_id)
);

CREATE TABLE public.chat (
	chat_id uuid NOT NULL DEFAULT gen_random_uuid(),
	first_user_id uuid NOT NULL,
	second_user_id uuid NOT NULL,
	CONSTRAINT chat_pkey PRIMARY KEY (chat_id),
	CONSTRAINT chat_first_user_id_fkey FOREIGN KEY (first_user_id) REFERENCES public.users(user_id) ON DELETE CASCADE,
	CONSTRAINT chat_second_user_id_fkey FOREIGN KEY (second_user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

CREATE TABLE public.message (
	message_id uuid NOT NULL DEFAULT gen_random_uuid(),
	sender_id uuid NOT NULL,
	chat_id uuid NOT NULL,
	"content" varchar(1000) NOT NULL,
	"timestamp" varchar NOT NULL,
	visibility varchar(8) NULL DEFAULT 'all'::character varying,
	CONSTRAINT message_pkey PRIMARY KEY (message_id),
	CONSTRAINT message_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chat(chat_id) ON DELETE CASCADE,
	CONSTRAINT message_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

CREATE TABLE public."token" (
	token_id uuid NOT NULL DEFAULT gen_random_uuid(),
	"content" varchar NOT NULL,
	user_id uuid NOT NULL,
	active bool NOT NULL DEFAULT true,
	"timestamp" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT token_content_key UNIQUE (content),
	CONSTRAINT token_pkey PRIMARY KEY (token_id),
	CONSTRAINT token_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);

INSERT INTO USERS(EMAIL, NAME, PASSWORD) VALUES('test@test.com', 'test', '$2a$12$W99jNXyzjfqo7FvxbmAwH.Lktk2bIlHj.rgd1QLqMBeEgksnKjSJG');
INSERT INTO USERS(EMAIL, NAME, PASSWORD) VALUES('test2@test.com', 'test2', '$2a$12$ngvg2x1h0L6XGheFivUo1.V28hPstk/RbhjROh7GGPQ6e94cYktR6');
