-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2026 at 01:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `echs_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `echs_member`
--

CREATE TABLE `echs_member` (
  `echs_member_id` int(11) NOT NULL,
  `official_name` varchar(200) NOT NULL,
  `cmp_address` text NOT NULL,
  `cmp_phone` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `gender` varchar(200) NOT NULL,
  `rank` varchar(200) NOT NULL,
  `echs_card_no` varchar(200) NOT NULL,
  `aadhar_no` varchar(200) NOT NULL,
  `bank_account_no` varchar(200) NOT NULL,
  `bank_ifsc_code` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `echs_member`
--

INSERT INTO `echs_member` (`echs_member_id`, `official_name`, `cmp_address`, `cmp_phone`, `email`, `gender`, `rank`, `echs_card_no`, `aadhar_no`, `bank_account_no`, `bank_ifsc_code`, `password`) VALUES
(22, 'Suresh Krishna', 'Suresh House 6789 street road', '8907689056', 'suresh@gmail.com', 'male', 'captain', '7890', '778912346754', '789044566112', '8940', 'suresh'),
(23, 'Gina Jacob', 'Gina House Puthenparamb 780 road', '8902349007', 'gina@gmail.com', 'female', 'captain', '6789', '789055643333', '890599034522', '8321', 'gina'),
(24, 'Monisha Mohan', 'Xyz House 7th ward', '8967045398', 'monisha@gmail.com', 'female', 'captain', '6700', '444453267847', '890733217865', '6654', 'monisha'),
(25, 'Sarasu', 'Sarasu House', '134567227', 'sarasu@gmail.com', 'female', 'Captain', '3454', '34567788888', '35567788', 'dfg5433', 'sarasu');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `usertype` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`, `usertype`) VALUES
('admin@gmail.com', 'admin', 'admin'),
('gina@gmail.com', 'gina', 'user'),
('monisha@gmail.com', 'monisha', 'user'),
('sarasu@gmail.com', 'sarasu', 'user'),
('suresh@gmail.com', 'suresh', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `medical_bill`
--

CREATE TABLE `medical_bill` (
  `mbill_id` int(11) NOT NULL,
  `created_date` date NOT NULL,
  `bill_year` int(200) NOT NULL,
  `bill_month` int(200) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `fk_echs_member_id` int(11) NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical_bill`
--

INSERT INTO `medical_bill` (`mbill_id`, `created_date`, `bill_year`, `bill_month`, `total_amount`, `fk_echs_member_id`, `status`) VALUES
(16, '2024-12-23', 2024, 12, 1490, 24, 'paid'),
(17, '2024-12-23', 2024, 10, 680, 23, 'Pending'),
(18, '2024-12-23', 2022, 8, 5400, 22, 'paid'),
(19, '2025-01-16', 2020, 2, 430, 22, 'Pending'),
(20, '2025-01-16', 2019, 1, 350, 22, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `medical_bill_items`
--

CREATE TABLE `medical_bill_items` (
  `item_id` int(11) NOT NULL,
  `bill_no` varchar(200) NOT NULL,
  `bill_date` date NOT NULL,
  `total_bill_amount` varchar(200) NOT NULL,
  `fk_mbill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical_bill_items`
--

INSERT INTO `medical_bill_items` (`item_id`, `bill_no`, `bill_date`, `total_bill_amount`, `fk_mbill_id`) VALUES
(16, '11345', '2024-12-05', '890', 16),
(17, '11230', '2024-12-21', '600', 16),
(18, '1209', '2024-12-01', '680', 17),
(19, '1230', '2022-10-23', '5400', 18),
(20, '2345', '2020-02-16', '430', 19),
(21, '345', '2019-01-13', '350', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `echs_member`
--
ALTER TABLE `echs_member`
  ADD PRIMARY KEY (`echs_member_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `medical_bill`
--
ALTER TABLE `medical_bill`
  ADD PRIMARY KEY (`mbill_id`),
  ADD KEY `fk_echs_member_id` (`fk_echs_member_id`);

--
-- Indexes for table `medical_bill_items`
--
ALTER TABLE `medical_bill_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `fk_mbill_id` (`fk_mbill_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `echs_member`
--
ALTER TABLE `echs_member`
  MODIFY `echs_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `medical_bill`
--
ALTER TABLE `medical_bill`
  MODIFY `mbill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `medical_bill_items`
--
ALTER TABLE `medical_bill_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
