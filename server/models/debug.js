var addressHistory = Sequelize.define("addressHistory",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41618_PRIMARY' },
  streetNumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetNumeric',
     allowNull: false },
  streetAddress: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'streetAddress',
     allowNull: false },
  apt: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'apt' },
  city: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'city',
     allowNull: false },
  state: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'state',
     allowNull: false },
  zip: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'zip',
     allowNull: false },
  latitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 10,
        _scale: 8,
        _unsigned: undefined },
     field: 'latitude',
     allowNull: false },
  longitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 11,
        _scale: 8,
        _unsigned: undefined },
     field: 'longitude',
     allowNull: false },
  startDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startDate' },
  endDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'endDate' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     references: 'rented_user',
     referencesKey: 'userId' },
  aboutMe: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'aboutMe' },
  present: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'present' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'address_history', timestamps: false });


var apartmentComplex = Sequelize.define("apartmentComplex",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41629_PRIMARY' },
  name: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'name',
     allowNull: false },
  streetNumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetNumeric',
     allowNull: false },
  streetAddress: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'streetAddress',
     allowNull: false },
  city: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'city',
     allowNull: false },
  state: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'state',
     allowNull: false },
  zip: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'zip',
     allowNull: false },
  latitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 10,
        _scale: 8,
        _unsigned: undefined },
     field: 'latitude' },
  longitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 11,
        _scale: 8,
        _unsigned: undefined },
     field: 'longitude' },
  distanceToUniv: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'distanceToUniv' },
  petsAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'petsAllowed',
     allowNull: false },
  dogsAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'dogsAllowed',
     allowNull: false },
  catsAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'catsAllowed',
     allowNull: false },
  othersAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'othersAllowed',
     allowNull: false },
  dogQtyAllowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'dogQtyAllowed' },
  catQtyAllowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'catQtyAllowed' },
  otherQtyAllowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'otherQtyAllowed' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'apartment_complex', timestamps: false });


var apartmentComplexFloorPlan = Sequelize.define("apartmentComplexFloorPlan",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41646_PRIMARY' },
  complexId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'complexId',
     allowNull: false,
     references: 'apartment_complex',
     referencesKey: 'complexId' },
  bedrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bedrooms',
     allowNull: false },
  bathrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bathrooms',
     allowNull: false },
  parking: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'parking',
     allowNull: false },
  livingArea: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'living_area',
     allowNull: false },
  washerDryer: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'washer_dryer',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'apartment_complex_floor_plan', timestamps: false });


var apartmentComplexImage = Sequelize.define("apartmentComplexImage",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41656_PRIMARY' },
  complexId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'complexId',
     allowNull: false,
     references: 'apartment_complex',
     referencesKey: 'complexId' },
  location: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'location',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'apartment_complex_image', timestamps: false });


var apartmentComplexTransportation = Sequelize.define("apartmentComplexTransportation",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41666_PRIMARY' },
  complexId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'complexId',
     allowNull: false,
     references: 'apartment_complex',
     referencesKey: 'complexId' },
  shuttleRoute: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'shuttleRoute',
     allowNull: false },
  busLine: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'busLine',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'apartment_complex_transportation',
  timestamps: false });


var articles = Sequelize.define("articles",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41676_PRIMARY' },
  title: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'title' },
  content: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'content' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt',
     allowNull: false },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'UserId' } },
{ tableName: 'articles', timestamps: false });


var friend = Sequelize.define("friend",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41685_PRIMARY' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  friendId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'friendId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'friendId' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'friend', timestamps: false });


var invitee = Sequelize.define("invitee",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     allowNull: false,
     unique: 'idx_41690_PRIMARY' },
  firstName: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'firstName',
     allowNull: false },
  lastName: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'lastName',
     allowNull: false },
  invitorId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'invitorId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'invitorId' },
  roommate: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'roommate' },
  email: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'email' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'invitee', timestamps: false });


var lease = Sequelize.define("lease",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41707_PRIMARY' },
  propertyId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyId',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyId' },
  approved: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'approved' },
  startDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startDate',
     allowNull: false },
  endDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'endDate',
     allowNull: false },
  paymentAmount: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'paymentAmount',
     allowNull: false },
  paymentInterval: 
   { type: { values: [Object] },
     field: 'paymentInterval',
     allowNull: false },
  securityDeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'securityDeposit' },
  petDeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'petDeposit' },
  payee: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'payee' },
  built: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'built' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'lease', timestamps: false });


