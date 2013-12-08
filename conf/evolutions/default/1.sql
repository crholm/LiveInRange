# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table address (
  id                        bigint auto_increment not null,
  city                      varchar(255),
  street_address            varchar(255),
  constraint pk_address primary key (id))
;

create table listing (
  booli_id                  bigint auto_increment not null,
  list_price                bigint,
  published                 date,
  object_type               varchar(255),
  rooms                     double,
  living_area               double,
  additional_area           double,
  plot_area                 double,
  construction_year         integer,
  floor                     double,
  rent                      double,
  url                       longtext,
  location_id               bigint,
  source_name               varchar(255),
  constraint pk_listing primary key (booli_id))
;

create table location (
  id                        bigint auto_increment not null,
  region_id                 varchar(255),
  address_id                bigint,
  position_id               bigint,
  constraint pk_location primary key (id))
;

create table position (
  id                        bigint auto_increment not null,
  latitude                  double,
  longitude                 double,
  transit_time_to_center    integer,
  constraint pk_position primary key (id))
;

create table region (
  id                        varchar(255) not null,
  municipality_name         varchar(255),
  county_name               varchar(255),
  constraint pk_region primary key (id))
;

create table source (
  name                      varchar(255) not null,
  url                       varchar(255),
  type                      varchar(255),
  constraint pk_source primary key (name))
;

alter table listing add constraint fk_listing_location_1 foreign key (location_id) references location (id) on delete restrict on update restrict;
create index ix_listing_location_1 on listing (location_id);
alter table listing add constraint fk_listing_source_2 foreign key (source_name) references source (name) on delete restrict on update restrict;
create index ix_listing_source_2 on listing (source_name);
alter table location add constraint fk_location_region_3 foreign key (region_id) references region (id) on delete restrict on update restrict;
create index ix_location_region_3 on location (region_id);
alter table location add constraint fk_location_address_4 foreign key (address_id) references address (id) on delete restrict on update restrict;
create index ix_location_address_4 on location (address_id);
alter table location add constraint fk_location_position_5 foreign key (position_id) references position (id) on delete restrict on update restrict;
create index ix_location_position_5 on location (position_id);



# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table address;

drop table listing;

drop table location;

drop table position;

drop table region;

drop table source;

SET FOREIGN_KEY_CHECKS=1;

