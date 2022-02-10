-- \i /home/globik/sex_for_many/sql/cladr.sql
-- heroku pg:psql --app frozen-atoll-47887
 drop table if exists cladr;
create table cladr(
id int generated by default as identity,
nick  varchar(16) unique not null references buser(bname),--unique not null references buser(bname)
cadr varchar(40) , -- client btc address
padr varchar(40) , -- public btc adress
cadrtest varchar(40), --client test btc adress
padrtest varchar(40), -- public test btc address
inv varchar(70) not null, -- invoice
pc varchar(70) not null, -- payment code
btc_amt numeric NOT NULL default 0, -- btc payment amount by address
btc_all numeric not null default 0 -- total amount received by address
);

-- insert into cladr(nick, cadrtest, padrtest, inv, pc) values('Globi','cli','pub','inv','pc') on conflict(nick) do update set cadrtest='cli2',padrtest='pub2',inv='inv2',pc='pc2';

-- insert into cladr(nick, cadrtest, padrtest, inv, pc) values('Globi','cli','pub','inv','pc');


CREATE OR REPLACE FUNCTION notify_smart() RETURNS TRIGGER AS $$
DECLARE 
	data json;
	notification json;
BEGIN
	IF(TG_OP = 'DELETE') THEN
		data = row_to_json(OLD);
		ELSE
		data=row_to_json(NEW);
		END IF;
		notification = json_build_object('table', TG_TABLE_NAME, 'action', TG_OP, 'data',data);
		PERFORM pg_notify('on_smart_cb', notification::text);
		RETURN NULL;
		END;
		$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS notif_smart ON cladr;
CREATE TRIGGER notif_smart
AFTER UPDATE ON cladr
FOR EACH ROW EXECUTE PROCEDURE notify_smart();