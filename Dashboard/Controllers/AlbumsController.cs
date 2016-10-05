using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dashboard.Data;
using Dashboard.Data.Entities;
using Dashboard.Data.Helpers;
using Dashboard.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Dashboard.Controllers
{
    [Produces("application/json")]
    [Route("api/Albums")]
    public class AlbumsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHostingEnvironment _environment;
        private readonly string _adminUserName = "carlosharveyperez@gmail.com";

        public AlbumsController(ApplicationDbContext context, UserManager<ApplicationUser> um, IHostingEnvironment environment)
        {
            _context = context;
            _userManager = um;
            _environment = environment;
        }

        // GET: api/Albums
        [HttpGet]
        public IEnumerable<Album> GetAlbums()
        {
            var result = _context.Albums.Include(a => a.Photos);
            return result;
        }

        // GET: api/Albums/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbum([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Album album = await _context.Albums.Include(a => a.Photos).SingleOrDefaultAsync(m => m.Id == id);

            if (album == null)
            {
                return NotFound();
            }

            album.Photos = album.Photos.OrderBy(p => p.Id).ToList();
            return Ok(album);
        }

        // PUT: api/Albums/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbum([FromRoute] int id, [FromBody] Album album)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != album.Id)
            {
                return BadRequest();
            }

            _context.Entry(album).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Albums
        [HttpPost]
        public async Task<IActionResult> PostAlbum([FromBody] Album album)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);
            if (user != null && user.UserName == _adminUserName)
                album.Owner = "admin";
            else
                album.Owner = "guest";

            _context.Albums.Add(album);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AlbumExists(album.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAlbum", new { id = album.Id }, album);
        }

        // DELETE: api/Albums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Album album = await _context.Albums.SingleOrDefaultAsync(m => m.Id == id);
            if (album == null)
            {
                return NotFound();
            }

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return Ok(album);
        }

        private bool AlbumExists(int id)
        {
            return _context.Albums.Any(e => e.Id == id);
        }

        // GET: api/Albums/IsAdminLogged
        [HttpGet("IsAdminLogged")]
        public async Task<IActionResult> IsAdminLogged()
        {
            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);
            var gr = new GenericResult
            {
                Succeeded = true,
                IsAdminLogged  = false
            };

            // Embedded since this is a demo after all.
            if (user != null && user.UserName == _adminUserName)
            {
                gr.IsAdminLogged = true;
            }

            return Ok(gr);
        }
        
        // POST: api/Albums/UploadFiles
        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadFile()
        {
            string imagesPath = "images\\AlbumImages";
            var files = Request.Form.Files;
            var uploadPath = Path.Combine(_environment.WebRootPath, imagesPath);
            List<string> urlsMap = new List<string>();

            IFormFile file = files.FirstOrDefault();
            if (file != null && file.Length > 0)
            {
                string fileExt = Path.GetExtension(file.FileName);
                var guid = Guid.NewGuid() + fileExt;
                var targetPath = Path.Combine(uploadPath, guid);

                var url = imagesPath + "\\" + guid;
                urlsMap.Add(Path.GetFileNameWithoutExtension(file.FileName));
                urlsMap.Add(url);
                using (var fileStream = new FileStream(targetPath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                var gr = new GenericResult
                {
                    Succeeded = true,
                    UrlsMap = JsonConvert.SerializeObject(urlsMap)
                };

                return Ok(gr);
            }

            return BadRequest();
        }

        // GET: api/Albums/GetAlbumsId
        [HttpGet("GetAlbumsId")]
        public IActionResult GetAlbumsId()
        {
            var result = _context.Albums.OrderBy(a => a.Id);
            List<int> ids = new List<int>();
            foreach (var album in result)
            {
                ids.Add(album.Id);
            }
            
            var gr = new GenericResult
            {
                Succeeded = true,
                AlbumsId = JsonConvert.SerializeObject(ids)
            };

            return Ok(gr);
        }

    }
}