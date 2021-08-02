using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Web.Http;
using Bloomingproj.Data;
using Bloomingproj.Models;

namespace Bloomingproj.Controllers
{

    public class ProductController : ApiController
    {



        //Views
        [HttpPost]
        [Route("Api/Products")]
        public IHttpActionResult GetProducts(ProductsRes productsRes)

        {
            try
            {
                ProductData p = new ProductData();

                return Ok(p.GetProducts(productsRes));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
        [HttpGet]
        [Route("Api/Products/ProductsNotInStock")]
        public IHttpActionResult ProductsNotInStock()

        {
            try
            {
                ProductData p = new ProductData();

                return Ok(p.ProductsNotInStock());

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }




        [HttpGet]
        [Route("Api/Products/{id}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                ProductData p = new ProductData();
                return Ok(p.GetAllProducts(id));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpGet]
        [Route("Api/AdminProducts")]
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

        [HttpPost]
        [Route("Api/ShowProductDetails")]
        public IHttpActionResult ShowProductDetails(ProductsDitalseCode productsDitalseCode)
        {
            try
            {
                ProductData p = new ProductData();

                if (productsDitalseCode.code == 1)
                {
                    return Ok(p.ShowProductDetails1(productsDitalseCode));
                }
                else if (productsDitalseCode.code == 2)
                {

                    return Ok(p.ShowProductDetails2(productsDitalseCode));
                }
                else
                {
                    return Ok(p.ShowProductDetails3(productsDitalseCode));
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }




        [HttpPost]
        [Route("Api/Products/Insert")]
        public IHttpActionResult Put(ProductReq productReq)
        {
            try
            {
                ProductData p = new ProductData();
                int i = p.InsertProduct(productReq);

                if (i == 0)
                {
                    return Content(HttpStatusCode.NotFound, $"Product not created");
                }
                else
                {
                    return Content(HttpStatusCode.OK, productReq);
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }





        [HttpPost]
        [Route("Api/Products/Edit")]
        public IHttpActionResult Post(ProductReq productReq)
        {
            try
            {
                ProductData p = new ProductData();
                int i = p.UpdateProduct(productReq);
                if (i == 0)
                {
                    return Content(HttpStatusCode.NotFound, $"product With {productReq.Id_Product} was not found to update");
                }
                else
                {
                    return Content(HttpStatusCode.OK, productReq);
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
        [HttpPost]
        [Route("Api/Products/Delete")]
        public IHttpActionResult Delete(ProductReq productReq)
        {
            try
            {
                ProductData p = new ProductData();
                int i = p.DeleteProduct(productReq);
                if (i == 0)
                {
                    return Content(HttpStatusCode.NotFound, $"product With {productReq.Id_Product} was not found to Deleted");
                }
                else
                {
                    return Content(HttpStatusCode.OK, "Delete successfully");
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPost]
        [Route("Api/Products/GetBackProduct")]
        public IHttpActionResult GetBackProduct(ProductReq productReq)
        {
            try
            {
                ProductData p = new ProductData();
                int i = p.GetBackProduct(productReq);
                if (i == 0)
                {
                    return Content(HttpStatusCode.NotFound, $"product With {productReq.Id_Product} was not found to Get back");
                }
                else
                {
                    return Content(HttpStatusCode.OK, " Get back successfully");
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }













        [HttpPost]
        [Route("Api/Products/AddName")]
        public IHttpActionResult AddName(NameDitalseRes nameDitalseRes)
        {
            try
            {
                ProductData p = new ProductData();
                int i = p.AddName(nameDitalseRes);
                if (i == 1)
                {
                    return Content(HttpStatusCode.OK, "Add successfully");
                }
                else
                {
                    return Content(HttpStatusCode.OK, "Doublict Name");
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }



        [HttpGet]
        [Route("Api/Products/SoldProduct")]
        public IHttpActionResult SoldProduct()
        {
            try
            {
                ProductData p = new ProductData();
                return Ok(p.SoldProduct());

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }








    }
}