using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using Bloomingproj.Models;

namespace Bloomingproj.Data
{
    public class UserData
    {
        private readonly DbConnection db = new DbConnection();

        //proc not Exsits yet
        public List<UserRes> GetAllUsers()
        {
            SqlCommand cmd = db.CreateCommand("GetUsers", db.Connect(), "proc");
            DataTable tb = db.ReadAndClose(cmd);
            List<UserRes> users = db.ConvertDataTable<UserRes>(tb);
            return users;
        }
        public UserRes GetUser(int id)
        {
            SqlCommand cmd = db.CreateCommand("GetUser", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Id", SqlDbType.Int).Value =id;

            DataTable tb = db.ReadAndClose(cmd);
            List<UserRes> users = db.ConvertDataTable<UserRes>(tb);
            return users[0];
        }



        public UserRes CheackLogin(UserReq userReq)
        {
            SqlCommand cmd = db.CreateCommand("CheackLogin", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Email", SqlDbType.VarChar).Value = userReq.Email;
            cmd.Parameters.Add("@User_Password", SqlDbType.VarChar).Value = userReq.User_Password;

            DataTable tb = db.ReadAndClose(cmd);
            List<UserRes> users = db.ConvertDataTable<UserRes>(tb);
            return users[0];
        }

        public List<UserToken> GetTokenByEmail(UserReq userReq)
        {
            SqlCommand cmd = db.CreateCommand("GetTokenByEmail", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Email", SqlDbType.VarChar).Value = userReq.Email;
            DataTable tb = db.ReadAndClose(cmd);
            List<UserToken> users = db.ConvertDataTable<UserToken>(tb);

            return users;
        }
        public int NewUserPassword(UserReq userReq)
        {
            SqlCommand cmd = db.CreateCommand("NewUserPassword", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
  
            cmd.Parameters.Add("@Email", SqlDbType.VarChar).Value = userReq.Email;
            cmd.Parameters.Add("@User_Password", SqlDbType.VarChar).Value = userReq.User_Password;          
            return db.ExecuteAndClose(cmd);
        }


        public int UpdateUserById(UserReq userReq)
        {
            return NoQuery("UpdateUserById", userReq);
        }
        public int InsertUser(UserReq userReq)
        {
            return NoQuery("[InsertUser]", userReq);
        }


        private int NoQuery(String procName, UserReq userReq)
        {
            SqlCommand cmd = db.CreateCommand(procName, db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Id_User", SqlDbType.Int).Value = userReq.Id_User;
            cmd.Parameters.Add("@First_Name", SqlDbType.VarChar).Value = userReq.First_Name;
            cmd.Parameters.Add("@Last_Name", SqlDbType.VarChar).Value = userReq.Last_Name;
            cmd.Parameters.Add("@Email", SqlDbType.VarChar).Value = userReq.Email;
            cmd.Parameters.Add("@User_Password", SqlDbType.VarChar).Value = userReq.User_Password;
            cmd.Parameters.Add("@Phone_Number", SqlDbType.VarChar).Value = userReq.Phone_Number;
            cmd.Parameters.Add("@User_Address", SqlDbType.VarChar).Value = userReq.User_Address;
            cmd.Parameters.Add("@Customer_Code", SqlDbType.Int).Value = userReq.Customer_Code;
            cmd.Parameters.Add("@User_Image", SqlDbType.VarChar).Value = userReq.User_Image;
            cmd.Parameters.Add("@Token", SqlDbType.VarChar).Value = userReq.Token;
            return db.ExecuteAndClose(cmd);
        }












        //proc not Exsits yet
        public int UpdateImage(ImgRes image)
        {
            //string q = $"exec update_image {image.userId}, '{image.ImageUrl}'";
            string sql = "update_image";
            SqlCommand cmd = db.CreateCommand(sql, db.Connect(), "proc");

            //create params
            SqlParameter path = new SqlParameter("@path", SqlDbType.Text);
            //     path.Value = image.ImageUrl;
            cmd.Parameters.Add(path);

            SqlParameter userId = new SqlParameter("@userId", SqlDbType.Int);
            //   userId.Value = image.userId;
            cmd.Parameters.Add(userId);

            //run the command
            return db.ExecuteAndClose(cmd);
        }
    }
}