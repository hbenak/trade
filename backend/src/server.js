const port = 3001
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const unirest = require('unirest');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/api/items', (req, res, next) => {
    const url = 'https://api.mercadolibre.com/sites/MLA/search?q='
    const query = req.query.q

    const request = unirest.get(url + query);
    request.type('json')

    request
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(function (response) {
        
        const listResults = response.body.results.map(function(item) {
            const newItem = {}

            newItem.id = item.id
            newItem.title = item.title
            newItem.price = {}
            newItem.price.currency = item.currency_id
            newItem.price.amount = item.price
            newItem.price.decimals = ""
            newItem.picture = item.thumbnail
            newItem.condition = item.condition
            newItem.free_shipping = item.shipping.free_shipping
            newItem.address_state = item.address.state_name

            return newItem;
        })

        const cat = response.body.filters.find(function(filter) {
            return (filter.id === "category")
        })

        let catList

        if (!!cat) {
            cat.values.map(function(values) {
                catList = values.path_from_root.map(function(v) {
                    return v.name
                })
            })
        }

        const output = {
            author: {
                name: "Henrique",
                lastname: "Benak"
            },
            categories: catList,
            items: listResults
        }

        res.json(output);
    });
})

const urlProd = 'https://api.mercadolibre.com/items/'

function getProduct(id, callback) {
    const request = unirest.get(urlProd + id);
    request.type('json')

    request
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(function (response) {
        callback(response.body);
    });
}

function getProductDetail(id, callback) {
    const request = unirest.get(urlProd + id + "/description");
    request.type('json')

    request
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(function (response) {
        callback(response.body);
    });
}

app.get('/api/items/:id', (req, res, next) => {
    getProduct(req.params.id, function (prodInfo) {
        getProductDetail(req.params.id, function (prodInfoDetail) {
            const prodObj = {}
            prodObj.id = prodInfo.id
            prodObj.title = prodInfo.title
            prodObj.price = {}
            prodObj.price.currency = prodInfo.currency_id
            prodObj.price.amount = prodInfo.price
            prodObj.price.decimals = ""
            prodObj.picture = prodInfo.pictures[0].url
            prodObj.condition = prodInfo.condition
            prodObj.free_shipping = prodInfo.shipping.free_shipping
            prodObj.sold_quantity = prodInfo.sold_quantity
            prodObj.description = prodInfoDetail.plain_text

            const output = {
                author: {
                    name: "Henrique",
                    lastname: "Benak"
                },
                item: prodObj
            }

            res.json(output);
        })
    });
})

app.listen(port, () => {
    console.log(`Servidor está executando na porta ${port}.`)
})