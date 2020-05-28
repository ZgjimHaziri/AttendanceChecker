-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2020 at 08:42 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pd`
--

-- --------------------------------------------------------

--
-- Table structure for table `presencetable`
--

CREATE TABLE `presencetable` (
  `id` int(10) NOT NULL,
  `studentName` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `studentSurname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `course` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `week1` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `week2` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `week3` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `presencetable`
--

INSERT INTO `presencetable` (`id`, `studentName`, `studentSurname`, `email`, `course`, `week1`, `week2`, `week3`) VALUES
(1, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'PD', '', '', ''),
(2, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'PD Ushtrime', '', '', ''),
(3, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'BI', '', '', ''),
(4, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'BI Ushtrime', '', '', ''),
(5, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'PD', '', '', ''),
(6, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'PD Ushtrime', '', '', ''),
(7, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'BI', '', '', ''),
(8, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'BI Ushtrime', '', '', ''),
(9, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'PD', '', '', ''),
(10, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'PD Ushtrime', '', '', ''),
(11, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'BI', '', '', ''),
(12, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'BI Ushtrime', '', '', ''),
(13, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'PD', '', '', ''),
(14, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'PD Ushtrime', '', '', ''),
(15, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'BI', '', '', ''),
(16, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'BI Ushtrime', '', '', ''),
(17, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'PD', '', '', ''),
(18, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'PD Ushtrime', '', '', ''),
(19, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'BI', '', '', ''),
(20, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'BI Ushtrime', '', '', ''),
(21, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'PD', '', '', ''),
(22, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'PD Ushtrime', '', '', ''),
(23, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'BI', '', '', ''),
(24, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'BI Ushtrime', '', '', ''),
(25, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'PD', '', '', ''),
(26, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'PD Ushtrime', '', '', ''),
(27, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'BI', '', '', ''),
(28, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'BI Ushtrime', '', '', ''),
(29, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'PD', '', '', ''),
(30, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'PD Ushtrime', '', '', ''),
(31, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'BI', '', '', ''),
(32, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'BI Ushtrime', '', '', ''),
(33, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'PI', '', '', ''),
(34, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'PI Ushtrime', '', '', ''),
(35, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'IS', '', '', ''),
(36, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'IS Ushtrime', '', '', ''),
(37, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'Shkrim Akademik', '', '', ''),
(38, 'Loreta', 'Shala', 'loreta.shala@student.uni-pr.edu', 'Shkrim Akademik Ushtrime', '', '', ''),
(39, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'PI', '', '', ''),
(40, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'PI Ushtrime', '', '', ''),
(41, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'IS', '', '', ''),
(42, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'IS Ushtrime', '', '', ''),
(43, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'Shkrim Akademik', '', '', ''),
(44, 'Qëndresa', 'Bekaj', 'qendresa.bekaj@student.uni-pr.edu', 'Shkrim Akademik Ushtime', '', '', ''),
(45, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'PD', '', '', ''),
(46, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'PI Ushtrime', '', '', ''),
(47, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'BI', '', '', ''),
(48, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'BI Ushrime', '', '', ''),
(49, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'Shkrim Akademik', '', '', ''),
(50, 'Zgjim', 'Haziri', 'zgjim.haziri@student.uni-pr.edu', 'Shkrim Akademik Ushtrime', '', '', ''),
(51, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'PI', '', '', ''),
(52, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'PI Ushtrime', '', '', ''),
(53, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'IS', '', '', ''),
(54, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'IS Ushtrime', '', '', ''),
(55, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'Shkrim Akademik', '', '', ''),
(56, 'Rea', 'Kasumi', 'rea.kasumi@student.uni-pr.edu', 'Shkrim Akademik Ushtrime', '', '', ''),
(57, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'PI', '', '', ''),
(58, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'PI Ushtrime', '', '', ''),
(59, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'IS ', '', '', ''),
(60, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'IS Ushtrime', '', '', ''),
(61, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'Shkrim Akademik', '', '', ''),
(62, 'Vegim', 'Shala', 'vegim.shala@student.uni-pr.edu', 'Shkrim Akademik Ushtrime', '', '', ''),
(63, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'PI', '', '', ''),
(64, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'PI Ushtrime', '', '', ''),
(65, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'IS', '', '', ''),
(66, 'Behar ', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'IS Ushtrime', '', '', ''),
(67, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'Shkrim Akademik', '', '', ''),
(68, 'Behar', 'Rexhepi', 'behar.rexhepi@student.uni-pr.edu', 'Shkrim Akademik Ushtrime', '', '', ''),
(69, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'PI', '', '', ''),
(70, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'PI Ushtrime', '', '', ''),
(71, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'IS', '', '', ''),
(72, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'IS Ushtrime', '', '', ''),
(73, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'Shkrim Akademik', '', '', ''),
(74, 'Erona', 'Vrapcani', 'erona.vrapcani@student.uni-pr.edu', 'Shkrim Akademik Ushtrime', '', '', ''),
(75, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'PI', '', '', ''),
(76, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'PI Ushtrime', '', '', ''),
(77, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'IS', '', '', ''),
(78, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'IS Ushtrime', '', '', ''),
(79, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'Shkrim Akademik', '', '', ''),
(80, 'Arti', 'Sadikaj', 'arti.sadikaj@student.uni-pr.edu', 'Shkrim Akademik Ushtrime', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `presencetable`
--
ALTER TABLE `presencetable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `presencetable`
--
ALTER TABLE `presencetable`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
