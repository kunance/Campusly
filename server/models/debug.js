var rented.addressHistory = Sequelize.define("rented.addressHistory",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'address_history_pkey' },
  streetNumeric:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'streetNumeric',
    allowNull: false },
streetAddress:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'streetAddress',
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
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'zip',
    allowNull: false },
startDate:
{ type: { [Function] super_: [Function], key: 'DATE' },
  field: 'startDate',
    allowNull: false },
endDate:
{ type: { [Function] super_: [Function], key: 'DATE' },
  field: 'endDate' },
userId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'userId',
    references: 'rented_user',
  referencesKey: 'userId' },
aboutMe:
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ tableName: 'address_history', timestamps: true });


var rented.apartmentComplex = Sequelize.define("rented.apartmentComplex",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'apartment_complex_pkey' },
  streetNumeric:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'streetNumeric',
    allowNull: false },
streetAddress:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'streetAddress',
    allowNull: false },
name:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'name',
    allowNull: false },
latitude:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'latitude' },
longitude:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'longitude' },
city:
{ type: { options: [Object], _binary: undefined, _length: 30 },
  field: 'city',
    allowNull: false },
state:
{ type: { options: [Object], _binary: undefined, _length: 2 },
  field: 'state',
    allowNull: false },
zip:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'zip',
    allowNull: false },
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
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'dogQtyAllowed' },
catQtyAllowed:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'catQtyAllowed' },
otherQtyAllowed:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
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
{ tableName: 'apartment_complex', timestamps: true });


var rented.apartmentComplexFloorPlan = Sequelize.define("rented.apartmentComplexFloorPlan",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'apartment_complex_floor_plan_pkey' },
  complexId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'complexId',
    allowNull: false,
  references: 'apartment_complex',
  referencesKey: 'complexId' },
bedrooms:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'bedrooms',
    allowNull: false },
bathrooms:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'bathrooms',
    allowNull: false },
parking:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'parking',
    allowNull: false },
livingArea:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
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
{ tableName: 'apartment_complex_floor_plan', timestamps: true });


var rented.apartmentComplexImage = Sequelize.define("rented.apartmentComplexImage",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'apartment_complex_image_pkey' },
  complexId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'complexId',
    allowNull: false,
  references: 'apartment_complex',
  referencesKey: 'complexId' },
location:
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ tableName: 'apartment_complex_image', timestamps: true });


var rented.apartmentComplexTransportation = Sequelize.define("rented.apartmentComplexTransportation",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'apartment_complex_transportation_pkey' },
  complexId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'complexId',
    allowNull: false,
  references: 'apartment_complex',
  referencesKey: 'complexId' },
shuttleRoute:
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
  timestamps: true });


var rented.friend = Sequelize.define("rented.friend",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'friend_pkey' },
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
{ tableName: 'friend', timestamps: true });


var rented.invitee = Sequelize.define("rented.invitee",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    allowNull: false,
    unique: 'invitee_pkey' },
  firstName:
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'firstName',
    allowNull: false },
lastName:
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'lastName',
    allowNull: false },
invitorId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'invitorId',
    allowNull: false,
  references: 'rented_user',
  referencesKey: 'invitorId' },
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
googlePlus:
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'googlePlus' },
linkedIn:
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'linkedIn' },
viewProperty:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'viewProperty' },
viewPropertyId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'viewPropertyId',
    references: 'property',
  referencesKey: 'viewPropertyId' },
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
{ tableName: 'invitee', timestamps: true });


var rented.lease = Sequelize.define("rented.lease",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'lease_pkey' },
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
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ type: { options: [Object], _binary: undefined, _length: 45 },
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
{ tableName: 'lease', timestamps: true });


var rented.lessee = Sequelize.define("rented.lessee",
  { leaseId:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'leaseId',
    primaryKey: true,
    allowNull: false,
    unique: 'lessee_pkey',
    references: 'lease',
    referencesKey: 'leaseId' },
  userId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'userId',
    primaryKey: true,
  allowNull: false,
  unique: 'lessee_pkey',
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
{ tableName: 'lessee', timestamps: true });


var rented.looking = Sequelize.define("rented.looking",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'looking_pkey' },
  maxMonthlyRent:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'maxMonthlyRent',
    allowNull: false },
utilitiesIncluded:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'utilitiesIncluded',
    allowNull: false },
area:
{ type: { options: [Object], _binary: undefined, _length: 30 },
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
lengthOfStay:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'lengthOfStay' },
longTermIntention:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'longTermIntention' },
openToFullYearLeaseNewRoomates:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'openToFullYearLeaseNewRoomates' },
roomType:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'roomType' },
sharedBathroom:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'sharedBathroom' },
gender:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'gender',
    allowNull: false },
