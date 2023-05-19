/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 5.7.24-0ubuntu0.18.04.1 : Database - retail
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`retail` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `retail`;

/*Table structure for table `contacts` */

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(200) DEFAULT NULL,
  `PHONE` varchar(20) DEFAULT NULL,
  `COMPANY` varchar(200) DEFAULT NULL,
  `TEL` varchar(20) DEFAULT NULL,
  `NO_KTP` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NO_KTP` (`NO_KTP`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `contacts` */

insert  into `contacts`(`ID`,`NAME`,`PHONE`,`COMPANY`,`TEL`,`NO_KTP`) values 
(1,'Tiga Roda','0812 128 3000','Tiga Roda','0800-10-37632',NULL),
(2,'Tonasa','(021) 5161160','PT Semen Tonasa','(021) 5161160',NULL),
(3,'Teguh','081 248 112 278','PT. Bima Supplier','',NULL),
(4,'Ari','081 236 785 418','PT. Bima Supplier','',NULL),
(5,'Ketut Adi','085 237 746 585','Customer','',NULL),
(7,'Gede','088 1484 1486','Customer','',NULL);

/*Table structure for table `files` */

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FILENAME` varchar(500) NOT NULL,
  `TYPE` int(4) NOT NULL,
  `HASH` text,
  `EXTENSION` varchar(10) NOT NULL,
  `UPLOADED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `STATUS` int(11) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

/*Data for the table `files` */

insert  into `files`(`ID`,`FILENAME`,`TYPE`,`HASH`,`EXTENSION`,`UPLOADED`,`STATUS`) values 
(1,'1.jpeg',0,'','.jpeg','2019-01-04 21:15:43',1),
(2,'2.jpg',0,'','.jpg','2019-01-04 21:16:30',1),
(3,'3.jpeg',0,'','.jpeg','2019-01-04 21:31:21',1),
(4,'4.jpeg',0,'','.jpeg','2019-01-04 22:51:23',1),
(5,'5.PNG',0,'','.PNG','2019-01-04 22:54:56',1),
(6,'6.PNG',0,'','.PNG','2019-01-04 22:56:41',1),
(7,'7.jpg',0,'','.jpg','2019-01-04 22:57:52',1),
(8,'8.jpg',0,'','.jpg','2019-01-04 22:58:25',1),
(9,'9.PNG',0,'','.PNG','2019-01-04 22:59:47',1),
(10,'10.jpeg',0,'','.jpeg','2019-01-04 23:13:19',1),
(11,'11.PNG',0,'','.PNG','2019-01-05 05:07:44',1),
(12,'12.jpg',0,'','.jpg','2019-01-05 05:57:47',1),
(13,'13.jpeg',0,'','.jpeg','2019-01-11 16:08:18',1),
(14,'14.jpg',0,'','.jpg','2019-01-20 23:24:59',1),
(15,'15.jpeg',0,'','.jpeg','2019-01-21 15:39:32',1),
(16,'16.jpeg',0,'','.jpeg','2019-01-21 15:40:05',1),
(17,'17.jpg',0,'','.jpg','2019-01-23 11:34:57',1),
(18,'18.png',0,'','.png','2019-01-23 11:39:17',1),
(19,'19.jpg',0,'','.jpg','2019-01-23 11:42:16',1),
(20,'20.jpg',0,'','.jpg','2019-01-23 11:44:26',1),
(21,'21.jpg',0,'','.jpg','2019-01-23 11:44:44',1),
(22,'22.jpg',0,'','.jpg','2019-01-23 11:47:32',1),
(23,'23.jpg',0,'','.jpg','2019-01-23 12:00:41',1),
(24,'24.jpg',0,'','.jpg','2019-01-23 12:03:00',1);

/*Table structure for table `items` */

DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `STATUS` int(11) DEFAULT '1',
  `ID_UNIT` bigint(20) DEFAULT NULL COMMENT 'Satuan',
  `ID_FILE_PICTURE` bigint(20) DEFAULT NULL COMMENT 'Gambar',
  `ID_USER_INPUT` bigint(20) DEFAULT NULL,
  `NAME` varchar(500) NOT NULL,
  `DATE_ENTRY` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PRICE_BUY` double DEFAULT NULL,
  `PRICE_SELL` double DEFAULT NULL,
  `CODE` text,
  `MARKUP_NOMINAL` bigint(20) DEFAULT NULL,
  `MARKUP_PERCENT` bigint(20) DEFAULT NULL,
  `PRICE_SELL_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `items_id_file_picture` (`ID_FILE_PICTURE`),
  KEY `items_id_unit` (`ID_UNIT`),
  KEY `items_id_user_input` (`ID_USER_INPUT`),
  CONSTRAINT `items_id_file_picture` FOREIGN KEY (`ID_FILE_PICTURE`) REFERENCES `files` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `items_id_unit` FOREIGN KEY (`ID_UNIT`) REFERENCES `units` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `items_id_user_input` FOREIGN KEY (`ID_USER_INPUT`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `items` */

insert  into `items`(`ID`,`STATUS`,`ID_UNIT`,`ID_FILE_PICTURE`,`ID_USER_INPUT`,`NAME`,`DATE_ENTRY`,`PRICE_BUY`,`PRICE_SELL`,`CODE`,`MARKUP_NOMINAL`,`MARKUP_PERCENT`,`PRICE_SELL_TYPE`) values 
(1,1,14,NULL,1,'Semen Tiga Roda @50Kg','2019-01-11 16:08:18',0,56500,'ST-01',10000,10,0),
(2,1,15,19,1,'Joyko Push Pin TT-11P','2019-01-20 09:10:51',0,6000,'8993988310051',1000,10,0),
(3,1,4,NULL,4,'Kenmaster Tang (BLS)','2019-01-23 11:32:49',0,59500,'4897016851223',10000,10,0),
(4,1,15,NULL,4,'Kenmaster 100 Pcs Tool Set','2019-01-23 11:39:06',0,159000,'4681358792166',10000,10,0),
(5,1,4,NULL,4,'Lampu Philips Tornado Helix Spiral (42W)','2019-01-23 11:47:32',0,70000,'8710163220628',10000,10,0),
(6,1,16,NULL,1,'Pasir Cor','2019-02-01 23:29:08',0,500000,'P-01',50000,10,0),
(7,1,17,NULL,1,'Batako Semen Besar','2019-02-01 23:36:32',0,3500,'B-01',500,10,0),
(8,1,17,NULL,1,'Batu Bata Merah (Oven)','2019-02-01 23:37:44',0,900,'B-02',600,10,0),
(9,1,17,NULL,1,'Batu Bata Merah (Biasa)','2019-02-01 23:40:26',0,825,'B-03',500,10,0),
(10,1,15,NULL,1,'Batu Pancawarna @25Kg','2019-02-01 23:45:07',0,70000,'B-04',5000,10,1),
(12,1,4,NULL,1,'Cat Vinilex @1Kg','2019-02-02 00:14:11',0,32000,'7148264893575',10000,10,0),
(13,1,4,NULL,1,'Cat Vinilex @5Kg','2019-02-02 00:21:12',0,93000,'7548236485699',10000,10,0),
(14,1,4,NULL,1,'Cat Nippon Spot-Less @2,5L','2019-02-02 00:25:25',0,146000,'7524389325634',25000,10,0),
(15,1,4,NULL,1,'Cat Nippon Weatherbond @2,5L','2019-02-02 00:28:39',0,178000,'7468231455532',30000,10,0),
(16,1,4,NULL,1,'Cat Nippon 3in1 @2,5L','2019-02-02 00:29:59',0,193000,'7388816826936',30000,10,0);

/*Table structure for table `trx_invoice` */

DROP TABLE IF EXISTS `trx_invoice`;

CREATE TABLE `trx_invoice` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `STATUS` int(11) DEFAULT NULL,
  `ID_CONTACT` bigint(20) DEFAULT NULL,
  `ID_USER` bigint(20) DEFAULT NULL,
  `CODE_INVOICE` varchar(255) DEFAULT NULL,
  `DATE` datetime DEFAULT NULL,
  `TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `trx_invoice_id_user` (`ID_USER`),
  KEY `trx_invoice_id_contact` (`ID_CONTACT`),
  CONSTRAINT `trx_invoice_id_contact` FOREIGN KEY (`ID_CONTACT`) REFERENCES `contacts` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `trx_invoice_id_user` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

