using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Dashboard: ASP.NET Core + Angular 2 Application";
            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Dashboard: ASP.NET Core + Angular 2 Application";
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
