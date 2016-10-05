using Dashboard.Data.Abstractions;
using Dashboard.Data.Entities;

namespace Dashboard.Data.Repositories
{
    public class PhotoRepository : EntityBaseRepository<Photo>, IPhotoRepository
    {
        public PhotoRepository(ApplicationDbContext context) : base(context)
        {
         
        }
    }
}
