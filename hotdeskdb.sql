
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userame VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('ชาย', 'หญิง', 'อื่นๆ') NOT NULL,
    bookingDate DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    deskNumber INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO bookings (firstName, lastName, age, gender, bookingDate, startTime, endTime, deskNumber, description)
VALUES
('เหมาะ', 'เชิงมวย', 28, 'ชาย', '2025-03-28', '09:00:00', '12:00:00', 1, 'จองสำหรับประชุมทีม'),
('ผู้กอง', 'องอาจ', 34, 'ชาย', '2025-03-28', '13:00:00', '15:00:00', 2, 'จองเพื่อทำงานเดี่ยว'),
('จ่าดับ', 'จำเปาะ', 40, 'ชาย', '2025-03-29', '10:00:00', '12:00:00', 3, 'จองโต๊ะสำหรับคู่'),
('จุก', 'เบี้ยวสกุล', 29, 'ชาย', '2025-03-29', '14:00:00', '16:00:00', 1, 'จองเพื่อปรึกษางาน'),
('สมหญิง', 'ใจดี', 25, 'หญิง', '2025-03-30', '09:00:00', '11:00:00', 4, 'จองสำหรับสัมภาษณ์งาน'),
('อนงค์', 'พรหมพิลา', 32, 'หญิง', '2025-03-30', '13:00:00', '15:00:00', 5, 'จองเพื่อฝึกอบรมทีม'),
('สายลม', 'พรหมวิหาร', 45, 'อื่นๆ', '2025-03-31', '10:00:00', '12:00:00', 2, 'จองเพื่อทำงานอิสระ'),
('มั่นคง', 'ยืนยาว', 38, 'ชาย', '2025-03-31', '14:00:00', '16:00:00', 3, 'จองสำหรับวางแผนธุรกิจ');
