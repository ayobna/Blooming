/*
use Master
GO
Drop database BloomingTest
GO
*/



Create TABLE [Users] (
	Id_User int  IDENTITY(1,1) NOT NULL,
	First_Name  NvarChar(50) NOT NULL,
	Last_Name  NvarChar(50) NOT NULL,
	Email  NvarChar(50) NOT NULL,
	User_Password  NvarChar(50) NOT NULL,
	Phone_Number  NvarChar(50) NOT NULL,
	User_Address  NvarChar(50) NOT NULL,
	Customer_Code int NOT NULL,
	User_Image Text   NULL,
	Token nvarchar (128) Null
)
GO



CREATE TABLE [Product] (
	Id_Product  int  IDENTITY(1,1) NOT NULL,
	Code_Type int NOT NULL,
	Code_Name int NOT NULL,
	Code_Color int NOT NULL,
	Price int NOT NULL,
 	Product_Image Text   NULL,
	inStock int NOT NULL
 )
GO


Create TABLE [Products_Types] (
	Code_Type int   NOT NULL,
	Type_Description  NvarChar(50) NOT NULL
)
GO

CREATE TABLE [Product_Names] (
	Code_Name int  IDENTITY(1,1) NOT NULL,
	Name_Description  NvarChar(50) NOT NULL
)
GO
CREATE TABLE [Product_Colors] (
	Code_Color int  IDENTITY(1,1) NOT NULL,
	Color_Description  NvarChar(50)  NULL
)
GO

CREATE TABLE [Customer_Type] (
	Customer_Code int  IDENTITY(1,1) NOT NULL,
	Customer_Description  NvarChar(50) NOT NULL,
)
GO

Create TABLE [Orders] ( 
    Id_Order int  IDENTITY(1,1) NOT NULL,
	Orders_DateTime datetime NOT NULL)
GO

Create TABLE [Orders_Details] ( 
    Id_Order int NOT NULL,
	Id_Product int NOT NULL,
	Id_User int NOT NULL,
	Amount int NOT NULL)
GO

Create Table Feedbacks(
   Id_Feedback int  IDENTITY(1,1) NOT NULL,
   Id_Product int NOT NULL,
  Feedback_Description  NvarChar(128) NOT NULL,
  Stars  decimal(10,2) Not Null,
  Fe_date date 
  )
GO

   
 create Table Question(
	Id_Question  int  IDENTITY(1,1) NOT NULL,
	Id_Product int NOT NULL,
	Id_User int NOT NULL,
	Question_Description  NvarChar(128) NOT NULL,
)
GO

 create Table Answers(	
	Id_Answer int IDENTITY(1,1) NOT NULL,
		Id_Question  int,
	Answer_Description  NvarChar(128) NOT NULL
)
GO

create Table Admin_Questions(
	Id_Admin_Question  int  IDENTITY(1,1) NOT NULL,
	Id_User int NOT NULL,
	Question_Description  NvarChar(128) NOT NULL,
	Answer_Description  NvarChar(128)  NULL
)
GO



Alter Table  [Users]
 ADD
 Constraint Con_User Primary Key  ([id_User])
 GO
 
Alter Table  [Product]
 ADD
 Constraint Con_Product Primary Key  (Id_Product)
 GO

 Alter Table  [Product_Colors]
 ADD
 Constraint Con_Product_Colors Primary Key  (  [Code_Color])
 GO

 
Alter Table  [Products_Types]
 ADD
 Constraint Con_Products_Types Primary Key  ([Code_type])
 GO

 
Alter Table  [Product_Names]
 ADD
 Constraint Con_Product_Names Primary Key  ([Code_name])
 GO

 Alter Table  [Customer_Type]
 ADD
 Constraint Con_Customer_Type Primary Key  (  Customer_Code)
 GO

 Alter Table  [Orders]
 ADD
 Constraint Con_Orders Primary Key  ([Id_order])
 GO

  Alter Table  [Orders_Details]
 ADD
 Constraint Con_Orders_Details Primary Key  (Id_order,Id_Product)
 GO

 
   Alter Table  Feedbacks
 ADD
 Constraint Con_Feedbacks Primary Key  (Id_Feedback)
 GO

 

 Alter Table  Question
 ADD
 Constraint Con_Question Primary Key  (Id_Question)
 GO

  Alter Table  Answers
 ADD
 Constraint Con_Answers Primary Key  (Id_Answer)
 GO

 Alter Table  Admin_Questions
 ADD
 Constraint Con_Admin_Questions Primary Key  (Id_Admin_Question)
 GO




