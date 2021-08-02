using Bloomingproj.Data;
using Bloomingproj.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;

public class OrdersController : ApiController
{
        // GET: Orders
        [HttpPost]
        [Route("Api/Orders/AddOrders")]
        public IHttpActionResult Post(Orders orders)
        {
            try
            {
                OrdersData u = new OrdersData();
                return Ok(u.AddOrders(orders));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
    [HttpPost]
    [Route("Api/Orders/OrderId")]
    public IHttpActionResult OrderId(Orders orders)
    {
        try
        {
            OrdersData u = new OrdersData();
           int i=  u.AddOrderId();
           
            return Ok("Insert new order Id ");
            
        }
        catch (Exception ex)
        {
            return Content(HttpStatusCode.InternalServerError, ex);
        }
    }
    [HttpGet]
    [Route("Api/Orders/UserOrders/{id}")]
    public IHttpActionResult Get(int id)
    {
        try
        {
            OrdersData u = new OrdersData();
        

            return Ok(u.UserOrders(id));

        }
        catch (Exception ex)
        {
            return Content(HttpStatusCode.InternalServerError, ex);
        }
    }

}
