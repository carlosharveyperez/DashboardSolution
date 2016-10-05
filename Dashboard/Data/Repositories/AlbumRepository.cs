using Dashboard.Data.Abstractions;
using Dashboard.Data.Entities;

namespace Dashboard.Data.Repositories
{
    public class AlbumRepository : EntityBaseRepository<Album>, IAlbumRepository
    {
        public AlbumRepository(ApplicationDbContext context) : base(context)
        {
         
        }
    }
}
