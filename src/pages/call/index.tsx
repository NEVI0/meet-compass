import type { NextPage } from 'next';
import Head from 'next/head';

import { BiMicrophone, BiCamera } from 'react-icons/bi';
import { v4 as uuid } from 'uuid';

import * as S from './styles';

const Call: NextPage = () => {
	
	return (
		<S.CallContainer>
			<Head>
				<title>Call - Video Compass</title>
			</Head>

			<div className="call">
				<main className="call__content">
						adsbashjbdas
				</main>

				<footer className="call__footer">
					<h2 className="call__name">
						Team call
					</h2>

					<section className="actions">
						<button className="action">
							<BiMicrophone className="action-icon" />
						</button>

						<button className="action">
							<BiCamera className="action-icon" />
						</button>

						<button className="action">
							<BiCamera className="action-icon" />
						</button>
					</section>

					<h2>
						dsadas
					</h2>
				</footer>
			</div>
		</S.CallContainer>
	);

}

export default Call;
