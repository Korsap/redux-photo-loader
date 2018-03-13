import React, { Component } from 'react'
import Loader from './Loader'
import PropTypes from 'prop-types'

export default class Page extends Component {
	static propTypes = {
		page: PropTypes.shape({
			year: PropTypes.number.isRequired,
			photos: PropTypes.array.isRequired
		}),
		getPhotos: PropTypes.func.isRequired
	}

	render() {
		const { page } = this.props
		const years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]

				//<p>У тебя {page.photos.length} фотографий</p>


		return (
			<div className='ib page'>
				<p>
					{years.map((item, index) => <button className='btn' key={index} onClick={this.onYearBtnClick}>{item}</button>) }
				</p>
				<h3>{page.year} год</h3>
				{ page.error ? <p className='error'>Во время загрузки произошла ошибка</p> : ''}
				{
					page.fetching ? <Loader/> :
						page.photos.map((entry, index) =>
						<div key={index} className='photo'>
							<p><img src={entry.src} alt=""/></p>
							<p>{entry.likes.count} ♥</p>
						</div>
						)
				}
			</div>
		)
	}

	onYearBtnClick = (e) => {
		this.props.getPhotos(+e.target.innerText)
	}
}