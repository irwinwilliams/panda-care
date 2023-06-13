using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace data;

public partial class Child
{
    [Key]
    public int ChildId { get; set; }

    public string? ChildName { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? MedicalConditions { get; set; }

    public virtual ICollection<DailyUpdate> DailyUpdates { get; set; } = new List<DailyUpdate>();
}
