using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bloomingproj.Models
{
    public class UserReq
    {
        public int Id_User { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Email { get; set; }
        public string User_Password { get; set; }
        public string Phone_Number { get; set; }
        public string User_Address { get; set; }
        public int Customer_Code { get; set; }
        public string User_Image { get; set; }
        public string Token { get; set; }
    }

    public class UserRes
    {
        public int Id_User { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Email { get; set; }
        public string User_Password { get; set; }
        public string Phone_Number { get; set; }
        public string User_Address { get; set; }
        public int Customer_Code { get; set; }
        public string User_Image { get; set; }
        public string Token { get; set; }
    }



    public class UserToken
    {
        public int code { get; set; }
        public string Token { get; set; }
     
    }



}