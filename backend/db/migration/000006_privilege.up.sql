CREATE TABLE privilege_levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO privilege_levels (name) VALUES ('admin');
INSERT INTO privilege_levels (name) VALUES ('user');
INSERT INTO privilege_levels (name) VALUES ('unauthorized');

ALTER TABLE accounts ADD COLUMN privilege_level_id INTEGER REFERENCES privilege_levels(id);
ALTER TABLE accounts ALTER COLUMN privilege_level_id SET DEFAULT 3;
