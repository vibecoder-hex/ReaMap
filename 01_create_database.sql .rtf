-- Создание базы данных
DROP DATABASE IF EXISTS university_schedule;
CREATE DATABASE university_schedule 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE university_schedule;

-- Таблица пользователей
CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('student', 'teacher', 'admin') NOT NULL DEFAULT 'student',
    `full_name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица учебных групп
CREATE TABLE `group` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `faculty` VARCHAR(150) NOT NULL,
    `course` TINYINT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `chk_course_range` CHECK (`course` BETWEEN 1 AND 6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица студентов
CREATE TABLE `student` (
    `user_id` INT NOT NULL,
    `group_id` INT NOT NULL,
    `student_card_number` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `student_card_number_UNIQUE` (`student_card_number`),
    KEY `fk_student_group_idx` (`group_id`),
    CONSTRAINT `fk_student_user` FOREIGN KEY (`user_id`) 
        REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_student_group` FOREIGN KEY (`group_id`) 
        REFERENCES `group` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица преподавателей
CREATE TABLE `teacher` (
    `user_id` INT NOT NULL,
    `department` VARCHAR(150) NOT NULL,
    `academic_degree` VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`user_id`),
    CONSTRAINT `fk_teacher_user` FOREIGN KEY (`user_id`) 
        REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица предметов
CREATE TABLE `subject` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица аудиторий
CREATE TABLE `classroom` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(20) NOT NULL,
    `building` VARCHAR(100) NOT NULL,
    `capacity` SMALLINT NOT NULL,
    `type` ENUM('lecture', 'practice', 'lab', 'computer') NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица занятий (расписание)
CREATE TABLE `class` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `subject_id` INT NOT NULL,
    `teacher_id` INT NOT NULL,
    `group_id` INT NOT NULL,
    `classroom_id` INT NOT NULL,
    `type` ENUM('lecture', 'practice', 'lab', 'seminar') NOT NULL,
    `date` DATE NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `week_number` TINYINT DEFAULT NULL,
    `day_of_week` TINYINT DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_class_subject_idx` (`subject_id`),
    KEY `fk_class_teacher_idx` (`teacher_id`),
    KEY `fk_class_group_idx` (`group_id`),
    KEY `fk_class_classroom_idx` (`classroom_id`),
    KEY `idx_class_date` (`date`),
    KEY `idx_class_teacher_date` (`teacher_id`, `date`),
    KEY `idx_class_group_date` (`group_id`, `date`),
    CONSTRAINT `chk_day_of_week` CHECK (`day_of_week` BETWEEN 0 AND 6),
    CONSTRAINT `chk_week_number` CHECK (`week_number` BETWEEN 1 AND 52),
    CONSTRAINT `fk_class_subject` FOREIGN KEY (`subject_id`) 
        REFERENCES `subject` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_class_teacher` FOREIGN KEY (`teacher_id`) 
        REFERENCES `teacher` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_class_group` FOREIGN KEY (`group_id`) 
        REFERENCES `group` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_class_classroom` FOREIGN KEY (`classroom_id`) 
        REFERENCES `classroom` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица изменений расписания
CREATE TABLE `schedule_change` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `original_class_id` INT NOT NULL,
    `new_date` DATE DEFAULT NULL,
    `new_start_time` TIME DEFAULT NULL,
    `new_classroom_id` INT DEFAULT NULL,
    `status` ENUM('cancelled', 'moved', 'replaced') NOT NULL,
    `reason` TEXT,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `fk_schedule_change_class_idx` (`original_class_id`),
    KEY `fk_schedule_change_classroom_idx` (`new_classroom_id`),
    CONSTRAINT `fk_schedule_change_class` FOREIGN KEY (`original_class_id`) 
        REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_schedule_change_classroom` FOREIGN KEY (`new_classroom_id`) 
        REFERENCES `classroom` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
