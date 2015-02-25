var rented.addressHistory = Sequelize.define("rented.addressHistory",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'address_history_pkey' },
  streetnumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetnumeric',
     allowNull: false },
  streetaddress: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'streetaddress',
     allowNull: false },
  apt: 
   { type: { options: [Object], _binary: undefined, _length: 6 },
     field: 'apt' },
  city: 
   { type: { options: [Object], _binary: undefined, _length: 30 },
     field: 'city',
     allowNull: false },
  state: 
   { type: { options: [Object], _binary: undefined, _length: 2 },
     field: 'state',
     allowNull: false },
  zip: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'zip',
     allowNull: false },
  startdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startdate',
     allowNull: false },
  enddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'enddate' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     references: 'rented_user',
     referencesKey: 'userid' },
  aboutme: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'aboutme' },
  present: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'present' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'address_history', timestamps: false });


var rented.apartmentComplex = Sequelize.define("rented.apartmentComplex",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'apartment_complex_pkey' },
  name: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'name',
     allowNull: false },
  streetnumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetnumeric',
     allowNull: false },
  streetaddress: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'streetaddress',
     allowNull: false },
  city: 
   { type: { options: [Object], _binary: undefined, _length: 30 },
     field: 'city',
     allowNull: false },
  state: 
   { type: { options: [Object], _binary: undefined, _length: 2 },
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
  distancetouniv: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'distancetouniv' },
  petsallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'petsallowed',
     allowNull: false },
  dogsallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'dogsallowed',
     allowNull: false },
  catsallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'catsallowed',
     allowNull: false },
  othersallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'othersallowed',
     allowNull: false },
  dogqtyallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'dogqtyallowed' },
  catqtyallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'catqtyallowed' },
  otherqtyallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'otherqtyallowed' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'apartment_complex', timestamps: false });


var rented.apartmentComplexFloorPlan = Sequelize.define("rented.apartmentComplexFloorPlan",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'apartment_complex_floor_plan_pkey' },
  complexid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'complexid',
     allowNull: false,
     references: 'apartment_complex',
     referencesKey: 'complexid' },
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
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'washer_dryer',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'apartment_complex_floor_plan', timestamps: false });


var rented.apartmentComplexImage = Sequelize.define("rented.apartmentComplexImage",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'apartment_complex_image_pkey' },
  complexid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'complexid',
     allowNull: false,
     references: 'apartment_complex',
     referencesKey: 'complexid' },
  location: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'location',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'apartment_complex_image', timestamps: false });


var rented.apartmentComplexTransportation = Sequelize.define("rented.apartmentComplexTransportation",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'apartment_complex_transportation_pkey' },
  complexid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'complexid',
     allowNull: false,
     references: 'apartment_complex',
     referencesKey: 'complexid' },
  shuttleroute: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'shuttleroute',
     allowNull: false },
  busline: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'busline',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'apartment_complex_transportation',
  timestamps: false });


var rented.articles = Sequelize.define("rented.articles",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'articles_pkey' },
  title: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'title' },
  content: 
   { type: { [Function] super_: [Function], key: 'TEXT' },
     field: 'content' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat',
     allowNull: false },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid' } },
{ tableName: 'articles', timestamps: false });


var rented.friend = Sequelize.define("rented.friend",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'friend_pkey' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  friendid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'friendid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'friendid' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'friend', timestamps: false });


var rented.invitee = Sequelize.define("rented.invitee",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'invitee_pkey' },
  firstname: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'firstname',
     allowNull: false },
  lastname: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'lastname',
     allowNull: false },
  invitorid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'invitorid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'invitorid' },
  email: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'email' },
  phone: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'phone' },
  facebook: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'facebook' },
  twitter: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'twitter' },
  googleplus: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'googleplus' },
  linkedin: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'linkedin' },
  viewproperty: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'viewproperty' },
  viewpropertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'viewpropertyid' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'invitee', timestamps: false });


var rented.lease = Sequelize.define("rented.lease",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'lease_pkey' },
  propertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyid',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyid' },
  approved: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'approved' },
  startdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startdate',
     allowNull: false },
  enddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'enddate',
     allowNull: false },
  paymentamount: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'paymentamount',
     allowNull: false },
  paymentinterval: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'paymentinterval',
     allowNull: false },
  securitydeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'securitydeposit' },
  petdeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'petdeposit' },
  payee: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'payee' },
  built: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'built' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'lease', timestamps: false });


