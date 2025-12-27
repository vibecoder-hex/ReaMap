USE university_schedule;

-- 1. Общая статистика
SELECT 
    'users' as table_name, 
    COUNT(*) as count  
FROM `user`
UNION ALL
SELECT 'students', COUNT(*) FROM `user` WHERE role = 'student'
UNION ALL
SELECT 'teachers', COUNT(*) FROM `user` WHERE role = 'teacher'
UNION ALL
SELECT 'admins', COUNT(*) FROM `user` WHERE role = 'admin'
UNION ALL
SELECT 'groups', COUNT(*) FROM `group`
UNION ALL
SELECT 'subjects', COUNT(*) FROM `subject`
UNION ALL
SELECT 'classrooms', COUNT(*) FROM `classroom`
UNION ALL
SELECT 'classes', COUNT(*) FROM `class`
UNION ALL
SELECT 'schedule_changes', COUNT(*) FROM `schedule_change`;

-- 2. Расписание группы ПИ-201 на неделю
SELECT 
    c.date,
    DAYNAME(c.date) as day_name,
    c.start_time,
    c.end_time,
    s.name as subject,
    u.full_name as teacher,
    cr.number as classroom,
    c.type as class_type
FROM `class` c
JOIN `subject` s ON c.subject_id = s.id
JOIN `teacher` t ON c.teacher_id = t.user_id
JOIN `user` u ON t.user_id = u.id
JOIN `classroom` cr ON c.classroom_id = cr.id
WHERE c.group_id = 1
    AND c.date BETWEEN '2024-10-01' AND '2024-10-07'
ORDER BY c.date, c.start_time;

-- 3. Расписание преподавателя
SELECT 
    c.date,
    c.start_time,
    c.end_time,
    s.name as subject,
    g.name as group_name,
    cr.number as classroom,
    c.type
FROM `class` c
JOIN `subject` s ON c.subject_id = s.id
JOIN `group` g ON c.group_id = g.id
JOIN `classroom` cr ON c.classroom_id = cr.id
WHERE c.teacher_id = 3
ORDER BY c.date, c.start_time;

-- 4. Студенты по группам
SELECT 
    g.name as group_name,
    g.faculty,
    g.course,
    u.full_name as student_name,
    s.student_card_number
FROM `student` s
JOIN `user` u ON s.user_id = u.id
JOIN `group` g ON s.group_id = g.id
ORDER BY g.name, u.full_name;

-- 5. Все изменения в расписании
SELECT 
    sc.status,
    sc.reason,
    sc.created_at as change_date,
    c.date as original_date,
    c.start_time as original_time,
    s.name as subject,
    g.name as group_name
FROM `schedule_change` sc
JOIN `class` c ON sc.original_class_id = c.id
JOIN `subject` s ON c.subject_id = s.id
JOIN `group` g ON c.group_id = g.id
ORDER BY sc.created_at DESC;

-- 6. Занятость аудиторий на конкретный день
SELECT 
    cr.number as classroom,
    cr.building,
    c.start_time,
    c.end_time,
    s.name as subject,
    g.name as group_name
FROM `class` c
JOIN `classroom` cr ON c.classroom_id = cr.id
JOIN `subject` s ON c.subject_id = s.id
JOIN `group` g ON c.group_id = g.id
WHERE c.date = '2024-10-01'
ORDER BY cr.number, c.start_time;

-- 7. Преподаватели и их нагрузка
SELECT 
    u.full_name,
    t.department,
    COUNT(c.id) as total_classes
FROM `teacher` t
JOIN `user` u ON t.user_id = u.id
LEFT JOIN `class` c ON t.user_id = c.teacher_id
GROUP BY t.user_id, u.full_name
ORDER BY total_classes DESC;

-- 8. Проверка на конфликты аудиторий
SELECT 
    c1.date,
    c1.start_time,
    c1.end_time,
    cr.number as classroom,
    s1.name as subject1,
    g1.name as group1,
    s2.name as subject2,
    g2.name as group2
FROM `class` c1
JOIN `class` c2 ON 
    c1.classroom_id = c2.classroom_id 
    AND c1.date = c2.date
    AND c1.id < c2.id
    AND c1.start_time < c2.end_time
    AND c1.end_time > c2.start_time
JOIN `classroom` cr ON c1.classroom_id = cr.id
JOIN `subject` s1 ON c1.subject_id = s1.id
JOIN `subject` s2 ON c2.subject_id = s2.id
JOIN `group` g1 ON c1.group_id = g1.id
JOIN `group` g2 ON c2.group_id = g2.id;
