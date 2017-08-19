using Microsoft.AspNetCore.Mvc;
using vega.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        [HttpPost]
        public IActionResult CreateVehicle([FromBody] Vehicle vehicle)
        {
            return Ok(vehicle);
        }
    }//cs
}//ns