using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bloomingproj.Models
{
    public class ProductReq
    {
        public int Id_Product { get; set; }
        public int Code_Type { get; set; }
        public int Code_Name { get; set; }
        public int Code_Color { get; set; }
        public int Price { get; set; }
        public string Product_Image { get; set; }
    }
    public class ProductRes
    {
        public int Id_Product { get; set; }
        public int Code_Type { get; set; }
        public int Code_Name { get; set; }
        public int Code_Color { get; set; }
        public int Price { get; set; }
        public string Product_Image { get; set; }
        
    }

    public class ProductsRes
    {
        public int Id_Product { get; set; }
        public int Code_Type { get; set; }
        public string Name_Description { get; set; }
        public string Type_Description { get; set; }
        public string Color_Description { get; set; }
        public int Price { get; set; }
        public string Product_Image { get; set; }
    }
    public class ProductsDitalseCode
    {
        public int code { get; set; }
    }
    public class TypeDitalseRes
    {
        public int Code_Type { get; set; }
        public string Type_Description { get; set; }
    }
    public class NameDitalseRes
    {
        public int  Code_Name{ get; set; }
        public string Name_Description { get; set; }
    }


    public class ColorDitalseRes
    {
        public int Code_Color { get; set; }
        public string  Color_Description{ get; set; }
    }

    public class SoldProduct
    {
        public int Id_Product { get; set; }
        public int SumAmount { get; set; }
    }
}