/*Data for the table `trx_invoice` */

insert  into `trx_invoice`(`ID`,`STATUS`,`ID_CONTACT`,`ID_USER`,`CODE_INVOICE`,`DATE`,`TYPE`) values 
(18,1,NULL,4,'R04-20190202-001','2019-01-01 00:45:57',1),
(19,1,3,4,'S04-20190202-001','2019-01-02 09:27:25',0),
(20,1,4,4,'S04-20190202-002','2019-01-03 10:15:38',0),
(21,1,NULL,4,'S04-20190202-003','2019-01-04 10:16:00',0),
(22,1,NULL,4,'S04-20190202-004','2019-01-05 10:17:13',0),
(23,-1,4,3,'S03-20190202-001','2019-02-02 12:38:12',0),
(24,1,NULL,2,'S02-20190202-001','2019-02-02 12:39:47',0);

/*Table structure for table `trx_item` */

DROP TABLE IF EXISTS `trx_item`;

CREATE TABLE `trx_item` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `STATUS` int(11) DEFAULT NULL,
  `ID_INVOICE` bigint(20) DEFAULT NULL,
  `ID_ITEM` bigint(20) DEFAULT NULL,
  `ITEM_CODE` varchar(256) DEFAULT NULL,
  `ITEM_NAME` varchar(256) DEFAULT NULL,
  `PRICE` double DEFAULT NULL,
  `QTY` int(11) DEFAULT NULL,
  `DISC_ITEM` double DEFAULT NULL,
  `PRODUCT_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `trx_item_id_item` (`ID_ITEM`),
  KEY `trx_item_id_invoice` (`ID_INVOICE`),
  CONSTRAINT `trx_item_id_invoice` FOREIGN KEY (`ID_INVOICE`) REFERENCES `trx_invoice` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `trx_item_id_item` FOREIGN KEY (`ID_ITEM`) REFERENCES `items` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

/*Data for the table `trx_item` */

insert  into `trx_item`(`ID`,`STATUS`,`ID_INVOICE`,`ID_ITEM`,`ITEM_CODE`,`ITEM_NAME`,`PRICE`,`QTY`,`DISC_ITEM`,`PRODUCT_TYPE`) values 
(22,0,18,7,'B-01','Batako Semen Besar',2500,2000,0,0),
(23,0,18,9,'B-03','Batu Bata Merah (Biasa)',500,3000,0,0),
(24,0,18,8,'B-02','Batu Bata Merah (Oven)',700,2500,0,0),
(25,0,18,10,'B-04','Batu Pancawarna @25Kg',3000,100,0,0),
(26,0,18,16,'7388816826936','Cat Nippon 3in1 @2,5L',25000,60,0,0),
(27,0,18,14,'7524389325634','Cat Nippon Spot-Less @2,5L',20000,60,0,0),
(28,0,18,15,'7468231455532','Cat Nippon Weatherbond @2,5L',25000,40,0,0),
(29,0,18,12,'7148264893575','Cat Vinilex @1Kg',5000,50,0,0),
(30,0,18,13,'7548236485699','Cat Vinilex @5Kg',5000,50,0,0),
(31,0,18,2,'8993988310051','Joyko Push Pin TT-11P',5000,20,0,0),
(32,0,18,4,'4681358792166','Kenmaster 100 Pcs Tool Set',120000,5,0,0),
(33,0,18,3,'4897016851223','Kenmaster Tang (BLS)',40000,65,0,0),
(34,0,18,5,'8710163220628','Lampu Philips Tornado Helix Spiral (42W)',50000,10,0,0),
(35,0,18,6,'P-01','Pasir Cor',0,20,0,0),
(36,0,18,1,'ST-01','Semen Tiga Roda @50Kg',40000,30,0,0),
(37,0,19,7,'B-01','Batako Semen Besar',2750,50,0,0),
(38,0,20,3,'4897016851223','Kenmaster Tang (BLS)',44000,1,0,0),
(39,0,21,5,'8710163220628','Lampu Philips Tornado Helix Spiral (42W)',55000,1,0,0),
(40,0,22,2,'8993988310051','Joyko Push Pin TT-11P',5500,10,0,0),
(41,0,23,7,'B-01','Batako Semen Besar',2000,50,750,0),
(42,0,23,16,'7388816826936','Cat Nippon 3in1 @2,5L',27500,1,0,0),
(43,0,24,7,'B-01','Batako Semen Besar',2750,100,0,0);

/*Table structure for table `trx_payment_term` */

DROP TABLE IF EXISTS `trx_payment_term`;

CREATE TABLE `trx_payment_term` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `STATUS` int(11) DEFAULT NULL,
  `ID_INVOICE` bigint(20) DEFAULT NULL,
  `ID_TRX_PAYMENT_TERM_BEFORE` bigint(20) DEFAULT NULL,
  `TOTAL_PRICE` double DEFAULT NULL,
  `TOTAL_DISCOUNT_ITEM` double DEFAULT NULL,
  `TOTAL_DISCOUNT_GLOBAL` double DEFAULT NULL,
  `TOTAL_TAX` double DEFAULT NULL,
  `TOTAL_ARAP` double DEFAULT NULL,
  `CASH` double DEFAULT NULL,
  `CASH_RETURN` double DEFAULT NULL,
  `PERCENT_DISCOUNT_GLOBAL` double DEFAULT NULL,
  `PERCENT_TAX` double DEFAULT NULL,
  `STATE_OF_DISCOUNT_GLOBAL` smallint(6) DEFAULT NULL,
  `STATE_OF_TAX` smallint(6) DEFAULT NULL,
  `STATE_OF_ARAP` smallint(6) DEFAULT NULL,
  `STATE_OF_CASH` smallint(6) DEFAULT NULL,
  `CALC_TOTAL_DISCOUNT` double DEFAULT NULL,
  `CALC_TOTAL_TAX` double DEFAULT NULL,
  `CALC_TOTAL_ARAP` double DEFAULT NULL,
  `CALC_TOTAL_CASH` double DEFAULT NULL,
  `CALC_GRAND_TOTAL` double DEFAULT NULL,
  `DATE_COMMIT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `trx_payment_term_id_before` (`ID_TRX_PAYMENT_TERM_BEFORE`),
  KEY `trx_payment_term_id_invoice` (`ID_INVOICE`),
  CONSTRAINT `trx_payment_term_id_invoice` FOREIGN KEY (`ID_INVOICE`) REFERENCES `trx_invoice` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

