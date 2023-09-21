using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text.Json.Serialization;
using System.Text.Json;
using Labs26_29.Models;
using Labs26_29.Models.Services;
using Labs26_29;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

builder.Services.AddCors();
string connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<CommyDBContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = JwtTokenService.GetValidationParameters(builder.Configuration);
    });
builder.Services.AddAuthorization(options =>
{

    // Add "Name of Policy", and the Lambda returns a definition
    options.AddPolicy("Admin", policy =>
        policy.RequireClaim("permissions", "create", "update", "delete", "read")
            .RequireRole("Admin"));

    options.AddPolicy("Editor", policy =>
        policy.RequireClaim("permissions", "create", "update")
            .RequireRole("Editor"));
});

builder.Services.AddIdentity<ApplicationUsers, IdentityRole>()
.AddEntityFrameworkStores<CommyDBContext>()
.AddRoleManager<RoleManager<IdentityRole>>()
.AddUserManager<UserManager<ApplicationUsers>>()
.AddSignInManager<SignInManager<ApplicationUsers>>()
.AddDefaultTokenProviders();

builder.Services.AddScoped<JwtTokenService>();
// identity services 



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");


app.Run();
