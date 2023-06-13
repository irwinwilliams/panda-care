using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace data;

public partial class DailyUpdate
{
    [Key]
    public int UpdateId { get; set; }

    public int? ChildId { get; set; }

    public DateTime? Date { get; set; }

    public string? TimeOfDay { get; set; }

    public string? UpdateType { get; set; }

    public string? Comments { get; set; }

    public virtual Child? Child { get; set; }
}
