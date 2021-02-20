import { Typography, TextField, Grid, Button } from '@material-ui/core';
import { useState } from 'react';
import qs from 'qs';

function App() {
	const [text, setText] = useState('');

	const [answer, setAnswer] = useState('');

	// Colors
	const [color1, setColor1] = useState('green');
	const [color2, setColor2] = useState('red');
	const [color3, setColor3] = useState('red');

	const convertText = async () => {
		console.log(text);

		setColor1('red');
		setColor2('green');
		setColor3('red');

		const body = {
			q: text,
			source: 'en',
			target: 'es',
		};

		const qsBody = qs.stringify(body);

		fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'accept-encoding': 'application/gzip',
				'x-rapidapi-key': '39e9959b38mshd13f61b6ac5e8c6p135f15jsnd011ade90e97',
				'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
				Host: 'google-translate1.p.rapidapi.com',
				'Content-Length': qsBody.length,
			},
			body: qsBody,
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response.data.translations[0].translatedText);
				setAnswer(response.data.translations[0].translatedText);
				setColor1('red');
				setColor2('red');
				setColor3('green');
			});
	};

	return (
		<div>
			<Typography
				variant="h2"
				style={{ textAlign: 'center', marginTop: '60px' }}
			>
				Translator App
			</Typography>
			<Grid
				container
				spacing={3}
				direction="row"
				justify="center"
				alignItems="center"
				style={{ marginTop: '30px' }}
			>
				<Grid item xs={3}>
					<TextField
						id="standard-basic"
						label="Enter text in English"
						style={{ width: '100%' }}
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</Grid>
				<Grid item xs={1}>
					<Button
						variant="contained"
						color="primary"
						style={{ marginLeft: '10px' }}
						onClick={convertText}
					>
						Translate
					</Button>
				</Grid>
			</Grid>
			<Typography
				variant="h6"
				style={{ textAlign: 'center', marginTop: '50px', fontWeight: '600' }}
			>
				Result
			</Typography>
			<Typography
				variant="h4"
				style={{ textAlign: 'center', marginTop: '10px', height: '25px' }}
			>
				{answer}
			</Typography>
			<Typography
				variant="h6"
				style={{ textAlign: 'center', marginTop: '50px', fontWeight: '600' }}
			>
				Status
			</Typography>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				style={{ marginTop: '10px' }}
			>
				<Grid item>
					<Typography variant="h6"> Pending : </Typography>
				</Grid>
				<Grid item>
					<div
						style={{
							backgroundColor: color1,
							borderRadius: '50%',
							width: '20px',
							height: '20px',
							marginLeft: '20px',
						}}
					></div>
				</Grid>
				<Grid item>
					<Typography variant="h6" style={{ marginLeft: '30px' }}>
						{' '}
						Requested :{' '}
					</Typography>
				</Grid>
				<Grid item>
					<div
						style={{
							backgroundColor: color2,
							borderRadius: '50%',
							width: '20px',
							height: '20px',
							marginLeft: '20px',
						}}
					></div>
				</Grid>
				<Grid item>
					<Typography variant="h6" style={{ marginLeft: '30px' }}>
						{' '}
						Translated :{' '}
					</Typography>
				</Grid>
				<Grid item>
					<div
						style={{
							backgroundColor: color3,
							borderRadius: '50%',
							width: '20px',
							height: '20px',
							marginLeft: '20px',
						}}
					></div>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
