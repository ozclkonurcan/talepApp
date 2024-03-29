USE [TalepUygulamasi]
GO
/****** Object:  Table [dbo].[Cinsiyet]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cinsiyet](
	[CinsiyetID] [bigint] IDENTITY(1,1) NOT NULL,
	[CinsiyetAd] [nvarchar](50) NULL,
 CONSTRAINT [PK_Cinsiyet] PRIMARY KEY CLUSTERED 
(
	[CinsiyetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departman]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departman](
	[DepartmanID] [bigint] IDENTITY(1,1) NOT NULL,
	[SektorID] [bigint] NULL,
	[SirketID] [bigint] NULL,
	[DepartmanAd] [nvarchar](50) NULL,
 CONSTRAINT [PK_Departman] PRIMARY KEY CLUSTERED 
(
	[DepartmanID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Durum]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Durum](
	[DurumID] [bigint] IDENTITY(1,1) NOT NULL,
	[DurumAd] [nvarchar](50) NULL,
 CONSTRAINT [PK_Durum] PRIMARY KEY CLUSTERED 
(
	[DurumID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personel]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personel](
	[PersonelID] [bigint] IDENTITY(1,1) NOT NULL,
	[PersonelAd] [nvarchar](50) NULL,
	[PersonelResim] [nvarchar](max) NULL,
	[CinsiyetID] [bigint] NULL,
	[SektorID] [bigint] NULL,
	[SirketID] [bigint] NULL,
	[DepartmanID] [bigint] NULL,
	[PersonelTel] [numeric](18, 0) NULL,
	[PersonelEmail] [nvarchar](50) NULL,
	[PersonelPassword] [nvarchar](50) NULL,
	[StatuID] [bigint] NULL,
	[DurumID] [bigint] NULL,
	[YetkiliButce] [bigint] NULL,
	[PersonelTarih] [nvarchar](50) NULL,
 CONSTRAINT [PK_Personel] PRIMARY KEY CLUSTERED 
(
	[PersonelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sektor]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sektor](
	[SektorID] [bigint] IDENTITY(1,1) NOT NULL,
	[SektorAd] [nvarchar](50) NULL,
 CONSTRAINT [PK_Sektor] PRIMARY KEY CLUSTERED 
(
	[SektorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sirket]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sirket](
	[SirketID] [bigint] IDENTITY(1,1) NOT NULL,
	[SektorID] [bigint] NULL,
	[SirketAd] [nvarchar](50) NULL,
 CONSTRAINT [PK_Sirket] PRIMARY KEY CLUSTERED 
(
	[SirketID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Statu]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Statu](
	[StatuID] [bigint] IDENTITY(1,1) NOT NULL,
	[StatuAd] [nvarchar](50) NULL,
 CONSTRAINT [PK_Statu] PRIMARY KEY CLUSTERED 
(
	[StatuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Talep]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Talep](
	[TalepID] [bigint] IDENTITY(1,1) NOT NULL,
	[PersonelID] [bigint] NULL,
	[PersonelEmail] [nvarchar](50) NULL,
	[TalepPersonelResim] [nvarchar](max) NULL,
	[PersonelStatuID] [bigint] NULL,
	[SektorID] [bigint] NULL,
	[SirketID] [bigint] NULL,
	[DepartmanID] [bigint] NULL,
	[TalepAd] [nvarchar](50) NULL,
	[TalepAciklamasi] [nvarchar](max) NULL,
	[TalepMiktar] [bigint] NULL,
	[AgirlikBirimi] [nchar](10) NULL,
	[TalepTahminiDeger] [decimal](18, 2) NULL,
	[ParaBirimi] [nchar](10) NULL,
	[TalepTarih] [nvarchar](50) NULL,
	[TalepDurum] [bigint] NULL,
	[OnaylayanAd] [nvarchar](50) NULL,
	[OnaylayanResim] [nvarchar](max) NULL,
	[OnayTarih] [nvarchar](50) NULL,
 CONSTRAINT [PK_Talep] PRIMARY KEY CLUSTERED 
(
	[TalepID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Yetkili]    Script Date: 07/12/2021 13:54:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Yetkili](
	[YetkiID] [bigint] IDENTITY(1,1) NOT NULL,
	[PersonelID] [bigint] NOT NULL,
	[PersonelAd] [bigint] NULL,
	[SektorID] [bigint] NULL,
	[SirketID] [bigint] NULL,
	[DepartmanID] [bigint] NULL,
	[StatuID] [bigint] NULL,
	[YetkiTarih] [nvarchar](50) NULL,
 CONSTRAINT [PK_Yetkili] PRIMARY KEY CLUSTERED 
(
	[YetkiID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Cinsiyet] ON 

INSERT [dbo].[Cinsiyet] ([CinsiyetID], [CinsiyetAd]) VALUES (1, N'Erkek')
INSERT [dbo].[Cinsiyet] ([CinsiyetID], [CinsiyetAd]) VALUES (2, N'Kadın')
SET IDENTITY_INSERT [dbo].[Cinsiyet] OFF
GO
SET IDENTITY_INSERT [dbo].[Departman] ON 

INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (1, 3, 7, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (2, 3, 7, N'İK')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (3, 3, 7, N'Call Center')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (5, 3, 8, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (6, 5, 17, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (7, 1, 1, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (8, 6, 19, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (9, 5, 15, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (10, 5, 15, N'İK')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (11, 3, 9, N'Muhasebe')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (13, 3, 8, N'İK')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (14, 3, 8, N'Call Center')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (15, 3, 6, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (16, 4, 12, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (17, 2, 3, N'Call Center')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (18, 5, 18, N'Donanım')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (19, 5, 18, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (20, 6, 19, N'Bozkurt')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (21, 4, 13, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (22, 5, 16, N'Satın Alma')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (23, 2, 4, N'İSO')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (24, 5, 16, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (25, 3, 9, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (26, 3, 10, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (27, 3, 11, N'IT')
INSERT [dbo].[Departman] ([DepartmanID], [SektorID], [SirketID], [DepartmanAd]) VALUES (28, 4, 14, N'IT')
SET IDENTITY_INSERT [dbo].[Departman] OFF
GO
SET IDENTITY_INSERT [dbo].[Durum] ON 

INSERT [dbo].[Durum] ([DurumID], [DurumAd]) VALUES (1, N'Aktif')
INSERT [dbo].[Durum] ([DurumID], [DurumAd]) VALUES (2, N'Pasif')
SET IDENTITY_INSERT [dbo].[Durum] OFF
GO
SET IDENTITY_INSERT [dbo].[Personel] ON 

INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (5, N'Admin', N'profil2.jpg', 2, 3, 7, 1, CAST(222444555 AS Numeric(18, 0)), N'tr.onurozcelik@outlook.com', N'a', 4, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1050, N'Mudur', N'profil2.jpg', 1, 3, 7, 1, CAST(151515 AS Numeric(18, 0)), N'mudur@gmail.com', N'a', 3, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1051, N'Hayriye DAGLI', N'çiçek.jpg', 2, 3, 7, 1, CAST(11122233355 AS Numeric(18, 0)), N'ozclkonurcan@gmail.com', N'a', 2, 2, 10000, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1052, N'Onur ÖZÇELİK', N'ozclkonur.jpg', 1, 3, 7, 1, CAST(5531830397 AS Numeric(18, 0)), N'tr.ozclkonur@gmail.com', N'a', 1, 2, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1055, N'Alperen Bozkurt', N'alperen.jpg', 1, 3, 7, 1, CAST(5568854466 AS Numeric(18, 0)), N'onemsizbirhesap0@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1072, N'Kemal Parlak', N'anonymouse.png', 1, 1, 1, 1, CAST(2261955 AS Numeric(18, 0)), N'parlakkemal@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1073, N'Ayşe Kurt', N'anonymouse.png', 2, 5, 15, 1, CAST(3642261877 AS Numeric(18, 0)), N'kurtayse@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1074, N'Merve Arslan', N'anonymouse.png', 2, 5, 16, 1, CAST(3642261818 AS Numeric(18, 0)), N'arslanmerve@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1075, N'Samet Solar', N'anonymouse.png', 1, 5, 17, 1, CAST(3642261199 AS Numeric(18, 0)), N'solarsamet@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1076, N'Şule Akduman', N'anonymouse.png', 2, 5, 18, 1, CAST(3642261214 AS Numeric(18, 0)), N'akdumansule@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1077, N'Fatma Kahveci', N'anonymouse.png', 2, 3, 6, 1, CAST(3642261817 AS Numeric(18, 0)), N'kahvecifatma@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1078, N'Nisa Terece', N'anonymouse.png', 2, 3, 8, 1, CAST(3642261188 AS Numeric(18, 0)), N'terecenisa@gmail.com', N'a', 1, 2, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1079, N'Bulut Dağ', N'anonymouse.png', 1, 3, 9, 1, CAST(3642284896 AS Numeric(18, 0)), N'dagbulut@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1080, N'Şeref Özdemir', N'anonymouse.png', 1, 3, 10, 1, CAST(364556988 AS Numeric(18, 0)), N'ozdemirseref@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1081, N'Yaşar Öztürk', N'anonymouse.png', 1, 3, 11, 1, CAST(3645588459 AS Numeric(18, 0)), N'ozturkyasar@gmail.com', N'a', 1, 1, 0, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1082, N'Arif BUZDAG', N'profil4.jpg', 1, 1, 1, 1, CAST(88655456 AS Numeric(18, 0)), N'buzdagarif@gmail.com', N'a', 2, 1, 10000, N'2021-11-03')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1088, N'Çolpan Kuru', N'colpan.jpg', 2, 4, 14, 1, CAST(556684526 AS Numeric(18, 0)), N'kurucolpan@gmail.com', N'0', 3, 1, 0, N'2021-12-02')
INSERT [dbo].[Personel] ([PersonelID], [PersonelAd], [PersonelResim], [CinsiyetID], [SektorID], [SirketID], [DepartmanID], [PersonelTel], [PersonelEmail], [PersonelPassword], [StatuID], [DurumID], [YetkiliButce], [PersonelTarih]) VALUES (1089, N'Arif Işık', N'anonymouse.png', 1, 3, 6, 1, CAST(151515155 AS Numeric(18, 0)), N'isikarif@gmail.com', N'12345678', 1, 1, 0, N'2021-12-03')
SET IDENTITY_INSERT [dbo].[Personel] OFF
GO
SET IDENTITY_INSERT [dbo].[Sektor] ON 

INSERT [dbo].[Sektor] ([SektorID], [SektorAd]) VALUES (1, N'Rafineri')
INSERT [dbo].[Sektor] ([SektorID], [SektorAd]) VALUES (2, N'Yatırım')
INSERT [dbo].[Sektor] ([SektorID], [SektorAd]) VALUES (3, N'Enerji')
INSERT [dbo].[Sektor] ([SektorID], [SektorAd]) VALUES (4, N'Sağlık')
INSERT [dbo].[Sektor] ([SektorID], [SektorAd]) VALUES (5, N'Otomotiv')
INSERT [dbo].[Sektor] ([SektorID], [SektorAd]) VALUES (6, N'Gayrimenkul')
SET IDENTITY_INSERT [dbo].[Sektor] OFF
GO
SET IDENTITY_INSERT [dbo].[Sirket] ON 

INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (1, 1, N'Ahlatçı Metal Rafineri')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (2, 2, N'Ahlatçı Döviz ve Kıymetli Madenler A.Ş')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (3, 2, N'Ahlatçı Kuyumculuk')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (4, 2, N'Milenyum')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (5, 2, N'Ahlatçı Yatırım Menkul Değerler')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (6, 3, N'Çedaş')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (7, 3, N'Çorumgaz')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (8, 3, N'Sürmeligaz')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (9, 3, N'Kargaz')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (10, 3, N'Ahl enerji')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (11, 3, N'DOLRA ENERGY')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (12, 4, N'Çorum Özel Hastahanesi')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (13, 4, N'Elitpark Hastahanesi')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (14, 4, N'Supra')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (15, 5, N'Audi')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (16, 5, N'Volkswagen')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (17, 5, N'Skoda')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (18, 5, N'Seat')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (19, 6, N'Çorum AHL PARK')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (20, 6, N'Konya AHL PARK')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (21, 6, N'Elazığ AHL PARK')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (22, 6, N'Ahlatçı Eğitim Sağlık ve Yardımlaşma Vakfı')
INSERT [dbo].[Sirket] ([SirketID], [SektorID], [SirketAd]) VALUES (23, 6, N'Fevziye Ahlatçı Yurdu')
SET IDENTITY_INSERT [dbo].[Sirket] OFF
GO
SET IDENTITY_INSERT [dbo].[Statu] ON 

INSERT [dbo].[Statu] ([StatuID], [StatuAd]) VALUES (1, N'Personel')
INSERT [dbo].[Statu] ([StatuID], [StatuAd]) VALUES (2, N'Yetkili')
INSERT [dbo].[Statu] ([StatuID], [StatuAd]) VALUES (3, N'Yönetici')
INSERT [dbo].[Statu] ([StatuID], [StatuAd]) VALUES (4, N'Admin')
SET IDENTITY_INSERT [dbo].[Statu] OFF
GO
SET IDENTITY_INSERT [dbo].[Talep] ON 

INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (1, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'a', N'a', 1, N'Adet      ', CAST(1.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-19', 2, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'22.11.2021 08:27:27')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (2, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'Tarih deneme', N'tarih deneme', 1, N'Adet      ', CAST(1.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-20', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'22.11.2021 09:01:08')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (3, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'Kalemlik', N'Kalemlik', 1, N'Adet      ', CAST(1.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-21', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'30.11.2021 10:22:16')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (6, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'Macbook Air', N'İos uygulama için ihtiyacım var', 1, N'Adet      ', CAST(1.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (7, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'Not defteri,Kalem,Silgi', N'Temel ofis ihtiyaçları', 1, N'Adet      ', CAST(1.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-17', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'30.11.2021 14:59:30')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (8, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'Masa', N'Çalışma Masasına ihtiyacım var', 1, N'Adet      ', CAST(15000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-21', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (9, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'Priz', N'Benim masamda priz olmadığı için sürekli karşı masanın prizini işgal ediyorum.', 1, N'Adet      ', CAST(65.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'01.12.2021 09:09:10')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (10, 1051, N'ozclkonurcan@gmail.com', N'http://localhost:5000/Photos/çiçek.jpg', 2, 3, 7, 1, N'Macbook pro', N'Yeni ios geliştiricileri için', 3, N'Adet      ', CAST(45000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (11, 1051, N'ozclkonurcan@gmail.com', N'http://localhost:5000/Photos/çiçek.jpg', 2, 3, 7, 1, N'Su', N'Mutfak için', 15, N'Koli      ', CAST(7250.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (12, 1072, N'parlakkemal@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 1, 1, 1, N'Macbook pro', N'İhtiyacım var', 1, N'Adet      ', CAST(17850.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-17', 2, N'Mudur', N'http://localhost:5000/Photos/profil2.jpg', N'01.12.2021 08:36:39')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (13, 1072, N'parlakkemal@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 1, 1, 1, N'Not Defteri', N'Ofis ihtiyacı', 1, N'Adet      ', CAST(7.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (14, 1072, N'parlakkemal@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 1, 1, 1, N'Kalem,Silgi', N'Ofis ihtiyacı', 1, N'Adet      ', CAST(15.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-18', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (15, 1072, N'parlakkemal@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 1, 1, 1, N'Mouse Pad', N'Mouse masanın üstünde düzgün haraket etmiyor', 1, N'Adet      ', CAST(65.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 1, N'Arif BUZDAG', N'http://localhost:5000/Photos/profil4.jpg', N'24.11.2021 10:32:24')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (16, 1073, N'kurtayse@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 15, 1, N'Mouse', N'Touchpad ile rahat kullanamıyorum', 1, N'Adet      ', CAST(210.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (17, 1073, N'kurtayse@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 15, 1, N'Priz', N'Bilgisayar haricinde başka kullandığım elektronik aletler var', 1, N'Adet      ', CAST(35.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (18, 1073, N'kurtayse@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 15, 1, N'Yeni Audi A3 Sportback', N'Müşteri talebi', 3, N'Adet      ', CAST(3800000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-19', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (19, 1073, N'kurtayse@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 15, 1, N'Yeni Audi A4 Sedan', N'Müşteri talebi', 1, N'Adet      ', CAST(865000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (20, 1074, N'arslanmerve@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 16, 1, N'Yeni Polo', N'Müşteri talebi', 1, N'Adet      ', CAST(800000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (21, 1074, N'arslanmerve@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 16, 1, N'Kalem', N'Ofis ihtiyacı', 1, N'Adet      ', CAST(4.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-19', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (22, 1074, N'arslanmerve@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 16, 1, N'Macbook pro', N'İos geliştirme yapabilmek için', 1, N'Adet      ', CAST(22600.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (23, 1074, N'arslanmerve@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 16, 1, N'Not defteri', N'Ofis ihtiyacı', 1, N'Adet      ', CAST(18.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (24, 1075, N'solarsamet@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 17, 1, N'Samsung 49 inç 144 hz Motitör ', N'Daha rahat çalışabilmek için', 1, N'Adet      ', CAST(11000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (25, 1077, N'kahvecifatma@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 6, 1, N'Çalışma Masası', N'Ofiste masam yok', 1, N'Adet      ', CAST(680.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'01.12.2021 10:34:08')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (26, 1077, N'kahvecifatma@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 6, 1, N'Telefon', N'Şirket içi görüşme yapabilmek için', 1, N'Adet      ', CAST(130.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-18', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (27, 1078, N'terecenisa@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 8, 1, N'SSD 256 GB', N'Bilgisayar çok yavaş açılıyor takviye yapmak istiyorum', 1, N'Adet      ', CAST(650.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-17', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (28, 1078, N'terecenisa@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 8, 1, N'Not defteri', N'Ofis ihtiyacı', 2, N'Adet      ', CAST(28.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (29, 1078, N'terecenisa@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 8, 1, N'Mouse', N'Touchpad e alışık değilim', 1, N'Adet      ', CAST(225.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (30, 1081, N'ozturkyasar@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 11, 1, N'Macbook pro', N'İos geliştirme yapabilmek için', 1, N'Adet      ', CAST(26500.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-18', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (31, 1081, N'ozturkyasar@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 11, 1, N'Not Defteri,Kalem,Kalem Kutusu', N'Temel ofis ihtiyaçları', 1, N'Adet      ', CAST(63.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (33, 1079, N'dagbulut@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 9, 1, N'Macbook pro', N'İos geliştirme yapabilmek için ihtiyacım var', 1, N'Adet      ', CAST(24600.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-22', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (34, 1051, N'ozclkonurcan@gmail.com', N'http://localhost:5000/Photos/çiçek.jpg', 2, 3, 7, 1, N'Masa', N'Yeni çalışanlar için', 4, N'Adet      ', CAST(3600.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-23', 2, N'Mudur', N'http://localhost:5000/Photos/profil2.jpg', N'01.12.2021 08:32:59')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (35, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'Asus Tuf gaming', N'Bilgisayarım nedense çok donuyor bu yüzden yenisi lazım', 1, N'Adet      ', CAST(8600.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-24', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (36, 1051, N'ozclkonurcan@gmail.com', N'http://localhost:5000/Photos/çiçek.jpg', 2, 3, 7, 1, N'Telefon', N'Ofis içi telefon ihtiyacı', 60, N'Adet      ', CAST(16000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-24', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (37, 1082, N'bugdagarif@gmail.com', N'http://localhost:5000/Photos/profil4.jpg', 2, 1, 1, 1, N'Masa', N'Yeni çalışanlar için masa', 5, N'Adet      ', CAST(3500.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-24', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (38, 1072, N'parlakkemal@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 1, 1, 1, N'Küçük dolap', N'Eşya bırakmak için kilitlenebilir küçük dolap', 1, N'Adet      ', CAST(230.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-24', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (39, 1078, N'terecenisa@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 3, 8, 1, N'Asus Tuf gaming notebook', N'Kullanmaya devam ettiğim bilgisayar  ihtiyaçlarımı yeteri kadar karşılamıyor', 1, N'Adet      ', CAST(13000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-24', 1, N'Mudur', N'http://localhost:5000/Photos/profil2.jpg', N'01.12.2021 08:35:59')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (40, 1076, N'akdumansule@gmail.com', N'http://localhost:5000/Photos/anonymouse.png', 1, 5, 18, 1, N'Macbook pro adaptörü', N'Şarj olmuyor adaptörde bi sıkıntı olduğu ortaya çıktı', 1, N'Adet      ', CAST(1100.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-24', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (41, 1051, N'ozclkonurcan@gmail.com', N'http://localhost:5000/Photos/çiçek.jpg', 2, 3, 7, 1, N'Kalem', N'Kalem ihtiyacı', 15, N'Koli      ', CAST(350.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-26', 1, N'Mudur', N'http://localhost:5000/Photos/profil2.jpg', N'01.12.2021 08:32:39')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (42, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'SSD 500,Klavye', N'Bilgisayarın daha hızlı haraket edebilmesi için sdd ye ihtiyacım var birde klavyemde bazı tuşlar çalışmıyor yeni bir klavyeye ihtiyacım var', 1, N'Adet      ', CAST(1100.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-26', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'30.11.2021 17:49:06')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (43, 1055, N'onemsizbirhesap0@gmail.com', N'http://localhost:5000/Photos/alperen.jpg', 1, 3, 7, 1, N'Macbook Pro', N'Herkes te bu bilgisayardan var bende yok', 1, N'Adet      ', CAST(26000.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-26', 2, N'Mudur', N'http://localhost:5000/Photos/profil2.jpg', N'02.12.2021 09:54:25')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (44, 1055, N'onemsizbirhesap0@gmail.com', N'http://localhost:5000/Photos/alperen.jpg', 1, 3, 7, 1, N'Silgi', N'Ofis ihtiyacı', 1, N'Adet      ', CAST(6.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-26', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'30.11.2021 17:50:04')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (45, 1055, N'onemsizbirhesap0@gmail.com', N'http://localhost:5000/Photos/alperen.jpg', 1, 3, 7, 1, N'Kalem', N'Ofis ihtiyacı', 1, N'Adet      ', CAST(16.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-26', 2, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'01.12.2021 10:03:10')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (46, 1055, N'onemsizbirhesap0@gmail.com', N'http://localhost:5000/Photos/alperen.jpg', 1, 3, 7, 1, N'Not Defteri', N'Ofis ihtiyacı', 1, N'Adet      ', CAST(36.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-26', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'03.12.2021 10:07:26')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (47, 1055, N'onemsizbirhesap0@gmail.com', N'http://localhost:5000/Photos/alperen.jpg', 1, 3, 7, 1, N'SSD 256', N'Bilgisayarın daha verimli hale gelebilmesi için ihtiyacım var', 1, N'Adet      ', CAST(680.00 AS Decimal(18, 2)), N'TL        ', N'2021-11-26', 2, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'03.12.2021 10:18:59')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (48, 1051, N'ozclkonurcan@gmail.com', N'http://localhost:5000/Photos/çiçek.jpg', 2, 3, 7, 1, N'Asus Tuf gaming notebook', N'Asus Tuf gaming notebook aÇIKLAMA', 1, N'Adet      ', CAST(1.00 AS Decimal(18, 2)), N'TL        ', N'2021-12-01', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (49, 1052, N'tr.ozclkonur@gmail.com', N'http://localhost:5000/Photos/ozclkonur.jpg', 1, 3, 7, 1, N'Casper Notebook', N'Casper Notebook açıklama', 1, N'Adet      ', CAST(6000.00 AS Decimal(18, 2)), N'TL        ', N'2021-12-01', 1, N'Hayriye DAGLI', N'http://localhost:5000/Photos/çiçek.jpg', N'03.12.2021 09:54:21')
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (50, 1082, N'buzdagarif@gmail.com', N'http://localhost:5000/Photos/profil4.jpg', 2, 1, 1, 1, N'Macbook Pro', N'İos üzerine çalışma yapmak için lazım', 1, N'Adet      ', CAST(29000.00 AS Decimal(18, 2)), N'TL        ', N'2021-12-02', 0, NULL, NULL, NULL)
INSERT [dbo].[Talep] ([TalepID], [PersonelID], [PersonelEmail], [TalepPersonelResim], [PersonelStatuID], [SektorID], [SirketID], [DepartmanID], [TalepAd], [TalepAciklamasi], [TalepMiktar], [AgirlikBirimi], [TalepTahminiDeger], [ParaBirimi], [TalepTarih], [TalepDurum], [OnaylayanAd], [OnaylayanResim], [OnayTarih]) VALUES (51, 1082, N'buzdagarif@gmail.com', N'http://localhost:5000/Photos/profil4.jpg', 2, 1, 1, 1, N'Çöp kovası', N'Ofis için lazım', 12, N'Adet      ', CAST(330.00 AS Decimal(18, 2)), N'TL        ', N'2021-12-02', 0, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Talep] OFF
GO
SET IDENTITY_INSERT [dbo].[Yetkili] ON 

INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (1, 1051, 1051, 3, 7, 1, 2, N'2021-11-24')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (23, 1050, 1050, 3, 7, 1, 3, N'2021-11-11')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (25, 1050, 1050, 5, 15, 1, 3, N'2021-11-11')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (26, 1050, 1050, 5, 17, 1, 3, N'2021-10-23')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (27, 1050, 1050, 5, 18, 1, 3, N'2021-11-24')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (28, 1050, 1050, 5, 16, 1, 3, N'2021-11-24')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (29, 1050, 1050, 3, 6, 1, 3, N'2021-11-23')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (30, 1050, 1050, 3, 8, 1, 3, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (31, 1050, 1050, 3, 9, 1, 3, N'2021-11-23')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (32, 1050, 1050, 3, 10, 1, 3, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (33, 1050, 1050, 3, 11, 1, 3, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (34, 1051, 1051, 3, 6, 1, 2, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (35, 1051, 1051, 3, 8, 1, 2, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (36, 1051, 1051, 3, 9, 1, 2, N'2021-11-24')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (37, 1051, 1051, 3, 10, 1, 2, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (38, 1051, 1051, 3, 11, 1, 2, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (39, 1082, 1082, 1, 1, 1, 2, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (40, 1050, 1050, 1, 1, 1, 3, N'2021-11-25')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (42, 1088, 1088, 3, 7, 1, 3, N'2021-12-02')
INSERT [dbo].[Yetkili] ([YetkiID], [PersonelID], [PersonelAd], [SektorID], [SirketID], [DepartmanID], [StatuID], [YetkiTarih]) VALUES (43, 1088, 1088, 3, 7, 1, 2, N'2021-12-03')
SET IDENTITY_INSERT [dbo].[Yetkili] OFF
GO
