using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;

namespace WebApplication2.Controllers
{
    public class CongDanController : Controller
    {
        private readonly CccdContext db;

        public CongDanController(CccdContext context)
        {
            db = context;
        }
        [HttpGet]
        public IActionResult DangKy()
        {
            return View();
        }
    }
}
