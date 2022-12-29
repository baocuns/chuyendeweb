import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

const Err = () => {
	return (
		<div
			style={{
				width: 'auto',
				height: '500px',
				backgroundImage: `url("https://wallpapershome.com/images/wallpapers/thailand-3840x2160-5k-4k-wallpaper-8k-beach-shore-boat-rocks-travel-6487.jpg")`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		>
			<div
				style={{
					paddingTop: '50px',
				}}
			>
				<div
					style={{
						textAlign: 'center',
						fontSize: '100px',
						fontFamily: '-moz-initial',
						color: 'black',
						fontWeight: 'bold',
					}}
				>
					404
				</div>
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						fontSize: '100px',
						fontFamily: '-moz-initial',
						color: 'black',
						fontWeight: 'bold',
					}}
				>
					NOT POUND
				</div>
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						fontSize: '50px',
						fontFamily: '-moz-initial',
						color: 'black',
						fontWeight: 'bold',
					}}
				>
					one go no return
				</div>

				<div style={{ textAlign: 'center' }}>
					<button
						style={{
							padding: '10px',
							backgroundColor: 'green',
							fontSize: '20px',
							borderRadius: '20px',
							fontWeight: 'bold',
						}}
					>
						Back to home
					</button>
				</div>
			</div>
		</div>
	)
}

export default Err
