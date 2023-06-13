using System;
using data;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var connectionString = Environment.GetEnvironmentVariable("PandaCareDatabase");

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        services.AddDbContext<PandaCareContext>(options =>
            options.UseSqlServer(connectionString)
        );
    })
    .Build();
    

host.Run();