numRoommates:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
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
coupleAllowed:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'coupleAllowed' },
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
{ tableName: 'looking', timestamps: true });


var rented.payment = Sequelize.define("rented.payment",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'payment_pkey' },
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
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'reason' },
rentPayment:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'rentPayment' },
creditCheckPayment:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'creditCheckPayment' },
paymentForm:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'paymentForm' },
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
{ tableName: 'payment', timestamps: true });


var rented.pet = Sequelize.define("rented.pet",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'pet_pkey' },
  userId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'userId',
    allowNull: false,
  references: 'rented_user',
  referencesKey: 'userId' },
type:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'type',
    allowNull: false },
breed:
{ type: { options: [Object], _binary: undefined, _length: 45 },
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
{ tableName: 'pet', timestamps: true });


var rented.property = Sequelize.define("rented.property",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'property_pkey' },
  streetNumeric:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'streetNumeric',
    allowNull: false },
streetAddress:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'streetAddress',
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
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'zip',
    allowNull: false },
apt:
{ type: { options: [Object], _binary: undefined, _length: 6 },
  field: 'apt' },
bldg:
{ type: { options: [Object], _binary: undefined, _length: 10 },
  field: 'bldg' },
type:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'type' },
description:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'description' },
bedrooms:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'bedrooms' },
latitude:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'latitude' },
longitude:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'longitude' },
bathrooms:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'bathrooms' },
parkingSpots:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'parkingSpots' },
livingAreaSqFt:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'livingAreaSqFt' },
hoaFee:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'hoaFee' },
otherFee:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'otherFee' },
status:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'status' },
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
{ tableName: 'property', timestamps: true });


var rented.propertyImages = Sequelize.define("rented.propertyImages",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'property_images_pkey' },
  listingId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'listingId' },
propertyId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'propertyId',
    allowNull: false,
  references: 'property',
  referencesKey: 'propertyId' },
location:
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ tableName: 'property_images', timestamps: true });


var rented.propertyLeaseDefaults = Sequelize.define("rented.propertyLeaseDefaults",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'property_lease_defaults_pkey' },
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
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'qtyDogsAllowed',
    allowNull: false },
qtyCatsAllowed:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'qtyCatsAllowed',
    allowNull: false },
qtyOtherAllowed:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
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
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'preferredLeaseLength',
    allowNull: false },
preferredLeaseUnit:
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ tableName: 'property_lease_defaults', timestamps: true });


var rented.propertyLikes = Sequelize.define("rented.propertyLikes",
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
  unique: 'property_likes_pkey' },
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
{ tableName: 'property_likes', timestamps: true });


var rented.propertyListing = Sequelize.define("rented.propertyListing",
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
  unique: 'property_listing_pkey' },
leaseEndDate:
{ type: { [Function] super_: [Function], key: 'DATE' },
  field: 'leaseEndDate' },
leaseLength:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'leaseLength',
    allowNull: false },
leaseLengthUnit:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'leaseLengthUnit',
    allowNull: false },
leaseType:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'leaseType',
    allowNull: false },
gender:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'gender',
    allowNull: false },
totalUtilityCost:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'totalUtilityCost',
    allowNull: false },
roomType:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'roomType',
    allowNull: false },
sharedBathroom:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'sharedBathroom' },
numRoomates:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
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
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'description' },
status:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'status' },
contactPhone:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'contactPhone' },
contactEmail:
{ type: { options: [Object], _binary: undefined, _length: 45 },
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
{ tableName: 'property_listing', timestamps: true });


var rented.propertyOwner = Sequelize.define("rented.propertyOwner",
  { propertyOwnershipId:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'propertyOwnershipId',
    primaryKey: true,
    allowNull: false,
    unique: 'property_owner_pkey' },
  ownerId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'ownerId',
    primaryKey: true,
  allowNull: false,
  unique: 'property_owner_pkey',
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
{ tableName: 'property_owner', timestamps: true });


var rented.propertyOwnership = Sequelize.define("rented.propertyOwnership",
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
  unique: 'property_ownership_pkey' },
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
{ tableName: 'property_ownership', timestamps: true });


var rented.rentalApplicant = Sequelize.define("rented.rentalApplicant",
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
  unique: 'rental_applicant_pkey' },
rentalAppId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'rentalAppId',
    allowNull: false },
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
{ tableName: 'rental_applicant', timestamps: true });


