using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Web.Http;
using Bloomingproj.Data;
using Bloomingproj.Models;

namespace Bloomingproj.Controllers
{
    public class FeddbackController : ApiController
    {
        // GET: Feddback
        [HttpGet]
        [Route("Api/Feddback/{idProduct}")]
        public IHttpActionResult Get( int idProduct)
        {
            try
            {
                FeedbackData u = new FeedbackData();
                return Ok(u.FeedbackByIdProduct(idProduct));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
        [HttpPost]
        [Route("Api/Feedback/insert")]
        public IHttpActionResult Post(  Feedback feedback)
        {
            try
            {
                FeedbackData u = new FeedbackData();
                return Ok(u.AddFeedback(feedback));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}