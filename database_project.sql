-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2020 at 06:42 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webpro`
--
CREATE DATABASE IF NOT EXISTS `webpro` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `webpro`;

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `carID` int(11) NOT NULL,
  `name_car` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `TypecarID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`carID`, `name_car`, `capacity`, `TypecarID`) VALUES
(18, 'รถเมล์สายสีเขียว', 35, 1),
(19, 'ซิตี้บัส', 35, 1),
(20, 'รถสองแถวสีฟ้า', 10, 1),
(21, 'รถตุ๊กตุ๊ก', 4, 2),
(23, 'แท็กซี่', 5, 2),
(24, 'รถตู้บลู', 13, 2),
(25, 'รถเช่า', 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hotel`
--

CREATE TABLE `hotel` (
  `hotelID` int(11) NOT NULL,
  `name_hotel` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pic_hotel` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price_per_day` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hotel`
--

INSERT INTO `hotel` (`hotelID`, `name_hotel`, `pic_hotel`, `price_per_day`) VALUES
(13, 'มานอนนี่', '1607161453818_มานอนนี่.jpg,', 880),
(14, 'ในสวน เบด แอนด์ เบรกฟาสต์', '1607161477637_ในสวน.jpg,', 999),
(15, 'บ้านนอนเพลิน', '1607161554675_นอนเพลิน.jpg,', 782),
(16, 'โรงแรม รสา บูทีค เชียงราย', '1607161576934_รสา.jpg,', 948),
(17, 'The Loft @chiangrai', '1607161608911_ลอฟ.jpg,', 513),
(18, 'Nangnon Hill Hug Hotel', '1607161669330_นางนอน.jpg,', 749),
(19, 'ปิยะพรฮิลล์ พาราไดซ์', '1607161713872_ปิยะพร.jpg,', 362),
(20, 'Maesai Complex Hotel ', '1607161803516_แม่สาย.jpg,', 361),
(21, 'โรงแรมขันทองคำ', '1607161824330_ขันทอง.jpg,', 896);

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `placeID` int(11) NOT NULL,
  `name_place` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pic_place` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `info_place` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `price_place` double DEFAULT NULL,
  `timeopen_place` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeclose_place` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CloseDay` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `typeplaceID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`placeID`, `name_place`, `pic_place`, `info_place`, `price_place`, `timeopen_place`, `timeclose_place`, `CloseDay`, `typeplaceID`) VALUES
