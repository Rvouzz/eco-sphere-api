-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Bulan Mei 2024 pada 10.24
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eco_sphere`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `contents`
--

CREATE TABLE `contents` (
  `contentId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `wasteId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `contents`
--

INSERT INTO `contents` (`contentId`, `name`, `description`, `wasteId`) VALUES
(1, 'anorganik', 'lorem', 1),
(2, 'Organik', 'lorem', 1),
(4, 'Kaca', 'lorem', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `recycling`
--

CREATE TABLE `recycling` (
  `recyclingId` int(11) NOT NULL,
  `steps` varchar(255) DEFAULT NULL,
  `wasteId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `recycling`
--

INSERT INTO `recycling` (`recyclingId`, `steps`, `wasteId`) VALUES
(1, 'lorem', 1),
(3, 'lorem', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `nama_depan` varchar(11) NOT NULL,
  `nama_belakang` varchar(11) NOT NULL,
  `img_profile` blob NOT NULL,
  `role` enum('User','Admin') NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `waste`
--

CREATE TABLE `waste` (
  `wasteId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `characteristics` varchar(255) DEFAULT NULL,
  `impacts` varchar(255) DEFAULT NULL,
  `recyclingId` int(11) DEFAULT NULL,
  `contentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `waste`
--

INSERT INTO `waste` (`wasteId`, `name`, `description`, `characteristics`, `impacts`, `recyclingId`, `contentId`) VALUES
(1, 'Plastik', 'lorem', 'lorem', 'lorem', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`contentId`),
  ADD KEY `wasteId_idx` (`wasteId`);

--
-- Indeks untuk tabel `recycling`
--
ALTER TABLE `recycling`
  ADD PRIMARY KEY (`recyclingId`),
  ADD KEY `wasteId_idx` (`wasteId`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `waste`
--
ALTER TABLE `waste`
  ADD PRIMARY KEY (`wasteId`),
  ADD KEY `categoryId_idx` (`contentId`),
  ADD KEY `recyclingId_idx` (`recyclingId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `contents`
--
ALTER TABLE `contents`
  MODIFY `contentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `recycling`
--
ALTER TABLE `recycling`
  MODIFY `recyclingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `waste`
--
ALTER TABLE `waste`
  MODIFY `wasteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `contents`
--
ALTER TABLE `contents`
  ADD CONSTRAINT `wasteId` FOREIGN KEY (`wasteId`) REFERENCES `waste` (`wasteId`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `waste`
--
ALTER TABLE `waste`
  ADD CONSTRAINT `contentId` FOREIGN KEY (`contentId`) REFERENCES `contents` (`contentId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `recyclingId` FOREIGN KEY (`recyclingId`) REFERENCES `recycling` (`recyclingId`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
