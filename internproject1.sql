-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2022 at 09:41 AM
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
  `bankstatus` varchar(500) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`bankID`, `bankName`, `bankAccount`, `accountName`, `bankstatus`, `img`) VALUES
(35, 'ธนาคารทหารไทยธนชาต', '0000000002', 'คนแจ๋ว', '-', 'ทหารไทยธนชาต.jpg'),
(38, 'ธนาคารกรุงเทพ', '0000000003', 'คนหล่อ', 'default', 'กรุงเทพ.jpg'),
(40, 'ธนาคารไทยพาณิชย์', '0000000000', 'คนเทพ', '-', 'ไทยพาณิชย์.jpg'),
(44, 'ธนาคารกรุงศรีอยุธยา', '0000000000', 'asaregrgrhbw', '-', 'กรุงศรี.png'),
(45, 'ธนาคารกรุงไทย', '0000000000', 'asa', '-', 'กรุงไทย.png'),
(58, 'ธนาคารกสิกรไทย', '0000000000', 'asaregrgrhbw', '-', 'กสิกรไทย.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` int(11) NOT NULL,
  `companyName` varchar(600) NOT NULL,
  `companyNumber` varchar(100) NOT NULL,
  `customerstatus` varchar(200) NOT NULL,
  `caddress` varchar(500) NOT NULL,
  `csubdistrict` varchar(500) NOT NULL,
  `cdistrict` varchar(500) NOT NULL,
  `cprovince` varchar(500) NOT NULL,
  `cpostcode` varchar(100) NOT NULL,
  `ctaxNumber` varchar(100) NOT NULL,
  `contactName` varchar(500) NOT NULL,
  `contactNumber` varchar(100) NOT NULL,
  `contactEmail` varchar(500) NOT NULL,
  `timestramp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerID`, `companyName`, `companyNumber`, `customerstatus`, `caddress`, `csubdistrict`, `cdistrict`, `cprovince`, `cpostcode`, `ctaxNumber`, `contactName`, `contactNumber`, `contactEmail`, `timestramp`) VALUES
(24, 'ธนโชค วิโรจน์ศศิธร', '1111111111', 'บุคคลธรรมดา', 'fqwfqwfqfwq', 'สบปราบ', 'สบปราบ', 'ลำปาง', '52170', '1233555555555', 'ธนโชค วิโรจน์ศศิธร', '0994429653', 'upup2544@hotmail.com', '2022-05-18 03:53:56'),
(25, 'framar', '1000000000', 'นิติบุคคล', '42', 'แหลมสัก', 'อ่าวลึก', 'กระบี่', '81110', '1233555555555', 'ธัญญาธร ทำวง', '0994429653', 'up@hotmail.com', '2022-05-18 03:54:36'),
(26, 'เทพไทยจำกัด', '1000000000', 'นิติบุคคล', '52', 'แสนแสบ', 'มีนบุรี', 'กรุงเทพมหานคร', '10510', '1233555555555', 'ณฐกร ทำแสง', '0819601164', 'infinityp.soft@gmail.com', '2022-05-18 03:55:29'),
(27, 'jjpark', '5200000000', 'นิติบุคคล', '42 ถ.ลูกเสือ', 'สบตุ๋ย', 'เมืองลำปาง', 'ลำปาง', '52100', '1233555555555', 'ธนากร วิโรจน์ศศิธร', '0945555023', 'thanyakorn@hotmail.com', '2022-05-19 06:56:30');

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
  `employeestatus` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employeeID`, `employeeName`, `employeeNumber`, `employeeEmail`, `role`, `esignature`, `employeestatus`) VALUES
(1, 'ไม่ไหวไม่ไหว', '2222222201', 'upup2544@hotmail.com', 'พนักงานทั่วไป', '', '-'),
(3, 'นางหนาวจัง', '2222222221', 'up@hotmail.com', 'พนักงานทั่วไป', '', '-'),
(6, 'นายมิกิ อาษาวงค์', '0618096661', 'infinityp.soft@gmail.com', 'ผู้ดูแล', '', 'default');

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
  `wcompanyName` varchar(500) NOT NULL,
  `wcompanyNumber` varchar(100) NOT NULL,
  `priceINV` int(11) NOT NULL,
  `datereceipt` date NOT NULL,
  `estatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `invoiceID`, `quotationID`, `customerID`, `employeeID`, `bankID`, `statusinvoice`, `dateinvoice`, `noteinvoice`, `imgslip`, `numberinstallment`, `vatstatus`, `customerstatus`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `wcompanyName`, `wcompanyNumber`, `priceINV`, `datereceipt`, `estatus`) VALUES