var rented.lessee = Sequelize.define("rented.lessee",
{ leaseid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'leaseid',
     allowNull: false,
     unique: 'lessee_pkey',
     references: 'lease',
     referencesKey: 'leaseid' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     unique: 'lessee_pkey',
     references: 'rented_user',
     referencesKey: 'userid' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'lessee', timestamps: false });


var rented.looking = Sequelize.define("rented.looking",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'looking_pkey' },
  maxmonthlyrent: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'maxmonthlyrent',
     allowNull: false },
  utilitiesincluded: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'utilitiesincluded',
     allowNull: false },
  area: 
   { type: { options: [Object], _binary: undefined, _length: 30 },
     field: 'area' },
  distancetouniv: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'distancetouniv' },
  moveindate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'moveindate',
     allowNull: false },
  lengthofstay: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'lengthofstay' },
  longtermintention: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'longtermintention' },
  opentofullyearleasenewroomates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'opentofullyearleasenewroomates' },
  roomtype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'roomtype' },
  sharedbathroom: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'sharedbathroom' },
  gender: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'gender',
     allowNull: false },
  numroommates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numroommates' },
  furnished: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'furnished' },
  busrouterequired: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'busrouterequired' },
  parkingneeded: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'parkingneeded' },
  smokingallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'smokingallowed' },
  petsallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'petsallowed' },
  coupleallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'coupleallowed' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'looking', timestamps: false });


var rented.payment = Sequelize.define("rented.payment",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'payment_pkey' },
  payerid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'payerid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'payerid' },
  payeeid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'payeeid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'payeeid' },
  dollaramount: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'dollaramount' },
  reason: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'reason' },
  rentpayment: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'rentpayment' },
  creditcheckpayment: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'creditcheckpayment' },
  paymentform: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'paymentform' },
  paymentdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'paymentdate',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'payment', timestamps: false });


var rented.pet = Sequelize.define("rented.pet",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'pet_pkey' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  type: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'type',
     allowNull: false },
  breed: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'breed',
     allowNull: false },
  weightlbs: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'weightlbs' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'pet', timestamps: false });


var rented.property = Sequelize.define("rented.property",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'property_pkey' },
  streetnumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetnumeric',
     allowNull: false },
  streetaddress: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'streetaddress',
     allowNull: false },
  city: 
   { type: { options: [Object], _binary: undefined, _length: 30 },
     field: 'city',
     allowNull: false },
  state: 
   { type: { options: [Object], _binary: undefined, _length: 2 },
     field: 'state',
     allowNull: false },
  zip: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'zip',
     allowNull: false },
  apt: 
   { type: { options: [Object], _binary: undefined, _length: 6 },
     field: 'apt' },
  bldg: 
   { type: { options: [Object], _binary: undefined, _length: 10 },
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
  type: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'type' },
  description: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'description' },
  bedrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bedrooms' },
  bathrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bathrooms' },
  parkingspots: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'parkingspots' },
  livingareasqft: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'livingareasqft' },
  hoafee: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'hoafee' },
  otherfee: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'otherfee' },
  status: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'status' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'property', timestamps: false });


var rented.propertyImages = Sequelize.define("rented.propertyImages",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'property_images_pkey' },
  listingid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'listingid',
     references: 'property_listing',
     referencesKey: 'listingid' },
  propertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyid',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyid' },
  location: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'location',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'property_images', timestamps: false });


var rented.propertyLeaseDefaults = Sequelize.define("rented.propertyLeaseDefaults",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'property_lease_defaults_pkey' },
  propertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyid',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyid' },
  ownerid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'ownerid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'ownerid' },
  qtydogsallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'qtydogsallowed',
     allowNull: false },
  qtycatsallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'qtycatsallowed',
     allowNull: false },
  qtyotherallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'qtyotherallowed',
     allowNull: false },
  animalsizelimitlbs: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'animalsizelimitlbs',
     allowNull: false },
  fishtankallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'fishtankallowed',
     allowNull: false },
  preferredleaselength: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'preferredleaselength',
     allowNull: false },
  preferredleaseunit: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'preferredleaseunit',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'property_lease_defaults', timestamps: false });


