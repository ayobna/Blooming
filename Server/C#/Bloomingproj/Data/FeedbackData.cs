using Bloomingproj.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Bloomingproj.Data
{
    public class FeedbackData
    {
        private readonly DbConnection db = new DbConnection();
        public int AddFeedback(Feedback feedback)
        {
            SqlCommand cmd = db.CreateCommand("AddFeedback", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = feedback.Id_Product;

            cmd.Parameters.Add("@Feedback_Description", SqlDbType.VarChar).Value = feedback.Feedback_Description;
            cmd.Parameters.Add("@Stars", SqlDbType.Decimal).Value = feedback.Stars;
            return db.ExecuteAndClose(cmd);
        }

        //FeedbackByIdProduct

        public List<Feedback> FeedbackByIdProduct(int Id_Product)
        {
            SqlCommand cmd = db.CreateCommand("FeedbackByIdProduct", db.Connect(), "proc");
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = Id_Product;
            DataTable tb = db.ReadAndClose(cmd);
            List<Feedback> feedback = db.ConvertDataTable<Feedback>(tb);
            return feedback;
        }
    }
}