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
		const years = [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006]
		return (
			<div className='ib page'>
				<p>
					{years.map((item, index) => <button className='btn' key={index} onClick={this.onYearBtnClick}>{item}</button>) }
				</p>
				<h3>{page.year} год</h3>
				{ page.error ? <p className='error'>Во время загрузки произошла ошибка</p> : ''}
				{
					page.fetching ? <Loader/> :
						<div>
							{this.getNumberPhoto()}
							{page.photos.map((entry) =>
								<div key={entry.id} className='photo'>
									<p><img src={entry.photo_130} alt=""/></p>
									<p>{entry.likes.count} ♥</p>
								</div>
							)}
						</div>
				}
			</div>
		)
	}

	getNumberPhoto() {
		const { page } = this.props
		return (
			page.photos.length ? <p>У тебя {page.photos.length} фотографий</p> : <p>Упс... У тебя нет ни одной фотки :(</p>
		)
	}

	onYearBtnClick = (e) => {
		this.props.getPhotos(+e.target.innerText)
	}
}