var rented.propertyLikes = Sequelize.define("rented.propertyLikes",
{ propertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyid',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyid' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'property_likes_pkey' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'property_likes', timestamps: false });


var rented.propertyListing = Sequelize.define("rented.propertyListing",
{ propertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyid',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyid' },
  monthlyprice: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'monthlyprice',
     allowNull: false },
  securitydeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'securitydeposit' },
  petdeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'petdeposit' },
  availablemovein: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'availablemovein',
     allowNull: false },
  id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'property_listing_pkey' },
  leaseenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'leaseenddate' },
  leaselength: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'leaselength',
     allowNull: false },
  leaselengthunit: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'leaselengthunit',
     allowNull: false },
  leasetype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'leasetype',
     allowNull: false },
  gender: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'gender',
     allowNull: false },
  totalutilitycost: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'totalutilitycost',
     allowNull: false },
  roomtype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'roomtype',
     allowNull: false },
  sharedbathroom: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'sharedbathroom' },
  numroomates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numroomates',
     allowNull: false },
  furnished: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'furnished' },
  parkingavailable: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'parkingavailable' },
  smokingallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'smokingallowed' },
  description: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'description' },
  status: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'status' },
  contactphone: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'contactphone' },
  contactemail: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'contactemail',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'property_listing', timestamps: false });


var rented.propertyOwner = Sequelize.define("rented.propertyOwner",
{ propertyownershipid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyownershipid',
     allowNull: false,
     unique: 'property_owner_pkey',
     references: 'property_ownership',
     referencesKey: 'propertyownershipid' },
  ownerid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'ownerid',
     allowNull: false,
     unique: 'property_owner_pkey',
     references: 'rented_user',
     referencesKey: 'ownerid' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'property_owner', timestamps: false });


var rented.propertyOwnership = Sequelize.define("rented.propertyOwnership",
{ startdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startdate',
     allowNull: false },
  enddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'enddate',
     allowNull: false },
  propertyfk: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyfk',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyfk' },
  id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'property_ownership_pkey' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'property_ownership', timestamps: false });


var rented.rentalApplicant = Sequelize.define("rented.rentalApplicant",
{ userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'rental_applicant_pkey' },
  rentalappid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'rentalappid',
     allowNull: false,
     references: 'rental_application',
     referencesKey: 'rentalappid' },
  sharecredit: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'sharecredit' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'rental_applicant', timestamps: false });


var rented.rentalApplication = Sequelize.define("rented.rentalApplication",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'rental_application_pkey' },
  propertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyid',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyid' },
  preferredleaselength: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'preferredleaselength' },
  preferredmovein: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'preferredmovein',
     allowNull: false },
  numoccupants: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numoccupants',
     allowNull: false },
  movereason: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'movereason' },
  preferredleaselengthunit: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'preferredleaselengthunit' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'rental_application', timestamps: false });


var rented.rentedUser = Sequelize.define("rented.rentedUser",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'rented_user_pkey' },
  username: 
   { type: { options: [Object], _binary: undefined, _length: 50 },
     field: 'username' },
  email: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'email',
     allowNull: false },
  confirmedemail: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'confirmedemail',
     allowNull: false },
  password: 
   { type: { options: [Object], _binary: undefined, _length: 128 },
     field: 'password',
     allowNull: false },
  firstname: 
   { type: { options: [Object], _binary: undefined, _length: 50 },
     field: 'firstname',
     allowNull: false },
  lastname: 
   { type: { options: [Object], _binary: undefined, _length: 50 },
     field: 'lastname',
     allowNull: false },
  middlename: 
   { type: { options: [Object], _binary: undefined, _length: 50 },
     field: 'middlename' },
  aboutme: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'aboutme' },
  phone: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'phone' },
  profileimage: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'profileimage' },
  twitter: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'twitter' },
  facebook: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'facebook' },
  googleplus: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'googleplus' },
  linkedin: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'linkedin' },
  experianidtoken: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'experianidtoken' },
  creditchecktoken: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'creditchecktoken' },
  runidentitycheck: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'runidentitycheck',
     allowNull: false },
  sharecreditreport: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'sharecreditreport',
     allowNull: false },
  identitydate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'identitydate' },
  creditreportdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'creditreportdate' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' },
  role: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'role' },
  provider: 
   { type: { options: [Object], _binary: undefined, _length: 64 },
     field: 'provider' },
  facebookoauthid: 
   { type: { options: [Object], _binary: undefined, _length: 64 },
     field: 'facebookoauthid' },
  googleoauthid: 
   { type: { options: [Object], _binary: undefined, _length: 64 },
     field: 'googleoauthid' },
  twitteroauthid: 
   { type: { options: [Object], _binary: undefined, _length: 64 },
     field: 'twitteroauthid' },
  salt: 
   { type: { options: [Object], _binary: undefined, _length: 128 },
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


var rented.roommate = Sequelize.define("rented.roommate",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'roommate_pkey' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  roommateid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'roommateid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'roommateid' },
  fromdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fromdate',
     allowNull: false },
  todate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'todate' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'roommate', timestamps: false });


