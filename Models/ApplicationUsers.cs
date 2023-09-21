using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Labs26_29.Models
{
    public class ApplicationUsers: IdentityUser
    {
        public string Password { get; set; }

        //public string Email { get; set; }

        //public string PhoneNumber { get; set; }
        [NotMapped]
        public string? Token { get; set; }

        [NotMapped]
        public IList<string>? Roles { get; set; }
    }
}