/*Data for the table `trx_payment_term` */

insert  into `trx_payment_term`(`ID`,`STATUS`,`ID_INVOICE`,`ID_TRX_PAYMENT_TERM_BEFORE`,`TOTAL_PRICE`,`TOTAL_DISCOUNT_ITEM`,`TOTAL_DISCOUNT_GLOBAL`,`TOTAL_TAX`,`TOTAL_ARAP`,`CASH`,`CASH_RETURN`,`PERCENT_DISCOUNT_GLOBAL`,`PERCENT_TAX`,`STATE_OF_DISCOUNT_GLOBAL`,`STATE_OF_TAX`,`STATE_OF_ARAP`,`STATE_OF_CASH`,`CALC_TOTAL_DISCOUNT`,`CALC_TOTAL_TAX`,`CALC_TOTAL_ARAP`,`CALC_TOTAL_CASH`,`CALC_GRAND_TOTAL`,`DATE_COMMIT`) values 
(26,0,18,NULL,17750000,0,0,1775000,0,17750000,0,0,10,0,0,0,1,0,0,0,0,17750000,'2019-02-02 00:45:57'),
(27,0,19,NULL,137500,0,0,13750,87500,50000,0,0,10,0,0,1,1,0,0,0,0,137500,'2019-02-02 09:27:26'),
(28,0,19,NULL,0,0,0,0,-10000,10000,0,0,0,0,0,1,1,0,0,0,0,0,'2019-02-02 10:10:12'),
(29,0,19,NULL,0,0,0,0,-10000,10000,0,0,0,0,0,1,1,0,0,0,0,0,'2019-02-02 10:10:24'),
(30,0,19,NULL,0,0,0,0,-30000,30000,0,0,0,0,0,1,1,0,0,0,0,0,'2019-02-02 10:11:06'),
(31,0,19,NULL,0,0,10000,-1000,0,-10000,0,7.2727272727272725,0,1,0,1,1,10000,0,0,0,-10000,'2019-02-02 10:13:24'),
(32,0,20,NULL,44000,0,0,4400,44000,0,0,0,10,0,0,1,1,0,0,0,0,44000,'2019-02-02 10:15:39'),
(33,0,21,NULL,55000,0,0,5500,0,55000,0,0,10,0,0,0,1,0,0,0,0,55000,'2019-02-02 10:16:00'),
(34,0,22,NULL,55000,0,0,5500,0,55000,0,0,10,0,0,0,1,0,0,0,0,55000,'2019-02-02 10:17:13'),
(35,0,23,NULL,165000,37500,27500,10000,50000,50000,0,21.568627450980394,10,1,0,1,1,65000,0,0,0,100000,'2019-02-02 12:38:12'),
(36,0,24,NULL,275000,0,27500,27500,0,247500,-27500,10,10,0,0,0,1,0,0,0,0,275000,'2019-02-02 12:39:47');