var rented.roomListing = Sequelize.define("rented.roomListing",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'room_listing_pkey' },
  propertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyid',
     allowNull: false,
     references: 'property',
     referencesKey: 'propertyid' },
  creatorid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'creatorid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'creatorid' },
  monthlyprice: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'monthlyprice',
     allowNull: false },
  securitydeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'securitydeposit' },
  availablemovein: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'availablemovein',
     allowNull: false },
  leaseenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'leaseenddate' },
  leasetype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'leasetype',
     allowNull: false },
  gender: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'gender',
     allowNull: false },
  monthlyutilitycost: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'monthlyutilitycost',
     allowNull: false },
  roomtype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'roomtype',
     allowNull: false },
  sharedbathroom: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'sharedbathroom' },
  numroomates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numroomates',
     allowNull: false },
  furnished: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'furnished' },
  parkingavailable: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'parkingavailable' },
  smokingallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'smokingallowed' },
  description: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'description' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'room_listing', timestamps: false });


var rented.roomListingView = Sequelize.define("rented.roomListingView",
{ streetnumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetnumeric' },
  streetaddress: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'streetaddress' },
  city: 
   { type: { options: [Object], _binary: undefined, _length: 30 },
     field: 'city' },
  state: 
   { type: { options: [Object], _binary: undefined, _length: 2 },
     field: 'state' },
  zip: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'zip' },
  apt: 
   { type: { options: [Object], _binary: undefined, _length: 6 },
     field: 'apt' },
  bldg: 
   { type: { options: [Object], _binary: undefined, _length: 10 },
     field: 'bldg' },
  type: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'type' },
  bedrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bedrooms' },
  bathrooms: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'bathrooms' },
  id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id' },
  propertyid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'propertyid' },
  creatorid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'creatorid' },
  monthlyprice: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'monthlyprice' },
  securitydeposit: 
   { type: 
      { options: [Object],
        _length: 53,
        _zerofill: undefined,
        _decimals: undefined,
        _precision: undefined,
        _scale: undefined,
        _unsigned: undefined },
     field: 'securitydeposit' },
  availablemovein: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'availablemovein' },
  leaseenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'leaseenddate' },
  leasetype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'leasetype' },
  gender: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'gender' },
  monthlyutilitycost: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'monthlyutilitycost' },
  roomtype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'roomtype' },
  sharedbathroom: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'sharedbathroom' },
  numroomates: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'numroomates' },
  furnished: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'furnished' },
  parkingavailable: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'parkingavailable' },
  smokingallowed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'smokingallowed' },
  description: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'description' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat' },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'room_listing_view', timestamps: false });


var rented.student = Sequelize.define("rented.student",
{ firstname: 
   { type: { options: [Object], _binary: undefined, _length: 30 },
     field: 'firstname',
     allowNull: false },
  lastname: 
   { type: { options: [Object], _binary: undefined, _length: 30 },
     field: 'lastname',
     allowNull: false },
  email: 
   { type: { options: [Object], _binary: undefined, _length: 60 },
     field: 'email' },
  street: 
   { type: { options: [Object], _binary: undefined, _length: 50 },
     field: 'street',
     allowNull: false },
  city: 
   { type: { options: [Object], _binary: undefined, _length: 40 },
     field: 'city',
     allowNull: false } },
{ tableName: 'student', timestamps: false });


