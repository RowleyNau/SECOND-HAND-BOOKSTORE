const Router = require('express')
const router = new Router()
const parametersConrtollers = require('../controllers/parametersConrtollers')

router.post('/genreAdd', parametersConrtollers.GenreAdd)
router.get('/genreGetAll', parametersConrtollers.GenreGetAll)
router.post('/genreDel', parametersConrtollers.GenreDel)
router.post('/genreUpdate', parametersConrtollers.GenreUpdate)
router.get('/genreGetAllSearch', parametersConrtollers.GenreGetAllSearch)

router.post('/CategoriesOtherGoodsAdd', parametersConrtollers.CategoriesOtherGoodsAdd)
router.get('/CategoriesOtherGoodsGetAll', parametersConrtollers.CategoriesOtherGoodsGetAll)
router.post('/CategoriesOtherGoodsDel', parametersConrtollers.CategoriesOtherGoodsDel)
router.post('/CategoriesOtherGoodsUpdate', parametersConrtollers.CategoriesOtherGoodsUpdate)
router.get('/CategoriesOtherGoodsGetAllSearch', parametersConrtollers.CategoriesOtherGoodsGetAllSearch)

router.post('/authorsAdd', parametersConrtollers.AuthorsAdd)
router.get('/authorsGetAll', parametersConrtollers.AuthorsGetAll)
router.post('/authorsDel', parametersConrtollers.AuthorsDel)
router.post('/authorsUpdate', parametersConrtollers.AuthorsUpdate)
router.get('/authorsGetAllSearch', parametersConrtollers.AuthorsGetAllSearch)

router.post('/categoriesAdd', parametersConrtollers.CategoriesAdd)
router.get('/categoriesGetAll', parametersConrtollers.CategoriesGetAll)
router.post('/categoriesDel', parametersConrtollers.CategoriesDel)
router.post('/categoriesUpdate', parametersConrtollers.CategoriesUpdate)
router.get('/categoriesGetAllSearch', parametersConrtollers.CategoriesGetAllSearch)

router.post('/publishersAdd', parametersConrtollers.PublishersAdd)
router.get('/publishersGetAll', parametersConrtollers.PublishersGetAll)
router.post('/publishersDel', parametersConrtollers.PublishersDel)
router.post('/publishersUpdate', parametersConrtollers.PublishersUpdate)
router.get('/publishersGetAllSearch', parametersConrtollers.PublishersGetAllSearch)

router.post('/bindingtypeAdd', parametersConrtollers.BindingtypeAdd)
router.get('/bindingtypeGetAll', parametersConrtollers.BindingtypeGetAll)
router.post('/bindingtypeDel', parametersConrtollers.BindingtypeDel)
router.post('/bindingtypeUpdate', parametersConrtollers.BindingtypeUpdate)
router.get('/bindingtypeGetAllSearch', parametersConrtollers.BindingtypeGetAllSearch)

router.post('/agerestrictionAdd', parametersConrtollers.AgerestrictionAdd)
router.get('/agerestrictionGetAll', parametersConrtollers.AgerestrictionGetAll)
router.post('/agerestrictionDel', parametersConrtollers.AgerestrictionDel)

router.post('/locationsAdd', parametersConrtollers.LocationsAdd)
router.get('/locationsGetAll', parametersConrtollers.LocationsGetAll)
router.post('/locationsDel', parametersConrtollers.LocationsDel)
router.post('/locationsUpdate', parametersConrtollers.LocationsUpdate)
router.get('/locationsGetAllSearch', parametersConrtollers.LocationsGetAllSearch)

router.post('/goodstatesAdd', parametersConrtollers.GoodstatesAdd)
router.get('/goodstatesGetAll', parametersConrtollers.GoodstatesGetAll)
router.post('/goodstatesDel', parametersConrtollers.GoodstatesDel)

router.post('/citiesAdd', parametersConrtollers.CitiesAdd)
router.get('/citiesGetAll', parametersConrtollers.CitiesGetAll)
router.post('/citiesDel', parametersConrtollers.CitiesDel)
router.post('/citiesUpdate', parametersConrtollers.CitiesUpdate)
router.get('/citiesGetAllSearch', parametersConrtollers.CitiesGetAllSearch)

router.post('/availabilityAdd', parametersConrtollers.AvailabilityAdd)
router.get('/availabilityGetAll', parametersConrtollers.AvailabilityGetAll)

router.post('/PhotoAdd', parametersConrtollers.PhotoAdd)
router.get('/PhotoGet', parametersConrtollers.PhotoGet)

// router.post('/PhotoAdd', parametersConrtollers.PhotoAdd)
router.get('/SearchOwnersGet', parametersConrtollers.SearchOwnersGet)

router.get('/SearchConnectionForOtherGoodsGet', parametersConrtollers.SearchConnectionForOtherGoodsGet)
// router.post('/PhotoAdd', parametersConrtollers.PhotoAdd)
router.get('/SearchConnectionGet', parametersConrtollers.SearchConnectionGet)
module.exports= router 