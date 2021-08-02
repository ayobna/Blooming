using Bloomingproj.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Bloomingproj.Data
{

    public class OrdersData
    {
        private readonly DbConnection db = new DbConnection();

        public int AddOrders( Orders orders)
        {

            SqlCommand cmd = db.CreateCommand("AddToOrders", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@Id_Product", SqlDbType.Int).Value = orders.Id_Product;
            cmd.Parameters.Add("@Id_User", SqlDbType.Int).Value = orders.Id_User;
            cmd.Parameters.Add("@Amount", SqlDbType.Int).Value = orders.Amount;
            return db.ExecuteAndClose(cmd);
        }

        public int AddOrderId()
        {

            SqlCommand cmd = db.CreateCommand("OrderId", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;
            return db.ExecuteAndClose(cmd);
        }

        public List<OrdersReq> UserOrders(int id)
        {
            SqlCommand cmd = db.CreateCommand("UserOrders", db.Connect(), "proc");
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add("@Id_User", SqlDbType.Int).Value = id;
            DataTable tb = db.ReadAndClose(cmd);
            List<OrdersReq> orders = db.ConvertDataTable<OrdersReq>(tb);
            return orders;
        }
    }
}