using System.ComponentModel.DataAnnotations;

namespace WebApplication2.ViewModels
{
    public class LoginVM
    {
        [Display(Name = "Mã công dân")]
        [Required(ErrorMessage = "Vui lòng điền trường này")]
        public string MaKh { get; set; }

        [Display(Name = "Mật khẩu")]
        [Required(ErrorMessage = "Vui lòng điền trường này")]
        [DataType(DataType.Password)]
        public string MatKhau { get; set; }
    }
}