(130, '22-05-001-1', '22-05-001', 27, 6, 0, 'INCOMPLETE', '0000-00-00', '', '', 1, 'vatนอก', 'นิติบุคคล', '633/144 หมู่บ้านกาญจน์กนกทาวน์โฮม4 ', 'หนองจ๊อม', 'สันทราย', 'เชียงใหม่', '50210', '0503561005794', 'หจก.อินฟินิตี้ ฟีโนมีนอล ซอฟท์แวร์ (Infinity Phenomenal Software)', '052005509', 35200, '0000-00-00', '0'),
(131, '22-05-001-2', '22-05-001', 27, 6, 0, 'INCOMPLETE', '0000-00-00', '', '', 2, 'vatนอก', 'นิติบุคคล', '633/144 หมู่บ้านกาญจน์กนกทาวน์โฮม4 ', 'หนองจ๊อม', 'สันทราย', 'เชียงใหม่', '50210', '0503561005794', 'หจก.อินฟินิตี้ ฟีโนมีนอล ซอฟท์แวร์ (Infinity Phenomenal Software)', '052005509', 35200, '0000-00-00', '0');

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
  `wcompanyName` varchar(500) NOT NULL,
  `wcompanyNumber` varchar(100) NOT NULL,
  `paymentPrice` int(11) NOT NULL,
  `summernote` longtext NOT NULL,
  `estatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quotation`
--

INSERT INTO `quotation` (`id`, `quotationID`, `customerID`, `employeeID`, `quotationName`, `statusquotation`, `datequotation`, `notequotation`, `statuswork`, `quantityinstallment`, `vatstatus`, `address`, `subdistrict`, `district`, `province`, `postcode`, `taxNumber`, `customerstatus`, `wcompanyName`, `wcompanyNumber`, `paymentPrice`, `summernote`, `estatus`) VALUES
(72, '22-05-001', 27, 6, 'charlotte', 'Negotiation', '2022-05-20', '', 'On-Going', 2, 'vatนอก', '633/144 หมู่บ้านกาญจน์กนกทาวน์โฮม4 ', 'หนองจ๊อม', 'สันทราย', 'เชียงใหม่', '50210', '0503561005794', 'นิติบุคคล', 'หจก.อินฟินิตี้ ฟีโนมีนอล ซอฟท์แวร์ (Infinity Phenomenal Software)', '052005509', 70400, '', '0');

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
(74, '22-05-002', 'ค่าไฟ', 65000, 1),
(75, '22-05-003', 'ค่าน้ำ', 5000, 1),
(76, '22-05-003', 'ค่าไฟ', 5000, 1),
(77, '22-05-004', 'cloud server', 52000, 1),
(78, '22-05-004', 'hardware', 14000, 1),
(79, '22-05-004', 'could server', 65000, 1),
(80, '22-05-001', 'could server', 60000, 1),
(81, '22-05-001', 'harddrive', 4000, 1);

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
('infinity p soft', 'หจก.อินฟินิตี้ ฟีโนมีนอล ซอฟท์แวร์ (Infinity Phenomenal Software)', '052005509', 'spider.jpg', '633/144 หมู่บ้านกาญจน์กนกทาวน์โฮม4 ', 'หนองจ๊อม', 'สันทราย', 'เชียงใหม่', '50210', '0503561005794', 'UOB.png');

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
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `quotation`
--
ALTER TABLE `quotation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `scope`
--
ALTER TABLE `scope`
  MODIFY `scopeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
