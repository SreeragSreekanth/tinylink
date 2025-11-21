CREATE TABLE IF NOT EXISTS links (
  code varchar(8) PRIMARY KEY,
  target text NOT NULL,
  clicks bigint DEFAULT 0,
  last_clicked timestamptz,
  created_at timestamptz DEFAULT now()
);