var lessee = Sequelize.define("lessee",
{ leaseId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'leaseId',
     primaryKey: true,
     allowNull: false,
     unique: 'idx_41715_PRIMARY',
     references: 'lease',
     referencesKey: 'leaseId' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     primaryKey: true,
     allowNull: false,
     unique: 'idx_41715_PRIMARY',
     references: 'rented_user',
     referencesKey: 'userId' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'lessee', timestamps: false });


var looking = Sequelize.define("looking",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41737_PRIMARY' },
  maxMonthlyRent: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'maxMonthlyRent',
     allowNull: false },
  utilitiesIncluded: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'utilitiesIncluded',
     allowNull: false },
  area: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'area' },
  distanceToUniv: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'distanceToUniv' },
  moveInDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'moveInDate',
     allowNull: false },
  moveOutDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'moveOutDate' },
  lengthOfStay: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'lengthOfStay' },
  openToFullYearLeaseNewRoomates: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'openToFullYearLeaseNewRoomates' },
  roomType: { type: { values: [Object] }, field: 'roomType' },
  sharedBathroom: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'sharedBathroom' },
  gender: { type: { values: [Object] }, field: 'gender', allowNull: false },
  numRoommates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numRoommates' },
  furnished: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'furnished' },
  busRouteRequired: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'busRouteRequired' },
  parkingNeeded: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'parkingNeeded' },
  smokingAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'smokingAllowed' },
  petsAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'petsAllowed' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' } },
{ tableName: 'looking', timestamps: false });


var payment = Sequelize.define("payment",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41757_PRIMARY' },
  payerId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'payerId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'payerId' },
  payeeId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'payeeId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'payeeId' },
  dollarAmount: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'dollarAmount' },
  reason: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'reason' },
  rentPayment: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'rentPayment' },
  creditCheckPayment: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'creditCheckPayment' },
  paymentForm: { type: { values: [Object] }, field: 'paymentForm' },
  paymentDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'paymentDate',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'payment', timestamps: false });


var pet = Sequelize.define("pet",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41781_PRIMARY' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  type: { type: { values: [Object] }, field: 'type', allowNull: false },
  breed: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'breed',
     allowNull: false },
  weightLbs: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'weightLbs' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'pet', timestamps: false });


var property = Sequelize.define("property",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41807_PRIMARY' },
  streetNumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetNumeric',
     allowNull: false },
  streetAddress: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'streetAddress',
     allowNull: false },
  city: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'city',
     allowNull: false },
  state: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'state',
     allowNull: false },
  zip: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'zip',
     allowNull: false },
  apt: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'apt' },
  bldg: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'bldg' },
  latitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 10,
        _scale: 8,
        _unsigned: undefined },
     field: 'latitude' },
  longitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 11,
        _scale: 8,
        _unsigned: undefined },
     field: 'longitude' },
  type: { type: { values: [Object] }, field: 'type' },
  description: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'description' },
  bedrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bedrooms' },
  bathrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bathrooms' },
  parkingSpots: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'parkingSpots' },
  livingAreaSqFt: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'livingAreaSqFt' },
  hoaFee: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'hoaFee' },
  otherFee: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'otherFee' },
  status: { type: { values: [Object] }, field: 'status' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'property', timestamps: false });


var propertyImages = Sequelize.define("propertyImages",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41817_PRIMARY' },
  listingId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'listingId',
     references: 'property_listing',
     referencesKey: 'listingId' },
  propertyId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyId',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyId' },
  location: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'location',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'property_images', timestamps: false });