var rented.university = Sequelize.define("rented.university",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'university_pkey' },
  name: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'name',
     allowNull: false },
  academicyeartype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'academicyeartype' },
  streetnumeric: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'streetnumeric',
     allowNull: false },
  streetaddress: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'streetaddress',
     allowNull: false },
  apt: 
   { type: { options: [Object], _binary: undefined, _length: 6 },
     field: 'apt' },
  city: 
   { type: { options: [Object], _binary: undefined, _length: 30 },
     field: 'city',
     allowNull: false },
  state: 
   { type: { options: [Object], _binary: undefined, _length: 2 },
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
  startdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startdate',
     allowNull: false },
  enddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'enddate' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'university', timestamps: false });


var rented.universityCalenderQuater = Sequelize.define("rented.universityCalenderQuater",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'university_calender_quater_pkey' },
  universityid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'universityid',
     allowNull: false,
     references: 'university',
     referencesKey: 'universityid' },
  year: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'year',
     allowNull: false },
  fallquaterstartdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fallquaterstartdate',
     allowNull: false },
  fallquaterenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fallquaterenddate',
     allowNull: false },
  winterquaterstartdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'winterquaterstartdate',
     allowNull: false },
  winterquaterenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'winterquaterenddate',
     allowNull: false },
  springquaterstartdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'springquaterstartdate',
     allowNull: false },
  springquaterenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'springquaterenddate',
     allowNull: false },
  summerquaterstartdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'summerquaterstartdate',
     allowNull: false },
  summerquaterenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'summerquaterenddate',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'university_calender_quater', timestamps: false });


var rented.universityCalenderSemester = Sequelize.define("rented.universityCalenderSemester",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'university_calender_semester_pkey' },
  universityid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'universityid',
     allowNull: false,
     references: 'university',
     referencesKey: 'universityid' },
  year: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'year',
     allowNull: false },
  fallsemesterstartdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fallsemesterstartdate',
     allowNull: false },
  fallsemesterenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'fallsemesterenddate',
     allowNull: false },
  springsemesterstartdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'springsemesterstartdate',
     allowNull: false },
  springsemesterenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'springsemesterenddate',
     allowNull: false },
  summersemesterstartdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'summersemesterstartdate',
     allowNull: false },
  summersemesterenddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'summersemesterenddate',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'university_calender_semester', timestamps: false });


var rented.userCosigner = Sequelize.define("rented.userCosigner",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'user_cosigner_pkey' },
  cosingeeid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'cosingeeid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'cosingeeid' },
  cosginerid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'cosginerid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'cosginerid' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'user_cosigner', timestamps: false });


var rented.userEducation = Sequelize.define("rented.userEducation",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'user_education_pkey' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  educationcentername: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'educationcentername',
     allowNull: false },
  type: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'type' },
  startdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startdate',
     allowNull: false },
  enddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'enddate' },
  graduation: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'graduation',
     allowNull: false },
  graduationdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'graduationdate' },
  major: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'major' },
  degreetype: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'degreetype' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'user_education', timestamps: false });


var rented.userFinancial = Sequelize.define("rented.userFinancial",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'user_financial_pkey' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  startdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startdate',
     allowNull: false },
  enddate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'enddate' },
  individualannualincom: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'individualannualincom' },
  householdannualincome: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'householdannualincome' },
  spouseannualincome: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'spouseannualincome' },
  incomeproof: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'incomeproof' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'user_financial', timestamps: false });


var rented.userOccupation = Sequelize.define("rented.userOccupation",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'user_occupation_pkey' },
  role: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'role',
     allowNull: false },
  company: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'company',
     allowNull: false },
  start: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'start',
     allowNull: false },
  end: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'end' },
  presentlyemployeed: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'presentlyemployeed',
     allowNull: false },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'user_occupation', timestamps: false });


var rented.userRecommendation = Sequelize.define("rented.userRecommendation",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'user_recommendation_pkey' },
  recommendedid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'recommendedid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'recommendedid' },
  recommendorid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'recommendorid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'recommendorid' },
  recommendedapproved: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'recommendedapproved',
     allowNull: false },
  content: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'content' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'user_recommendation', timestamps: false });


var rented.userReference = Sequelize.define("rented.userReference",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'user_reference_pkey' },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     allowNull: false,
     references: 'rented_user',
     referencesKey: 'userid' },
  email: 
   { type: { options: [Object], _binary: undefined, _length: 255 },
     field: 'email',
     allowNull: false },
  phone: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'phone',
     allowNull: false },
  firstname: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'firstname',
     allowNull: false },
  lastname: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'lastname',
     allowNull: false },
  relation: 
   { type: { options: [Object], _binary: undefined, _length: 250 },
     field: 'relation',
     allowNull: false },
  startdate: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'startdate',
     allowNull: false },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'user_reference', timestamps: false });


