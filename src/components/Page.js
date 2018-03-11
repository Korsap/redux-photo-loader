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
		return (
			<div className='ib page'>
				<p>
                    <button className='btn' onClick={this.onYearBtnClick}>2017</button>{' '}
					<button className='btn' onClick={this.onYearBtnClick}>2016</button>{' '}
                    <button className='btn' onClick={this.onYearBtnClick}>2015</button>{' '}
                    <button className='btn' onClick={this.onYearBtnClick}>2014</button>
				</p>
				<h3>{page.year} год</h3>
				{
					page.fetching ? <Loader/> : <p>У тебя {page.photos.length} фотографий</p>
				}

			</div>
		)
	}

	onYearBtnClick = (e) => {
		this.props.getPhotos(+e.target.innerText)
	}
}