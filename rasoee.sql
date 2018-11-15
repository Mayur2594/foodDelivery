-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2018 at 03:37 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.0.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rasoee`
--

-- --------------------------------------------------------

--
-- Table structure for table `compaddress`
--

CREATE TABLE `compaddress` (
  `id` int(11) NOT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lan` double DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `companymaster`
--

CREATE TABLE `companymaster` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `owner` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `createddate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approval` int(11) DEFAULT '0',
  `reason` varchar(5000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companymaster`
--

INSERT INTO `companymaster` (`id`, `name`, `owner`, `email`, `mobile1`, `mobile2`, `createddate`, `approval`, `reason`) VALUES
(1, 'company name', 'owner name', 'email@gmail.com', 6262626726, NULL, '2018-11-10 12:01:41', 0, NULL),
(2, 'Company name 2', 'owner 2', 'email2@gmail.com', 8782372378, NULL, '2018-11-10 12:17:15', 1, NULL),
(4, 'Mhatre', 'Mayur Mhatre', 'mhatre975@gmail.com', 9768241151, NULL, '2018-11-10 12:46:32', 1, NULL),
(5, 'Mhatre', 'Mayur Mhatre', 'mhatre975@gmail.com', 9768241151, NULL, '2018-11-10 12:48:49', 1, NULL),
(6, 'mhatre12', 'mhatre32', '', 7272782782, NULL, '2018-11-09 14:51:46', 2, 'n.a');

-- --------------------------------------------------------

--
-- Table structure for table `custaddress`
--

CREATE TABLE `custaddress` (
  `id` int(11) NOT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lan` double DEFAULT NULL,
  `custid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  `email` varchar(1500) DEFAULT NULL,
  `signinthrough` varchar(100) DEFAULT NULL,
  `fbid` varchar(1500) DEFAULT NULL,
  `gmailid` varchar(1500) DEFAULT NULL,
  `pic` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `pic` varchar(500) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  `compaddressid` int(11) DEFAULT NULL,
  `activestatus` int(11) DEFAULT '0',
  `createdby` int(11) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `terms` varchar(5000) DEFAULT NULL,
  `offercode` varchar(20) DEFAULT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `orderid` int(11) DEFAULT NULL,
  `item` int(11) DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `unitrate` double DEFAULT NULL,
  `netrate` double DEFAULT NULL,
  `foodreview` varchar(5000) DEFAULT NULL,
  `foodrate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ordermaster`
--

CREATE TABLE `ordermaster` (
  `id` int(11) NOT NULL,
  `custid` int(11) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  `acceptedby` int(11) DEFAULT NULL,
  `netamount` double DEFAULT NULL,
  `cstaddressid` int(11) DEFAULT NULL,
  `compaddressid` int(11) DEFAULT NULL,
  `extranote` varchar(5000) DEFAULT NULL,
  `userreview` varchar(5000) DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orderstatus` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  `email` varchar(1500) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `pic` varchar(500) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `mobile`, `email`, `password`, `pic`, `companyid`, `createddate`) VALUES
(1, 'Mayur Mhatre', 'Superadmin', 9768241151, 'mhatre975@gmail.com', '321', NULL, NULL, '2018-11-07 12:43:13'),
(3, 'Mayur Mhatre', 'Admin', 9768241151, 'mhatre975@gmail.com', '3oBpU3', NULL, 4, '2018-11-10 12:46:32'),
(4, 'Mayur Mhatre', 'Admin', 9768241151, 'mhatre975@gmail.com', 'V87AYi', NULL, 5, '2018-11-10 12:48:49'),
(5, 'mhatre', 'Admin', 7272782782, 'mhatre975@gmail.com', 'LLySwS', NULL, 6, '2018-11-10 12:51:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compaddress`
--
ALTER TABLE `compaddress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companymaster`
--
ALTER TABLE `companymaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custaddress`
--
ALTER TABLE `custaddress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ordermaster`
--
ALTER TABLE `ordermaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compaddress`
--
ALTER TABLE `compaddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companymaster`
--
ALTER TABLE `companymaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `custaddress`
--
ALTER TABLE `custaddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ordermaster`
--
ALTER TABLE `ordermaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
