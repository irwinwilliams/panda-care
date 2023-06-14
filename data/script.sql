INSERT INTO [DailyUpdates] ([childId], [timeOfDay], [updateType], [comments], [Date])
VALUES
    -- Child 1 Daily Updates
    (21, '8:00 AM', 'Nutrition', 'Ate all fruits and vegetables', dateadd(day, -7, getdate())),
    (21, '12:00 PM', 'Activity', 'Played outside in the playground', dateadd(day, -7, getdate())),
    (21, '3:00 PM', 'Health', 'Took a nap and woke up refreshed', dateadd(day, -7, getdate())),
    (21, '6:00 PM', 'Behavior', 'Shared toys and played nicely with others', dateadd(day, -7, getdate())),
    (21, '9:00 PM', 'General', 'Had a great day overall', dateadd(day, -7, getdate())),
    
    -- Child 2 Daily Updates
    (22, '8:30 AM', 'Health', 'Took medication for asthma', dateadd(day, -7, getdate())),
    (22, '11:30 AM', 'Nutrition', 'Enjoyed a healthy snack', dateadd(day, -7, getdate())),
    (22, '2:30 PM', 'Activity', 'Participated in arts and crafts', dateadd(day, -7, getdate())),
    (22, '5:30 PM', 'Behavior', 'Listened and followed instructions', dateadd(day, -7, getdate())),
    (22, '8:30 PM', 'General', 'Expressed happiness and enjoyed the day', dateadd(day, -7, getdate())),
    
    -- Child 3 Daily Updates
    (13, '9:00 AM', 'Activity', 'Explored nature during a nature walk', dateadd(day, -7, getdate())),
    (13, '1:00 PM', 'Nutrition', 'Finished lunch with enthusiasm', dateadd(day, -7, getdate())),
    (13, '4:00 PM', 'Behavior', 'Helped clean up the play area', dateadd(day, -7, getdate())),
    (13, '7:00 PM', 'Health', 'Took required medication', dateadd(day, -7, getdate())),
    (13, '10:00 PM', 'General', 'Shared stories during bedtime routine', dateadd(day, -7, getdate())),
    
    -- Child 4 Daily Updates
    (14, '8:30 AM', 'Behavior', 'Participated in group activities with enthusiasm', dateadd(day, -7, getdate())),
    (14, '12:30 PM', 'Nutrition', 'Enjoyed a balanced lunch', dateadd(day, -7, getdate())),
    (14, '3:30 PM', 'Activity', 'Engaged in imaginative play with peers', dateadd(day, -7, getdate())),
    (14, '6:30 PM', 'Health', 'No signs of discomfort or illness', dateadd(day, -7, getdate())),
    (14, '9:30 PM', 'General', 'Expressed gratitude and thanked caregivers', dateadd(day, -7, getdate())),
    
    -- Child 5 Daily Updates
    (15, '9:30 AM', 'Nutrition', 'Tried a new healthy snack', dateadd(day, -7, getdate())),
    (15, '1:30 PM', 'Activity', 'Explored different musical instruments', dateadd(day, -7, getdate())),
    (15, '4:30 PM', 'Health', 'Had a wellness check-up with positive results', dateadd(day, -7, getdate())),
    (15, '7:30 PM', 'Behavior', 'Shared and took turns during group play', dateadd(day, -7, getdate())),
    (15, '10:30 PM', 'General', 'Shared excitement about upcoming activities', dateadd(day, -7, getdate())),

    (16, '8:00 AM', 'Nutrition', 'Ate all fruits and vegetables', dateadd(day, -7, getdate())),
    (16, '12:00 PM', 'Activity', 'Played outside in the playground', dateadd(day, -7, getdate())),
    (16, '3:00 PM', 'Health', 'Took a nap and woke up refreshed', dateadd(day, -7, getdate())),
    (16, '6:00 PM', 'Behavior', 'Shared toys and played nicely with others', dateadd(day, -7, getdate())),
    (16, '9:00 PM', 'General', 'Had a great day overall', dateadd(day, -7, getdate())),
    
    -- Child 2 Daily Updates
    (17, '8:30 AM', 'Health', 'Took medication for asthma', dateadd(day, -7, getdate())),
    (17, '11:30 AM', 'Nutrition', 'Enjoyed a healthy snack', dateadd(day, -7, getdate())),
    (17, '2:30 PM', 'Activity', 'Participated in arts and crafts', dateadd(day, -7, getdate())),
    (17, '5:30 PM', 'Behavior', 'Listened and followed instructions', dateadd(day, -7, getdate())),
    (17, '8:30 PM', 'General', 'Expressed happiness and enjoyed the day', dateadd(day, -7, getdate())),
    
    -- Child 3 Daily Updates
    (18, '9:00 AM', 'Activity', 'Explored nature during a nature walk', dateadd(day, -7, getdate())),
    (18, '1:00 PM', 'Nutrition', 'Finished lunch with enthusiasm', dateadd(day, -7, getdate())),
    (18, '4:00 PM', 'Behavior', 'Helped clean up the play area', dateadd(day, -7, getdate())),
    (18, '7:00 PM', 'Health', 'Took required medication', dateadd(day, -7, getdate())),
    (18, '10:00 PM', 'General', 'Shared stories during bedtime routine', dateadd(day, -7, getdate())),
    
    -- Child 4 Daily Updates
    (19, '8:30 AM', 'Behavior', 'Participated in group activities with enthusiasm', dateadd(day, -7, getdate())),
    (19, '12:30 PM', 'Nutrition', 'Enjoyed a balanced lunch', dateadd(day, -7, getdate())),
    (19, '3:30 PM', 'Activity', 'Engaged in imaginative play with peers', dateadd(day, -7, getdate())),
    (19, '6:30 PM', 'Health', 'No signs of discomfort or illness', dateadd(day, -7, getdate())),
    (19, '9:30 PM', 'General', 'Expressed gratitude and thanked caregivers', dateadd(day, -7, getdate())),
    
    -- Child 5 Daily Updates
    (20, '9:30 AM', 'Nutrition', 'Tried a new healthy snack', dateadd(day, -7, getdate())),
    (20, '1:30 PM', 'Activity', 'Explored different musical instruments', dateadd(day, -7, getdate())),
    (20, '4:30 PM', 'Health', 'Had a wellness check-up with positive results', dateadd(day, -7, getdate())),
    (20, '7:30 PM', 'Behavior', 'Shared and took turns during group play', dateadd(day, -7, getdate())),
    (20, '10:30 PM', 'General', 'Shared excitement about upcoming activities', dateadd(day, -7, getdate()));