(12, 'ขุนน้ำนางนอน', '1607152983596_ขุนน้ำนางนอน.jpg,', 'น้ำมีสีเขียวมรกตมองดูแล้วสบายตา สามารถนั่งเล่นดื่มด่ำธรรมชาติ ที่มีต้นไม้สูงใหญ่เงียบสงบ มีพันธุ์ไม่หาอยาก มีสะพานเดินชมป่าพรุ ชมไม้ป่าพรุและ ชมปูดอกข้อแดง', 0, '08:00', '17:00', 'none', 4),
(13, 'วัดร่องขุ่น', '1607153165653_วัดร่องขุ่น.jpg,', 'ออกแบบและก่อสร้างโดยอาจารย์เฉลิมชัย โฆษิตพิพัฒน์ ซึ่งปรารถนาจะสร้างวัดให้เหมือนเมืองสวรรค์ที่มนุษย์สัมผัสได้ เริ่มสร้างตั้งแต่ พ.ศ.2540 จากเดิมมีเนื้อที่3 ไร่ ได้ซื้อที่ดินเพิ่มและมีผู้บริจาคคือคุณวันชัย วิชญชาคร จนปัจจุบันมีเนื้อที่9 ไร่ และมีพระกิตติพงษ์ กัลยาโณ รักษาการเจ้าอาวาสองค์ปัจจุบัน', 0, '06:30', '18:00', 'none', 2),
(14, 'ไร่ชาฉุยฟง', '1607153736841_ไร่ชาฉุยฟง.jpg,', 'ไร่ชาฉุยฟง แหล่งเพาะปลูกใบชาชื่อดัง ที่เปิดให้นักท่องเที่ยวได้เข้ามาสัมผัสกับบรรยากาศของไร่ชาได้อย่างใกล้ชิด อีกทั้งยังมีร้านคาเฟ่บริเวณด้านบนให้นักท่องเที่ยวได้มานั่งจิบชา', 0, '08:30', '17:30', 'none', 1),
(15, 'วัดร่องเสือเต้น', '1607153866619_ร่องเสือเต้น.jpg,', 'ไฮไลต์ที่สำคัญอยู่ที่พระอุโบสถสีน้ำเงินที่สร้างขึ้น ด้วยศิลปะแบบไทยประยุกต์ที่มีศิลปะที่มีความสวยงดงามแปลกตาจากฝีมือการรังสรรค์ของ นายพุทธา  กาบแก้ว หรือ สล่านก ศิลปินท้องถิ่นชาวเชียงราย ซึ่งเคยเป็นลูกศิษย์ของ อ.เฉลิมชัย โฆษิตพิพัฒน์ เป็นศิลปะประยุกต์ที่เป็นเอกลักษณ์ใช้เฉดสีเป็นสีน้ำเงินฟ้าตัดกับสีทอง ลวดลายต่างๆ ที่พริ้วไหว', 0, '07:00', '20:00', 'none', 2),
(16, 'สวนแม่ฟ้าหลวง', '1607153996053_สวนแม่ฟ้า.jpg,', 'สถานที่ท่องเที่ยวเชิงธรรมชาติที่เต็มไปด้วยความสวยสดงดงามของดอกไม้นานาพันธุ์บนพื้นที่กว่า 25 ไร่ ไม่ว่าจะเป็น ดอกกุหลาบ ดอกพิทูเนีย และต้นไม้ยืนต้นอีกนานาชนิด โดยดอกไม้แต่ละสายพันธ์ุก็จะผันเปลี่ยนไปตามฤดูกาล ให้นักท่องเที่ยวได้เดินทางมาเยี่ยมชมความสวยงามในรูปแบบที่แตกต่างกันออกไปตามแต่ฤดูกาล เพราะฉะนั้นหากใครที่จะเดินทางมาท่องเที่ยวที่สถานที่แห่งนี้แล้วละก็สามารถเดินทางมาได้ตลอดทั้งปีเลยทีเดียว', 220, '07:00', '18:00', 'none', 4),
(17, 'เชียงรายไนท์บาร์ซ่า', '1607154163585_ไนท์บาร์ซ่า.jpg,', 'เชียงรายไนท์บาซาร์ ถนนคนเดินใจกลางเมืองเชียงรายที่เต็มไปด้วยผู้คนมากมายเดินทางออกมาจับจ่ายใช้สอยสินค้าต่างๆ ไม่ว่าจะเป็นสินค้าพื้นเมือง เสื้อผ้า งานศิลปหัตถกรรมต่างๆ รวมไปถึงของฝากที่ระลึก เครื่องประดับ และอาหารสตรีทฟู้ด', 0, '18:00', '23:00', 'none', 1),
(18, 'ภูชี้ฟ้า', '1607154354781_ภูชี้ฟ้า02.jpg,1607154356320_ภูชี้ฟ้า01.jpg,', 'สถานที่บริเวณยอดดอยบนสุดที่เต็มไปด้วยทะเลหมอกมากมายในยามเช้า ท่ามกลางบรรยากาศธรรมชาติอันหนาวเย็นรายล้อมไปด้วยความสวยงามของวิวทิวทัศน์เทือกเขาดอยผาหม่น ซึ่งติดกับบริเวณชายแดนไทย-ลาวที่ทอดยอดออกไปจนเกิดเป็นสัญลักษณ์ที่มีความโดดเด่นของภูเขาซึ่งพุ่งตรงเป็นแนวยาวชี้ไปทางฝากฝั่งลาว จนทำให้เกิดเป็นชื่อที่เรียกกันมาถึงปัจจุบันว่า ภูชี้ฟ้า', 0, '06:30', '20:00', 'none', 4),
(19, 'วัดห้วยปลากั้ง', '1607154633863_วัดห้วยปลากั้ง02.jpg,1607154634803_วัดห้วยปลากั้ง01.jpg,', 'จุดเด่นของภายในวัดแห่งนี้นั้นก็คือ พบโชคธรรมเจดีย์ ซึ่งเป็นเจดีย์ที่มีความสูงกว่า 9 ชั้น ถูกออกแบบมาในสไตล์จีนผสมล้านนา จึงทำให้เกิดออกมาเป็นเจดีย์สีแดงขนาดสูงใหญ่ทรงแหลมที่มีความแปลกตาประดับประดาไปด้วยรูปปั้นของมังกรล้อมรอบตัวเจดีย์ จนกลายมาเป็นความสวยงามของศิลปะสองรูปแบบได้อย่างลงตัว', 0, '07:00', '21:30', 'none', 2),
(20, 'พาคลับ', '1607154910447_พาคลับ.jpg,', 'สถานที่สุดพีคของเพื่อนๆ ขาแดนซ์ที่เลือกเป็นคำตอบแรกและคำตอบสุดท้าย! ใครที่ชอบฟังเพลงตื๊ดๆ หนักๆ อยากกระโดดโลดเต้นสุดสวิงริงโก้ ที่นี่คือสวรรค์ของขาแดนซ์แน่นอน บรรยากาศร้านกว้างขวางตระการตา มีชั้นลอยให้มองมาจากมุมสูง เห็นวิวแดนซ์ได้เต็มสุดลูกหูลูกตาเลยจริงๆ', 120, '21:00', '02:00', 'none', 3),
(22, 'พิพิธภัณฑ์บ้านดำ', '1607155778339_บ้านดำ.jpg,', 'สร้างขึ้นโดย อ.ถวัลย์ ดัชนี ศิลปินแห่งชาติที่มีฝีมือทางด้านจิตรกรรม ปฏิมากรรม ได้สร้างงานด้านศิลปะไว้มากมาย ทั้งทางด้านภาพเขียนและด้านปฏิมากรรมหลายชิ้น ถึงแม้อ.ถวัลย์จะถึงแก่อนิจกรรมไปแล้ว แต่บ้านดำ ก็ยังเปิดให้นักท่องเที่ยวได้เข้ามาสัมผัสความงดงามของที่แตกต่างไม่เหมือนใคร   ลักษณะของบ้านดำจะเป็นกลุ่มบ้าน ศิลปะแบบล้านนา ทุกหลังทาด้วยสีดำ ซึ่งเป็นที่มาของคำว่า “บ้านดำ”', 80, '09:00', '17:00', 'none', 1),
(23, 'วัดทรายขาว', '1607156099565_วัดทรายขาว2.jpg,1607156099859_วัดทรายขาว.jpg,', 'วัดที่มีความสวยงามมาก ในอดีตเคยมีสำนักสงฆ์ตั้งอยู่บริเวณน้ำตกทราย ขาว ชาวบ้านเรียกกันว่า นาลานน้ำ มีลักษณะเป็นศาลาปลูกอยู่กลางน้ำเป็นสถานที่ใช้ประกอบกิจของสงฆ์ เนื่องจากความยากลำบากในการคมนาคม จึงได้ย้ายลงมายังบริเวณวัดทรายขาวในปัจจุบัน ภายในวัดมีพระอุโบสถ ทรงกลมยอดแหลม ประดับตกแต่งอย่างสวยงามวิจิตรบรรจง และมีเจดีย์พระครูธรรมกิจโกศล (พ่อท่านนอง ธมฺมภูโต) อดีตเจ้าอาวาส ซึ่งเป็นพระเถระที่มีจริรวัตรงดงามเปี่ยมด้วยพรหมวิหารธรรม มากด้วยบารมี สมถะและเรียบง่าย', 0, '08:00', '17:00', 'none', 2),
(25, 'ดอยผาฮี้', '1607157327193_ผาฮี้2.jpg,1607157327488_ผาฮี้.jpg,', 'แหล่งปลูกกาแฟที่ขึ้นชื่อของเชียงราย ที่คัดสรรเมล็ดกาแฟคุณภาพเยี่ยมส่งขายตามร้านกาแฟต่างๆ ทั่วประเทศ ไม่เพียงแต่ชื่อเสียงในเรื่องของกาแฟเท่านั้น แต่ถ้าพูดถึงวิวทิวทัศน์ของบ้านผาฮี้ก็โดดเด่นไม่แพ้กัน เพราะที่ตั้งอยู่บนดอยสูงโอบล้อมด้วยทิวเขาที่สวยงามและมีรูปร่างแปลกตา มีร้านกาแฟและทีพัก มองเห็นมวิวเบื้องหน้าเป็นภูเขาและผืนป่าเขียวขจี มีมุมนั่งเล่นห้อยขาชมวิวสุดเก๋ ให้พักผ่อนสัมผัสบรรยากาศได้อย่างเต็มที่', 0, '06:00', '06:00', 'none', 4),
(26, 'ไร่บุญรอด สิงปาร์ค', '1607157810337_สิงปาร์ค2.jpg,1607157810640_สิงปาร์ค.jpg,', 'สิงห์ปาร์ค หรือ ไร่บุญรอด คือหนึ่งในแลนด์มาร์ที่ต้องแวะเช็คอินถ่ายรูป โดยเฉพาะกับสิงห์ตัวยักษ์สีเหลืองทองด้านหน้าทางเข้า ภายในไร่มีกิจกรรมน่าสนใจมากมาย ทั้งการนั่งรถรางชมไร่ ซึ่งมีพื้นที่กว่า 8,000 ไร่ ปลูกพืชผัก ผลไม้ไว้หลายชนิด', 0, '08:00', '17:00', 'none', 1),
(27, 'วัดพระแก้ว', '1607158015097_วัดพระแก้ว.jpg,', 'หนึ่งในวัดสำคัญของจังหวัดเชียงราย เพราะเป็นสถานที่ค้นพบพระแก้วมรกต โดยในสมัยพระเจ้าสามฝั่งแกน ได้เกิดฟ้าผ่าเจดีย์ร้างองค์หนึ่งจนพังทลายลงมา และพบว่ามีพระพุทธรูปลงรักปิดทองตกลงมา เมื่อรักกระเทาะออกจึงเห็นเป็นแก้วสีเขียวทั้งองค์', 0, '08:00', '17:00', 'none', 2),
(28, 'ตลาดแม่สาย', '1607158177435_ตลาดแม่สาย.jpg,', 'ตลาดแม่สาย แหล่งช้อปปิ้งสินค้าพื้นเมืองและสินค้าราคาถูก เช่น สบู่สมุนไพร เครื่องทองเหลือง ขนมขบเคี้ยว เสื้อผ้า กระเป๋า รองเท้า และของใช้ทั่วไป', 0, '06:00', '18:00', 'none', 1),
(29, 'สามเหลี่ยมทองคำ', '1607158369402_สามเหลี่ยม.jpg,', 'สามเหลี่ยมทองคำ คือพื้นที่รอยต่อระหว่าง 3 ประเทศ คือไทย ลาว และเมียนมาร์ มีลักษณะเป็นพื้นที่สามเหลี่ยมมาบรรจบกันโดยมีแม่น้ำโขงตัดผ่านชายแดนไทยและลาว เป็นจุดสำคัญทางเศรษฐกิจและเป็นแหล่งท่องเที่ยวที่สำคัญ', 0, '08:00', '18:00', 'none', 1),
(30, 'ดอยแม่สลอง', '1607158960819_แม่สลอง2.jpg,1607158961732_แม่สลอง.jpg,', 'ดอยแม่สลอง ตั้งอยู่ ต.แม่สลองนอก อ.แม่ฟ้าหลวง เป็นที่อยู่อาศัยของชุมชนชาวจีนฮ่อ แห่งกองพล 93 ที่ตั้งหลักแหล่งบนดอย แห่งนี้มานาน ปัจจุบันชุมชนชาวจีนบนดอยแม่สลอง มีชื่อว่า หมู่บ้านสันติคีรี ตั้งอยู่ที่ความสูงจากระดับน้ำทะเล เฉลี่ย 1,200 ม. มีทัศนียภาพที่สวยงามและอากาศ เย็นสบายตลอดปี รายได้หลักมาจากการปลูกชาอู่หลง', 0, '09:00', '16:00', 'none', 4),
(31, 'young โสด', '1607159478320_ยังโสด.jpg,', 'ร้านอาหารและบาร์ อยู่ย่านแหล่งบันเทิงใจกลางเมืองเชียงราย ที่เปิดมาเอาใจขาดริ๊งก์เพื่อเป็นแลนด์มาร์คใหม่ของวัยรุ่นหนุ่มหล่อสาวสวยเชียงราย  ใครที่เป็นนักดื่ม ชอบปาร์ตี้สังสรรค์ หรือมองหาร้านนั่งชิลล์หลังเลิกงานต้องไม่พลาด เป็นร้านอาหารและนั่งดื่ม ของเหล่าวัยรุ่นและคนทำงาน ที่ทุกค่ำคืนจะมีนักร้องขึ้นมาเล่นดนตรีสดหมุนเวียนเปลี่ยนกันขึ้นมาสร้างความสนุกสนานขับกล่อมเสียงเพลง', 100, '17:00', '12:00', 'none', 3),
(32, 'เคลิ้ม', '1607159822441_เคลิ้ม.jpg,', 'ร้านเคลิ้ม (Klerm) ร้านอาหารไทย บรรยากาศสบายๆ ตกแต่งแบบเรียบง่าย มีทั้งโซนห้องรับประทานอาหารและโซนสำหรับรับลมโล่งแจ้ง ร้านสะอาดตาดูร่มรื่น มีดนตรีสดและอาหารหลากหลายให้เลือกรับประทาน', 100, '18:00', '12:30', 'none', 3),
(33, 'The Library', '1607160111075_ห้องหมุด.jpg,', 'THE​ LIBRARY​ CHIANGRAI ห้องสมุดยามราตรี กลางเมืองเชียงราย โลเคชั่นไม่ลึกลับซับซ้อน บรรยากาศ​ดี ดนตรีเพราะ มีเครื่องดื่มให้เลือกหลากหลาย โดย บาร์เทนเดอร์​เชียวประสบการณ์​ ที่หนอนหนังสือไม่ควรพลาด', 100, '19:00', '02:00', 'none', 3),
(34, 'ท่าอากาศยานแม่ฟ้าหลวง เชียงราย', '1607162047706_สนามบิน.jpg,', '404 หมู่ 10 ถนนพหลโยธิน ตำบลบ้านดู่ อำเภอเมือง จังหวัดเชียงราย 57100', 0, '06:00', '06:00', 'none', 1),
(35, 'สถานีขนส่งเชียงราย', '1607162129687_ขนส่ง.jpg,', 'ถนนพหลโยธิน ตำบลสันทราย อำเภอเมืองเชียงราย จังหวัดเชียงราย 57000 ประเทศไทย', 0, '06:00', '06:00', 'none', 1);

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `planID` int(11) NOT NULL,
  `count_selectOfshare` int(11) DEFAULT NULL,
  `status_share` tinyint(4) DEFAULT NULL,
  `hotelID` int(11) DEFAULT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `route` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`planID`, `count_selectOfshare`, `status_share`, `hotelID`, `user_ID`, `route`, `status`) VALUES
