using Microsoft.AspNetCore.Mvc;
namespace Dashboard.Controllers
{
    public class ErrorController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}