ALTER TABLE [Users] WITH CHECK ADD CONSTRAINT [User_fk0] FOREIGN KEY ([Customer_Code]) REFERENCES [Customer_Type]([Customer_Code])
ON UPDATE CASCADE
GO
ALTER TABLE [Users] CHECK CONSTRAINT [User_fk0]
GO

ALTER TABLE [Product] WITH CHECK ADD CONSTRAINT [Product_fk0] FOREIGN KEY ([Code_type]) REFERENCES [Products_Types]([Code_type])
ON UPDATE CASCADE
GO
ALTER TABLE [Product] CHECK CONSTRAINT [Product_fk0]
GO
ALTER TABLE [Product] WITH CHECK ADD CONSTRAINT [Product_fk1] FOREIGN KEY ([Code_name]) REFERENCES [Product_Names]([Code_name])
ON UPDATE CASCADE
GO
ALTER TABLE [Product] CHECK CONSTRAINT [Product_fk1]
GO
ALTER TABLE [Product] WITH CHECK ADD CONSTRAINT [Product_fk2] FOREIGN KEY ([Code_Color]) REFERENCES [Product_Colors]([Code_Color])
ON UPDATE CASCADE
GO
ALTER TABLE [Product] CHECK CONSTRAINT [Product_fk2]
GO



---------

ALTER TABLE [Orders_Details] WITH CHECK ADD CONSTRAINT [Orders_Details_fk0] FOREIGN KEY ([Id_User]) REFERENCES [Users]([id_User])
ON UPDATE CASCADE
GO
ALTER TABLE [Orders_Details] CHECK CONSTRAINT [Orders_Details_fk0]
GO


ALTER TABLE [Orders_Details] WITH CHECK ADD CONSTRAINT [Orders_Details_fk1] FOREIGN KEY ([Id_Product]) REFERENCES [Product]([id_Product])
ON UPDATE CASCADE
GO
ALTER TABLE [Orders_Details] CHECK CONSTRAINT [Orders_Details_fk1]
GO

ALTER TABLE [Orders_Details] WITH CHECK ADD CONSTRAINT [Orders_Details_fk2] FOREIGN KEY (Id_Order) REFERENCES Orders (Id_Order)
ON UPDATE CASCADE
GO
ALTER TABLE [Orders_Details] CHECK CONSTRAINT [Orders_Details_fk2]
GO


 ALTER TABLE Admin_Questions WITH CHECK ADD CONSTRAINT [Question_fk0] FOREIGN KEY (Id_User) REFERENCES [Users](Id_User)
ON UPDATE CASCADE
GO
ALTER TABLE Admin_Questions CHECK CONSTRAINT [Question_fk0]
GO


 ALTER TABLE [Question] WITH CHECK ADD CONSTRAINT [Question_fk1] FOREIGN KEY (Id_User) REFERENCES [Users](Id_User)
ON UPDATE CASCADE
GO
ALTER TABLE [Question] CHECK CONSTRAINT [Question_fk1]
GO

 ALTER TABLE [Question] WITH CHECK ADD CONSTRAINT [Question_fkk] FOREIGN KEY (Id_Product) REFERENCES [Product](Id_Product)
ON UPDATE CASCADE
GO
ALTER TABLE [Question] CHECK CONSTRAINT [Question_fkk]
GO

 ALTER TABLE [Answers] WITH CHECK ADD CONSTRAINT [Answers_fk0] FOREIGN KEY (Id_Question) REFERENCES [Question](Id_Question)
ON UPDATE CASCADE
GO
ALTER TABLE [Answers] CHECK CONSTRAINT [Answers_fk0] 
GO



ALTER TABLE [Feedbacks]
ADD CONSTRAINT Feed_Orders Foreign Key ([Id_Product]) references [Product]  ([Id_Product])
GO


