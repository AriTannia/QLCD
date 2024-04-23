using System.ComponentModel.DataAnnotations;
namespace WebApplication2.ViewModels
{
    public class RegisterVM
    {
        [Display(Name = "Mã công dân")]
        [Required(ErrorMessage = "Vui lòng điền trường này")]
        [MaxLength(20, ErrorMessage = "Tối đa 20 ký tự")]
        public string MaKh { get; set; }

        [Display(Name = "Mật khẩu")]
        [Required(ErrorMessage = "Vui lòng điền trường này")]
        [DataType(DataType.Password)]
        public string MatKhau { get; set; }

        [Display(Name = "Họ và tên")]
        [Required(ErrorMessage = "Vui lòng điền trường này")]
        [MaxLength(50, ErrorMessage = "Tối đa 50 ký tự")]
        public string HoTen { get; set; }

        [Display(Name = "Giới tính")]
        public bool GioiTinh { get; set; } = true;
        [Display(Name = "Ngày sinh")]
        [DataType(DataType.Date)]
        public DateTime? NgaySinh { get; set; }
        [MaxLength(60, ErrorMessage = "Tối đa 60 ký tự")]
        [Display(Name = "Địa chỉ")]
        public string DiaChi { get; set; }
        [MaxLength(24, ErrorMessage = "Tối đa 24 ký tự")]
        [RegularExpression(@"^0\d{9,10}$", ErrorMessage = "Số điện thoại không hợp lệ!")]

        [Display(Name = "Điện thoại")]
        public string DienThoai { get; set; }
        [EmailAddress(ErrorMessage = "Chưa đúng định dạng email")]
        [Display(Name = "Email")]
        public string Email { get; set; } = null!;

        [Display(Name = "Hình ảnh")]
        public string? Hinh { get; set; }
    }
}
