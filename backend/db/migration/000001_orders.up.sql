CREATE TABLE "translator" (
    translator_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
);


CREATE TABLE "status" (
    status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL
);

CREATE TABLE "notary" (
    notary_id SERIAL PRIMARY KEY,
    notary_name VARCHAR(255) NOT NULL
);

CREATE TABLE "order" (
    order_id BIGSERIAL PRIMARY KEY,
    issued_date TIMESTAMPTZ NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    language_from VARCHAR(255) NOT NULL,
    language_to VARCHAR(255) NOT NULL,
    number_of_pages INT NOT NULL,
    notary_id INT NOT NULL DEFAULT 1,
    total_payment DECIMAL(10, 2) NOT NULL,
    down_payment DECIMAL(10, 2) NOT NULL,
    remaining DECIMAL(10, 2) NOT NULL,
    translator_id INT NOT NULL,
    expenses DECIMAL(10, 2) NOT NULL,
    status_id INT NOT NULL DEFAULT 1,
    details TEXT NOT NULL DEFAULT ''
);

CREATE INDEX ON "order" (order_id);

ALTER TABLE "order" ADD FOREIGN KEY (translator_id) REFERENCES "translator"(translator_id);
ALTER TABLE "order" ADD FOREIGN KEY (status_id) REFERENCES "status"(status_id);
ALTER TABLE "order" ADD FOREIGN KEY (notary_id) REFERENCES "notary"(notary_id);

CREATE INDEX ON "translator" (translator_id);
CREATE INDEX ON "status" (status_id);
CREATE INDEX ON "notary" (notary_id);
