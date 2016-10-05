using Dashboard.Data.Abstractions;
using System;
using System.ComponentModel.DataAnnotations;

namespace Dashboard.Data.Entities
{
    public class Photo : IEntityBase
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        public string Uri { get; set; }

        [Required]
        public int AlbumId { get; set; }

        [Required]
        public DateTime DateUploaded { get; set; }
    }
}
