USE university_schedule;

-- 1. Пользователи
INSERT INTO `user` (`email`, `password_hash`, `role`, `full_name`) VALUES
('admin@university.ru', '$2b$10$ExampleHashAdmin123', 'admin', 'Иванов Иван Иванович'),
('admin2@university.ru', '$2b$10$ExampleHashAdmin456', 'admin', 'Петрова Мария Сергеевна'),
('petrov.pp@university.ru', '$2b$10$ExampleHashTeacher1', 'teacher', 'Петров Петр Петрович'),
('sidorova.ss@university.ru', '$2b$10$ExampleHashTeacher2', 'teacher', 'Сидорова Светлана Сергеевна'),
('ivanov.ii@university.ru', '$2b$10$ExampleHashTeacher3', 'teacher', 'Иванов Игорь Дмитриевич'),
('kozlov.ka@university.ru', '$2b$10$ExampleHashTeacher4', 'teacher', 'Козлов Константин Александрович'),
('student1@edu.university.ru', '$2b$10$ExampleHashStudent1', 'student', 'Смирнов Алексей Викторович'),
('student2@edu.university.ru', '$2b$10$ExampleHashStudent2', 'student', 'Кузнецова Мария Андреевна'),
('student3@edu.university.ru', '$2b$10$ExampleHashStudent3', 'student', 'Попов Дмитрий Сергеевич'),
('student4@edu.university.ru', '$2b$10$ExampleHashStudent4', 'student', 'Васильева Анна Олеговна'),
('student5@edu.university.ru', '$2b$10$ExampleHashStudent5', 'student', 'Морозов Илья Петрович'),
('student6@edu.university.ru', '$2b$10$ExampleHashStudent6', 'student', 'Никитина Елена Владимировна'),
('student7@edu.university.ru', '$2b$10$ExampleHashStudent7', 'student', 'Федоров Артем Михайлович'),
('student8@edu.university.ru', '$2b$10$ExampleHashStudent8', 'student', 'Тихонов Павел Александрович'),
('student9@edu.university.ru', '$2b$10$ExampleHashStudent9', 'student', 'Белова Ольга Дмитриевна');

-- 2. Группы
INSERT INTO `group` (`name`, `faculty`, `course`) VALUES
('ПИ-201', 'Программная инженерия', 3),
('ПИ-202', 'Программная инженерия', 3),
('ФИ-101', 'Физический факультет', 1),
('МАТ-301', 'Механико-математический', 4),
('ЛГ-201', 'Лингвистика', 2);

-- 3. Студенты
INSERT INTO `student` (`user_id`, `group_id`, `student_card_number`) VALUES
(7, 1, 'СТ-2021-001'),
(8, 1, 'СТ-2021-002'),
(9, 1, 'СТ-2021-003'),
(10, 1, 'СТ-2021-004'),
(11, 2, 'СТ-2021-005'),
(12, 2, 'СТ-2021-006'),
(13, 2, 'СТ-2021-007'),
(14, 3, 'СТ-2023-001'),
(15, 3, 'СТ-2023-002');

-- 4. Преподаватели
INSERT INTO `teacher` (`user_id`, `department`, `academic_degree`) VALUES
(3, 'Кафедра информатики и программирования', 'Кандидат технических наук'),
(4, 'Кафедра высшей математики', 'Доктор физико-математических наук'),
(5, 'Кафедра физики', 'Кандидат физико-математических наук'),
(6, 'Кафедра иностранных языков', 'Доктор филологических наук');

-- 5. Предметы
INSERT INTO `subject` (`name`, `code`) VALUES
('Базы данных', 'БД.01'),
('Математический анализ', 'МА.03'),
('Веб-программирование', 'ВП.02'),
('Физика', 'Ф.04'),
('Английский язык', 'АНГ.05'),
('Алгоритмы и структуры данных', 'АСД.06'),
('Операционные системы', 'ОС.07'),
('Теория вероятностей', 'ТВ.08');

-- 6. Аудитории
INSERT INTO `classroom` (`number`, `building`, `capacity`, `type`) VALUES
('101', 'Главный корпус', 30, 'lecture'),
('205', 'Главный корпус', 25, 'practice'),
('310', 'Главный корпус', 20, 'lab'),
('415', 'Корпус Б', 15, 'computer'),
('Актовый зал', 'Главный корпус', 200, 'lecture'),
('307', 'Корпус В', 40, 'lecture'),
('108', 'Главный корпус', 35, 'practice'),
('512', 'Корпус Б', 18, 'lab'),
('202', 'Корпус А', 28, 'practice'),
('411', 'Корпус Б', 22, 'computer');

-- 7. Занятия (расписание)
INSERT INTO `class` (`subject_id`, `teacher_id`, `group_id`, `classroom_id`, `type`, `date`, `start_time`, `end_time`, `week_number`, `day_of_week`) VALUES
(1, 3, 1, 1, 'lecture', '2024-10-01', '09:00', '10:30', 5, 1),
(2, 4, 1, 2, 'practice', '2024-10-01', '10:40', '12:10', 5, 1),
(3, 3, 2, 3, 'lab', '2024-10-01', '13:00', '14:30', 5, 1),
(4, 5, 3, 5, 'lecture', '2024-10-02', '09:00', '10:30', 5, 2),
(5, 6, 1, 6, 'practice', '2024-10-02', '10:40', '12:10', 5, 2),
(6, 3, 2, 7, 'lecture', '2024-10-02', '13:00', '14:30', 5, 2),
(7, 3, 1, 8, 'lab', '2024-10-03', '09:00', '10:30', 5, 3),
(1, 3, 2, 1, 'lecture', '2024-10-03', '10:40', '12:10', 5, 3),
(8, 4, 1, 2, 'practice', '2024-10-03', '13:00', '14:30', 5, 3),
(2, 4, 2, 3, 'practice', '2024-10-04', '09:00', '10:30', 5, 4),
(4, 5, 3, 4, 'lab', '2024-10-04', '10:40', '12:10', 5, 4),
(5, 6, 2, 5, 'practice', '2024-10-04', '13:00', '14:30', 5, 4),
(6, 3, 1, 6, 'lecture', '2024-10-05', '09:00', '10:30', 5, 5),
(7, 3, 2, 7, 'lab', '2024-10-05', '10:40', '12:10', 5, 5),
(3, 3, 1, 8, 'lab', '2024-10-05', '13:00', '14:30', 5, 5);

-- 8. Изменения в расписании
INSERT INTO `schedule_change` (`original_class_id`, `new_date`, `new_start_time`, `new_classroom_id`, `status`, `reason`) VALUES
(1, NULL, NULL, NULL, 'cancelled', 'Болезнь преподавателя'),
(2, '2024-10-08', '14:00', 4, 'moved', 'Замена аудитории по техническим причинам'),
(5, '2024-10-09', '15:00', 9, 'moved', 'Перенос по просьбе студентов'),
(7, '2024-10-03', '11:00', 10, 'replaced', 'Замена преподавателя'),
(12, NULL, NULL, NULL, 'cancelled', 'Выездное мероприятие');
