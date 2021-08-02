using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Web.Http;
using Bloomingproj.Data;
using Bloomingproj.Models;

namespace Bloomingproj.Controllers
{

    public class UserController : ApiController
    {
        
        [HttpGet]
        [Route("Api/Users")]
        
        public IHttpActionResult Get()
        {
            try
            {
                UserData u = new UserData();
                return Ok(u.GetAllUsers());

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpGet]
        [Route("Api/Users/{id}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                UserData u = new UserData();
                return Ok(u.GetUser(id));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }





        [HttpPost]
        [Route("Api/Users/Login")]
        public IHttpActionResult Login(UserReq userReq)
        {
            try
            {
                UserData u = new UserData();
                var t = u.CheackLogin(userReq);
                if (t!=null)
                {
                    return Content(HttpStatusCode.OK, t);
                }
                else
                {
                    return Content(HttpStatusCode.OK, "No");
                }
              

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }






        [HttpPost]
        [Route("Api/Users/Edit")]
        public IHttpActionResult Post(UserReq userReq)
        {
            try
            {
                UserData user = new UserData();
                int i=user.UpdateUserById(userReq);
                if (i == 0)
                {
                    return Content(HttpStatusCode.NotFound, $"User With {userReq.First_Name+" "+userReq.Last_Name} was not found to update");
                }
                else
                {
                    return Content(HttpStatusCode.OK, userReq);
                }
                
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpPost]
        [Route("Api/Users/Insert")]
        public IHttpActionResult Put(UserReq userReq)
        {
            try
            {
                UserData user = new UserData();
                int i = user.InsertUser(userReq);

                if (i == 0)
                {
                    return Content(HttpStatusCode.NotFound, $"User not created");
                }
                else
                {
                    return Content(HttpStatusCode.OK, userReq);
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }



        [HttpPost]
        [Route("Api/Users/ForgotPass")]
        public IHttpActionResult GetPhoneByEmail(UserReq userReq)
        {
             Random _random = new Random();
            try
            {
                UserData user = new UserData();

               List<UserToken> up = user.GetTokenByEmail(userReq);
                if (up.Count > 0)
                {
                    up[0].code = _random.Next(1000, 9999);
                    return Content(HttpStatusCode.OK, up);
                }
                else
                {
                    return Content(HttpStatusCode.OK, "Check your details");
                }
              
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpPost]
        [Route("Api/Users/NewPassword")]
        public IHttpActionResult NewUserPassword(UserReq userReq)
        {
            try
            {
              
                UserData user = new UserData();
                int i = user.NewUserPassword(userReq);
                if (i == 0)
                {
                    return Content(HttpStatusCode.NotFound, $"Try Again");
                }
                else
                {
                    return Content(HttpStatusCode.OK, "Password changed successfully");
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
        //[HttpPost]
        //[Route("Api/Users/UpdateToken")]
        //public IHttpActionResult UpdateToken(UserReq userReq)
        //{
        //    try
        //    {

        //        UserData user = new UserData();
        //        int i = user.UpdateToken(userReq);
        //        if (i == 0)
        //        {
        //            return Content(HttpStatusCode.NotFound, $"Try Again");
        //        }
        //        else
        //        {
        //            return Content(HttpStatusCode.OK, "Password changed successfully");
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return Content(HttpStatusCode.InternalServerError, ex);
        //    }
        //}

    }

}