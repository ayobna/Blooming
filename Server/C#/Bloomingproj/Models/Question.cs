using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bloomingproj.Models
{
    public class Question
    {

        public int Id_Product { set; get;}
        public int Id_User { set; get; }
      //  public string Answer_Description { set; get; }
        public string Question_Description { set; get;}

    }
    public class Answer
    {
        public int Id_Question { set; get; }
        public string Answer_Description { set; get; }
    }
    public class QuestionId
    {
        public int Id_Question { set; get; }
        public int Id_Product { set; get; }
        public int Id_User { set; get; }
         public string Answer_Description { set; get; }
        public string Question_Description { set; get; }
    }



    public class AdminQuestion
    {
        public int  Id_Admin_Question{ set; get; }
        public int Id_User { set; get; }
        public string Answer_Description { set; get; }
        public string Question_Description { set; get; }
    }
}