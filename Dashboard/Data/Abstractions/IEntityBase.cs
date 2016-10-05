using System.ComponentModel.DataAnnotations;

namespace Dashboard.Data.Abstractions
{
    public interface IEntityBase
    {
        [Key]
        int Id { get; set; }
    }
}