var rented.userVehicle = Sequelize.define("rented.userVehicle",
{ id: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'id',
     allowNull: false,
     unique: 'user_vehicle_pkey' },
  year: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'year',
     allowNull: false },
  make: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'make',
     allowNull: false },
  model: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'model',
     allowNull: false },
  licenseplate: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'licenseplate',
     allowNull: false },
  color: 
   { type: { options: [Object], _binary: undefined, _length: 45 },
     field: 'color',
     allowNull: false },
  userid: 
   { type: { [Function] super_: [Object], key: 'INTEGER' },
     field: 'userid',
     references: 'rented_user',
     referencesKey: 'userid' },
  createdat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'createdat',
     allowNull: false },
  updatedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'updatedat' },
  deletedat: 
   { type: { [Function] super_: [Function], key: 'DATE' },
     field: 'deletedat' } },
{ tableName: 'user_vehicle', timestamps: false });


rented.addressHistory.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplex.hasMany(rented.apartmentComplexFloorPlan, { as: 'floorPlanComplexidFkeys',
  foreignKey: 'complexid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplex.hasMany(rented.apartmentComplexImage, { as: 'imageComplexidFkeys',
  foreignKey: 'complexid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplex.hasMany(rented.apartmentComplexTransportation, { as: 'transportationComplexidFkeys',
  foreignKey: 'complexid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplexFloorPlan.belongsTo(rented.apartmentComplex, { as: 'relatedComplexid',
  foreignKey: 'complexid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplexImage.belongsTo(rented.apartmentComplex, { as: 'relatedComplexid',
  foreignKey: 'complexid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplexTransportation.belongsTo(rented.apartmentComplex, { as: 'relatedComplexid',
  foreignKey: 'complexid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.friend.belongsTo(rented.rentedUser, { as: 'relatedFriendid',
  foreignKey: 'friendid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.friend.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.invitee.belongsTo(rented.rentedUser, { as: 'relatedInvitorid',
  foreignKey: 'invitorid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lease.hasMany(rented.lessee, { as: 'lesseeLeaseidFkeys',
  foreignKey: 'leaseid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lease.belongsTo(rented.property, { as: 'relatedPropertyid',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lease.belongsToMany(rented.rentedUser, { as: 'relatedLesseeLeaseidFkeyUserids',
  foreignKey: 'leaseid',
  otherKey: 'userid',
  through: 'lessee',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lessee.belongsTo(rented.lease, { as: 'relatedLeaseid',
  foreignKey: 'leaseid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lessee.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.payment.belongsTo(rented.rentedUser, { as: 'relatedPayeeid',
  foreignKey: 'payeeid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.payment.belongsTo(rented.rentedUser, { as: 'relatedPayerid',
  foreignKey: 'payerid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.pet.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.lease, { as: 'leasePropertyidFkeys',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyImages, { as: 'imagesPropertyidFkeys',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyLeaseDefaults, { as: 'leaseDefaultsPropertyidFkeys',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyLikes, { as: 'likesPropertyidFkeys',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyListing, { as: 'listingPropertyidFkeys',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyOwnership, { as: 'ownershipPropertyfkFkeys',
  foreignKey: 'propertyfk',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.rentalApplication, { as: 'rentalApplicationPropertyidFkeys',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.roomListing, { as: 'roomListingPropertyidFkeys',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.belongsToMany(rented.propertyListing, { as: 'relatedImagesPropertyidFkeyListingids',
  foreignKey: 'propertyid',
  otherKey: 'listingid',
  through: 'property_images',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.belongsToMany(rented.rentedUser, { as: 'relatedLeaseDefaultsPropertyidFkeyOwnerids',
  foreignKey: 'propertyid',
  otherKey: 'ownerid',
  through: 'property_lease_defaults',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.belongsToMany(rented.rentedUser, { as: 'relatedLikesPropertyidFkeyUserids',
  foreignKey: 'propertyid',
  otherKey: 'userid',
  through: 'property_likes',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.belongsToMany(rented.rentedUser, { as: 'relatedRoomListingPropertyidFkeyCreatorids',
  foreignKey: 'propertyid',
  otherKey: 'creatorid',
  through: 'room_listing',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyImages.belongsTo(rented.propertyListing, { as: 'relatedListingid',
  foreignKey: 'listingid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyImages.belongsTo(rented.property, { as: 'relatedPropertyid',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyLeaseDefaults.belongsTo(rented.rentedUser, { as: 'relatedOwnerid',
  foreignKey: 'ownerid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyLeaseDefaults.belongsTo(rented.property, { as: 'relatedPropertyid',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyLikes.belongsTo(rented.property, { as: 'relatedPropertyid',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyLikes.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyListing.hasMany(rented.propertyImages, { as: 'propertyImagesListingidFkeys',
  foreignKey: 'listingid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyListing.belongsTo(rented.property, { as: 'relatedPropertyid',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyListing.belongsToMany(rented.property, { as: 'relatedPropertyImagesListingidFkeyPropertyids',
  foreignKey: 'listingid',
  otherKey: 'propertyid',
  through: 'property_images',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyOwner.belongsTo(rented.rentedUser, { as: 'relatedOwnerid',
  foreignKey: 'ownerid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyOwner.belongsTo(rented.propertyOwnership, { as: 'relatedPropertyownershipid',
  foreignKey: 'propertyownershipid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyOwnership.hasMany(rented.propertyOwner, { as: 'propertyOwnerPropertyownershipidFkeys',
  foreignKey: 'propertyownershipid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyOwnership.belongsTo(rented.property, { as: 'relatedPropertyfk',
  foreignKey: 'propertyfk',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyOwnership.belongsToMany(rented.rentedUser, { as: 'relatedPropertyOwnerPropertyownershipidFkeyOwnerids',
  foreignKey: 'propertyownershipid',
  otherKey: 'ownerid',
  through: 'property_owner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentalApplicant.belongsTo(rented.rentalApplication, { as: 'relatedRentalappid',
  foreignKey: 'rentalappid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentalApplicant.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentalApplication.hasMany(rented.rentalApplicant, { as: 'rentalApplicantRentalappidFkeys',
  foreignKey: 'rentalappid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentalApplication.belongsTo(rented.property, { as: 'relatedPropertyid',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentalApplication.belongsToMany(rented.rentedUser, { as: 'relatedRentalApplicantRentalappidFkeyUserids',
  foreignKey: 'rentalappid',
  otherKey: 'userid',
  through: 'rental_applicant',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.addressHistory, { as: 'addressHistoryUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.friend, { as: 'friendFriendidFkeys',
  foreignKey: 'friendid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.friend, { as: 'friendUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.invitee, { as: 'inviteeInvitoridFkeys',
  foreignKey: 'invitorid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.lessee, { as: 'lesseeUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.payment, { as: 'paymentPayeeidFkeys',
  foreignKey: 'payeeid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.payment, { as: 'paymentPayeridFkeys',
  foreignKey: 'payerid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.pet, { as: 'petUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.propertyLeaseDefaults, { as: 'propertyLeaseDefaultsOwneridFkeys',
  foreignKey: 'ownerid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.propertyLikes, { as: 'propertyLikesUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.propertyOwner, { as: 'propertyOwnerOwneridFkeys',
  foreignKey: 'ownerid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.rentalApplicant, { as: 'rentalApplicantUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.roomListing, { as: 'roomListingCreatoridFkeys',
  foreignKey: 'creatorid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.roommate, { as: 'roommateRoommateidFkeys',
  foreignKey: 'roommateid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.roommate, { as: 'roommateUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userCosigner, { as: 'userCosignerCosgineridFkeys',
  foreignKey: 'cosginerid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userCosigner, { as: 'userCosignerCosingeeidFkeys',
  foreignKey: 'cosingeeid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userEducation, { as: 'userEducationUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userFinancial, { as: 'userFinancialUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userOccupation, { as: 'userOccupationUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userRecommendation, { as: 'userRecommendationRecommendedidFkeys',
  foreignKey: 'recommendedid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userRecommendation, { as: 'userRecommendationRecommendoridFkeys',
  foreignKey: 'recommendorid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userReference, { as: 'userReferenceUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userVehicle, { as: 'userVehicleUseridFkeys',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedFriendFriendidFkeyUserids',
  foreignKey: 'friendid',
  otherKey: 'userid',
  through: 'friend',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedFriendUseridFkeyFriendids',
  foreignKey: 'userid',
  otherKey: 'friendid',
  through: 'friend',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.lease, { as: 'relatedLesseeUseridFkeyLeaseids',
  foreignKey: 'userid',
  otherKey: 'leaseid',
  through: 'lessee',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedPaymentPayeeidFkeyPayerids',
  foreignKey: 'payeeid',
  otherKey: 'payerid',
  through: 'payment',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedPaymentPayeridFkeyPayeeids',
  foreignKey: 'payerid',
  otherKey: 'payeeid',
  through: 'payment',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.property, { as: 'relatedPropertyLeaseDefaultsOwneridFkeyPropertyids',
  foreignKey: 'ownerid',
  otherKey: 'propertyid',
  through: 'property_lease_defaults',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.property, { as: 'relatedPropertyLikesUseridFkeyPropertyids',
  foreignKey: 'userid',
  otherKey: 'propertyid',
  through: 'property_likes',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.propertyOwnership, { as: 'relatedPropertyOwnerOwneridFkeyPropertyownershipids',
  foreignKey: 'ownerid',
  otherKey: 'propertyownershipid',
  through: 'property_owner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentalApplication, { as: 'relatedRentalApplicantUseridFkeyRentalappids',
  foreignKey: 'userid',
  otherKey: 'rentalappid',
  through: 'rental_applicant',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.property, { as: 'relatedRoomListingCreatoridFkeyPropertyids',
  foreignKey: 'creatorid',
  otherKey: 'propertyid',
  through: 'room_listing',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedRoommateRoommateidFkeyUserids',
  foreignKey: 'roommateid',
  otherKey: 'userid',
  through: 'roommate',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedRoommateUseridFkeyRoommateids',
  foreignKey: 'userid',
  otherKey: 'roommateid',
  through: 'roommate',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedUserCosignerCosgineridFkeyCosingeeids',
  foreignKey: 'cosginerid',
  otherKey: 'cosingeeid',
  through: 'user_cosigner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedUserCosignerCosingeeidFkeyCosginerids',
  foreignKey: 'cosingeeid',
  otherKey: 'cosginerid',
  through: 'user_cosigner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedUserRecommendationRecommendedidFkeyRecommendorids',
  foreignKey: 'recommendedid',
  otherKey: 'recommendorid',
  through: 'user_recommendation',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedUserRecommendationRecommendoridFkeyRecommendedids',
  foreignKey: 'recommendorid',
  otherKey: 'recommendedid',
  through: 'user_recommendation',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.roommate.belongsTo(rented.rentedUser, { as: 'relatedRoommateid',
  foreignKey: 'roommateid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.roommate.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.roomListing.belongsTo(rented.rentedUser, { as: 'relatedCreatorid',
  foreignKey: 'creatorid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.roomListing.belongsTo(rented.property, { as: 'relatedPropertyid',
  foreignKey: 'propertyid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.university.hasMany(rented.universityCalenderQuater, { as: 'calenderQuaterUniversityidFkeys',
  foreignKey: 'universityid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.university.hasMany(rented.universityCalenderSemester, { as: 'calenderSemesterUniversityidFkeys',
  foreignKey: 'universityid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.universityCalenderQuater.belongsTo(rented.university, { as: 'relatedUniversityid',
  foreignKey: 'universityid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.universityCalenderSemester.belongsTo(rented.university, { as: 'relatedUniversityid',
  foreignKey: 'universityid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userCosigner.belongsTo(rented.rentedUser, { as: 'relatedCosginerid',
  foreignKey: 'cosginerid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userCosigner.belongsTo(rented.rentedUser, { as: 'relatedCosingeeid',
  foreignKey: 'cosingeeid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userEducation.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userFinancial.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userOccupation.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userRecommendation.belongsTo(rented.rentedUser, { as: 'relatedRecommendedid',
  foreignKey: 'recommendedid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userRecommendation.belongsTo(rented.rentedUser, { as: 'relatedRecommendorid',
  foreignKey: 'recommendorid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userReference.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userVehicle.belongsTo(rented.rentedUser, { as: 'relatedUserid',
  foreignKey: 'userid',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

