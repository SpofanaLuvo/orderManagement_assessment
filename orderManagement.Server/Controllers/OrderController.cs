using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using orderManagement.Server.Data;
using orderManagement.Server.Data.Models;

namespace orderManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Order - default
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            
            if (_context.Orders == null)
            {
                return NotFound("No Data Found!");
            }

            return await _context.Orders.ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound("No Data Found!");
            }

            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            return order;
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound("The order with the Id" +id+ "does not exist"   );
                }
                else
                {
                    throw;
                }
            }

            return Ok("Order updated successfully!");
        }

        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (_context.Orders == null)
            {
                return NotFound("No Data Found!");
            }

            try
            {
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException error)
            {
                return BadRequest("Order could not be created"+error.Message);
            }   

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);


        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound("No Data Found!");
            }

            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound("No appointment with the ID " + id);
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
