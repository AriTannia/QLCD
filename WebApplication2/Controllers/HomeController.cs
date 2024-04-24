using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using WebApplication2.Data;
using WebApplication2.Models;
using WebApplication2.ViewModels;
using WebApplication2.Helpers;

namespace WebApplication2.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;
		private readonly CccdContext _db;
		private readonly IMapper _mapper;

		public HomeController(CccdContext context, ILogger<HomeController> logger, IMapper mapper)
		{
			_db = context;
			_logger = logger;
			_mapper = mapper;
		}

		[HttpGet]
		public IActionResult DangKy()
		{
			return View();
		}

        [HttpGet]
        public IActionResult Manager()
        {
            return View();
        }

        [HttpGet]
        public IActionResult DangNhap()
        {
            return View();
        }
        [HttpPost]
        public IActionResult DangNhap(LoginVM model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            //try
            //{
                var khachHang = _db.KhachHangs.FirstOrDefault(kh => kh.MaKh == model.MaKh);

                if (khachHang != null && khachHang.MatKhau == model.MatKhau.ToMd5Hash(khachHang.RandomKey))
                {
                    HttpContext.Session.SetString("LoggedInUser", khachHang.MaKh);
                    TempData["SuccessMessage"] = "Đăng nhập thành công!";
                    return RedirectToAction("Manager", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Tên tài khoản hoặc mật khẩu không đúng.");
                    return View(model);
                }
            //}
            //catch (Exception ex)
            //{
            //    _logger.LogError($"Lỗi xảy ra khi đăng nhập: {ex.Message}");
            //    ModelState.AddModelError("", "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
            //    return View(model);
            //}
        }

        [HttpPost]
		public IActionResult DangKy(RegisterVM model, IFormFile Hinh)
		{
			if (!ModelState.IsValid)
			{
				return View(model);
			}

			try
			{
				var khachHang = _mapper.Map<KhachHang>(model);
				khachHang.RandomKey = MyUtil.GenerateRamdomKey();
				khachHang.MatKhau = model.MatKhau.ToMd5Hash(khachHang.RandomKey);
				khachHang.HieuLuc = true; // Sẽ xử lý khi dùng Mail để active
				khachHang.VaiTro = 0;

				if (Hinh != null)
				{
					khachHang.Hinh = MyUtil.UploadHinh(Hinh, "KhachHang");
				}
				_db.KhachHangs.Add(khachHang);
				_db.SaveChanges();
				TempData["SuccessMessage"] = "Đăng ký thành công!";
				return RedirectToAction("Index", "Home");
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error occurred while registering user: {ex.Message}");
				ModelState.AddModelError("", "Đã xảy ra lỗi khi đăng ký tài khoản. Vui lòng thử lại sau.");
				return View(model);
			}
		}

		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}

		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
