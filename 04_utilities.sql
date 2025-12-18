USE university_schedule;

-- 1. Очистка всех данных (для тестирования)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `schedule_change`;
TRUNCATE TABLE `class`;
TRUNCATE TABLE `classroom`;
TRUNCATE TABLE `subject`;
TRUNCATE TABLE `teacher`;
TRUNCATE TABLE `student`;
TRUNCATE TABLE `group`;
TRUNCATE TABLE `user`;
SET FOREIGN_KEY_CHECKS = 1;

-- 2. Сброс автоинкремента
ALTER TABLE `user` AUTO_INCREMENT = 1;
ALTER TABLE `group` AUTO_INCREMENT = 1;
ALTER TABLE `subject` AUTO_INCREMENT = 1;
ALTER TABLE `classroom` AUTO_INCREMENT = 1;
ALTER TABLE `class` AUTO_INCREMENT = 1;
ALTER TABLE `schedule_change` AUTO_INCREMENT = 1;

-- 3. Показать структуру всех таблиц
SHOW TABLES;

DESCRIBE `user`;
DESCRIBE `student`;
DESCRIBE `teacher`;
DESCRIBE `group`;
DESCRIBE `subject`;
DESCRIBE `classroom`;
DESCRIBE `class`;
DESCRIBE `schedule_change`;

-- 4. Показать внешние ключи
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'university_schedule' 
    AND REFERENCED_TABLE_NAME IS NOT NULL;