--CREATE TABLE ozekimessagein (
-- id int IDENTITY (1,1),
-- sender varchar(30),
-- receiver varchar(30),
-- msg varchar(160),
-- senttime varchar(100),
-- receivedtime varchar(100),
-- operator varchar(30),
-- msgtype varchar(30),
-- reference varchar(30),
--);
 
--CREATE TABLE ozekimessageout (
-- id int IDENTITY (1,1),
-- sender varchar(30),
-- receiver varchar(30),
-- msg varchar(160),
-- senttime varchar(100),
-- receivedtime varchar(100),
-- operator varchar(100),
-- msgtype varchar(30),
-- reference varchar(30),
-- status varchar(30),
-- errormsg varchar(250)
--)
--GO


----------------[Customer_Type]--------------------------------------------------------------------------


Insert [Customer_Type] (Customer_Description)  values ('Business')
GO
Insert [Customer_Type] (Customer_Description)  values ('Private')
GO
Insert [Customer_Type] (Customer_Description)  values ('Admin')
GO


--------------------------User---------------------------


Insert [Users] (First_Name,Last_Name,Email,User_Password,Phone_Number,User_Address,Customer_Code,User_Image,Token)  values ('ayobsad','bas','t23est@gmail.com','asds','0232','lqa',1,'','')
GO

Insert [Users] (First_Name,Last_Name,Email,User_Password,Phone_Number,User_Address,Customer_Code,User_Image,Token)  values ('ayobsad','bas','t23est@gmail.com','asds','0232','lqa',2,'','')
GO

Insert [Users] (First_Name,Last_Name,Email,User_Password,Phone_Number,User_Address,Customer_Code,User_Image,Token)  values ('Admin','Admin','Admin@gmail.com','Admin123','0502127125','qla',3,'','')
GO

----------------[[Products_Types]]--------------------------------------------------------------------------

Insert [Products_Types] (Code_Type,[Type_Description])  values (1,'Planting')
GO
Insert [Products_Types] (Code_Type,[Type_Description])  values (2,'Tools')
GO
Insert [Products_Types] (Code_Type,[Type_Description])  values (3,'Bouquets')
GO




----------------[Product_Names]--------------------------------------------------------------------------

Insert [Product_Names] (Name_Description)  values ('Celery')
GO
Insert [Product_Names] (Name_Description)   values ('Lavender')
GO
Insert [Product_Names] (Name_Description)  values ('Mint')
GO
Insert [Product_Names] (Name_Description)  values ('Parsley')
GO
Insert [Product_Names] (Name_Description)  values ('Dark Pink Cyclamen')
GO
Insert [Product_Names] (Name_Description) values ('Light Pink Cyclamen')
GO
Insert [Product_Names] (Name_Description)  values ('Aloe Vera')
GO
Insert [Product_Names] (Name_Description)  values ('Purple Pansy')
GO
Insert [Product_Names] (Name_Description)  values ('Purple Petunia')
GO
Insert [Product_Names] (Name_Description)  values ('Red Cineria')
GO
Insert [Product_Names] (Name_Description)  values ('Big Saw')
GO
Insert [Product_Names] (Name_Description)  values ('Electric Saw')
GO
Insert [Product_Names] (Name_Description)  values ('Small Saw')
GO
Insert [Product_Names] (Name_Description) values ('Iron Handle Shovel')
GO
Insert [Product_Names] (Name_Description)  values ('Squer Shovel')
GO
Insert [Product_Names] (Name_Description) values ('Wood Handel Shovel')
GO
Insert [Product_Names] (Name_Description)  values ('Blue Line Hoe')
GO
Insert [Product_Names] (Name_Description)  values ('Short White Wooden Fence 1m')
GO
Insert [Product_Names] (Name_Description)  values ('Soil Bag 25k')
GO
Insert [Product_Names] (Name_Description)  values ('Soil Bag 50k')
GO
Insert [Product_Names] (Name_Description) values ('Black Vase')
GO
Insert [Product_Names] (Name_Description) values ('Green Flower Vase')
GO
Insert [Product_Names] (Name_Description)  values ('Multi Color Vase')
GO
Insert [Product_Names] (Name_Description)  values ('Red Glass Vase')
GO