var propertyLeaseDefaults = Sequelize.define("propertyLeaseDefaults",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41837_PRIMARY' },
  propertyId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyId',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyId' },
  ownerId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'ownerId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'ownerId' },
  qtyDogsAllowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'qtyDogsAllowed',
     allowNull: false },
  qtyCatsAllowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'qtyCatsAllowed',
     allowNull: false },
  qtyOtherAllowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'qtyOtherAllowed',
     allowNull: false },
  animalSizeLimitLbs: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'animalSizeLimitLbs',
     allowNull: false },
  fishTankAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'fishTankAllowed',
     allowNull: false },
  preferredLeaseLength: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'preferredLeaseLength',
     allowNull: false },
  preferredLeaseUnit: 
   { type: { values: [Object] },
     field: 'preferredLeaseUnit',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'property_lease_defaults', timestamps: false });


var propertyLikes = Sequelize.define("propertyLikes",
{ propertyId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyId',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyId' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41849_PRIMARY' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'property_likes', timestamps: false });


var propertyListing = Sequelize.define("propertyListing",
{ propertyId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyId',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyId' },
  monthlyPrice: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'monthlyPrice',
     allowNull: false },
  securityDeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'securityDeposit' },
  petDeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'petDeposit' },
  availableMoveIn: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'availableMoveIn',
     allowNull: false },
  id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41905_PRIMARY' },
  leaseEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'leaseEndDate' },
  leaseLength: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'leaseLength',
     allowNull: false },
  leaseLengthUnit: 
   { type: { values: [Object] },
     field: 'leaseLengthUnit',
     allowNull: false },
  leaseType: 
   { type: { values: [Object] },
     field: 'leaseType',
     allowNull: false },
  gender: { type: { values: [Object] }, field: 'gender', allowNull: false },
  totalUtilityCost: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'totalUtilityCost',
     allowNull: false },
  roomType: 
   { type: { values: [Object] },
     field: 'roomType',
     allowNull: false },
  sharedBathroom: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'sharedBathroom' },
  numRoomates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numRoomates',
     allowNull: false },
  furnished: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'furnished' },
  parkingAvailable: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'parkingAvailable' },
  smokingAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'smokingAllowed' },
  description: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'description' },
  status: { type: { values: [Object] }, field: 'status' },
  contactPhone: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'contactPhone' },
  contactEmail: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'contactEmail',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'property_listing', timestamps: false });


var propertyOwner = Sequelize.define("propertyOwner",
{ propertyOwnershipId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyOwnershipId',
     primaryKey: true,
     allowNull: false,
     unique: 'idx_41918_PRIMARY',
     references: 'property_ownership',
     referencesKey: 'propertyOwnershipId' },
  ownerId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'ownerId',
     primaryKey: true,
     allowNull: false,
     unique: 'idx_41918_PRIMARY',
     references: 'rented_user',
     referencesKey: 'ownerId' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'property_owner', timestamps: false });


var propertyOwnership = Sequelize.define("propertyOwnership",
{ startDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startDate',
     allowNull: false },
  endDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'endDate',
     allowNull: false },
  propertyFK: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyFK',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyFK' },
  id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41924_PRIMARY' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'property_ownership', timestamps: false });


var rentalApplicant = Sequelize.define("rentalApplicant",
{ userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41932_PRIMARY' },
  rentalAppId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'rentalAppId',
     allowNull: false,
     references: 'rental_application',
     referencesKey: 'rentalAppId' },
  shareCredit: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'shareCredit' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'rental_applicant', timestamps: false });


var rentalApplication = Sequelize.define("rentalApplication",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41949_id_UNIQUE' },
  propertyId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyId',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyId' },
  preferredLeaseLength: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'preferredLeaseLength' },
  preferredMoveIn: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'preferredMoveIn',
     allowNull: false },
  numOccupants: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'numOccupants',
     allowNull: false },
  moveReason: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'moveReason' },
  preferredLeaseLengthUnit: 
   { type: { values: [Object] },
     field: 'preferredLeaseLengthUnit' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'rental_application', timestamps: false });