var rented.rentalApplication = Sequelize.define("rented.rentalApplication",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'rental_application_pkey' },
  propertyId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'propertyId',
    allowNull: false,
  references: 'property',
  referencesKey: 'propertyId' },
preferredLeaseLength:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
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
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'moveReason' },
preferredLeaseLengthUnit:
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ tableName: 'rental_application', timestamps: true });


var rented.rentedUser = Sequelize.define("rented.rentedUser",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'rented_user_pkey' },
  username:
{ type: { options: [Object], _binary: undefined, _length: 50 },
  field: 'username',
    allowNull: true },
email:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'email',
    allowNull: false,
  unique: { msg: 'The specified email address is already in use.' },
  validate: { isEmail: true } },
password:
{ type: { options: [Object], _binary: undefined, _length: 32 },
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
phone:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'phone' },
profileImage:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'profileImage' },
aboutMe:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'aboutMe' },
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
experianIdToken:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'experianIdToken' },
creditCheckToken:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'creditCheckToken' },
runIdentityCheck:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'runIdentityCheck',
    allowNull: false },
confirmedEmail:
{ type: { [Function] super_: [Function], key: 'BOOLEAN' },
  field: 'confirmedEmail',
    allowNull: false,
  defaultValue: false },
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
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'role',
    defaultValue: 'user' },
provider:
{ options: { length: 64, binary: undefined },
  _binary: undefined,
    _length: 64 },
salt:
{ options: { length: 128, binary: undefined },
  _binary: undefined,
    _length: 128 },
facebookOAuthId:
{ options: { length: 64, binary: undefined },
  _binary: undefined,
    _length: 64 },
googleOAuthId:
{ options: { length: 64, binary: undefined },
  _binary: undefined,
    _length: 64 },
twitterOAuthId:
{ options: { length: 64, binary: undefined },
  _binary: undefined,
    _length: 64 } },
{ tableName: 'rented_user',
  timestamps: true,
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
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'roommate_pkey' },
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
{ tableName: 'roommate', timestamps: true });


var rented.university = Sequelize.define("rented.university",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'university_pkey' },
  name:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'name',
    allowNull: false },
academicYearType:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'academicYearType' },
streetNumeric:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'streetNumeric',
    allowNull: false },
streetAddress:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'streetAddress',
    allowNull: false },
latitude:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'latitude' },
longitude:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'longitude' },
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
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'zip',
    allowNull: false },
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
{ tableName: 'university', timestamps: true });


var rented.universityCalenderQuater = Sequelize.define("rented.universityCalenderQuater",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'university_calender_quater_pkey' },
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
{ tableName: 'university_calender_quater', timestamps: true });


var rented.universityCalenderSemester = Sequelize.define("rented.universityCalenderSemester",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'university_calender_semester_pkey' },
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
{ tableName: 'university_calender_semester', timestamps: true });


var rented.userCosigner = Sequelize.define("rented.userCosigner",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'user_cosigner_pkey' },
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
{ tableName: 'user_cosigner', timestamps: true });


var rented.userEducation = Sequelize.define("rented.userEducation",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'user_education_pkey' },
  userId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'userId',
    allowNull: false,
  references: 'rented_user',
  referencesKey: 'userId' },
educationCenterName:
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'educationCenterName',
    allowNull: false },
type:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'type' },
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
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'major' },
degreeType:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'degreeType' },
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
{ tableName: 'user_education', timestamps: true });


var rented.userFinancial = Sequelize.define("rented.userFinancial",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'user_financial_pkey' },
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
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ tableName: 'user_financial', timestamps: true });


var rented.userOccupation = Sequelize.define("rented.userOccupation",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
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
{ tableName: 'user_occupation', timestamps: true });


var rented.userRecommendation = Sequelize.define("rented.userRecommendation",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'user_recommendation_pkey' },
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
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ tableName: 'user_recommendation', timestamps: true });


var rented.userReference = Sequelize.define("rented.userReference",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'user_reference_pkey' },
  userId:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
  field: 'userId',
    allowNull: false,
  references: 'rented_user',
  referencesKey: 'userId' },
email:
{ type: { options: [Object], _binary: undefined, _length: 255 },
  field: 'email',
    allowNull: false },
phone:
{ type: { [Function] super_: [Object], key: 'INTEGER' },
  field: 'phone',
    allowNull: false },
firstName:
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'firstName',
    allowNull: false },
lastName:
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'lastName',
    allowNull: false },
relation:
{ type: { options: [Object], _binary: undefined, _length: 255 },
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
{ tableName: 'user_reference', timestamps: true });


