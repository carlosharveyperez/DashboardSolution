using Dashboard.Data.Abstractions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dashboard.Data.Entities
{
    public class Album : IEntityBase
    {
        public Album()
        {
            Photos = new List<Photo>();
        }

        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MaxLength(400)]
        public string Description { get; set; }

        [Required]
        [MaxLength(200)]
        public string Owner { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
