import styled from 'styled-components';

export const HomeContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background-image: url(assets/images/home-wallpaper.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

	.home {
		display: flex;
		align-items: stretch;
		column-gap: 3.25rem;
		width: 1250px;
		height: 725px;
		border-radius: 1rem;

		&__column {
			display: flex;
			flex-direction: column;
			justify-content: center;
			row-gap: 3.25rem;
			padding: 0 3.25rem;

			&-left {
				flex: .6;
			}

			&-right {
				flex: .4;
			}
		}

		&__wallpaper {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 70%;
			background-image:
				linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
				url(https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)
			;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			box-shadow: 1rem 1rem 0 0 ${props => props.theme.colors.container};
		}

		&__header {
			display: flex;
			flex-direction: column;
			row-gap: 1rem;
			cursor: default;
		}

		&__title {
			font-size: ${props => props.theme.font.biggestSize};
		}

		&__description {
			color: ${props => props.theme.colors.textLight};
		}

		&__content {
			display: flex;
			align-items: center;
			column-gap: 1rem;

			.start__meeting {
				display: flex;
				align-items: center;
				column-gap: .75rem;
				padding: 1rem 2rem;
				border-radius: 1rem;
				border: 1px solid ${props => props.theme.colors.primary};
				background-color: ${props => props.theme.colors.primary};
				color: ${props => props.theme.colors.text};
				font-weight: ${props => props.theme.font.medium};
				transition: .3s;

				&-icon {
					font-size: ${props => props.theme.font.iconSize};
				}

				&:hover, &:focus {
					border-color: ${props => props.theme.colors.secondary};
					background-color: ${props => props.theme.colors.secondary};
					color: #FFF;
				}
			}

			.paste__link {
				flex: 1;
				display: flex;
				align-items: center;
				overflow: hidden;

				&-input {
					flex: 1;
					outline: none;
					padding: 1rem 1.25rem;
					border: 1px solid ${props => props.theme.colors.container};
					background-color: ${props => props.theme.colors.container};
					color: ${props => props.theme.colors.text};
					border-radius: 1rem;
					transition: .3s;

					&:focus {
						border-color: ${props => props.theme.colors.primary};
					}
				}

				&-button {
					display: flex;
					align-items: center;
					column-gap: .5rem;
					padding: 1rem;
					border-radius: 1rem;
					color: ${props => props.theme.colors.text};
					font-weight: ${props => props.theme.font.medium};
					transition: .3s;
					background-color: transparent;
					
					&:hover, &:focus {
						color: ${props => props.theme.colors.primary};
					}
				}

				&-button:hover > .paste__link-icon,
				&-button:focus > .paste__link-icon {
					transform: translateX(.25rem);
				}

				&-icon {
					transition: .2s;
					font-size: ${props => props.theme.font.iconSize};
				}
			}
		}
		
		&__divider {
			height: 1px;
			border: none;
			background-color: ${props => props.theme.colors.textLight};
			border-radius: 1rem;
		}

		&__footer {
			display: flex;
			flex-direction: column;
			row-gap: .25rem;
			color: ${props => props.theme.colors.textLight};

			.footer__more a {
				cursor: pointer;
				font-size: ${props => props.theme.font.smallSize};
				color: ${props => props.theme.colors.primary};
			}

			.footer__more a:hover,
			.footer__more a:focus {
				text-decoration: underline;
			}

			.footer__copyright {
				font-size: ${props => props.theme.font.smallerSize};
			}
		}
	}
`;
