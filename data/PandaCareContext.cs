using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace data;

public partial class PandaCareContext : DbContext
{
    public PandaCareContext()
    {
    }

    public PandaCareContext(DbContextOptions<PandaCareContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Child> Children { get; set; }

    public virtual DbSet<ConversationalReference> ConversationalReferences { get; set; }

    public virtual DbSet<DailyUpdate> DailyUpdates { get; set; }

    public virtual DbSet<Parent> Parents { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:panda-care-server.database.windows.net,1433;Initial Catalog=panda-care;Persist Security Info=False;User ID=pandacarer;Password=Credential1!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Child>(entity =>
        {
            entity.HasKey(e => e.ChildId).HasName("PK__Children__223925CDAC2B524B");

            entity.Property(e => e.ChildId)
                .ValueGeneratedNever()
                .HasColumnName("childId");
            entity.Property(e => e.ChildName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("childName");
            entity.Property(e => e.DateOfBirth)
                .HasColumnType("date")
                .HasColumnName("dateOfBirth");
            entity.Property(e => e.MedicalConditions)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("medicalConditions");
        });

        modelBuilder.Entity<ConversationalReference>(entity =>
        {
            entity.HasKey(e => e.ReferenceId).HasName("PK__Conversa__7B826DDE3965AD9D");

            entity.Property(e => e.ReferenceId)
                .ValueGeneratedNever()
                .HasColumnName("referenceId");
            entity.Property(e => e.ConversationReference)
                .IsUnicode(false)
                .HasColumnName("conversationReference");
            entity.Property(e => e.ParentId).HasColumnName("parentId");

            entity.HasOne(d => d.Parent).WithMany(p => p.ConversationalReferences)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK__Conversat__paren__60A75C0F");
        });

        modelBuilder.Entity<DailyUpdate>(entity =>
        {
            entity.HasKey(e => e.UpdateId).HasName("PK__DailyUpd__3C748E7AD01BC7C0");

            entity.Property(e => e.UpdateId)
                .ValueGeneratedNever()
                .HasColumnName("updateId");
            entity.Property(e => e.ChildId).HasColumnName("childId");
            entity.Property(e => e.Comments)
                .IsUnicode(false)
                .HasColumnName("comments");
            entity.Property(e => e.TimeOfDay)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("timeOfDay");
            entity.Property(e => e.UpdateType)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("updateType");

            entity.HasOne(d => d.Child).WithMany(p => p.DailyUpdates)
                .HasForeignKey(d => d.ChildId)
                .HasConstraintName("FK__DailyUpda__child__6383C8BA");
        });

        modelBuilder.Entity<Parent>(entity =>
        {
            entity.HasKey(e => e.ParentId).HasName("PK__Parents__90658C989A628808");

            entity.Property(e => e.ParentId)
                .ValueGeneratedNever()
                .HasColumnName("parentId");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.ParentName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("parentName");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
