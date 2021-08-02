using Bloomingproj.Data;
using Bloomingproj.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;

namespace Bloomingproj.Controllers
{
    public class ImageController : ApiController
    {
      
        [HttpPost]
        [Route("Api/Image")]
        public IHttpActionResult UploadImage(Img img)
        {
            //create the response object
            //ImgRes res = new ImgRes();

            try
            {
                //path                                                                          
                string path = HttpContext.Current.Server.MapPath(@"~/images/" + img.folder);
                //create the image data
                string imageName = img.name;
                string imagePath = Path.Combine(path, imageName);
                byte[] imageBytes = Convert.FromBase64String(img.base64);
                ////write the image and save it   
                File.WriteAllBytes(imagePath, imageBytes);   
                return Ok(""+path+""+imageName);
            }
            catch (Exception e)
            {
                return Content(HttpStatusCode.BadRequest, e);
            }
        }


        //Views
        [HttpGet]
        [Route("Api/Img")]
        public IHttpActionResult GetAllProducts()
        {
            try
            {
                ProductData p = new ProductData();
                return Ok(p.GetAllProducts());
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}