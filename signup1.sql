-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2025 at 03:29 PM
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
-- Database: `signup1`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('employee','employer') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `email`, `password`, `role`) VALUES
(1, 'harshitha0020@gmail.com', 'abc@09', 'employee'),
(2, 'abc3@gmail.com', 'abc@09', 'employer'),
(3, 'abc2@gmail.com', 'abc@09', 'employee'),
(4, 'newsignup@gmail.com', 'abc@09', 'employee'),
(5, 'new@gmail.com', 'abc@09', 'employer'),
(6, 'harshitha20@gmail.com', 'abc@09', 'employer'),
(7, 'harshitha@gmail.com', 'abc@09', 'employee');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `github_link` text DEFAULT NULL,
  `technical_language` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `professional_title` varchar(255) DEFAULT NULL,
  `alternate_phone` varchar(20) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `full_name`, `gender`, `qualification`, `email`, `phone`, `experience`, `github_link`, `technical_language`, `resume`, `age`, `city`, `professional_title`, `alternate_phone`, `profile_photo`) VALUES
(1, 'K Harshitha', 'female', 'BE(CSE)', 'harshitha0020@gmail.com', '9491602701', '2', 'https://github.com/Harshitha0320', 'C,Python', '1748429719892.pdf', '20', 'hyderabad', 'Software Developer', '9491602701', NULL),
(2, 'Tina', 'female', 'BE(CSE)', 'harshitha0020@gmail.com', '9491602701', '1', 'https://github.com/Harshitha0320', 'C,Python', '1748436221080.pdf', '19', 'hyderabad', 'HR', '8765432109', NULL),
(3, 'K Harshitha', 'female', 'BE(CSE)', 'harshitha0020@gmail.com', '9491602701', '1', 'https://github.com/Harshitha0320', 'C,Python', '1748517055195.pdf', '18', 'hyderabad', 'HR', '8765432109', NULL),
(6, 'Sai', 'male', 'BE(CSE)', 'harshitha0020@gmail.com', '9491602701', '2', 'https://github.com/Harshitha0320', 'C,Python', '1748522006370.pdf', NULL, NULL, NULL, NULL, NULL),
(11, 'K Harshitha', 'female', 'BE(CSE)', 'harshitha0020@gmail.com', '9491602701', '2.5', 'https://github.com/Harshitha0320', 'C,Python', '1748608009681.pdf', '20', 'hyderabad', 'Software Developer', '8491602701', NULL),
(12, 'K Harshitha', 'female', 'BE(CSE)', 'abc2@gmail.com', '9491602701', '1.5', 'https://github.com/Harshitha0320', 'C,Python', '1749020944976-924372525.pdf', '20', 'hyderabad', 'Software Developer', '8765432109', '1749020944967-590619650.jpg'),
(13, 'Sushmitha', 'female', 'M.E(CSE)', 'abc2@gmail.com', '1239874567', '3', 'https://github.com/sushmithaa0320', 'C,Python,Java', '1749025159431-365010915.pdf', '21', 'Hyderabad', 'SDE II', '9087654321', '1749025159426-743597392.jpg'),
(14, 'Sushmitha', 'female', 'M.E(CSE)', 'abc2@gmail.com', '1239874567', '3', 'https://github.com/sushmithaa0320', 'C,Python,Java', '1749040952986-386587089.pdf', '21', 'Hyderabad', 'SDE III', '9087654321', '1749040952983-849081429.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
