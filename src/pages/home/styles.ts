import styled from 'styled-components';

export const HomeContainer = styled.div`
	display: flex;
	flex-direction: column-reverse;
	transition: .3s;

	.left {
		display: none;

		.logo {
			transition: .3s;
			font-size: 60rem;
			color: ${props => props.theme.colors.primary};
			position: fixed;
		}
	}

	.home {
		height: 100vh;
		row-gap: 2.5rem;
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: ${props => props.theme.colors.container};
		transition: .3s;

		&__header {
			display: flex;
			flex-direction: column;
			row-gap: 1rem;
		}

		&__logo {
			width: 50px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .75rem;
			background-color: ${props => props.theme.colors.body};

			&-icon {
				font-size: 1.5rem;
				color: ${props => props.theme.colors.primary};
			}
		}

		&__title {
			font-size: ${props => props.theme.font.biggestSize};
			margin-bottom: .25rem;
		}

		&__description {
			color: ${props => props.theme.colors.textLight};
		}

		&__content {
			display: flex;
			flex-direction: column;
			row-gap: 1rem;
		}

		&__divider {
			display: flex;
			align-items: center;
			justify-content: center;
			column-gap: 1rem;
			font-size: ${props => props.theme.font.smallerSize};
			color: ${props => props.theme.colors.textLight};
			text-transform: uppercase;

			&-line {
				height: 1px;
				width: 50px;
				border-radius: 1rem;
				background-color: ${props => props.theme.colors.textLight};
			}
		}

		&__join {
			text-align: center;
			font-size: ${props => props.theme.font.smallSize};

			> a {
				cursor: pointer;
				color: ${props => props.theme.colors.primary};

				&:hover {
					color: ${props => props.theme.colors.secondary};
					text-decoration: underline;
				}
			}
		}
	}

	.language-switch {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;
	}

	@media screen and (min-width: 576px) {
		.home {
			padding: 0 6rem;
		}
	}

	@media screen and (min-width: 767px) {
		.home {
			padding: 0 10rem;
		}
	}

	@media screen and (min-width: 992px) {
		flex-direction: row;

		.left {
			width: 50%;
			display: block;

			.logo {
				left: -450px;
				bottom: -350px;
			}
		}

		.home {
			width: 50%;
			padding: 0 2.5rem;
		}
	}

	@media screen and (min-width: 1120px) {
		.home {
			padding: 0 4rem;
		}
	}

	@media screen and (min-width: 1490px) {
		.left .logo {
			font-size: 80rem;
			left: -550px;
			bottom: -450px;
		}

		.home {
			padding: 0 10rem;
		}
	}
`;
