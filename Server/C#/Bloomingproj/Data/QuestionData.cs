using Bloomingproj.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Bloomingproj.Data
{
    public class QuestionData
    {
        private readonly DbConnection db = new DbConnection();

        //public List<ProductRes> GetAllProducts()
        //{
        //    SqlCommand cmd = db.CreateCommand("SelectAllProducts", db.Connect(), "proc");
        //    DataTable tb = db.ReadAndClose(cmd);
        //    List<ProductRes> products = db.ConvertDataTable<ProductRes>(tb);
        //    return products;
        //}

        public int askForProduct( Question question)
        {

            SqlCommand cmd = db.CreateCommand("askForProduct", db.Connect(), "proc");

            cmd.Parameters.Add("@Id_User", SqlDbType.Int).Value = question.Id_User;
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = question.Id_Product;
            cmd.Parameters.Add("@Question_Description", SqlDbType.VarChar).Value = question.Question_Description;
            cmd.CommandType = CommandType.StoredProcedure;
            return db.ExecuteAndClose(cmd);
        }
        public int AskAdmin(AdminQuestion adminQuestion)
        {
            SqlCommand cmd = db.CreateCommand("AskAdmin", db.Connect(), "proc");
            cmd.Parameters.Add("@Id_User", SqlDbType.Int).Value = adminQuestion.Id_User;
            cmd.Parameters.Add("@Question_Description", SqlDbType.VarChar).Value = adminQuestion.Question_Description;
            cmd.CommandType = CommandType.StoredProcedure;
            return db.ExecuteAndClose(cmd);
        }

        public int AnswerForProduct(Answer answer)
        {
            SqlCommand cmd = db.CreateCommand("AnswerForProduct", db.Connect(), "proc");

            cmd.Parameters.Add("@Id_Question", SqlDbType.Int).Value = answer.Id_Question;
            cmd.Parameters.Add("@Answer_Description", SqlDbType.VarChar).Value = answer.Answer_Description;
            cmd.CommandType = CommandType.StoredProcedure;
            return db.ExecuteAndClose(cmd);
        }



        public int AnswerAdmin(AdminQuestion adminQuestion)
        {
            SqlCommand cmd = db.CreateCommand("AnswerAdmin", db.Connect(), "proc");
            cmd.Parameters.Add("@Id_Admin_Question", SqlDbType.Int).Value = adminQuestion.Id_Admin_Question;
            cmd.Parameters.Add("@Answer_Description", SqlDbType.VarChar).Value = adminQuestion.Answer_Description;
            cmd.CommandType = CommandType.StoredProcedure;
            return db.ExecuteAndClose(cmd);
        }
        public List<QuestionId> QuestionByIdProduct(int Id_Product)
        {
            SqlCommand cmd = db.CreateCommand("QuestionByIdProduct", db.Connect(), "proc");
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = Id_Product;
            DataTable tb = db.ReadAndClose(cmd);
            List<QuestionId> questionIds = db.ConvertDataTable<QuestionId>(tb);
            return questionIds;
        }



        public List<AdminQuestion> AdminQuestion()
        {
            SqlCommand cmd = db.CreateCommand("AdminQuestion", db.Connect(), "proc");
            DataTable tb = db.ReadAndClose(cmd);
            List<AdminQuestion> adminQuestion = db.ConvertDataTable<AdminQuestion>(tb);
            return adminQuestion;
        }


        public List<AdminQuestion> GetAdminQuestionByIdUser(int id)
        {
            SqlCommand cmd = db.CreateCommand("GetAdminQuestionByIdUser", db.Connect(), "proc");
            cmd.Parameters.Add("@Id_User", SqlDbType.Int).Value = id;

            DataTable tb = db.ReadAndClose(cmd);
            List<AdminQuestion> adminQuestion = db.ConvertDataTable<AdminQuestion>(tb);
            return adminQuestion;
        }
    }
}