using Bloomingproj.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Bloomingproj.Data
{
    public class ProductData
    {
        private readonly DbConnection db = new DbConnection();

        //proc not Exsits yet
        public List<ProductRes> GetAllProducts()
        {
            SqlCommand cmd = db.CreateCommand("SelectAllProducts", db.Connect(), "proc");
            DataTable tb = db.ReadAndClose(cmd);
            List<ProductRes> products = db.ConvertDataTable<ProductRes>(tb);
            return products;
        }
        public List<ProductsRes> GetProducts(ProductsRes productsRes)
        {
            SqlCommand cmd = db.CreateCommand("GetProducts", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Code_Type", SqlDbType.Int).Value = productsRes.Code_Type;
            DataTable tb = db.ReadAndClose(cmd);
            List<ProductsRes> products = db.ConvertDataTable<ProductsRes>(tb);
            return products;
        }

        public List<ProductsRes> ProductsNotInStock()
        {
            SqlCommand cmd = db.CreateCommand("ProductsNotInStock", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            DataTable tb = db.ReadAndClose(cmd);
            List<ProductsRes> products = db.ConvertDataTable<ProductsRes>(tb);
            return products;
        }



        public List<TypeDitalseRes> ShowProductDetails1(ProductsDitalseCode productsDitalseCode)
        {
            SqlCommand cmd = db.CreateCommand("ShowProductDetails", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@num", SqlDbType.Int).Value = productsDitalseCode.code;
            DataTable tb = db.ReadAndClose(cmd);
            List<TypeDitalseRes> productsDitalse = db.ConvertDataTable<TypeDitalseRes>(tb);
            return productsDitalse;
        }
    
        public List<NameDitalseRes> ShowProductDetails2(ProductsDitalseCode productsDitalseCode)
        {
            SqlCommand cmd = db.CreateCommand("ShowProductDetails", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@num", SqlDbType.Int).Value = productsDitalseCode.code;
            DataTable tb = db.ReadAndClose(cmd);
            List<NameDitalseRes> productsDitalse = db.ConvertDataTable<NameDitalseRes>(tb);
            return productsDitalse;
        }


        public List<ColorDitalseRes> ShowProductDetails3(ProductsDitalseCode productsDitalseCode)
        {
            SqlCommand cmd = db.CreateCommand("ShowProductDetails", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@num", SqlDbType.Int).Value = productsDitalseCode.code;
            DataTable tb = db.ReadAndClose(cmd);
            List<ColorDitalseRes> productsDitalse = db.ConvertDataTable<ColorDitalseRes>(tb);
            return productsDitalse;
        }



        public int InsertProduct(ProductReq productReq)
        {
            return NoQuery("[InsertProduct]", productReq);
        }
        public int UpdateProduct(ProductReq productReq)
        {
  
            SqlCommand cmd = db.CreateCommand("UpdateProduct", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = productReq.Id_Product;
            cmd.Parameters.Add("@Price", SqlDbType.Int).Value = productReq.Price;
            return db.ExecuteAndClose(cmd);
        }

     

        public int DeleteProduct(ProductReq productReq)
        {
            SqlCommand cmd = db.CreateCommand("DeleteProduct", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = productReq.Id_Product;
            return db.ExecuteAndClose(cmd);
        }



        public int GetBackProduct(ProductReq productReq)
        {
            SqlCommand cmd = db.CreateCommand("GetBackProduct", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = productReq.Id_Product;
            return db.ExecuteAndClose(cmd);
        }


        public int AddName(NameDitalseRes nameDitalseRes)
        {
            SqlCommand cmd = db.CreateCommand("AddName", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@NewName", SqlDbType.VarChar).Value = nameDitalseRes.Name_Description;
            return db.ExecuteAndClose(cmd);
        }


        private int NoQuery(String procName, ProductReq productReq)
        {
            SqlCommand cmd = db.CreateCommand(procName, db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = productReq.Id_Product;
            cmd.Parameters.Add("@Code_Type", SqlDbType.Int).Value = productReq.Code_Type;
            cmd.Parameters.Add("@Code_Name", SqlDbType.Int).Value = productReq.Code_Name;
            cmd.Parameters.Add("@Price", SqlDbType.Int).Value = productReq.Price;
            cmd.Parameters.Add("@Code_Color", SqlDbType.Int).Value = productReq.Code_Color;
            cmd.Parameters.Add("@Product_Image", SqlDbType.VarChar).Value = productReq.Product_Image;
            return db.ExecuteAndClose(cmd);
        }



        public List<SoldProduct> SoldProduct()
        {
            SqlCommand cmd = db.CreateCommand("SoldProduct", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            DataTable tb = db.ReadAndClose(cmd);
            List<SoldProduct> products = db.ConvertDataTable<SoldProduct>(tb);
            return products;
        }

        public ProductsRes GetAllProducts(int id_Product)
        {
            SqlCommand cmd = db.CreateCommand("GetAllProduct", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = id_Product;

            DataTable tb = db.ReadAndClose(cmd);
            List<ProductsRes> products = db.ConvertDataTable<ProductsRes>(tb);
            return products[0];
        }
    }
}