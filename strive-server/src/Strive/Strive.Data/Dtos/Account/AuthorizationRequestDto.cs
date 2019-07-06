using System.ComponentModel.DataAnnotations;

namespace Strive.Data.Dtos.Account
{
    /// <summary>
    /// Contains application user login request transfer data
    /// </summary>
    public class AuthorizationRequestDto
    {
        [Required]
        [RegularExpression(
            "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]
        public string Email { get; set; }

        [Required] public string Password { get; set; }

        public bool RememberMe { get; set; } = false;
    }
}