var rentedUser = Sequelize.define("rentedUser",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41960_PRIMARY' },
  username: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'username' },
  email: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'email',
     allowNull: false },
  confirmedEmail: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'confirmedEmail',
     allowNull: false },
  password: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'password',
     allowNull: false },
  firstname: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'firstname',
     allowNull: false },
  lastname: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'lastname',
     allowNull: false },
  middlename: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'middlename' },
  aboutMe: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'aboutMe' },
  phone: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'phone' },
  profileImage: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'profileImage' },
  twitter: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'twitter' },
  facebook: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'facebook' },
  googleplus: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'googleplus' },
  linkedin: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'linkedin' },
  experianIdToken: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'experianIdToken' },
  creditCheckToken: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'creditCheckToken' },
  runIdentityCheck: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'runIdentityCheck',
     allowNull: false },
  shareCreditReport: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'shareCreditReport',
     allowNull: false },
  identityDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'identityDate' },
  creditReportDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'creditReportDate' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' },
  role: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'role' },
  provider: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'provider' },
  facebookOAuthId: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'facebookOAuthId' },
  googleOAuthId: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'googleOAuthId' },
  twitterOAuthId: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'twitterOAuthId' },
  salt: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'salt',
     allowNull: false } },
{ tableName: 'rented_user',
  timestamps: false,
  getterMethods: { profile: [Function], token: [Function] },
  hooks: 
   { beforeBulkCreate: [Function],
     beforeCreate: [Function],
     beforeUpdate: [Function] },
  instanceMethods: 
   { authenticate: [Function],
     makeSalt: [Function],
     encryptPassword: [Function],
     confirmMail: [Function],
     updatePassword: [Function] } });


var roommate = Sequelize.define("roommate",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_41974_PRIMARY' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  roommateId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'roommateId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'roommateId' },
  fromDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fromDate',
     allowNull: false },
  toDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'toDate' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'roommate', timestamps: false });


var roomListing = Sequelize.define("roomListing",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42007_PRIMARY' },
  propertyId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyId',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyId' },
  creatorId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'creatorId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'creatorId' },
  monthlyPrice: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'monthlyPrice',
     allowNull: false },
  securityDeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'securityDeposit' },
  availableMoveIn: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'availableMoveIn',
     allowNull: false },
  leaseEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'leaseEndDate' },
  leaseType: 
   { type: { values: [Object] },
     field: 'leaseType',
     allowNull: false },
  gender: { type: { values: [Object] }, field: 'gender', allowNull: false },
  monthlyUtilityCost: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'monthlyUtilityCost',
     allowNull: false },
  roomType: 
   { type: { values: [Object] },
     field: 'roomType',
     allowNull: false },
  sharedBathroom: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'sharedBathroom' },
  numRoomates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numRoomates',
     allowNull: false },
  furnished: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'furnished' },
  parkingAvailable: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'parkingAvailable' },
  smokingAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'smokingAllowed' },
  description: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'description' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'room_listing', timestamps: false });


var roomListingView = Sequelize.define("roomListingView",
{ streetNumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetNumeric' },
  streetAddress: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'streetAddress' },
  city: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'city' },
  state: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'state' },
  zip: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'zip' },
  apt: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'apt' },
  bldg: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'bldg' },
  type: { type: { values: [Object] }, field: 'type' },
  bedrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bedrooms' },
  bathrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bathrooms' },
  id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id' },
  propertyId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'propertyId' },
  creatorId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'creatorId' },
  monthlyPrice: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'monthlyPrice' },
  securityDeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'securityDeposit' },
  availableMoveIn: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'availableMoveIn' },
  leaseEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'leaseEndDate' },
  leaseType: { type: { values: [Object] }, field: 'leaseType' },
  gender: { type: { values: [Object] }, field: 'gender' },
  monthlyUtilityCost: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'monthlyUtilityCost' },
  roomType: { type: { values: [Object] }, field: 'roomType' },
  sharedBathroom: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'sharedBathroom' },
  numRoomates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numRoomates' },
  furnished: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'furnished' },
  parkingAvailable: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'parkingAvailable' },
  smokingAllowed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'smokingAllowed' },
  description: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'description' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt' },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'room_listing_view', timestamps: false });


var student = Sequelize.define("student",
{ firstname: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'firstname',
     allowNull: false },
  lastname: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'lastname',
     allowNull: false },
  email: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'email' },
  street: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'Street',
     allowNull: false },
  city: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'city',
     allowNull: false } },
{ tableName: 'student', timestamps: false });