var rented.userVehicle = Sequelize.define("rented.userVehicle",
  { id:
  { type: { [Function] super_: [Object], key: 'BIGINT' },
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'user_vehicle_pkey' },
  year:
{ type: { [Function] super_: [Object], key: 'BIGINT' },
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
licensePlate:
{ type: { options: [Object], _binary: undefined, _length: 45 },
  field: 'licensePlate',
    allowNull: false },
color:
{ type: { options: [Object], _binary: undefined, _length: 45 },
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
{ tableName: 'user_vehicle', timestamps: true });


rented.addressHistory.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplex.hasMany(rented.apartmentComplexFloorPlan, { as: 'aptComplexFloorPlanComplexIds',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplex.hasMany(rented.apartmentComplexImage, { as: 'aptComplexImageComplexIds',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplex.hasMany(rented.apartmentComplexTransportation, { as: 'aptComplexTransComplexIds',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplexFloorPlan.belongsTo(rented.apartmentComplex, { as: 'relatedComplexId',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplexImage.belongsTo(rented.apartmentComplex, { as: 'relatedComplexId',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.apartmentComplexTransportation.belongsTo(rented.apartmentComplex, { as: 'relatedComplexId',
  foreignKey: 'complexId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.friend.belongsTo(rented.rentedUser, { as: 'relatedFriendId',
  foreignKey: 'friendId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.friend.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.invitee.belongsTo(rented.rentedUser, { as: 'relatedInvitorId',
  foreignKey: 'invitorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.invitee.belongsTo(rented.property, { as: 'relatedViewPropertyId',
  foreignKey: 'viewPropertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lease.hasMany(rented.lessee, { as: 'ids',
  foreignKey: 'leaseId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lease.belongsTo(rented.property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lease.belongsToMany(rented.rentedUser, { as: 'relatedIdUserIds',
  foreignKey: 'leaseId',
  otherKey: 'userId',
  through: 'lessee',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lessee.belongsTo(rented.lease, { as: 'relatedLeaseId',
  foreignKey: 'leaseId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.lessee.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.payment.belongsTo(rented.rentedUser, { as: 'relatedPayeeId',
  foreignKey: 'payeeId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.payment.belongsTo(rented.rentedUser, { as: 'relatedPayerId',
  foreignKey: 'payerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.pet.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.invitee, { as: 'inviteeViewpropertyIds',
  foreignKey: 'viewPropertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.lease, { as: 'ids',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyImages, { as: 'imagesProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyLeaseDefaults, { as: 'leasedefaultsProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyLikes, { as: 'likesProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyListing, { as: 'listingProperties',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.propertyOwnership, { as: 'fKs',
  foreignKey: 'propertyFK',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.hasMany(rented.rentalApplication, { as: 'propFKs',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.belongsToMany(rented.rentedUser, { as: 'relatedInviteeViewpropertyIdInvitorIds',
  foreignKey: 'viewPropertyId',
  otherKey: 'invitorId',
  through: 'invitee',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.belongsToMany(rented.rentedUser, { as: 'relatedLeasedefaultsPropertyOwnerIds',
  foreignKey: 'propertyId',
  otherKey: 'ownerId',
  through: 'property_lease_defaults',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.property.belongsToMany(rented.rentedUser, { as: 'relatedLikesPropertyUserIds',
  foreignKey: 'propertyId',
  otherKey: 'userId',
  through: 'property_likes',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyImages.belongsTo(rented.property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyLeaseDefaults.belongsTo(rented.rentedUser, { as: 'relatedOwnerId',
  foreignKey: 'ownerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyLeaseDefaults.belongsTo(rented.property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyLikes.belongsTo(rented.property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyLikes.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyListing.belongsTo(rented.property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyOwner.belongsTo(rented.rentedUser, { as: 'relatedOwnerId',
  foreignKey: 'ownerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.propertyOwnership.belongsTo(rented.property, { as: 'relatedPropertyFK',
  foreignKey: 'propertyFK',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentalApplicant.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentalApplication.belongsTo(rented.property, { as: 'relatedPropertyId',
  foreignKey: 'propertyId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.addressHistory, { as: 'addresshistoryUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.friend, { as: 'friendFriendIds',
  foreignKey: 'friendId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.friend, { as: 'friendUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.invitee, { as: 'inviteeInvitorIds',
  foreignKey: 'invitorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.lessee, { as: 'lesseeUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.payment, { as: 'paymentPayees',
  foreignKey: 'payeeId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.payment, { as: 'paymentPayers',
  foreignKey: 'payerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.pet, { as: 'petsUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.propertyLeaseDefaults, { as: 'propertyleasedefaultsOwners',
  foreignKey: 'ownerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.propertyLikes, { as: 'propertylikesUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.propertyOwner, { as: 'propertyownerUsers',
  foreignKey: 'ownerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.rentalApplicant, { as: 'rentalapplicantUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.roommate, { as: 'roommateRommieIds',
  foreignKey: 'roommateId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.roommate, { as: 'roommateUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userCosigner, { as: 'usercosignerCosginers',
  foreignKey: 'cosginerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userCosigner, { as: 'usercosignerCosingees',
  foreignKey: 'cosingeeId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userEducation, { as: 'usereducationUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userFinancial, { as: 'userfinancialsUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userOccupation, { as: 'useroccupationUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userRecommendation, { as: 'userrecommendationsRecommendeds',
  foreignKey: 'recommendedId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userRecommendation, { as: 'userrecommendationsRecommendors',
  foreignKey: 'recommendorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userReference, { as: 'userreferencesUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.hasMany(rented.userVehicle, { as: 'uservehiclesUsers',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedFriendFriendIdUserIds',
  foreignKey: 'friendId',
  otherKey: 'userId',
  through: 'friend',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedFriendUserFriendIds',
  foreignKey: 'userId',
  otherKey: 'friendId',
  through: 'friend',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.property, { as: 'relatedInviteeInvitorIdViewPropertyIds',
  foreignKey: 'invitorId',
  otherKey: 'viewPropertyId',
  through: 'invitee',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.lease, { as: 'relatedLesseeUserLeaseIds',
  foreignKey: 'userId',
  otherKey: 'leaseId',
  through: 'lessee',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedPaymentPayeePayerIds',
  foreignKey: 'payeeId',
  otherKey: 'payerId',
  through: 'payment',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedPaymentPayerPayeeIds',
  foreignKey: 'payerId',
  otherKey: 'payeeId',
  through: 'payment',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.property, { as: 'relatedPropertyleasedefaultsOwnerPropertyIds',
  foreignKey: 'ownerId',
  otherKey: 'propertyId',
  through: 'property_lease_defaults',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.property, { as: 'relatedPropertylikesUserPropertyIds',
  foreignKey: 'userId',
  otherKey: 'propertyId',
  through: 'property_likes',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedRoommateRommieIdUserIds',
  foreignKey: 'roommateId',
  otherKey: 'userId',
  through: 'roommate',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedRoommateUserRoommateIds',
  foreignKey: 'userId',
  otherKey: 'roommateId',
  through: 'roommate',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedUsercosignerCosginerCosingeeIds',
  foreignKey: 'cosginerId',
  otherKey: 'cosingeeId',
  through: 'user_cosigner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedUsercosignerCosingeeCosginerIds',
  foreignKey: 'cosingeeId',
  otherKey: 'cosginerId',
  through: 'user_cosigner',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedUserrecommendationsRecommendedRecommendorIds',
  foreignKey: 'recommendedId',
  otherKey: 'recommendorId',
  through: 'user_recommendation',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.rentedUser.belongsToMany(rented.rentedUser, { as: 'relatedUserrecommendationsRecommendorRecommendedIds',
  foreignKey: 'recommendorId',
  otherKey: 'recommendedId',
  through: 'user_recommendation',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.roommate.belongsTo(rented.rentedUser, { as: 'relatedRoommateId',
  foreignKey: 'roommateId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.roommate.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.university.hasMany(rented.universityCalenderQuater, { as: 'univcalquarterUniversities',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.university.hasMany(rented.universityCalenderSemester, { as: 'univcalsemesterUniversities',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.universityCalenderQuater.belongsTo(rented.university, { as: 'relatedUniversityId',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.universityCalenderSemester.belongsTo(rented.university, { as: 'relatedUniversityId',
  foreignKey: 'universityId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userCosigner.belongsTo(rented.rentedUser, { as: 'relatedCosginerId',
  foreignKey: 'cosginerId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userCosigner.belongsTo(rented.rentedUser, { as: 'relatedCosingeeId',
  foreignKey: 'cosingeeId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userEducation.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userFinancial.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userOccupation.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userRecommendation.belongsTo(rented.rentedUser, { as: 'relatedRecommendedId',
  foreignKey: 'recommendedId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userRecommendation.belongsTo(rented.rentedUser, { as: 'relatedRecommendorId',
  foreignKey: 'recommendorId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userReference.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

rented.userVehicle.belongsTo(rented.rentedUser, { as: 'relatedUserId',
  foreignKey: 'userId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });
