using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bloomingproj.Models
{
    public class PushNotData
    {
        public string to { get; set; }
        public string title { get; set; }
        public string body { get; set; }
       // public string badge { get; set; }
        public Data data { get; set; }
    }
    public class Data {
        public string navigate { get; set; }
        //public Data(Object obj)
        //{
           
        //    this.navigate = ((Data)obj).navigate;
        //}
     
    }

}