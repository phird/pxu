-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2022 at 04:29 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `internproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `bankID` int(11) NOT NULL,
  `bankName` varchar(500) NOT NULL,
  `bankAccount` varchar(200) NOT NULL,
  `accountName` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank`
--


-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` int(11) NOT NULL,
  `companyName` varchar(600) NOT NULL,
  `companyNumber` varchar(100) NOT NULL,
  `status` varchar(200) NOT NULL,
  `address` varchar(500) NOT NULL,
  `subdistrict` varchar(500) NOT NULL,
  `district` varchar(500) NOT NULL,
  `province` varchar(500) NOT NULL,
  `postcode` int(11) NOT NULL,
  `taxNumber` varchar(100) NOT NULL,
  `contactName` varchar(500) NOT NULL,
  `contactNumber` varchar(100) NOT NULL,
  `contactEmail` varchar(500) NOT NULL,
  `timestramp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--


-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeID` int(11) NOT NULL,
  `employeeName` varchar(500) NOT NULL,
  `employeeNumber` varchar(100) NOT NULL,
  `employeeEmail` varchar(500) NOT NULL,
  `role` varchar(200) NOT NULL,
  `esignature` text NOT NULL,
  `status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--


-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` int(11) NOT NULL,
  `invoiceID` varchar(500) NOT NULL,
  `quotationID` varchar(500) NOT NULL,
  `customerID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL,
  `bankID` int(11) NOT NULL,
  `statusinvoice` varchar(200) NOT NULL,
  `dateinvoice` date NOT NULL,
  `noteinvoice` text NOT NULL,
  `imgslip` text NOT NULL,
  `numberinstallment` int(11) NOT NULL,
  `vatstatus` varchar(100) NOT NULL,
  `customerstatus` varchar(100) NOT NULL,
  `address` varchar(500) NOT NULL,
  `subdistrict` varchar(500) NOT NULL,
  `district` varchar(500) NOT NULL,
  `province` varchar(500) NOT NULL,
  `postcode` varchar(100) NOT NULL,
  `taxNumber` varchar(100) NOT NULL,
  `companyName` varchar(500) NOT NULL,
  `priceINV` int(11) NOT NULL,
  `datereceipt` date NOT NULL,
  `estatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice`
--


-- --------------------------------------------------------

--
-- Table structure for table `quotation`
--

CREATE TABLE `quotation` (
  `id` int(11) NOT NULL,
  `quotationID` varchar(500) NOT NULL,
  `customerID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL,
  `quotationName` varchar(500) NOT NULL,
  `statusquotation` varchar(200) NOT NULL,
  `datequotation` date NOT NULL,
  `notequotation` text NOT NULL,
  `statuswork` varchar(200) NOT NULL,
  `quantityinstallment` int(11) NOT NULL,
  `vatstatus` varchar(11) NOT NULL,
  `address` varchar(500) NOT NULL,
  `subdistrict` varchar(500) NOT NULL,
  `district` varchar(500) NOT NULL,
  `province` varchar(500) NOT NULL,
  `postcode` varchar(100) NOT NULL,
  `taxNumber` varchar(100) NOT NULL,
  `customerstatus` varchar(100) NOT NULL,
  `companyName` varchar(500) NOT NULL,
  `paymentPrice` int(11) NOT NULL,
  `summernote` longtext NOT NULL,
  `estatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quotation`
--

-- --------------------------------------------------------

--
-- Table structure for table `scope`
--

CREATE TABLE `scope` (
  `scopeID` int(11) NOT NULL,
  `workID` varchar(500) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scope`
--


-- --------------------------------------------------------

--
-- Table structure for table `website`
--

CREATE TABLE `website` (
  `websiteName` varchar(500) NOT NULL,
  `companyName` varchar(500) NOT NULL,
  `companyNumber` varchar(100) NOT NULL,
  `logo` text NOT NULL,
  `address` varchar(500) NOT NULL,
  `subdistrict` varchar(500) NOT NULL,
  `district` varchar(500) NOT NULL,
  `province` varchar(500) NOT NULL,
  `postcode` varchar(100) NOT NULL,
  `taxNumber` varchar(100) NOT NULL,
  `stamp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `website`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`bankID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeID`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quotation`
--
ALTER TABLE `quotation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scope`
--
ALTER TABLE `scope`
  ADD PRIMARY KEY (`scopeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `bankID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `quotation`
--
ALTER TABLE `quotation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `scope`
--
ALTER TABLE `scope`
  MODIFY `scopeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