Insert [Product_Names] (Name_Description)  values ('Black Tulip Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('orange Tulip Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('Purple Tulip Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('White Tulip Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('Pink Lily Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('Singel Pink Lily')
GO
Insert [Product_Names] (Name_Description)  values ('Singel Red Lily')
GO
Insert [Product_Names] (Name_Description)  values ('Singel White Lily')
GO
Insert [Product_Names] (Name_Description)  values ('Singel Yellow Lily')
GO
Insert [Product_Names] (Name_Description)  values ('Orange Roses Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('Pink Roses Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('Red Roses Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('White Roses Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('Yellow Roses Bouquet')
GO
Insert [Product_Names] (Name_Description)  values ('Singel Pink Chrysanthemum')
GO
Insert [Product_Names] (Name_Description)  values ('Singel Red Chrysanthemum')
GO
Insert [Product_Names] (Name_Description)  values ('Singel Yellow Chrysanthemum')
GO
Insert [Product_Names] (Name_Description)  values ('Singel Purple Anemone')
GO
Insert [Product_Names] (Name_Description)  values ('Singel Red Anemone')
GO


-------------[Product_Colors]-----------------------------------------------------------------------
Insert [Product_Colors] (Color_Description)  values (null)
GO
Insert [Product_Colors] (Color_Description)  values ('Black')
GO

Insert [Product_Colors] (Color_Description)  values ('Blue')
GO

Insert [Product_Colors] (Color_Description)  values ('Brown')
GO

Insert [Product_Colors] (Color_Description)  values ('Green')
GO

Insert [Product_Colors] (Color_Description)  values ('Gray')
GO

Insert [Product_Colors] (Color_Description)  values ('Orange')
GO

Insert [Product_Colors] (Color_Description)  values ('Pink')
GO
Insert [Product_Colors] (Color_Description)  values ('Purple')
GO
Insert [Product_Colors] (Color_Description)  values ('Red')
GO
Insert [Product_Colors] (Color_Description)  values ('White')
GO
Insert [Product_Colors] (Color_Description)  values ('Yellow')
GO
Insert [Product_Colors] (Color_Description)  values ('Gold')
GO
Insert [Product_Colors] (Color_Description)  values ('Silver')
GO




------------[Product]-----------------------------------------------------------------------
Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,1,4,9,'images/planting/celery.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,2,8,8,'images/planting/Lavender.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,3,4,15,'images/planting/mint.png',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,4,4,13,'images/planting/parsley.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,5,7,9,'images/planting/pink_Cyclamen.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,6,7,6,'images/planting/pink_Cyclamen2.jpg',1)
GO
Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,7,4,6,'images/planting/planting.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,8,8,7,'images/planting/purple_pansy.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,9,8,11,'images/planting/purple_Petunia.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (1,10,9,13,'images/planting/red_Cineria.jpg',1)
GO

------------------------------------------Tools-----------------------------------
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,11,3,8,'images/tools/big_saw.jpg',1)
GO






Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,12,11,85,'images/tools/electric_saw.jpg',1)
GO
Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,13,6,200,'images/tools/small_saw.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,14,13,57,'images/tools/iron_handle_shovel.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,15,13,120,'images/tools/squer_shovel.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,16,1,100,'images/tools/wood_handel_shovel.jpeg')
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,17,2,89,'images/tools/blue_line_hoe.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,18,9,79,'images/tools/red_line_hoe.jpg',1)
GO
Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,19,10,20,'images/tools/short_white_wooden_fence.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,20,3,45,'images/tools/soil_bag.jpg',1)
GO

 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,21,1,30,'images/tools/black_vase.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,22,4,26,'images/tools/green_flower_vase.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,23,5,42,'images/tools/multi_color_vase.jpg',1)
GO
Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (2,24,9,40,'images/tools/red_glass_vase.jpg',1)

----------------------------------------------Bouquets--------------------------------------------------------------------------------------------------
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,25,1,200,'images/bouquets/black_tulip.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,26,6,150,'images/bouquets/orange_tulip.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,27,8,155,'images/bouquets/purple_tulips.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,28,10,150,'images/bouquets/white_tulip.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,29,7,140,'images/bouquets/pink_lily2.jpg',1)
GO

 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,30,7,4,'images/bouquets/pink_lily1.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,31,9,5,'images/bouquets/red_lily.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,32,10,4,'images/bouquets/white_lily.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,33,11,130,'images/bouquets/yellow_lily.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,34,6,165,'images/bouquets/orange_roses.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,35,7,200,'images/bouquets/pink_roses.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,36,9,150,'images/bouquets/red_roses.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,37,10,200,'images/bouquets/white_roses.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,38,11,180,'images/bouquets/yellow_roses.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,39,7,65,'images/bouquets/pink_chrysanthemum.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,40,9,7,'images/bouquets/red_chrysanthemum.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,41,11,7,'images/bouquets/yellow_chrysanthemum.jpg',1)
