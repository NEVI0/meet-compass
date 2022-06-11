import styled from 'styled-components';
import { darken } from 'polished';

export const HomeContainer = styled.div`
	display: flex;
	align-items: stretch;
	height: 100vh;

	.column {
		display: flex;
		flex-direction: column;
	}

	.column__left {
		width: 50%;

		.logo {
			font-size: 80rem;
			position: fixed;
			bottom: -550px;
			left: -450px;
			color: ${props => props.theme.colors.primary};
		}
	}

	.column__right {
		width: 50%;
		background-color: ${props => props.theme.colors.container};
	}

	.home {
		padding: 4rem 10rem;
		justify-content: center;
		row-gap: 4rem;

		&__header {
			display: flex;
			flex-direction: column;
			row-gap: 1.5rem;
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
			row-gap: 1.5rem;
			position: relative;

			.inputs-row {
				display: flex;
				align-items: center;
				column-gap: 1.5rem;
			}

			.input {
				flex: 1;
				display: flex;
				align-items: center;
				column-gap: 1.25rem;
				background-color: ${props => props.theme.colors.body};
				padding: 1rem 1.25rem;
				border-radius: 1rem;

				&__icon {
					color: ${props => props.theme.colors.primary};
					font-size: ${props => props.theme.font.iconSize};
				}

				&__field {
					flex: 1;
					background-color: transparent;
					border: none;
					outline: none;
					color: ${props => props.theme.colors.text};
				}
			}

			.select {
				position: relative;

				&__items {
					opacity: 0;
					z-index: -5;
					margin-top: .5rem;
					position: absolute;
					display: flex;
					flex-direction: column;
					row-gap: 1rem;
					width: 100%;
					padding: 1rem 1.25rem;
					background-color: ${props => props.theme.colors.body};
					box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
					border-radius: 1rem;
					transition: .3s;

					&-item {
						font-size: ${props => props.theme.font.smallSize};
						color: ${props => props.theme.colors.textLight};
						transition: .3s;
						cursor: pointer;

						&:hover {
							color: ${props => props.theme.colors.primary};
						}
					}
				}

				&:hover .select__items {
					opacity: 1;
					z-index: 5;
				}
			}

			.start__meet {
				display: flex;
				align-items: center;
				justify-content: center;
				column-gap: 1.25rem;
				padding: 1rem 2rem;
				border-radius: 1rem;
				background-color: ${props => props.theme.colors.primary};
				color: ${props => props.theme.colors.text};
				font-weight: ${props => props.theme.font.medium};
				transition: .3s;
				
				&:hover, &:focus {
					background-color: ${props => props.theme.colors.secondary};
					color: #FFF;
				}

				&:active {
					transform: scale(0.98);
				}

				&:disabled {
					color: ${props => props.theme.colors.textLight};
					background-color: ${props => props.theme.colors.body};
					cursor: no-drop;
				}
			}
		}

		&__divider {
			display: flex;
			align-items: center;
			justify-content: center;
			column-gap: 1.5rem;
			font-size: ${props => props.theme.font.smallerSize};
			color: ${props => props.theme.colors.textLight};

			&-line {
				height: 1px;
				width: 125px;
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
`;
