-- \i /home/globi/sex_for_many/sql/subscribe.sql
drop table if exists subscribe;
CREATE TABLE IF NOT EXISTS subscribe(
sid int not null, -- user id
did text not null -- device id
);
-- select set_subscribe(1, '4rt');
create or replace function set_subscribe(sid int, did text) returns void
language plpgsql as $$
begin
if exists(select 0 from subscribe
where subscribe.sid = set_subscribe.sid
and subscribe.did = set_subscribe.did) then
raise invalid_password using message = 'Already subscribed';
else
insert into subscribe(sid,did) values(set_subscribe.sid,set_subscribe.did);
end if;
end;
$$;
