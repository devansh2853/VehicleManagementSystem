using Microsoft.EntityFrameworkCore;
using VehicleProject.Models;

namespace VehicleProject.Data;

public class VehicleProjectContext : DbContext
{
    public VehicleProjectContext(DbContextOptions<VehicleProjectContext> options) : base(options) {
        
    }
    public DbSet<Car> Cars {get; set;}
    public DbSet<Order> Orders {get; set;}
    public DbSet<Customer> Customers {get; set;}
    public DbSet<Product> Products {get; set;}

}