const sequelize = require('../db')
const {DataTypes}= require('sequelize')

const ReceptionofGoods = sequelize.define('receptionofgoods', {
    IdReceptionOfGoods:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
    IdClients:{type: DataTypes.INTEGER, allowNull: true}, 
    Comment:{type: DataTypes.TEXT}, 
    // Safety:{type: DataTypes.TEXT},
    TransportAssistance:{type: DataTypes.BOOLEAN, allowNull: true},
    Location: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    RequestDate:{type: DataTypes.DATE, allowNull: true}
},{ 
    timestamps: false,
    createdAt: false,
    updatedAt: false})
const Photobooksforreception = sequelize.define('photobooksforreception', {
    IdPhotoBooksForReception:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
    Photo:{type: DataTypes.TEXT, allowNull: true}, 
    IdReceptionOfBooks:{type: DataTypes.INTEGER, allowNull: true}
},{ 
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'photobooksforreception'})
const Clients = sequelize.define('clients'
, {   
    IdClients:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true}, 
    LastName:{type: DataTypes.TEXT}, 
    Name:{type: DataTypes.TEXT, allowNull: true},
    MiddleName:{type: DataTypes.TEXT},
    Phone:{type: "varchar(20)"},
    Mail:{type: DataTypes.TEXT},
    Password:{type: DataTypes.TEXT, allowNull: true},
    Confirmed:{type: DataTypes.BOOLEAN, allowNull: true}
},{ 
    timestamps: false,
    createdAt: false,
    updatedAt: false}
)
const Consultants = sequelize.define('consultants'
, {   
    Id:{
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: true},
    IdClients: {
      type: DataTypes.INTEGER, allowNull: true
    }
},{ 
    timestamps: false,
    createdAt: false,
    updatedAt: false}
)
const Goods = sequelize.define('goods', {
    IdGoods: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true
    },
    IdCities: {
      type: DataTypes.INTEGER
    },
    Price: {
      type: DataTypes.INTEGER, allowNull: true
    },
    OZON: {
      type: DataTypes.TEXT
    },
    VK: {
      type: DataTypes.TEXT
    },
    Instagram: {
      type: DataTypes.TEXT
    },
    IdStates: {
      type: DataTypes.INTEGER, allowNull: true
    },
    Weight: {
      type: DataTypes.INTEGER
    },
    Amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1, allowNull: true
    },
    AmountPurchased: {
      type: DataTypes.INTEGER,
      defaultValue: 0, allowNull: true
    },
    AmountReserved: {
      type: DataTypes.INTEGER,
      defaultValue: 0, allowNull: true
    },
    // IdLocations: {
    //   type: DataTypes.INTEGER, allowNull: true
    // },
    IdAvailability: {
      type: DataTypes.INTEGER, allowNull: true
    },
    ReceiptDate: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_DATE'),
      allowNull: true
    },
    IdConnections: {
      type: DataTypes.INTEGER, allowNull: true
    }
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  })
const BookList  = sequelize.define('booklist', {
  IdBookList: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  YearOfPublication: {
    type: DataTypes.INTEGER
  },
  NumberOfPages: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  IdBindingType: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ISBN: {
    type: DataTypes.INTEGER
  },
  IdAgeRestriction: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Notes: {
    type: DataTypes.TEXT
  },
  IdPublishers: {
    type: DataTypes.INTEGER
  },
  IdGoods: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
},{ 
  tableName: 'booklist',
  timestamps: false,
  createdAt: false,
  updatedAt: false})
//книжные параметры
const GoodsLocations = sequelize.define('goodslocations', {
  IdGoodslocations: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Idlocations: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdGoods: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false}) 