/*Table structure for table `units` */

DROP TABLE IF EXISTS `units`;

CREATE TABLE `units` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

/*Data for the table `units` */

insert  into `units`(`ID`,`NAME`) values 
(2,'Kg'),
(4,'Pcs'),
(5,'Truk'),
(6,'Engkel'),
(7,'Lusin'),
(8,'Kwintal'),
(9,'Gram'),
(10,'Liter'),
(11,'Mililiter'),
(12,'Dus'),
(13,'Rim'),
(14,'Sak'),
(15,'Pack'),
(16,'Colt'),
(17,'Biji');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `STATUS` tinyint(4) NOT NULL,
  `USERNAME` varchar(15) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PASSWORD` text NOT NULL,
  `FULL_NAME` varchar(255) NOT NULL,
  `ID_FILE_PICTURE` bigint(20) DEFAULT NULL,
  `PRIVILEGE` tinyint(4) NOT NULL,
  `PERMISSION` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `USER_ID_FILE_PICTURE` (`ID_FILE_PICTURE`),
  CONSTRAINT `USER_ID_FILE_PICTURE` FOREIGN KEY (`ID_FILE_PICTURE`) REFERENCES `files` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`ID`,`STATUS`,`USERNAME`,`EMAIL`,`PASSWORD`,`FULL_NAME`,`ID_FILE_PICTURE`,`PRIVILEGE`,`PERMISSION`) values 
(1,1,'admin','admin@email.com','$2a$10$dpNNHdqj0myGC7JffAmhL.Cvk8K.Q9Q3PCFsWti52Q/3xF97JFYmO','Administrator',12,0,0),
(2,1,'master','master@email.com','$2a$10$Uo2Luw3c/.ZwSppF8Vm.QedcAORsLUbRIjgM2AyYEoNu9gD689NSS','Master',NULL,2,0),
(3,1,'kasir','kasir@mail.com','$2a$10$G.KSqcHCkPAO311qmdO/suVJEOSmrPCtuslWIiKIyMvF9KiaFAS/y','Kasir',NULL,1,0),
(4,1,'owner','owner@mail.com','$2a$10$8HDPsYDImOJ7vOWXy8v9Fe0b0Z5MpkYTE.GzXg50SxmJZwKYI4wfS','Owner',24,3,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