GO
 Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,42,8,8,'images/bouquets/purple_anemone.jpg',1)
GO
Insert [Product] (Code_Type,Code_Name,Code_Color,Price,Product_Image,inStock)  values (3,43,9,10,'images/bouquets/red_anemone.jpg',1)
GO



Create PROCEDURE  GetUsers
 AS
 Select*from Users
 Go

 Create PROCEDURE  GetUser
 @Id int
 AS
 Select*from Users
 where Id_User =@Id
 Go



Create PROCEDURE UpdateUserById
@Id_User int,
  @First_Name nvarchar(50),
    @Last_Name nvarchar(50),
    @Email nvarchar(50),
    @User_Password varchar(50),
	@Phone_Number nvarchar(50),
    @User_Address nvarchar(50),
	@Customer_Code int,
	@User_Image  nvarchar(100),
	@Token nvarchar(128)
	AS
		Begin tran
       UPDATE Users
       SET First_Name = @First_Name,Last_Name =@Last_Name, Email = @Email, 
	   User_Password = @User_Password,Phone_Number=@Phone_Number,User_Address=@User_Address,Customer_Code=@Customer_Code ,User_Image=@User_Image,Token=@Token
       WHERE Id_User = @Id_User
	   if(@@error!=0)
	   Begin
		rollback tran 
		end
		commit tran
GO




Create PROCEDURE InsertUser
	@Id_User int,
  @First_Name nvarchar(50),
    @Last_Name nvarchar(50),
    @Email nvarchar(50),
    @User_Password varchar(50),
	@Phone_Number nvarchar(50),
    @User_Address nvarchar(50),
	@Customer_Code int,
	@User_Image  nvarchar(100),
	@Token nvarchar(128)
	AS IF NOT EXISTS (Select * From Users Where Email=@Email)
        BEGIN  
            insert INTO Users 
            Values(@First_Name,@Last_Name,@Email,@User_Password,@Phone_Number,@User_Address,@Customer_Code ,@User_Image,@Token)
		    
        END 
     IF(@@error!=0)
		Begin 
			rollback tran 
		 end  
GO

Create PROCEDURE CheackLogin 
    @Email VARCHAR(100),
    @User_Password VARCHAR(50)
AS
 Select * From Users 
 Where Email=@Email and User_Password = @User_Password
Go


Create PROCEDURE SP_Login
    @Email VARCHAR(100),
    @User_Password VARCHAR(50),
    @ReturnValue INT OUTPUT
AS
BEGIN

    -- No User
    IF NOT EXISTS (Select * From Users Where Email=@Email and User_Password = @User_Password)
        BEGIN
            SET @ReturnValue = 0
        END

    -- private User
    ELSE IF EXISTS (Select * From Users Where Email=@Email and User_Password = @User_Password and Customer_Code=1)
        BEGIN
            SET @ReturnValue = 1
        END

    -- Business user
    ELSE IF EXISTS (Select * From Users Where Email=@Email and User_Password = @User_Password and Customer_Code=2)
        BEGIN
            SET @ReturnValue = 2
        END
		    -- Admin user
	 ELSE IF EXISTS (Select * From Users Where Email=@Email and User_Password = @User_Password and Customer_Code=3)
        BEGIN
            SET @ReturnValue = 3
        END
	
END
Go


Create PROCEDURE UpdateToken
@Id_User int ,@Token nvarchar(128)
As
UPDATE Users
SET Token=@Token
WHERE Id_User = @Id_User
Go

--exec UpdateToken 11 ,'test'

-----------------------------Product---------------------------------

