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

INSERT INTO `bank` (`bankID`, `bankName`, `bankAccount`, `accountName`, `status`, `img`) VALUES
(35, 'ธนาคารทหารไทยธนชาต', '0000000002', 'คนแจ๋ว', '-', 'ทหารไทยธนชาต.jpg'),
(38, 'ธนาคารกรุงเทพ', '0000000003', 'คนหล่อ', '-', 'กรุงเทพ.jpg'),
(40, 'ธนาคารไทยพาณิชย์', '0000000000', 'คนเทพ', '-', 'ไทยพาณิชย์.jpg'),
(44, 'ธนาคารกรุงศรีอยุธยา', '0000000000', 'asaregrgrhbw', '-', 'กรุงศรี.png'),
(45, 'ธนาคารกรุงไทย', '0000000000', 'asa', '-', 'กรุงไทย.png'),
(58, 'ธนาคารกสิกรไทย', '0000000000', 'asaregrgrhbw', 'default', 'กสิกรไทย.jpg');

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

INSERT INTO `customer` (`customerID`, `companyName`, `companyNumber`, `status`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `contactName`, `contactNumber`, `contactEmail`, `timestramp`) VALUES
(24, 'ธนโชค วิโรจน์ศศิธร', '1111111111', 'บุคคลธรรมดา', 'fqwfqwfqfwq', 'สบปราบ', 'สบปราบ', 'ลำปาง', 52170, '1233555555555', 'ธนโชค วิโรจน์ศศิธร', '0994429653', 'upup2544@hotmail.com', '2022-05-18 03:53:56'),
(25, 'framar', '1000000000', 'นิติบุคคล', '42', 'แหลมสัก', 'อ่าวลึก', 'กระบี่', 81110, '1233555555555', 'ธัญญาธร ทำวง', '0994429653', 'up@hotmail.com', '2022-05-18 03:54:36'),
(26, 'เทพไทยจำกัด', '1000000000', 'นิติบุคคล', '52', 'แสนแสบ', 'มีนบุรี', 'กรุงเทพมหานคร', 10510, '1233555555555', 'ณฐกร ทำแสง', '0819601164', 'infinityp.soft@gmail.com', '2022-05-18 03:55:29');

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

INSERT INTO `employee` (`employeeID`, `employeeName`, `employeeNumber`, `employeeEmail`, `role`, `esignature`, `status`) VALUES
(1, 'ไม่ไหวไม่ไหว', '2222222201', 'upup2544@hotmail.com', 'พนักงานทั่วไป', '', '-'),
(3, 'นางหนาวจัง', '2222222221', 'up@hotmail.com', 'พนักงานทั่วไป', '', '-'),
(6, 'นายกษตรกร ครับ', '0819611546', 'infinityp.soft@gmail.com', 'ผู้ดูแล', '', 'default');

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

INSERT INTO `invoice` (`id`, `invoiceID`, `quotationID`, `customerID`, `employeeID`, `bankID`, `statusinvoice`, `dateinvoice`, `noteinvoice`, `imgslip`, `numberinstallment`, `vatstatus`, `customerstatus`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `companyName`, `priceINV`, `datereceipt`, `estatus`) VALUES
(95, '22-05-001-1', '22-05-001', 25, 3, 0, 'INCOMPLETE', '0000-00-00', '', '', 1, 'vatใน', 'นิติบุคคล', '52 ', 'ภูเวียง', 'ภูเวียง', 'ขอนแก่น', '40150', '5120120000000', 'ดอกบัวจำกัด', 4635, '0000-00-00', '0'),
(96, '22-05-001-2', '22-05-001', 25, 3, 0, 'INCOMPLETE', '0000-00-00', '', '', 2, 'vatใน', 'นิติบุคคล', '52 ', 'ภูเวียง', 'ภูเวียง', 'ขอนแก่น', '40150', '5120120000000', 'ดอกบัวจำกัด', 4635, '0000-00-00', '0'),
(97, '22-05-002-1', '22-05-002', 24, 6, 0, 'INCOMPLETE', '0000-00-00', '', '', 1, 'vatนอก', 'บุคคลธรรมดา', '52 ', 'ภูเวียง', 'ภูเวียง', 'ขอนแก่น', '40150', '5120120000000', 'ดอกบัวจำกัด', 1284, '0000-00-00', '0'),
(98, '22-05-002-2', '22-05-002', 24, 6, 0, 'INCOMPLETE', '0000-00-00', '', '', 2, 'vatนอก', 'บุคคลธรรมดา', '52 ', 'ภูเวียง', 'ภูเวียง', 'ขอนแก่น', '40150', '5120120000000', 'ดอกบัวจำกัด', 856, '0000-00-00', '0');

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

INSERT INTO `quotation` (`id`, `quotationID`, `customerID`, `employeeID`, `quotationName`, `statusquotation`, `datequotation`, `notequotation`, `statuswork`, `quantityinstallment`, `vatstatus`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `customerstatus`, `companyName`, `paymentPrice`, `summernote`, `estatus`) VALUES
(57, '22-05-001', 25, 3, 'pharma', 'Contracted', '2022-05-19', '', 'On-Going', 2, 'vatใน', '52 ', 'ภูเวียง', 'ภูเวียง', 'ขอนแก่น', '40150', '5120120000000', 'นิติบุคคล', 'ดอกบัวจำกัด', 9270, '<p><span class=\"ql-font-srisakdi\" style=\"font-size: 36px;\">take sleep</span></p>', '0'),
(58, '22-05-002', 24, 6, 'charlotte', 'Negotiation', '2022-05-20', '', 'On-Going', 2, 'vatนอก', '52 ', 'ภูเวียง', 'ภูเวียง', 'ขอนแก่น', '40150', '5120120000000', 'บุคคลธรรมดา', 'ดอกบัวจำกัด', 2140, '', '0');

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

INSERT INTO `scope` (`scopeID`, `workID`, `name`, `price`, `quantity`) VALUES
(58, '22-05-001', 'ค่าน้ำ', 5000, 1),
(59, '22-05-001', 'ค่าปู', 4000, 1),
(60, '22-05-002', 'ค่าน้ำ', 500, 1),
(61, '22-05-002', 'ค่าไฟ', 1500, 1);

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

INSERT INTO `website` (`websiteName`, `companyName`, `companyNumber`, `logo`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `stamp`) VALUES
('infinity ', 'ดอกบัวจำกัด', '5228725272', 'spider.jpg', '52 ', 'ภูเวียง', 'ภูเวียง', 'ขอนแก่น', '40150', '5120120000000', 'UOB.png');

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
