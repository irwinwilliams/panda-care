using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace data;

public partial class ConversationalReference
{
    [Key]
    public int ReferenceId { get; set; }

    public int? ParentId { get; set; }

    public string? ConversationReference { get; set; }

    public virtual Parent? Parent { get; set; }
}
