DROP TABLE IF EXISTS piles;
DROP TABLE IF EXISTS jsons;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE piles (
    pile_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    pile_name TEXT NOT NULL UNIQUE
);

CREATE TABLE jsons (
    json_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    pile_id uuid,
    json_name TEXT NOT NULL,
    json_data TEXT NOT NULL,
    CONSTRAINT fk_pile
        FOREIGN KEY(pile_id)
            REFERENCES piles(pile_id)
            ON DELETE CASCADE
);