Create PROCEDURE InsertProduct
@Id_Product	 int,
@Code_Type int,
@Code_Name int,
@Code_Color int,
@Price int,
@Product_Image nvarchar(100)
	AS IF NOT EXISTS (Select * From Product Where [Id_Product]=@Id_Product)
        BEGIN  
            insert INTO Product 
            Values(@Code_Type,@Code_Name,@Code_Color,@Price,@Product_Image,1)    
        END 
     IF(@@error!=0)
		Begin 
			rollback tran 
		 end  
GO


Create PROCEDURE UpdateProduct
@Id_Product	 int,
@Price int
	AS
		Begin tran
       UPDATE Product
       SET Price= @Price
       WHERE Id_Product = @Id_Product
	   if(@@error!=0)
	   Begin
		rollback tran 
		end
		commit tran
GO


Create PROCEDURE SelectAllProducts
 AS
 Select*from Product
 where Product.inStock=1
 Go


 create PROCEDURE DeleteProduct
	@Id_Product int
As
		Begin tran
 UPDATE Product
       SET inStock= 0
WHERE Id_Product = @Id_Product
	   if(@@error!=0)
	   Begin
		rollback tran 
		end
		commit tran

Go

 create PROCEDURE GetBackProduct
	@Id_Product int
As
		Begin tran
 UPDATE Product
       SET inStock= 1
WHERE Id_Product = @Id_Product
	   if(@@error!=0)
	   Begin
		rollback tran 
		end
		commit tran

Go



 --exec DeleteProduct 3
 Create PROCEDURE GetProducts
 	@Code_Type int
 AS

SELECT Product.Id_Product, Product_Colors.Color_Description, Product_Names.Name_Description, Products_Types.Type_Description, Product.Price, Product.Product_Image
FROM     Product INNER JOIN
                  Product_Colors ON Product.Code_Color = Product_Colors.Code_Color INNER JOIN
                  Product_Names ON Product.Code_Name = Product_Names.Code_Name INNER JOIN
                  Products_Types ON Product.Code_Type = Products_Types.Code_Type
WHERE  (Products_Types.Code_Type =@Code_Type) AND (Product.inStock = 1)
GO


 Create PROCEDURE ProductsNotInStock
 AS
SELECT Product.Id_Product, Product_Colors.Color_Description, Product_Names.Name_Description, Products_Types.Type_Description, Product.Price, Product.Product_Image
FROM     Product INNER JOIN
                  Product_Colors ON Product.Code_Color = Product_Colors.Code_Color INNER JOIN
                  Product_Names ON Product.Code_Name = Product_Names.Code_Name INNER JOIN
                  Products_Types ON Product.Code_Type = Products_Types.Code_Type
WHERE  (Product.inStock = 0)
GO









Create Proc ShowProductDetails
@num int
AS
	IF(@num=1)
	Begin 
	SELECT * FROM     Products_Types
	end 
	else if(@num=2)
	Begin 
	SELECT * FROM     Product_Names
ORDER BY Product_Names.Name_Description
	end 
	else
	Begin 
	SELECT * FROM     Product_Colors
	end 
GO


Create Proc AddName
@NewName nvarchar(25)
	AS IF NOT EXISTS (Select * From [Product_Names] Where Name_Description=@NewName)
        BEGIN 
		Insert  [Product_Names] (Name_Description)  values (@NewName)
		END
	 if(@@error!=0)
	   Begin
		rollback tran 
		end
GO

-------------------------------------Orders-------------------------------
Create PROCEDURE OrderId
As
INSERT INTO Orders  VALUES ((SELECT GETDATE()))
Go
EXEc OrderId 

Create PROCEDURE AddToOrders
@Id_Product int ,@Id_User int,@Amount int
As
insert INTO  Orders_Details values((SELECT MAX([Id_Order]) FROM Orders),@Id_Product,@Id_User,@Amount)
Go

Alter PROCEDURE UserOrders
@Id_User int
AS

SELECT TOP (100) PERCENT Product.Product_Image, Product_Colors.Color_Description, Product_Names.Name_Description, Products_Types.Type_Description, Orders.Orders_DateTime, 
                  Orders_Details.Amount, Product.Id_Product
