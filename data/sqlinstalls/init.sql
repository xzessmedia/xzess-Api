-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.5.1-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportiere Datenbank Struktur für xzessapi
CREATE DATABASE IF NOT EXISTS `xzessapi` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `xzessapi`;

-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle xzessapi.files
CREATE TABLE IF NOT EXISTS `files` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UploadedAt` datetime DEFAULT NULL,
  `OriginalFilename` varchar(255) DEFAULT NULL,
  `EncodingInfo` varchar(255) DEFAULT NULL,
  `MimeType` varchar(255) DEFAULT NULL,
  `Size` float DEFAULT NULL,
  `StorageDestination` varchar(255) DEFAULT NULL,
  `Filename` varchar(255) DEFAULT NULL,
  `Path` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT 'ANY',
  `AdditionalData` longtext NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Date
-- Daten Export vom Benutzer nicht ausgewählt

-- Exportiere Struktur von Tabelle xzessapi.requestlog
CREATE TABLE IF NOT EXISTS `requestlog` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RequestedAt` varchar(50) DEFAULT NULL,
  `AccessedRoute` varchar(255) DEFAULT NULL,
  `User` varchar(150) DEFAULT NULL,
  `RemoteIP` varchar(35) DEFAULT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `Payload` longtext DEFAULT NULL,
  `ResponseTime` float DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `AccessedRoute` (`AccessedRoute`),
  KEY `RemoteIP` (`RemoteIP`),
  KEY `User` (`User`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;


-- Exportiere Struktur von Tabelle xzessapi.files
CREATE TABLE IF NOT EXISTS `files` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UploadedAt` datetime DEFAULT NULL,
  `OriginalFilename` varchar(255) DEFAULT NULL,
  `EncodingInfo` varchar(255) DEFAULT NULL,
  `MimeType` varchar(255) DEFAULT NULL,
  `Size` float DEFAULT NULL,
  `StorageDestination` varchar(255) DEFAULT NULL,
  `Filename` varchar(255) DEFAULT NULL,
  `Path` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT 'ANY',
  `AdditionalData` longtext NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.5.1-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Exportiere Struktur von Tabelle lieferdienst.logs
CREATE TABLE IF NOT EXISTS `logs` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `LoggedAt` datetime NOT NULL,
  `Type` varchar(50) COLLATE utf8mb4_german2_ci NOT NULL,
  `Message` varchar(50) COLLATE utf8mb4_german2_ci NOT NULL DEFAULT '',
  `Source` longtext COLLATE utf8mb4_german2_ci DEFAULT NULL,
  `StoreId` int(11) DEFAULT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.5.1-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Exportiere Struktur von Tabelle glasshouse.setting
CREATE TABLE IF NOT EXISTS `setting` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `SettingKey` varchar(512) NOT NULL,
  `SettingValue` text NOT NULL,
  `ValueType` varchar(512) NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Daten Export vom Benutzer nicht ausgewählt

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

-- Daten Export vom Benutzer nicht ausgewählt

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


-- Daten Export vom Benutzer nicht ausgewählt

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


-- Daten Export vom Benutzer nicht ausgewählt

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
