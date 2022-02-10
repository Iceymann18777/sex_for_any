-- \i /home/globi/sex_for_many/sql/video.sql
-- \i /root/sex_for_many/sql/video.sql
drop table if exists video;
create table video(
r_id int not null, -- model id
nick varchar(16) unique not null references buser(bname),
src text, -- video src
poster text, -- video poster src
crat TIMESTAMP  NOT NULL default now()::timestamp, -- created at
v int not null default 0 -- how much users views the video
); 
