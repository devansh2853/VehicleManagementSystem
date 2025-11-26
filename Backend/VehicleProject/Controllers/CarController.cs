using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleProject.Data;
using VehicleProject.Models;

namespace VehicleProject.Controllers;
[ApiController]
[Route("[controller]")]
public class CarController : ControllerBase
{
    private readonly VehicleProjectContext _context;
    public CarController(VehicleProjectContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<Car>>> GetCars()
    {
        try {
            return Ok(await _context.Cars.ToListAsync());
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
    
    [HttpGet("{id:int}", Name = "GetCar")]
    public async Task<ActionResult<Car>> Get(int id)
    {
        try
        {    
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return NotFound();
            return Ok(car);
        }
        catch (Exception err) {
            return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
        }
    }
    [HttpPost]
    public async Task<IActionResult> CreateCar(Car car)
    {
        try
        {
            Console.WriteLine("Inside creation method");
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetCar", new {id = car.Id}, car);
        }
        catch (Exception err)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCar(int id, [FromBody ]Car car)
    {
        try
        {
            if (id != car.Id ) return BadRequest("Ids in URL and body mismatch");
            if (!await _context.Cars.AnyAsync(c=>c.Id == id)) return NotFound();
            _context.Cars.Update(car);
            return NoContent();
        }
        catch (Exception err)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
        }
    }
    
    [HttpDelete("{id:int}")]
    public async Task <IActionResult> DeleteCar(int id)
    {
        try
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return NotFound();
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception err)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
        }
    }
    [HttpGet("fields")]
    public ActionResult GetCarFields()
    {
        try
        {
            var fields = typeof(Car)
            .GetProperties()
            .Where(p=>p.Name != "Id")
            .Select(p=>new {
                name=p.Name, 
                type=p.PropertyType.Name,
                required=Attribute.IsDefined(p, typeof(RequiredAttribute))
                });
            return Ok(fields);
        }
        catch (Exception err)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
        }
        

    }
}