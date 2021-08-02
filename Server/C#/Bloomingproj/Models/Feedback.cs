using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bloomingproj.Models
{
    public class Feedback
    {
      public  int Id_Product { get; set; }
        public string Feedback_Description { get; set; }
        public decimal  Stars { get; set; }
        public int Id_Feedback { get; set; }
        public  DateTime Fe_date { get; set; }
    }
}