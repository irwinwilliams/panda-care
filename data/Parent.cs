using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace data;

public partial class Parent
{
    [Key]
    public int ParentId { get; set; }

    public string? ParentName { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Child> Children { get; set; } = new List<Child>();

    public virtual ICollection<ConversationalReference> ConversationalReferences { get; set; } = new List<ConversationalReference>();
}
