create database tradecred;
use tradecred;

create table invoices(
inv_number varchar(50),
amount int,
inv_date varchar(50),
billed_to varchar(50),
billed_by varchar(50),
type_of enum ("REG", "DBN", "OTH", "CDN"),
primary key (inv_number)
);

drop table invoices;

insert into invoices(inv_number, amount, inv_date, billed_to, billed_by, type_of)
	values("INV0010", 500, str_to_date('01-01-2020', '%d-%m-%Y'), "VEN001", "VEN0010", "REG");
    
select * from invoices;