(14, 0, 0, 14, 26, '15,15,16,12', 1),
(15, 2, 1, 14, 27, '17,17,19,20,22,12', 1),
(16, 0, 1, 16, 26, '16,22,14,12', 1),
(17, 2, 1, 14, 27, '33,35,33,32,31,29', 0),
(19, 1, 1, 14, 26, '33,15,26,22,22', 1),
(20, 0, 0, 14, 34, '33,35,33,32,31,29', 0),
(21, 0, 0, 14, 34, '17,17,19,20,22,12', 1),
(22, 0, 1, 13, 39, '34,15,22,13,19,14', 1),
(25, 0, 1, 14, 40, '13,,26', 1),
(28, 0, 0, 14, 46, '12,13,23', 1),
(32, 1, 1, NULL, 26, '20,27,31,12', 1),
(33, 0, 0, NULL, NULL, '20,27,31,12', 0),
(34, 0, 0, 14, NULL, '33,15,26,22,22', 0);

-- --------------------------------------------------------

--
-- Table structure for table `route`
--

CREATE TABLE `route` (
  `Route_ID` int(11) NOT NULL,
  `Origin` int(11) DEFAULT NULL,
  `Destination` int(11) DEFAULT NULL,
  `carID` int(11) DEFAULT NULL,
  `price_route` double DEFAULT NULL,
  `time_route` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `place_in_route` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `route`
--

INSERT INTO `route` (`Route_ID`, `Origin`, `Destination`, `carID`, `price_route`, `time_route`, `place_in_route`) VALUES
(6, 34, 12, 23, 300, '00:58', '15,22,14,'),
(7, 34, 13, 20, 80, '00:24', '26,'),
(8, 34, 15, 20, 30, '00:10', '27,'),
(9, 34, 14, 23, 400, '00:45', '15,22,13,19,'),
(10, 34, 16, 23, 650, '00:55', '19,13,22,26,'),
(11, 34, 17, 19, 30, '00:15', '32,31,33,'),
(12, 34, 18, 25, 600, '01:59', '32,31,33,22,'),
(13, 34, 19, 18, 10, '00:12', '26,15,13,'),
(16, 34, 22, 18, 10, '00:15', '26,15,13,'),
(17, 34, 20, 18, 10, '00:18', '13,'),
(18, 34, 23, 23, 300, '00:24', '33,31,27,'),
(20, 34, 25, 25, 600, '00:50', '13,'),
(22, 34, 26, 19, 30, '00:24', '13,'),
(23, 34, 27, 18, 10, '00:15', '13,26,'),
(24, 34, 28, 18, 60, '01:10', '26,13,15,19,22,'),
(25, 34, 29, 25, 600, '01:06', '26,13,15,19,22,'),
(26, 34, 30, 25, 600, '01:20', '22,19,15,'),
(27, 34, 31, 24, 50, '00:19', '13,'),
(28, 34, 32, 24, 50, '00:09', '13,'),
(29, 34, 33, 21, 150, '00:20', '33,31,27,32,'),
(30, 34, 35, 19, 30, '00:22', '13,26,'),
(31, 35, 12, 25, 600, '01:09', '15,22,19,14,'),
(32, 35, 13, 18, 10, '00:11', '26,'),
(33, 35, 14, 25, 600, '01:28', '22,15,19,'),
(34, 35, 15, 18, 10, '00:16', '32,31,33,17,'),
(35, 35, 16, 23, 500, '01:11', '22,15,19,34,27,'),
(36, 35, 18, 19, 20, '00:12', ''),
(37, 35, 18, 25, 600, '02:03', '15,'),
(38, 35, 19, 20, 30, '00:22', NULL),
(39, 35, 20, 21, 70, '00:08', NULL),
(41, 35, 22, 18, 50, '00:28', '15,19,27,'),
(42, 35, 23, 24, 60, '00:30', NULL),
(43, 35, 25, 25, 600, '01:08', '19,15,22,'),
(44, 35, 26, 23, 150, '00:15', NULL),
(45, 35, 27, 20, 30, '00:15', NULL),
(46, 35, 28, 23, 450, '01:18', '22,19,15,14,'),
(47, 35, 29, 23, 400, '01:17', '15,19,22,'),
(48, 35, 29, 25, 600, '01:35', '15,19,22,'),
(49, 35, 31, 19, 20, '00:09', NULL),
(50, 35, 32, 24, 50, '00:18', NULL),
(51, 35, 33, 19, 20, '00:08', NULL),
(52, 12, 13, 20, 80, '01:15', '15,26,22,'),
(53, 12, 14, 23, 250, '00:36', NULL),
(54, 12, 15, 23, 450, '01:01', '22,19,14,'),
(55, 12, 16, 25, 600, '01:17', NULL),
(56, 12, 17, 20, 80, '01:08', '34,22,15,27,'),
(57, 12, 18, 25, 600, '02:46', ''),
(58, 12, 19, 23, 350, '01:04', '22,14,'),
(59, 12, 20, 23, 350, '01:12', '22,19,15,'),
(60, 12, 22, 18, 60, '00:53', '14,'),
(61, 12, 23, 25, 600, '01:36', '13,'),
(62, 12, 25, 25, 600, '00:33', NULL),
(63, 12, 26, 24, 90, '01:15', '14,15,19,22,'),
(64, 12, 27, 20, 85, '01:05', '14,15,19,22,'),
(65, 12, 28, 21, 60, '00:18', NULL),
(66, 12, 29, 23, 200, '00:32', NULL),
(67, 12, 30, 25, 600, '01:28', '14,'),
(68, 12, 31, 23, 250, '01:11', '15,19,22,'),
(69, 12, 32, 23, 200, '00:59', '15,19,22,14,'),
(70, 12, 33, 19, 30, '01:11', '15,19,22,14,'),
(71, 13, 12, 25, 3000, '04:30', '15,16,17,19,20,22,27,31,32,33,34,35,'),
(72, 13, 14, 25, 900, '04:00', '15,16,17,19,20,22,26,27,31,32,33,34,35,'),
(73, 13, 15, 20, 700, '02:00', '17,19,20,22,27,31,32,33,35,'),
(74, 13, 16, 20, 600, '02:30', '20,22,26,27,'),
(75, 13, 17, 21, 450, '01:45', '20,31,32,33,35,'),
(76, 13, 18, 25, 700, '04:30', ''),
(77, 13, 19, 25, 500, '02:45', '33,35,32,31,27,22,20,17,'),
(78, 13, 20, 23, 600, '02:00', '17,35,'),
(79, 13, 22, 25, 500, '02:00', '35,33,32,31,27,20,17,'),
(80, 13, 23, 25, 600, '01:00', '17,20,22,27,31,32,33,35,'),
(81, 13, 25, 25, 600, '02:45', '12,14,15,16,17,19,20,22,23,26,27,31,32,33,34,35,'),
(82, 13, 26, 25, 1500, '00:10', ''),
(83, 13, 27, 25, 300, '01:00', '35,33,32,31,23,22,20,17,'),
(84, 13, 28, 25, 500, '05:00', '12,14,15,16,17,19,20,22,23,25,26,27,31,30,32,33,35,34,'),
(85, 13, 29, 25, 1000, '02:30', '17,22,23,27,35,'),
(86, 13, 30, 25, 600, '03:00', '35,34,33,32,31,27,22,17,15,16,14,'),
(87, 13, 31, 25, 600, '00:45', '17,20,32,33,35,'),
(88, 13, 32, 25, 600, '00.30', '33,32,31,20,17,'),
(89, 13, 33, 25, 600, '00:30', '17,20,32,31,35,'),
(90, 13, 34, 25, 400, '01:30', '35,20,'),
(91, 13, 35, 25, 300, '00:20', ''),
(92, 14, 12, 25, 500, '00:30', ''),
(93, 14, 13, 25, 600, '01:45', '14,15,16,17,18,19,20,22,23,26,27,31,32,33,34,35,'),
(98, 14, 15, 23, 500, '00:49', '22,34,'),
(99, 14, 16, 24, 150, '00:32', ''),
(100, 14, 17, 23, 400, '00:56', '34,15,22,'),
(101, 14, 18, 25, 600, '02:29', ''),
(102, 14, 19, 23, 400, '00:49', '22,'),
(103, 14, 20, 25, 600, '01:01', '22,15,34,'),
(104, 14, 22, 18, 50, '00:40', ''),
(105, 14, 23, 25, 600, '01:22', '15,13,19,22,'),
(106, 14, 25, 20, 60, '00:26', '14,'),
(107, 14, 26, 25, 600, '01:02', '15,19,22,'),
(108, 14, 27, 25, 600, '00:55', '22,19,15,34,'),
(109, 14, 28, 24, 80, '00:36', ''),
(110, 14, 29, 23, 450, '00:51', ''),
(111, 14, 30, 25, 600, '01:13', ''),
(112, 14, 31, 25, 600, '01:00', '27,15,17,'),
(113, 14, 32, 23, 450, '00:45', '22,34,'),
(114, 14, 33, 23, 350, '01:00', '15,27,'),
(115, 15, 16, 24, 80, '00:59', ''),
(116, 15, 17, 19, 30, '00:10', ''),
(117, 15, 18, 25, 600, '01:58', ''),
(118, 15, 19, 24, 30, '00:11', ''),
(119, 15, 20, 24, 30, '00:13', '17,27,'),
(120, 15, 22, 19, 20, '00:15', ''),
(121, 15, 23, 20, 50, '00:20', ''),
(122, 15, 25, 25, 600, '01:18', '34,22,'),
(123, 15, 26, 23, 250, '00:21', ''),
(124, 15, 27, 21, 50, '00:06', ''),
(125, 15, 28, 25, 600, '01:04', '22,14,'),
(126, 15, 29, 25, 600, '01:14', '22,19,'),
(127, 15, 30, 25, 600, '01:22', '22,34,'),
(128, 15, 31, 18, 10, '00:13', ''),
(129, 15, 32, 18, 10, '00:04', ''),
(130, 15, 33, 18, 10, '00:13', ''),
(131, 16, 17, 23, 700, '01:17', '22,15,19,14,'),
(132, 16, 18, 25, 800, '02:42', '14,'),
(133, 16, 19, 25, 600, '01:01', '14,15,22,'),
(134, 16, 20, 25, 600, '01:11', '19,15,22,14,'),
(135, 16, 22, 23, 550, '00:52', '14,'),
(136, 16, 23, 24, 90, '01:34', '13,26,'),
(137, 16, 25, 25, 700, '00:34', ''),
(138, 16, 26, 23, 450, '01:14', '22,15,19,'),
(139, 16, 27, 25, 600, '01:05', '19,15,22,'),
(140, 16, 28, 18, 50, '00:37', ''),
(141, 16, 29, 23, 800, '00:56', ''),
(142, 16, 30, 25, 750, '01:23', ''),
(143, 16, 31, 24, 120, '01:11', '22,19,15,'),
(144, 16, 33, 25, 600, '01:11', '15,14,19,22,'),
(145, 17, 18, 25, 750, '02:02', ''),
(146, 17, 19, 19, 40, '00:16', ''),
(147, 17, 20, 19, 40, '00:07', ''),
(148, 17, 22, 18, 30, '00:20', '27,15,19,'),
(149, 17, 23, 23, 300, '00:24', ''),
(150, 17, 25, 25, 600, '01:24', '19,15,22,'),
(151, 17, 26, 24, 50, '00:18', ''),
(152, 17, 27, 21, 40, '00:06', ''),
(153, 17, 28, 25, 600, '01:11', ''),
(154, 17, 29, 23, 500, '01:11', ''),
(155, 17, 30, 25, 900, '01:29', ''),
(156, 17, 31, 21, 50, '00:07', ''),
(157, 17, 32, 20, 30, '00:08', ''),
(158, 17, 33, 20, 30, '00:07', ''),
(159, 18, 19, 25, 800, '02:08', '22,34,15,27,'),
(160, 18, 20, 23, 900, '02:02', ''),
(161, 18, 22, 23, 850, '02:06', ''),
(162, 18, 23, 25, 700, '02:17', ''),
(163, 18, 25, 25, 1000, '02:36', ''),
(164, 18, 26, 25, 800, '02:13', '13,'),
(165, 18, 27, 25, 750, '02:04', '15,'),
(166, 18, 28, 25, 900, '02:41', ''),
(167, 18, 29, 23, 850, '02:11', ''),
(168, 18, 30, 25, 1200, '03:12', ''),
(169, 18, 31, 25, 800, '02:03', ''),
(170, 18, 32, 23, 750, '02:01', ''),
(171, 18, 33, 25, 800, '02:03', ''),
(172, 19, 20, 19, 60, '00:20', ''),
(173, 19, 22, 24, 30, '00:14', ''),
(174, 19, 23, 20, 60, '00:16', ''),
(175, 19, 25, 25, 650, '01:18', '14,22,'),
(176, 19, 26, 18, 30, '00:18', ''),
(177, 19, 27, 21, 50, '00:10', ''),
(178, 19, 28, 18, 80, '01:05', '22,15,14,'),
(179, 19, 29, 25, 600, '01:17', '22,15,'),
(180, 19, 30, 25, 800, '01:22', '15,22,'),
(181, 19, 31, 20, 60, '00:19', '17,'),
(182, 19, 32, 24, 40, '00:10', ''),
(183, 19, 33, 19, 30, '00:19', '17,27,'),
(184, 20, 22, 19, 30, '00:22', '17,15,34,'),
(185, 20, 23, 23, 250, '00:24', ''),
(186, 20, 25, 23, 700, '01:01', '22,15,19,'),
(187, 20, 26, 23, 150, '00:18', ''),
(188, 20, 27, 21, 50, '00:09', ''),
(189, 20, 28, 25, 650, '01:13', '22,19,15,'),
(190, 20, 29, 23, 500, '01:10', '15,22,19,'),
(191, 20, 30, 25, 600, '01:30', '19,34,22,15,27,'),
(192, 20, 31, 21, 35, '00:06', ''),
(193, 20, 32, 23, 70, '00:12', '17,15,'),
(194, 20, 33, 23, 40, '00:06', ''),
(195, 22, 23, 24, 60, '00:31', ''),
(196, 22, 25, 23, 350, '00:43', '14,'),
(197, 22, 26, 23, 300, '00:30', '19,'),
(198, 22, 27, 18, 60, '00:22', '17,15,'),
(199, 22, 28, 18, 80, '00:55', '14,'),
(200, 22, 29, 23, 300, '00:59', ''),
(201, 22, 30, 25, 600, '01:12', ''),
(202, 22, 31, 23, 350, '00:29', '19,27,17,15,'),
(203, 22, 32, 23, 100, '00:16', ''),
(204, 22, 33, 23, 230, '00:29', '17,27,15,'),
(205, 23, 25, 25, 600, '01:02', '15,19,22,14,'),
(206, 23, 26, 23, 200, '00:19', ''),
(207, 23, 27, 23, 150, '00:19', ''),
(208, 23, 28, 18, 80, '01:13', '22,19,15,'),
(209, 23, 29, 23, 500, '01:15', '15,22,19,'),
(210, 23, 30, 25, 750, '01:30', '19,22,15,'),
(211, 23, 31, 24, 60, '00:24', '27,'),
(212, 23, 32, 23, 250, '00:19', '19,15,'),
(213, 23, 33, 23, 150, '00:24', ''),
(214, 25, 26, 25, 500, '01:07', '13,'),
(215, 25, 27, 25, 600, '00:57', '22,19,15,'),
(216, 25, 28, 20, 60, '00:17', ''),
(217, 25, 29, 23, 350, '00:36', ''),
(218, 25, 30, 25, 800, '01:17', ''),
(219, 25, 31, 25, 600, '01:17', '15,19,22,'),
(220, 25, 32, 19, 40, '00:50', ''),
(221, 25, 33, 24, 60, '01:04', ''),
(222, 26, 27, 19, 30, '00:15', ''),
(223, 26, 28, 20, 90, '01:13', ''),
(224, 26, 29, 23, 250, '01:17', '13,'),
(225, 26, 30, 25, 700, '01:31', '13,15,22,19,'),
(226, 26, 31, 24, 60, '00:18', ''),
(227, 26, 32, 23, 150, '00:19', '15,27,'),
(228, 26, 33, 23, 100, '00:17', ''),
(229, 27, 28, 20, 80, '01:04', '22,19,15,'),
(230, 27, 29, 25, 600, '01:10', '15,34,19,22,'),
(231, 27, 30, 25, 800, '01:23', '22,19,34,15,'),
(232, 27, 31, 21, 50, '00:10', ''),
(233, 27, 32, 19, 30, '00:05', ''),
(234, 27, 33, 19, 30, '00:10', ''),
(235, 28, 29, 25, 600, '00:32', ''),
(236, 28, 30, 25, 800, '01:31', '14,'),
(237, 28, 31, 20, 80, '01:14', '22,15,19,'),
(238, 28, 32, 20, 90, '01:02', '19,15,22,'),
(239, 28, 33, 18, 50, '01:14', '22,19,15,'),
(240, 29, 30, 25, 700, '01:34', ''),
(241, 29, 31, 25, 600, '01:16', '15,19,22,'),
(242, 29, 32, 25, 650, '01:05', '22,19,15,14,'),
(243, 29, 33, 25, 650, '01:17', '14,19,15,22,'),
(244, 30, 31, 25, 800, '01:27', '22,19,15,'),
(245, 30, 32, 25, 800, '01:15', '15,22,19,'),
(246, 30, 33, 25, 800, '01:27', '19,22,15,'),
(247, 31, 32, 18, 10, '00:12', '15,17,'),
(248, 31, 33, 23, 35, '00:01', ''),
(249, 32, 33, 23, 75, '00:12', '17,15,'),
(250, 22, 19, 23, 200, '00:17', ''),
(251, 25, 12, 25, 600, '00:30', ''),
(252, 15, 12, 18, 1500, '.02:00', '14,16,'),
(253, 15, 13, 18, 900, '01:00', '17,19,23,31,32,33,35,'),
(254, 15, 14, 18, 500, '01:00', '16,'),
(255, 15, 27, 18, 400, '00:45', '23,'),
(256, 15, 35, 18, 250, '00:35', '17,20,22,23,31,32,');

-- --------------------------------------------------------

--
-- Table structure for table `typecar`
--

CREATE TABLE `typecar` (
  `TypecarID` int(11) NOT NULL,
  `nameType_car` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `typecar`
--

INSERT INTO `typecar` (`TypecarID`, `nameType_car`) VALUES
(1, 'รถประจำทาง'),
(2, 'รถรับจ้าง');

-- --------------------------------------------------------

--
-- Table structure for table `typeplace`
--

CREATE TABLE `typeplace` (
  `typeplaceID` int(11) NOT NULL,
  `nametype_place` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `typeplace`
--

INSERT INTO `typeplace` (`typeplaceID`, `nametype_place`) VALUES
(1, 'ทั่วไป'),
(2, 'วัด'),
(3, 'สถานบันเทิง'),
(4, 'ที่ท่องเที่ยวธรรมชาติ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_ID` int(11) NOT NULL,
  `user_Name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `user_Password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `user_Email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_Role` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_ID`, `user_Name`, `user_Password`, `user_Email`, `user_Role`) VALUES
(24, 'punonly', '$2b$10$obkOTZtY1NIYml.dmL066.NkGwx6y0YciE2hoSC/4qIVFo6A5.a1W', 'ksm_punn@hotmail.com', 1),
(25, 'fern', '$2b$10$ppsnPA.7mgyWpnx3mEtus.9lgXPoHiufuETudq.b49URjixanzwGi', '6231302004@lamduan.mfu.ac.th', 1),
(26, 'pun', '$2b$10$aqmNhYku4WaQhW7dtT6yUeRnOOVBtISnMJ8.LgJ0VrW5ggPurhUpO', '6231302011@lamduan.mfu.ac.th', 2),
(27, 'test', '$2b$10$Y..9mP4DXvdHoHrR/pcym.doav1s457g2rNpo.nolYkmFQKQmy8L6', 'ksm_punn@hotmail.com', 2),
(28, 'aumaim', '$2b$10$sZELao0DmgsK9mHfRseUreKkJVz6MDnrg6Q5hQnJqTDK6N/xGIbVS', '', 1),
(29, 'hunnie', '$2b$10$kNoIkGMzd31RU4Th.gobv.7hL3/eeD69MK8rdf85aU7m1oQoOpaW6', 'fernjoodz@gmail.com', 2),
(30, 'pun1', '$2b$10$f.4kRytPkEQWMj6uEeOzNOw06T2MQMIdRhiTuS5E7XDTSjDCJlhce', 'ksm_punn@hotmail.com', 2),
(31, 'Korn', '$2b$10$8zkrdQgbPRIuAJup5BZWLepmkPLqRsJsrmeX/.G89xW/DwSGHNTrK', 'kirn.aloha@hotmail.com', 2),
(32, 'kannikar_ksm', '$2b$10$dzwhxrHwNhw9e6MG6yyg1e/0o9RLjstkw7D2aORBc9qIOQbYO7gYq', 'kannikar60@hotmail.com', 2),
(33, 'im', '$2b$10$qwvqjxPZZ9xd0SX4JBmfsuRx4xcNXNIw4NQQXBLYKtEBLdS0eHMw6', 'aim.wow@gmail.com', 2),
(34, 'dog', '$2b$10$Zj7g/aPzNcfiDq4zC/clt.Ggcd.2hTmy4bBG/VuQkAmxmC8bdwzla', 'ksm_punn@hotmail.com', 2),
(37, 'op', '$2b$10$lc/Lb6CTjWboyfuXfN2oYOJGLTTMffGbPgN6Qv/yCHRoKTkONLZwO', 'ksm_punn@hotmail.com', 2),
(38, 'Aimaim', '$2b$10$UWZH2QsHjmjbRLZC9SuwdOukhv5e0fN/s1C5RgwUaW3UCc0zatgEy', 'tida.3112@gmail.com', 2),
(39, 'xxx', '$2b$10$EL4ngiX1oH3SzmBQzhDUnOgbfRMTpJ6sYZnF0ZOEbeZI4umlDQqrm', 'zhvwino1@gmail.com', 2),
(40, 'sommai', '$2b$10$ZF6FRNVoBQO5aYCS6A2njegIEbqtE6Lq9P38GEClUyj/zNeAyE/OS', 'aimaim.3112@gmail.com', 2),
(41, 'kk', '$2b$10$mmTF6VVx/P.NWWPhrSXWuuNWoVjLy/QjkaskTTO5JV5YYf5zvX4OK', 'haha@hotmail.com', 2),
(42, 'kk', '$2b$10$VpkgKk7LburbwsUX2CHBP.JO0D6xQMYQ79LQIGHZ6ttQ.oGs3XKdq', 'haha@hotmail.com', 2),
(43, 'ปัน', '$2b$10$2BupAJDsQ.Js5RzZmPaDPe0ZviSjXFkqQ5aw8JgaHBlIbd9Ff7B9C', 'punkongsomboon150@gmail.com', 2),
(44, 'marvel', '$2b$10$9JarrdTrypTdNs3hPmit5usE7H/vNnGfw7XfdcVggmTF9iip94FEa', 'kk@hotmail.com', 2),
(45, 'Surface', '$2b$10$Ro6b8CVCbYNRR6F08Fdjb.HOjS4vyM26XQZiu.eqJh.QvlvHNYyb.', 'punkongsomboon150@gmail.com', 2),
(46, 'mm', '$2b$10$KhGlAF2qHKcuFihIDJjsjuhfhGIbybMoISCiu6Zhdsr5xJQ6AOeQi', 'mm@hotmail.com', 2),
(47, 'ee', '$2b$10$Wt1GWeEgyDz3MdqiIQRggOi.FNX.PcpLIBGlXFB9/kxjRD..LZu.O', 'eee@ee.vom', 2),
(48, 'pwhale', '$2b$10$3F2dbLlyfmfYw06leel1fe4DTgcHYihdDGRnd9uieLUSGF7DYSrh2', 'lonelywhale@gmail.com', 2),
(49, 'boraprae', '$2b$10$eTfr2VPXZPgUJ05D/1h6be2QvYdClBgD5bCNuAqOAs4Q/6TvrqPbq', 'boraprae@gmail.com', 2),
(50, 'test1', '$2b$10$VJu5LFgHy6TV1ZNa62j6eeM3FxY9c4/cxAfT.ooHC605RoW7.JCdG', 'punkongsomboon@gmail.com', 2),
(51, 'surface1', '$2b$10$nhS/DBlXO9Vcar4MEgiH4u9Ntm8QDqAuFIohLIb2qiD5IHDnuYcKC', 'punkongsomboon@gmail.com', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`carID`),
  ADD KEY `TypecarID` (`TypecarID`);

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`hotelID`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`placeID`),
  ADD KEY `typeplaceID` (`typeplaceID`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`planID`),
  ADD KEY `hotelID` (`hotelID`),
  ADD KEY `user_ID` (`user_ID`);

--
-- Indexes for table `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`Route_ID`),
  ADD KEY `Origin` (`Origin`),
  ADD KEY `Destination` (`Destination`),
  ADD KEY `carID` (`carID`);

--
-- Indexes for table `typecar`
--
ALTER TABLE `typecar`
  ADD PRIMARY KEY (`TypecarID`);

--
-- Indexes for table `typeplace`
--
ALTER TABLE `typeplace`
  ADD PRIMARY KEY (`typeplaceID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `carID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE `hotel`
  MODIFY `hotelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `placeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `planID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `route`
--
ALTER TABLE `route`
  MODIFY `Route_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT for table `typecar`
--
ALTER TABLE `typecar`
  MODIFY `TypecarID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `typeplace`
--
ALTER TABLE `typeplace`
  MODIFY `typeplaceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`TypecarID`) REFERENCES `typecar` (`TypecarID`);

--
-- Constraints for table `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `place_ibfk_1` FOREIGN KEY (`typeplaceID`) REFERENCES `typeplace` (`typeplaceID`);

--
-- Constraints for table `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`hotelID`) REFERENCES `hotel` (`hotelID`),
  ADD CONSTRAINT `plan_ibfk_2` FOREIGN KEY (`user_ID`) REFERENCES `users` (`user_ID`);

--
-- Constraints for table `route`
--
ALTER TABLE `route`
  ADD CONSTRAINT `route_ibfk_1` FOREIGN KEY (`Origin`) REFERENCES `place` (`placeID`),
  ADD CONSTRAINT `route_ibfk_2` FOREIGN KEY (`Destination`) REFERENCES `place` (`placeID`),
  ADD CONSTRAINT `route_ibfk_3` FOREIGN KEY (`carID`) REFERENCES `car` (`carID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
