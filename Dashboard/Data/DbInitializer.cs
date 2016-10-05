using Dashboard.Data.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Dashboard.Data
{
    public class DbInitializer
    {
        #region Fields
        private const string defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        private const string photosPath = "images\\AlbumImages";
        private static ApplicationDbContext context;
        #endregion

        #region Initializer
        public static void Initialize(IServiceProvider serviceProvider, string imagesPath)
        {
            context = (ApplicationDbContext)serviceProvider.GetService(typeof(ApplicationDbContext));
            InitializePhotoAlbums(imagesPath);
            InitializeUserRoles();
        }
        #endregion

        #region Methods
        private static void InitializePhotoAlbums(string webRootPath)
        {
            if (!context.Albums.Any())
            {
                List<Album> albums = new List<Album>();
                albums.Add(CreateAlbum("Album 1"));
                albums.Add(CreateAlbum("Album 2"));
                albums.Add(CreateAlbum("Album 3"));
                albums.Add(CreateAlbum("Album 4"));

                string[] images = Directory.GetFiles(Path.Combine(webRootPath, photosPath));
                Random rnd = new Random();

                foreach (string img in images)
                {
                    int selectedAlbum = rnd.Next(0, 4);
                    string fileName = Path.GetFileName(img);
                    string uri = photosPath + "\\" + fileName;
                    Album al = albums[selectedAlbum];

                    context.Photos.Add(
                        new Photo
                        {
                            Title = fileName,
                            DateUploaded = DateTime.Now,
                            Uri = uri,
                            AlbumId = al.Id
                        });
                }
                context.SaveChanges();
            }
        }

        private static Album CreateAlbum(string title)
        {
            var album = new Album
            {
                DateCreated = DateTime.Now,
                Title = title,
                Description = defaultDescription,
                Owner = "admin"
            };
            context.Albums.Add(album);
           
            return album;
        }

        private static void InitializeUserRoles()
        {
            
        }
        #endregion
    }
}
