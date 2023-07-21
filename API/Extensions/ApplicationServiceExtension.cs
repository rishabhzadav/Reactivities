using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application;
using Application.Activities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration configuration)
        {
            
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
             {
                 opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));


             });
            // Cors policy is set to allow cros url connection it allow the data sharing between the react  and the dotnet server
            services.AddCors(opt =>
             {
                 opt.AddPolicy("CorsPolicy", policy =>
                 {
                     policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                 });
             });

            // registering the mediatR service and giving the handler location in the services

            services.AddMediatR(typeof(List.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}