using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Web.Http;
using Bloomingproj.Data;
using Bloomingproj.Models;

namespace Bloomingproj.Controllers
{
    public class QuestionController : ApiController
    {
        // GET: Question
        [HttpPost]
        [Route("Api/Question/insert/ask")]
        public IHttpActionResult AskForProduct(Question question)
        {
            try
            {
                QuestionData u = new QuestionData();
                return Ok(u.askForProduct(question));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpPost]
        [Route("Api/Question/insert/AskAdmin")]
        public IHttpActionResult AskAdmin(AdminQuestion adminQuestion)
        {
            try
            {
                QuestionData u = new QuestionData();
                return Ok(u.AskAdmin(adminQuestion));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }




        [HttpPost]
        [Route("Api/Question/insert/answer")]
        public IHttpActionResult AnswerForProduct(Answer answer)
        {
            try
            {
                QuestionData u = new QuestionData();
                return Ok(u.AnswerForProduct(answer));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPost]
        [Route("Api/Question/insert/AnswerAdmin")]
        public IHttpActionResult AnswerAdmin(AdminQuestion adminQuestion)
        {
            try
            {
                QuestionData u = new QuestionData();
                return Ok(u.AnswerAdmin(adminQuestion));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }



        [HttpGet]
        [Route("Api/Question/QuestionByIdProduct/{idProduct}")]
        public IHttpActionResult Get(int idProduct)
        {
            try
            {
                QuestionData u = new QuestionData();

                return Ok(u.QuestionByIdProduct(idProduct));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpGet]
        [Route("Api/Question/AdminQuestion")]
        public IHttpActionResult AdminQuestion()
        {
            try
            {
                QuestionData u = new QuestionData();

                return Ok(u.AdminQuestion());

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpGet]
        [Route("Api/Question/AdminQuestion/{id}")]
        public IHttpActionResult AdminQuestion(int id)
        {
            try
            {
                QuestionData u = new QuestionData();

                return Ok(u.GetAdminQuestionByIdUser(id));

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}