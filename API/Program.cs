using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application;
using Application.Activities;
using API.Extensions;
// it create the custom
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddApplicationService(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

// here CorsPoilcy is the policy that is being defined
app.UseCors("CorsPolicy");
//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

// we are creating service which only get called when program is run
using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
try
{
    var context = service.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = service.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error has occured during migratio");
}

app.Run();
