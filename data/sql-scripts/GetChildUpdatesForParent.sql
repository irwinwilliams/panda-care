CREATE PROCEDURE GetChildUpdatesForParent
    @ParentName NVARCHAR(30),
    @ChildName NVARCHAR(30)

AS
BEGIN
    SELECT TOP (30) * FROM Children c 
    JOIN DailyUpdates d ON c.childId = d.childId
    JOIN Parents p ON c.ParentId = p.parentId
    WHERE p.parentName = @ParentName and c.childName = @ChildName
END