var university = Sequelize.define("university",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42031_PRIMARY' },
  name: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'name',
     allowNull: false },
  academicYearType: { type: { values: [Object] }, field: 'academicYearType' },
  streetNumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetNumeric',
     allowNull: false },
  streetAddress: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'streetAddress',
     allowNull: false },
  apt: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'apt' },
  city: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'city',
     allowNull: false },
  state: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'state',
     allowNull: false },
  zip: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'zip',
     allowNull: false },
  latitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 10,
        _scale: 8,
        _unsigned: undefined },
     field: 'latitude' },
  longitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 11,
        _scale: 8,
        _unsigned: undefined },
     field: 'longitude' },
  startDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startDate',
     allowNull: false },
  endDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'endDate' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'university', timestamps: false });


var universityCalenderQuater = Sequelize.define("universityCalenderQuater",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42042_PRIMARY' },
  universityId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'universityId',
     allowNull: false,
     references: 'university',
     referencesKey: 'universityId' },
  year: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'year',
     allowNull: false },
  fallQuaterStartDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fallQuaterStartDate',
     allowNull: false },
  fallQuaterEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fallQuaterEndDate',
     allowNull: false },
  winterQuaterStartDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'winterQuaterStartDate',
     allowNull: false },
  winterQuaterEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'winterQuaterEndDate',
     allowNull: false },
  springQuaterStartDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'springQuaterStartDate',
     allowNull: false },
  springQuaterEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'springQuaterEndDate',
     allowNull: false },
  summerQuaterStartDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'summerQuaterStartDate',
     allowNull: false },
  summerQuaterEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'summerQuaterEndDate',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'university_calender_quater', timestamps: false });


var universityCalenderSemester = Sequelize.define("universityCalenderSemester",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42049_PRIMARY' },
  universityId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'universityId',
     allowNull: false,
     references: 'university',
     referencesKey: 'universityId' },
  year: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'year',
     allowNull: false },
  fallSemesterStartDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fallSemesterStartDate',
     allowNull: false },
  fallSemesterEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fallSemesterEndDate',
     allowNull: false },
  springSemesterStartDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'springSemesterStartDate',
     allowNull: false },
  springSemesterEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'springSemesterEndDate',
     allowNull: false },
  summerSemesterStartDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'summerSemesterStartDate',
     allowNull: false },
  summerSemesterEndDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'summerSemesterEndDate',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'university_calender_semester', timestamps: false });


var userCosigner = Sequelize.define("userCosigner",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42056_PRIMARY' },
  cosingeeId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'cosingeeId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'cosingeeId' },
  cosginerId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'cosginerId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'cosginerId' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'user_cosigner', timestamps: false });


var userCurAddressUnivCoords = Sequelize.define("userCurAddressUnivCoords",
{ userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId' },
  addressLatitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 10,
        _scale: 8,
        _unsigned: undefined },
     field: 'address_latitude' },
  addressLongitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 11,
        _scale: 8,
        _unsigned: undefined },
     field: 'address_longitude' },
  univLatitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 10,
        _scale: 8,
        _unsigned: undefined },
     field: 'univ_latitude' },
  univLongitude: 
   { type: 
      { options: [Object],
        _length: undefined,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: 11,
        _scale: 8,
        _unsigned: undefined },
     field: 'univ_longitude' },
  univName: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'univ_name' } },
{ tableName: 'user_cur_address_univ_coords', timestamps: false });


var userEducation = Sequelize.define("userEducation",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42081_PRIMARY' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  educationCenterName: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'educationCenterName',
     allowNull: false },
  type: { type: { values: [Object] }, field: 'type' },
  startDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startDate',
     allowNull: false },
  endDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'endDate' },
  graduation: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'graduation',
     allowNull: false },
  graduationDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'graduationDate' },
  major: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'major' },
  degreeType: { type: { values: [Object] }, field: 'degreeType' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' },
  universityId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'universityId',
     allowNull: false,
     references: 'university',
     referencesKey: 'universityId' } },
{ tableName: 'user_education', timestamps: false });


var userFinancial = Sequelize.define("userFinancial",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42093_PRIMARY' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  startDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startDate',
     allowNull: false },
  endDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'endDate' },
  individualAnnualIncom: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'individualAnnualIncom' },
  householdAnnualIncome: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'householdAnnualIncome' },
  spouseAnnualIncome: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'spouseAnnualIncome' },
  incomeProof: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'incomeProof' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'user_financial', timestamps: false });


