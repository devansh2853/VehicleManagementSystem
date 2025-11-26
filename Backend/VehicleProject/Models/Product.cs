using System;

namespace VehicleProject.Models;

public class Product
{
    public int Id { get; set; }
    public required string ProductName { get; set; }
    public string? ProductDescription {get; set;}
    public List<Order> Orders {get; set;} = new List<Order>();
}