const Genres = sequelize.define('genres', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Cities = sequelize.define('cities', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Categories = sequelize.define('categories', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Publishers = sequelize.define('publishers', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Bindingtype = sequelize.define('bindingtypes', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Agerestriction = sequelize.define('agerestrictions', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Goodstates = sequelize.define('goodstates', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Locations = sequelize.define('locations', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Authors = sequelize.define('authors', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  LastName:{type: DataTypes.TEXT},
  Name:{type: DataTypes.TEXT, allowNull: true},
  MiddleName:{type: DataTypes.TEXT}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const Availability = sequelize.define('availability', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const PhotoGoods = sequelize.define('photoGoods', {
  IdPhotoGoods: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdGoods: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Photo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cover: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false}) 
const BookAuthors = sequelize.define('bookauthors', {
  IdBookAuthors: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdBookList: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdAuthors: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false}) 
const BookCategories = sequelize.define('bookcategories', {
  IdBookCategories: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdBookList: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdCategories: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false}) 
const BookGenres = sequelize.define('bookgenres', {
  IdBookGenres: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdBookList: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdGenres: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false}) 
const GoodsSize = sequelize.define('goodssizes', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdGoods: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Parameter1: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Parameter2: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Parameter3: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false}) 
const Connections = sequelize.define('connections', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})  
const Owners = sequelize.define('owners', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdClient: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdGoods: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false});
const CategoriesOtherGoods = sequelize.define('categoriesothergoods', {
  Id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  Name:{type: DataTypes.TEXT, allowNull: true}
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false})
const OtherGoods = sequelize.define('othergoods', {
  IdOtherGoods: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Name: {
    type: DataTypes.CHAR(200),
    allowNull: true
  },
  IdCategoriesOtherGoods: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  IdGoods: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Notes: {
    type: DataTypes.CHAR(200)
  }
},{ 
  timestamps: false,
  createdAt: false,
  updatedAt: false});
//---------------------------------------
const AuthorsForSelection = sequelize.define('authorsforselection', {
    IdAuthorsForSelection: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdSelectionOfBooks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdAuthors: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'authorsforselection'
  });
  const Banner = sequelize.define('banner', {
    idBanner: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idInformation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idDataType: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'banner'
  });
  const CategoriesForSelection = sequelize.define('categoriesforselection', {
    IdCategoriesForSelection: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdSelectionOfBooks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdCategories: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'categoriesforselection'
  });
  const DataType = sequelize.define('datatype', {
    idDataType: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    dataTypeName: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'datatype'
  });
  const Event = sequelize.define('event', {
    IdEvent: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Place: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'event'
  });
  const EventMaterials = sequelize.define('eventmaterials', {
    IdEventMaterials: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdEvent: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Material: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'eventmaterials'
  });
  const FeaturedProducts = sequelize.define('featuredproducts', {
    IdFeaturedProducts: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdClients: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdGoods: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'featuredproducts'
  });
  const GenresForSelection = sequelize.define('genresforselection', {
    IdGenresForSelection: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdSelectionOfBooks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdGenres: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'genresforselection'
  });
  const IndividualSelectionOfBooks = sequelize.define('individualselectionofbooks', {
    IdIndividualSelectionOfBooks: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Interests: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RequestDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    IdClients: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'individualselectionofbooks'
  });
  const PaymentMethod = sequelize.define('paymentmethod', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'paymentmethod'
  });
  const PaymentState = sequelize.define('paymentstate', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'paymentstate'
  });
  const ReceivingMethod = sequelize.define('receivingmethod', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'receivingmethod'
  });
  const ReceivingState = sequelize.define('receivingstate', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'receivingstate'
  });
  const ResponseToRequestToAcceptBook = sequelize.define('responsetorequesttoacceptbook', {
    IdResponseToRequestToAcceptBook: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Response: {
        type: DataTypes.STRING,
        allowNull: false,
        collate: 'pg_catalog."default"'
    },
    IdReceptionOfBooks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdConsultants: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'responsetorequesttoacceptbook'
  });
  const ResultBySelectionOfGoods = sequelize.define('resultbyselectionofGoods', {
    IdResultBySelectionOfBooks: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdGoods: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdConsultants: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdIndividualSelectionOfBooks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'resultbyselectionofGoods'
});

  const ShoppingCart = sequelize.define('shoppingcart', {
    IdShoppingCart: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdClients: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdGoods: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'shoppingcart'
  });
  const Purchase = sequelize.define('purchase', {
    IdPurchase: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IdConsultants: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    IdClients: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DatePurchase: {
        type: DataTypes.DATE,
        allowNull: false
    },
    IdPaymentMethod: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    IdPaymentState: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    IdReceivingMethod: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    IdReceivingState: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ReceivingLocation: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    IdGoods: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DeliveryPrice: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Index: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TransferOwner: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'purchase'
});
  
// Owners--------------------------------
Clients.hasMany(Owners, { foreignKey: 'IdClient', sourceKey: 'IdClients' });
Owners.belongsTo(Clients, { foreignKey: 'IdClient', targetKey: 'IdClients' });

Goods.hasMany(Owners, { foreignKey: 'IdGoods', sourceKey: 'IdGoods' , onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
Owners.belongsTo(Goods, { foreignKey: 'IdGoods', targetKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
// GoodsSize--------------------------------
Goods.hasOne(GoodsSize, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
GoodsSize.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });  

// GoodsLocations--------------------------------
Goods.hasMany(GoodsLocations, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
GoodsLocations.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });  

Locations.hasMany(GoodsLocations, { foreignKey: 'Idlocations', sourceKey: 'Id', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
GoodsLocations.belongsTo(Locations, { foreignKey: 'Idlocations', sourceKey: 'Id', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });  

// BookGenres--------------------------------
Genres.hasMany(BookGenres, { foreignKey: 'IdGenres', sourceKey: 'Id', onUpdate: 'CASCADE' });
BookGenres.belongsTo(Genres, { foreignKey: 'IdGenres', sourceKey: 'Id', onUpdate: 'CASCADE'  });  

BookList.hasMany(BookGenres, { foreignKey: 'IdBookList', sourceKey: 'IdBookList', onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
BookGenres.belongsTo(BookList, { foreignKey: 'IdBookList', sourceKey: 'IdBookList', onUpdate: 'CASCADE' , onDelete: 'CASCADE'});  

// BookCategories--------------------------------
Categories.hasMany(BookCategories, { foreignKey: 'IdCategories', sourceKey: 'Id', onUpdate: 'CASCADE' });
BookCategories.belongsTo(Categories, { foreignKey: 'IdCategories', sourceKey: 'Id', onUpdate: 'CASCADE' });  

BookList.hasMany(BookCategories, { foreignKey: 'IdBookList', sourceKey: 'IdBookList' , onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
BookCategories.belongsTo(BookList, { foreignKey: 'IdBookList', sourceKey: 'IdBookList', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });  

// BookAuthors--------------------------------
Authors.hasMany(BookAuthors, { foreignKey: 'IdAuthors', sourceKey: 'Id', onUpdate: 'CASCADE' });
BookAuthors.belongsTo(Authors, { foreignKey: 'IdAuthors', sourceKey: 'Id', onUpdate: 'CASCADE' });  

BookList.hasMany(BookAuthors, { foreignKey: 'IdBookList', sourceKey: 'IdBookList' , onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
BookAuthors.belongsTo(BookList, { foreignKey: 'IdBookList', sourceKey: 'IdBookList', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });  

// Goods--------------------------------
Cities.hasMany(Goods, { foreignKey: 'IdCities', sourceKey: 'Id', onUpdate: 'CASCADE' });
Goods.belongsTo(Cities, { foreignKey: 'IdCities', sourceKey: 'Id' , onUpdate: 'CASCADE'});    

Availability.hasMany(Goods, { foreignKey: 'IdAvailability', sourceKey: 'Id' , onUpdate: 'CASCADE'});
Goods.belongsTo(Availability, { foreignKey: 'IdAvailability', sourceKey: 'Id', onUpdate: 'CASCADE' });   

Goodstates.hasMany(Goods, { foreignKey: 'IdStates', sourceKey: 'Id', onUpdate: 'CASCADE' });
Goods.belongsTo(Goodstates, { foreignKey: 'IdStates', sourceKey: 'Id', onUpdate: 'CASCADE' }); 

Connections.hasMany(Goods, { foreignKey: 'IdConnections', sourceKey: 'Id', onUpdate: 'CASCADE' });
Goods.belongsTo(Connections, { foreignKey: 'IdConnections', sourceKey: 'Id', onUpdate: 'CASCADE' }); 

//BookList--------------------------------
Goods.hasOne(BookList, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
BookList.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE'});  

Bindingtype.hasMany(BookList, { foreignKey: 'IdBindingType', sourceKey: 'Id', onUpdate: 'CASCADE' });
BookList.belongsTo(Bindingtype, { foreignKey: 'IdBindingType', sourceKey: 'Id', onUpdate: 'CASCADE' });  

Agerestriction.hasMany(BookList, { foreignKey: 'IdAgeRestriction', sourceKey: 'Id', onUpdate: 'CASCADE' });
BookList.belongsTo(Agerestriction, { foreignKey: 'IdAgeRestriction', sourceKey: 'Id', onUpdate: 'CASCADE' });    

Publishers.hasMany(BookList, { foreignKey: 'IdPublishers', sourceKey: 'Id', onUpdate: 'CASCADE' });
BookList.belongsTo(Publishers, { foreignKey: 'IdPublishers', sourceKey: 'Id', onUpdate: 'CASCADE' });    

//PhotoGoods--------------------------------
Goods.hasMany(PhotoGoods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
PhotoGoods.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });  

//OtherGoods--------------------------------
Goods.hasOne(OtherGoods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
OtherGoods.belongsTo(Goods, { foreignKey: 'IdGoods', targetKey: 'IdGoods', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

CategoriesOtherGoods.hasMany(OtherGoods, { foreignKey: 'IdCategoriesOtherGoods', sourceKey: 'Id', onUpdate: 'CASCADE' });
OtherGoods.belongsTo(CategoriesOtherGoods, { foreignKey: 'IdCategoriesOtherGoods', sourceKey: 'Id', onUpdate: 'CASCADE' });  
   
//Consultants--------------------------------
Clients.hasOne(Consultants, { foreignKey: 'IdClients', sourceKey: 'IdClients', onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
Consultants.belongsTo(Clients, { foreignKey: 'IdClients', sourceKey: 'IdClients', onUpdate: 'CASCADE' , onDelete: 'CASCADE'});  

// AuthorsForSelection--------------------------------
IndividualSelectionOfBooks.hasMany(AuthorsForSelection, { foreignKey: 'IdSelectionOfBooks', sourceKey: 'IdIndividualSelectionOfBooks' });
AuthorsForSelection.belongsTo(IndividualSelectionOfBooks, { foreignKey: 'IdSelectionOfBooks', sourceKey: 'IdIndividualSelectionOfBooks'  });

Authors.hasMany(AuthorsForSelection, { foreignKey: 'IdAuthors', sourceKey: 'Id', onUpdate: 'CASCADE'  });
AuthorsForSelection.belongsTo(Authors, {  foreignKey: 'IdAuthors', sourceKey: 'Id' , onUpdate: 'CASCADE' });

// Banner--------------------------------
Event.hasMany(Banner, { foreignKey: 'idInformation', targetKey: 'IdEvent'});
Banner.belongsTo(Event, { foreignKey: 'IdEvent', sourceKey: 'idInformation' });

DataType.hasMany(Banner, { foreignKey: 'idDataType', sourceKey: 'idDataType' });
Banner.belongsTo(DataType, { foreignKey: 'idDataType', targetKey: 'idDataType' });

// CategoriesForSelection--------------------------------
IndividualSelectionOfBooks.hasMany(CategoriesForSelection, { foreignKey: 'IdSelectionOfBooks', targetKey: 'IdIndividualSelectionOfBooks'});
CategoriesForSelection.belongsTo(IndividualSelectionOfBooks,{ foreignKey: 'IdSelectionOfBooks', targetKey: 'IdIndividualSelectionOfBooks'});

Categories.hasMany(CategoriesForSelection, { foreignKey: 'IdCategories', sourceKey: 'Id', onUpdate: 'CASCADE' });
CategoriesForSelection.belongsTo(Categories, { foreignKey: 'IdCategories', sourceKey: 'Id', onUpdate: 'CASCADE' });

// EventMaterials--------------------------------
Event.hasMany(EventMaterials, { foreignKey: 'IdEvent', sourceKey: 'IdEvent'});
EventMaterials.belongsTo(Event, {  foreignKey: 'IdEvent', sourceKey: 'IdEvent'} );

// FeaturedProducts--------------------------------
Clients.hasMany(FeaturedProducts, { foreignKey: 'IdClient', sourceKey: 'IdClients' });
FeaturedProducts.belongsTo(Clients, { foreignKey: 'IdClient', sourceKey: 'IdClients' });

Goods.hasMany(FeaturedProducts, { foreignKey: 'IdGoods', sourceKey: 'IdGoods' , onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
FeaturedProducts.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });

//GenresForSelection-------------------------------
Genres.hasMany(GenresForSelection, { foreignKey: 'IdGenres', sourceKey: 'Id', onUpdate: 'CASCADE' });
GenresForSelection.belongsTo(Genres, { foreignKey: 'IdGenres', sourceKey: 'Id', onUpdate: 'CASCADE' });  

IndividualSelectionOfBooks.hasMany(GenresForSelection, { foreignKey: 'IdSelectionOfBooks', sourceKey: 'IdIndividualSelectionOfBooks', onUpdate: 'CASCADE' });
GenresForSelection.belongsTo(IndividualSelectionOfBooks, {  foreignKey: 'IdSelectionOfBooks', sourceKey: 'IdIndividualSelectionOfBooks', onUpdate: 'CASCADE' });  

//IndividualSelectionOfBooks-------------------------------
Clients.hasMany(IndividualSelectionOfBooks, { foreignKey: 'IdClients', sourceKey: 'IdClients', onUpdate: 'CASCADE' });
IndividualSelectionOfBooks.belongsTo(Clients, { foreignKey: 'IdClients', sourceKey: 'IdClients', onUpdate: 'CASCADE' });  
 
//ResponseToRequestToAcceptBook-------------------------------
Consultants.hasMany(ResponseToRequestToAcceptBook, { foreignKey: 'IdConsultants', sourceKey: 'Id', onUpdate: 'CASCADE' });
ResponseToRequestToAcceptBook.belongsTo(Consultants, { foreignKey: 'IdConsultants', sourceKey: 'Id', onUpdate: 'CASCADE' });  

ReceptionofGoods.hasOne(ResponseToRequestToAcceptBook, { foreignKey: 'IdReceptionOfBooks', sourceKey: 'IdReceptionOfGoods', onUpdate: 'CASCADE' });
ResponseToRequestToAcceptBook.belongsTo(ReceptionofGoods, { foreignKey: 'IdReceptionOfBooks', sourceKey: 'IdReceptionOfGoods', onUpdate: 'CASCADE' });  
 
//ResultBySelectionOfGoods-------------------------------
Consultants.hasMany(ResultBySelectionOfGoods, { foreignKey: 'IdConsultants', sourceKey: 'Id', onUpdate: 'CASCADE' });
ResultBySelectionOfGoods.belongsTo(Consultants, { foreignKey: 'IdConsultants', sourceKey: 'Id', onUpdate: 'CASCADE' });  

Goods.hasMany(ResultBySelectionOfGoods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods' , onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
ResultBySelectionOfGoods.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });

IndividualSelectionOfBooks.hasMany(ResultBySelectionOfGoods, { foreignKey: 'IdIndividualSelectionOfBooks', sourceKey: 'IdIndividualSelectionOfBooks', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
ResultBySelectionOfGoods.belongsTo(IndividualSelectionOfBooks, { foreignKey: 'IdIndividualSelectionOfBooks', sourceKey: 'IdIndividualSelectionOfBooks', onUpdate: 'CASCADE', onDelete: 'CASCADE' });  

// ShoppingCart--------------------------------
Clients.hasMany(ShoppingCart, { foreignKey: 'IdClients', sourceKey: 'IdClients' });
ShoppingCart.belongsTo(Clients, { foreignKey: 'IdClients', sourceKey: 'IdClients' });

Goods.hasMany(ShoppingCart, { foreignKey: 'IdGoods', sourceKey: 'IdGoods' , onUpdate: 'CASCADE' , onDelete: 'CASCADE'});
ShoppingCart.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });

Clients.hasMany(ReceptionofGoods, { foreignKey: 'IdClients', sourceKey: 'IdClients' })
ReceptionofGoods.belongsTo(Clients, { foreignKey: 'IdClients', sourceKey: 'IdClients' })

ReceptionofGoods.hasMany(Photobooksforreception, { foreignKey: 'IdReceptionOfBooks', sourceKey: 'IdReceptionOfGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' })
Photobooksforreception.belongsTo(ReceptionofGoods, { foreignKey: 'IdReceptionOfBooks', sourceKey: 'IdReceptionOfGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' })

// Purchase--------------------------------
Consultants.hasMany(Purchase, { foreignKey: 'IdConsultants', sourceKey: 'Id', onUpdate: 'CASCADE' });
Purchase.belongsTo(Consultants, { foreignKey: 'IdConsultants', sourceKey: 'Id', onUpdate: 'CASCADE' });

Clients.hasMany(Purchase, { foreignKey: 'IdClients', sourceKey: 'IdClients' });
Purchase.belongsTo(Clients, { foreignKey: 'IdClients', sourceKey: 'IdClients' });

PaymentMethod.hasMany(Purchase, { foreignKey: 'IdPaymentMethod', sourceKey: 'Id' });
Purchase.belongsTo(PaymentMethod, { foreignKey: 'IdPaymentMethod', sourceKey: 'Id' });

PaymentState.hasMany(Purchase, { foreignKey: 'IdPaymentState', sourceKey: 'Id' });
Purchase.belongsTo(PaymentState, { foreignKey: 'IdPaymentState', sourceKey: 'Id' });

ReceivingMethod.hasMany(Purchase, { foreignKey: 'IdReceivingMethod', sourceKey: 'Id' });
Purchase.belongsTo(ReceivingMethod, { foreignKey: 'IdReceivingMethod', sourceKey: 'Id' });

ReceivingState.hasMany(Purchase, { foreignKey: 'IdReceivingState', sourceKey: 'Id' });
Purchase.belongsTo(ReceivingState, { foreignKey: 'IdReceivingState', sourceKey: 'Id' });

Goods.hasMany(Purchase, { foreignKey: 'IdGoods', sourceKey: 'IdGoods' , onUpdate: 'CASCADE' });
Purchase.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods' , onUpdate: 'CASCADE' });

Clients.hasMany(ReceptionofGoods, { foreignKey: 'IdClients', sourceKey: 'IdClients' })
ReceptionofGoods.belongsTo(Clients, { foreignKey: 'IdClients', sourceKey: 'IdClients' })

const Messages = sequelize.define('messages', {
  IdMessages: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  IdChats: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  IdConsultants: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  IdGoods: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
  FromClient: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  },
  Checked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
  },
  TextMessages: {
      type: DataTypes.CHAR(200),
      allowNull: true
  },
  DateCreated: {
      type: DataTypes.DATE,
      allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'messages'
});
const Chats = sequelize.define('chats'
  , {   
      IdChats:{
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false},
      IdClients: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  },{ 
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: 'chats'}
  );
  Clients.hasOne(Chats, { foreignKey: 'IdClients', sourceKey: 'IdClients', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
  Chats.belongsTo(Clients, { foreignKey: 'IdClients', sourceKey: 'IdClients', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });  

  Chats.hasMany(Messages, { foreignKey: 'IdChats', sourceKey: 'IdChats', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
  Messages.belongsTo(Chats, { foreignKey: 'IdChats', sourceKey: 'IdChats', onUpdate: 'CASCADE' , onDelete: 'CASCADE' }); 
  
  Consultants.hasMany(Messages, { foreignKey: 'IdConsultants', sourceKey: 'Id', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
  Messages.belongsTo(Consultants, { foreignKey: 'IdConsultants', sourceKey: 'Id', onUpdate: 'CASCADE' , onDelete: 'CASCADE' }); 

  Goods.hasMany(Messages, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' });
  Messages.belongsTo(Goods, { foreignKey: 'IdGoods', sourceKey: 'IdGoods', onUpdate: 'CASCADE' , onDelete: 'CASCADE' }); 
  sequelize.sync().then(result=>{
  console.log(result);
  })
  .catch(err=> console.log(err));
  Photobooksforreception.findAll()
  .then(photobooks => {
      console.log(photobooks);
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
module.exports = {
    Clients, ReceptionofGoods, Photobooksforreception, Goods, Genres, Authors, Categories, Publishers, Bindingtype, Locations, Agerestriction, Goodstates, Cities, Availability, BookList, PhotoGoods, BookAuthors, BookCategories, GoodsSize,BookGenres, Owners, Connections, CategoriesOtherGoods, OtherGoods, Consultants, Purchase, AuthorsForSelection, Banner, CategoriesForSelection, DataType, Event, EventMaterials, FeaturedProducts, GenresForSelection, IndividualSelectionOfBooks, PaymentMethod, PaymentState, ReceivingMethod,ReceivingState, ResponseToRequestToAcceptBook, ResultBySelectionOfGoods, ShoppingCart, GoodsLocations, Messages, Chats 
}