var userOccupation = Sequelize.define("userOccupation",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42103_PRIMARY' },
  role: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'role',
     allowNull: false },
  company: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'company',
     allowNull: false },
  start: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'start',
     allowNull: false },
  end: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'end' },
  presentlyEmployeed: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'presentlyEmployeed',
     allowNull: false },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'user_occupation', timestamps: false });


var userRecommendation = Sequelize.define("userRecommendation",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42114_PRIMARY' },
  recommendedId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'recommendedId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'recommendedId' },
  recommendorId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'recommendorId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'recommendorId' },
  recommendedApproved: 
   { type: { [Function] super_: [Function], key: 'BOOLEAN' },
     field: 'recommendedApproved',
     allowNull: false },
  content: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'content' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'user_recommendation', timestamps: false });


var userReference = Sequelize.define("userReference",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42139_PRIMARY' },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userId' },
  email: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'email',
     allowNull: false },
  phone: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'phone',
     allowNull: false },
  firstName: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'firstName',
     allowNull: false },
  lastName: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'lastName',
     allowNull: false },
  relation: 
   { type: { values: [Object] },
     field: 'relation',
     allowNull: false },
  startDate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startDate',
     allowNull: false },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'user_reference', timestamps: false });


var userVehicle = Sequelize.define("userVehicle",
{ id: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'id',
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
     unique: 'idx_42150_PRIMARY' },
  year: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'year',
     allowNull: false },
  make: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'make',
     allowNull: false },
  model: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'model',
     allowNull: false },
  licensePlate: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'licensePlate',
     allowNull: false },
  color: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'color',
     allowNull: false },
  userId: 
   { type: { [Function] super_: [Object], key: 'BIGINT' },
     field: 'userId',
     references: 'rented_user',
     referencesKey: 'userId' },
  createdAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdAt',
     allowNull: false },
  updatedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedAt' },
  deletedAt: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedAt' } },
{ tableName: 'user_vehicle', timestamps: false });


addressHistory.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

