import type { NextPage } from 'next';
import Head from 'next/head';

import { BiVideo, BiMicrophone, BiDesktop, BiChat, BiPhoneOff, BiDotsHorizontalRounded } from 'react-icons/bi';

import * as S from './styles';

const Meet: NextPage = () => {

	return (
		<S.MeetContainer>
			<Head>
				<title>Meet - Video Compass</title>
			</Head>

			<div className="meet">
				<main className="meet__content">
					{/* <div className="guest">
						<img
							src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"
							alt="Guest video"
							className="guest__video"
						/>
					</div>					 */}
				</main>

				<aside className="webcam" id="webcam-container">
					<img
						src="https://images.pexels.com/photos/6177598/pexels-photo-6177598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
						alt="Your real time video"
						className="webcam__video"
					/>

					<button className="webcam__move" id="webcam-button">
						<BiDotsHorizontalRounded className="webcam__move-icon" />
					</button>
				</aside>

				<footer className="meet__footer">
					<h2 className="meet__name">
						Team call
					</h2>

					<section className="actions">
						<button className="action">
							<BiMicrophone className="action-icon" />
						</button>

						<button className="action">
							<BiVideo className="action-icon" />
						</button>

						<button className="action">
							<BiDesktop className="action-icon" />
						</button>

						<button className="action">
							<BiChat className="action-icon" />
						</button>

						<button className="action action-hangup">
							<BiPhoneOff className="action-icon" />
						</button>
					</section>

					<h2>
						dsadas
					</h2>
				</footer>
			</div>
		</S.MeetContainer>
	);

}

export default Meet;
