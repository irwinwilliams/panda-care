using System;
using System.Collections.Generic;

namespace data;

public partial class DailyUpdate
{
    public int UpdateId { get; set; }

    public int? ChildId { get; set; }

    public string? TimeOfDay { get; set; }

    public string? UpdateType { get; set; }

    public string? Comments { get; set; }

    public virtual Child? Child { get; set; }
}
