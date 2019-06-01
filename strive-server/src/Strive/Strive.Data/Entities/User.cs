using System.Collections.Generic;

namespace Strive.Data.Entities
{
    /// <summary>
    /// Contains application user data
    /// </summary>
    public class User : StriveEntity
    {
        public string Email { get; set; }

        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public List<Project> Projects { get; set; }
    }
}