import { GET_PHOTOS, REQUEST, SUCCESS, FAIL } from '../constants/Page'

let photosArr = []
let cached = false

function makeYearPhotos(photos, selectedYear) {
    let createdYear, yearPhotos = []

    photos.forEach((item) => {
        createdYear = new Date(item.date*1000).getFullYear()
        if(createdYear === selectedYear) {
            yearPhotos.push(item)
        }
    })

    yearPhotos.sort((a, b) => b.likes.count - a.likes.count)

    return yearPhotos
}

function getMorePhotos(offset, count, year, dispatch) {
    VK.Api.call('photos.getAll', {extended: 1, count: count, offset: offset, v: "5.73"}, (res) => { // eslint-disable-line
        // no-undef
        console.log('---', res)
        try {
            if (offset <= res.response[0] - count) {
                offset += 200
                photosArr = photosArr.concat(res.response)
                getMorePhotos(offset, count, year, dispatch)
            } else {
                let photos = makeYearPhotos(photosArr, year)
                cached = true
                dispatch({
                    type: GET_PHOTOS + SUCCESS,
                    payload: photos
                })
            }
        }
        catch (err) {
            dispatch({
                type: GET_PHOTOS + FAIL,
                error: true,
                payload: new Error(err)
            })
        }
    })
}

export function getPhotos(year) {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS + REQUEST,
            payload: year
        })
        /*setTimeout(() => {
            dispatch({
                type: GET_PHOTOS + SUCCESS,
                payload: [1,2,3,4,5]
            })
        }, 1000)*/
        if(cached) {
            let photos = makeYearPhotos(photosArr, year)
            dispatch({
                type: GET_PHOTOS + SUCCESS,
                payload: photos
            })
        } else {
            getMorePhotos(0, 200, year, dispatch)
        }
    }
}