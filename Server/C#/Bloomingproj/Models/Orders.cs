using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bloomingproj.Models
{
    public class Orders
    {
        public int Id_User { get; set; }
        public int Id_Product { get; set;}
        public int Amount { get; set;}
    }

    public class OrdersReq
    {
        public int Id_Product { get; set; }
        
        public int Amount { get; set; }
        public string Product_Image { get; set; }
        public string Color_Description { get; set; }
        public string Name_Description { get; set; }
        public string Type_Description { get; set; }
        public DateTime Orders_DateTime { get; set; }
     
    }


}