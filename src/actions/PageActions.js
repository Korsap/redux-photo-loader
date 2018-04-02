import { GET_PHOTOS, REQUEST, SUCCESS, FAIL } from '../constants/Page'

let allPhotos = [];
let cached = false;

export function getPhotos(year) {
    return (dispatch) => {
    	dispatch({
			type: GET_PHOTOS + REQUEST,
			payload: year
    	})
		if(cached) {
    		let photos = makePhotoByYear(allPhotos, year)
			dispatch({
				type: GET_PHOTOS + SUCCESS,
				payload: photos
			})
		} else getAllPhotos(0, 200, dispatch, year)
    }
}

function makePhotoByYear(photos, selectedYear) {
	let photosByYear, photoDate;

	photosByYear = photos.filter((photo) => {
		photoDate = new Date(photo.date*1000);
		return photoDate.getFullYear() === selectedYear
	})

	photosByYear.sort((photoA, photoB) => {
		photoB.likes.count - photoA.likes.count
	})

	console.log('+++', photosByYear, ', year:', selectedYear)
 return photosByYear
}

function getAllPhotos(offset, count, dispatch, year) {
	VK.Api.call('photos.getAll', {extended: 1, offset: offset, count: count, v: "5.73"}, (res) => { // eslint-disable-line
		// no-undef
		console.log('---', res)
		try {
			if (offset <= res.response.count) {
				offset += count;
				allPhotos = allPhotos.concat(res.response.items);
				getAllPhotos(offset, count, dispatch, year)
			} else {
				cached = true;
				let photos = makePhotoByYear(allPhotos, year);
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

/*setTimeout(() => {
            dispatch({
                type: GET_PHOTOS + SUCCESS,
                payload: [1,2,3,4,5]
            })
        }, 1000)*/