FROM     Orders INNER JOIN
                  Orders_Details ON Orders.Id_Order = Orders_Details.Id_Order INNER JOIN
                  Product ON Orders_Details.Id_Product = Product.Id_Product INNER JOIN
                  Product_Names ON Product.Code_Name = Product_Names.Code_Name INNER JOIN
                  Products_Types ON Product.Code_Type = Products_Types.Code_Type INNER JOIN
                  Product_Colors ON Product.Code_Color = Product_Colors.Code_Color
WHERE  (Orders_Details.Id_User = @Id_User)
ORDER BY Orders.Orders_DateTime DESC
Go
--Exec UserOrders 11

-----------------Feedback--------------

Create PROCEDURE AddFeedback
@Id_Product int, @Feedback_Description nvarchar(250) ,@Stars  decimal(10,2)
As
insert INTO  Feedbacks values(@Id_Product,@Feedback_Description,@Stars,	(select convert(varchar, getdate(), 23)))
Go
--exec AddFeedback 94 ,'no good',5
create proc FeedbackByIdProduct
@Id_Product int
AS
select*from Feedbacks
where Id_Product=@Id_Product
go
--exec FeedbackByIdProduct 94

create proc GetAllFeedback
AS
select*from Feedbacks
go

exec GetAllFeedback

------------------------Question------------------------
create proc askForProduct
@Id_Product int , @Id_User int ,@Question_Description  nvarchar(128)
AS
insert INTO  Question values(@Id_Product,@Id_User,@Question_Description)
GO
exec askForProduct 13,11,'sdzdfzdf'
create proc AnswerForProduct
@Id_Question  int , @Answer_Description nvarchar(128)
AS
insert INTO  Answers values(@Id_Question,@Answer_Description)
GO

create proc QuestionByIdProduct 
@Id_Product int 
AS
SELECT Question.Id_Product, Question.Id_User, Question.Question_Description, Question.Id_Question, Answers.Answer_Description
FROM     Answers  RIGHT OUTER JOIN
                  Question ON Answers.Id_Question = Question.Id_Question
WHERE  (Question.Id_Product =@Id_Product)
ORDER BY Question.Id_Question DESC
go

--exec  QuestionByIdProduct 13
------------------------------------------------------------------------------------


create proc AskAdmin
@Id_User int, @Question_Description NvarChar(128)
As
insert INTO Admin_Questions values(@Id_User,@Question_Description,NUll)
go
--exec AskAdmin 13,'ask admin test '

Create proc GetAdminQuestionByIdUser
@Id_User int
As
select*from  Admin_Questions
where Id_User= @Id_User
ORDER BY Id_Admin_Question DESC
go
--exec GetAdminQuestionByIdUser 11


create proc AnswerAdmin
@Id_Admin_Question int,@Answer_Description NvarChar(128)
As
UPDATE [Admin_Questions]
SET Answer_Description=@Answer_Description
WHERE Id_Admin_Question = @Id_Admin_Question
go

--exec AnswerAdmin 1 ,'admin answer test '

create  proc AdminQuestion
As
SELECT  Id_Admin_Question, Id_User, Question_Description, Answer_Description
FROM     site26.Admin_Questions
ORDER BY Id_Admin_Question DESC
go

--exec AdminQuestion 

Alter proc  SoldProduct
AS
SELECT Id_Product, SUM(Amount) AS SumAmount
FROM     site26.Orders_Details
WHERE  (Id_Product = Id_Product)
GROUP BY Id_Product
ORDER BY SumAmount DESC
Go
--exec SoldProduct

create proc GetAllProduct
@Id_Product int
AS
SELECT site26.Product.Product_Image, site26.Product_Colors.Color_Description, site26.Product_Names.Name_Description, site26.Products_Types.Type_Description, site26.Product.Price
FROM     site26.Product INNER JOIN
                  site26.Product_Colors ON site26.Product.Code_Color = site26.Product_Colors.Code_Color INNER JOIN
                  site26.Product_Names ON site26.Product.Code_Name = site26.Product_Names.Code_Name INNER JOIN
                  site26.Products_Types ON site26.Product.Code_Type = site26.Products_Types.Code_Type
where Id_Product=@Id_Product
Go

--exec GetAllProduct 11