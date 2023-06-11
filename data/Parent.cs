using System;
using System.Collections.Generic;

namespace data;

public partial class Parent
{
    public int ParentId { get; set; }

    public string? ParentName { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<ConversationalReference> ConversationalReferences { get; set; } = new List<ConversationalReference>();
}
