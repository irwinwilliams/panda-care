using System;
using System.Collections.Generic;

namespace data;

public partial class ConversationalReference
{
    public int ReferenceId { get; set; }

    public int? ParentId { get; set; }

    public string? ConversationReference { get; set; }

    public virtual Parent? Parent { get; set; }
}
