using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Account
{
    /// <summary>
    /// Contains application user register request transfer data
    /// </summary>
    public class RegisterRequestDto
    {
        [Required]
        [MinLength(4)]
        [MaxLength(255)]
        [RegularExpression(
            "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]
        public string Email { get; set; }

        [Required] public string Username { get; set; }

        [Required] public string Password { get; set; }

        [Required] [Compare("Password")] public string PasswordConfirm { get; set; }
    }
}