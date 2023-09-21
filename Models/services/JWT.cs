using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Labs26_29.Models;

namespace Labs26_29.Models.Services
{
    public class JwtTokenService
    {
        private IConfiguration configuration;
        private SignInManager<ApplicationUsers> signInManager;

        // SigninManager - Similar to the UserManager we got from Identity to handle logins
        public JwtTokenService(IConfiguration config, SignInManager<ApplicationUsers> manager)
        {
            configuration = config;
            signInManager = manager;

        }

        // Validate that our "secrets" are actually secrets and that they match
        // This will be used by the validator
        public static TokenValidationParameters GetValidationParameters(IConfiguration configuration)
        {
            return new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                // This Is Our main goal: Make sure the security key, which comes from configuration is valid
                IssuerSigningKey = GetSecurityKey(configuration),

                // For simplifying testing
                ValidateIssuer = false,
                ValidateAudience = false,
            };
        }

        private static SecurityKey GetSecurityKey(IConfiguration configuration)
        {
            var secret = configuration["JWT:Secret"];
            if (secret == null) { throw new InvalidOperationException("JWT:Secret is midding"); }
            var secretBytes = Encoding.UTF8.GetBytes(secret);
            return new SymmetricSecurityKey(secretBytes);
        }


        public async Task<string> GetToken(ApplicationUsers user, TimeSpan expiresIn)
        {
            var principal = await signInManager.CreateUserPrincipalAsync(user);
            if (principal == null) { return null; }

            // Retrieve the roles for the user
            var roles = await signInManager.UserManager.GetRolesAsync(user);

            // Add each role as a claim
            var claims = new List<Claim>(principal.Claims);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var signingKey = GetSecurityKey(configuration);
            var token = new JwtSecurityToken(
              expires: DateTime.UtcNow + expiresIn,
              signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
              claims: claims  // Use the modified claims list with roles
             );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // public async Task<string> GetToken(ApplicationUser user, TimeSpan expiresIn)
        // {
        //     var principal = await signInManager.CreateUserPrincipalAsync(user);
        //     if (principal == null) { return null; }

        //     var signingKey = GetSecurityKey(configuration);
        //     var token = new JwtSecurityToken(
        //       expires: DateTime.UtcNow + expiresIn,
        //       signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
        //       claims: principal.Claims
        //      );

        //     return new JwtSecurityTokenHandler().WriteToken(token);
        // }
    }
}