apartmentComplex.hasMany(apartmentComplexFloorPlan, { as: 'aptComplexFloorPlanComplexIds',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

apartmentComplex.hasMany(apartmentComplexImage, { as: 'aptComplexImageComplexIds',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

apartmentComplex.hasMany(apartmentComplexTransportation, { as: 'aptComplexTransComplexIds',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

apartmentComplexFloorPlan.belongsTo(apartmentComplex, { as: 'relatedComplexId',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

apartmentComplexImage.belongsTo(apartmentComplex, { as: 'relatedComplexId',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

apartmentComplexTransportation.belongsTo(apartmentComplex, { as: 'relatedComplexId',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

friend.belongsTo(rentedUser, { as: 'relatedFriendId',
  foreignKey: 'friendId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

friend.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

invitee.belongsTo(rentedUser, { as: 'relatedInvitorId',
  foreignKey: 'invitorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

lease.hasMany(lessee, { as: 'ids',
  foreignKey: 'leaseId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

lease.belongsTo(property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

lease.belongsToMany(rentedUser, { as: 'relatedIdUserIds',
  foreignKey: 'leaseId',
  otherKey: 'userId',
  through: 'lessee',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

lessee.belongsTo(lease, { as: 'relatedLeaseId',
  foreignKey: 'leaseId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

lessee.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

looking.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

payment.belongsTo(rentedUser, { as: 'relatedPayeeId',
  foreignKey: 'payeeId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

payment.belongsTo(rentedUser, { as: 'relatedPayerId',
  foreignKey: 'payerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

pet.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.hasMany(lease, { as: 'ids',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.hasMany(propertyImages, { as: 'imagesProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.hasMany(propertyLeaseDefaults, { as: 'leasedefaultsProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.hasMany(propertyLikes, { as: 'likesProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.hasMany(propertyListing, { as: 'listingProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.hasMany(propertyOwnership, { as: 'fKs',
  foreignKey: 'propertyFK',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.hasMany(rentalApplication, { as: 'propFKs',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.hasMany(roomListing, { as: 'roomlistingProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.belongsToMany(propertyListing, { as: 'relatedImagesPropertyListingIds',
  foreignKey: 'propertyId',
  otherKey: 'listingId',
  through: 'property_images',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.belongsToMany(rentedUser, { as: 'relatedLeasedefaultsPropertyOwnerIds',
  foreignKey: 'propertyId',
  otherKey: 'ownerId',
  through: 'property_lease_defaults',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.belongsToMany(rentedUser, { as: 'relatedLikesPropertyUserIds',
  foreignKey: 'propertyId',
  otherKey: 'userId',
  through: 'property_likes',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

property.belongsToMany(rentedUser, { as: 'relatedRoomlistingPropertyCreatorIds',
  foreignKey: 'propertyId',
  otherKey: 'creatorId',
  through: 'room_listing',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyImages.belongsTo(propertyListing, { as: 'relatedListingId',
  foreignKey: 'listingId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyImages.belongsTo(property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyLeaseDefaults.belongsTo(rentedUser, { as: 'relatedOwnerId',
  foreignKey: 'ownerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyLeaseDefaults.belongsTo(property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyLikes.belongsTo(property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyLikes.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyListing.hasMany(propertyImages, { as: 'propertyimagesListings',
  foreignKey: 'listingId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyListing.belongsTo(property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyListing.belongsToMany(property, { as: 'relatedPropertyimagesListingPropertyIds',
  foreignKey: 'listingId',
  otherKey: 'propertyId',
  through: 'property_images',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyOwner.belongsTo(rentedUser, { as: 'relatedOwnerId',
  foreignKey: 'ownerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyOwner.belongsTo(propertyOwnership, { as: 'relatedPropertyOwnershipId',
  foreignKey: 'propertyOwnershipId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyOwnership.hasMany(propertyOwner, { as: 'propertyOwnershipFKs',
  foreignKey: 'propertyOwnershipId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyOwnership.belongsTo(property, { as: 'relatedPropertyFK',
  foreignKey: 'propertyFK',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

propertyOwnership.belongsToMany(rentedUser, { as: 'relatedPropertyOwnershipFKOwnerIds',
  foreignKey: 'propertyOwnershipId',
  otherKey: 'ownerId',
  through: 'property_owner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentalApplicant.belongsTo(rentalApplication, { as: 'relatedRentalAppId',
  foreignKey: 'rentalAppId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentalApplicant.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentalApplication.hasMany(rentalApplicant, { as: 'rentalAppIds',
  foreignKey: 'rentalAppId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentalApplication.belongsTo(property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentalApplication.belongsToMany(rentedUser, { as: 'relatedRentalAppIdUserIds',
  foreignKey: 'rentalAppId',
  otherKey: 'userId',
  through: 'rental_applicant',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(addressHistory, { as: 'addresshistoryUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(friend, { as: 'friendFriendIds',
  foreignKey: 'friendId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(friend, { as: 'friendUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(invitee, { as: 'inviteeInvitorIds',
  foreignKey: 'invitorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(lessee, { as: 'lesseeUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(payment, { as: 'paymentPayees',
  foreignKey: 'payeeId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(payment, { as: 'paymentPayers',
  foreignKey: 'payerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(pet, { as: 'petsUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(propertyLeaseDefaults, { as: 'propertyleasedefaultsOwners',
  foreignKey: 'ownerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(propertyLikes, { as: 'propertylikesUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(propertyOwner, { as: 'propertyownerUsers',
  foreignKey: 'ownerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(rentalApplicant, { as: 'rentalapplicantUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(roomListing, { as: 'roomlistingUsers',
  foreignKey: 'creatorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(roommate, { as: 'roommateRommieIds',
  foreignKey: 'roommateId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(roommate, { as: 'roommateUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userCosigner, { as: 'usercosignerCosginers',
  foreignKey: 'cosginerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userCosigner, { as: 'usercosignerCosingees',
  foreignKey: 'cosingeeId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userEducation, { as: 'usereducationUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userFinancial, { as: 'userfinancialsUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userOccupation, { as: 'useroccupationUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userRecommendation, { as: 'userrecommendationsRecommendeds',
  foreignKey: 'recommendedId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userRecommendation, { as: 'userrecommendationsRecommendors',
  foreignKey: 'recommendorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userReference, { as: 'userreferencesUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.hasMany(userVehicle, { as: 'uservehiclesUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedFriendFriendIdUserIds',
  foreignKey: 'friendId',
  otherKey: 'userId',
  through: 'friend',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedFriendUserFriendIds',
  foreignKey: 'userId',
  otherKey: 'friendId',
  through: 'friend',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(lease, { as: 'relatedLesseeUserLeaseIds',
  foreignKey: 'userId',
  otherKey: 'leaseId',
  through: 'lessee',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedPaymentPayeePayerIds',
  foreignKey: 'payeeId',
  otherKey: 'payerId',
  through: 'payment',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedPaymentPayerPayeeIds',
  foreignKey: 'payerId',
  otherKey: 'payeeId',
  through: 'payment',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(property, { as: 'relatedPropertyleasedefaultsOwnerPropertyIds',
  foreignKey: 'ownerId',
  otherKey: 'propertyId',
  through: 'property_lease_defaults',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(property, { as: 'relatedPropertylikesUserPropertyIds',
  foreignKey: 'userId',
  otherKey: 'propertyId',
  through: 'property_likes',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(propertyOwnership, { as: 'relatedPropertyownerUserPropertyOwnershipIds',
  foreignKey: 'ownerId',
  otherKey: 'propertyOwnershipId',
  through: 'property_owner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentalApplication, { as: 'relatedRentalapplicantUserRentalAppIds',
  foreignKey: 'userId',
  otherKey: 'rentalAppId',
  through: 'rental_applicant',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(property, { as: 'relatedRoomlistingUserPropertyIds',
  foreignKey: 'creatorId',
  otherKey: 'propertyId',
  through: 'room_listing',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedRoommateRommieIdUserIds',
  foreignKey: 'roommateId',
  otherKey: 'userId',
  through: 'roommate',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedRoommateUserRoommateIds',
  foreignKey: 'userId',
  otherKey: 'roommateId',
  through: 'roommate',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedUsercosignerCosginerCosingeeIds',
  foreignKey: 'cosginerId',
  otherKey: 'cosingeeId',
  through: 'user_cosigner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedUsercosignerCosingeeCosginerIds',
  foreignKey: 'cosingeeId',
  otherKey: 'cosginerId',
  through: 'user_cosigner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedUserrecommendationsRecommendedRecommendorIds',
  foreignKey: 'recommendedId',
  otherKey: 'recommendorId',
  through: 'user_recommendation',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rentedUser.belongsToMany(rentedUser, { as: 'relatedUserrecommendationsRecommendorRecommendedIds',
  foreignKey: 'recommendorId',
  otherKey: 'recommendedId',
  through: 'user_recommendation',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

roommate.belongsTo(rentedUser, { as: 'relatedRoommateId',
  foreignKey: 'roommateId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

roommate.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

roomListing.belongsTo(property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

roomListing.belongsTo(rentedUser, { as: 'relatedCreatorId',
  foreignKey: 'creatorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

university.hasMany(universityCalenderQuater, { as: 'univcalquarterUniversities',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

university.hasMany(universityCalenderSemester, { as: 'univcalsemesterUniversities',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

university.hasMany(userEducation, { as: 'fKtoUniversities',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

university.belongsToMany(rentedUser, { as: 'relatedFKtoUniversityUserIds',
  foreignKey: 'universityId',
  otherKey: 'userId',
  through: 'user_education',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

universityCalenderQuater.belongsTo(university, { as: 'relatedUniversityId',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

universityCalenderSemester.belongsTo(university, { as: 'relatedUniversityId',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userCosigner.belongsTo(rentedUser, { as: 'relatedCosginerId',
  foreignKey: 'cosginerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userCosigner.belongsTo(rentedUser, { as: 'relatedCosingeeId',
  foreignKey: 'cosingeeId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userEducation.belongsTo(university, { as: 'relatedUniversityId',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userEducation.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userFinancial.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userOccupation.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userRecommendation.belongsTo(rentedUser, { as: 'relatedRecommendedId',
  foreignKey: 'recommendedId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userRecommendation.belongsTo(rentedUser, { as: 'relatedRecommendorId',
  foreignKey: 'recommendorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userReference.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

userVehicle.belongsTo(rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

