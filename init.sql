create user 'www'@'%' identified with mysql_native_password by 'www';
grant all privileges on test.* to 'www' @'%';
use test;
create table pets (
  id varchar(50) not null,
  name varchar(100) not null,
  gender bool not null,
  birth varchar(10) not null,
  createdAt bigint not null,
  updatedAt bigint not null,
  version bigint not null,
  primary key (id)
) engine = innodb;
