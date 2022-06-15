import styled, { css } from 'styled-components';
import { transparentize, darken } from 'polished';

type TMeetContainer = {
	isSharingScreen: boolean;
	isUsingVideo: boolean;
};

export const MeetContainer = styled.div<TMeetContainer>`
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;

	.meet {
		flex: 1;
		display: flex;
		flex-direction: column;

		.user {
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			right: 1rem;
			bottom: calc(${props => props.theme.defaults.footerHeight} + 1rem);
			width: 340px;
			height: 200px;
			overflow: hidden;
			border-radius: 1rem;
			border: 3px solid ${props => props.theme.colors.primary};
			background-color: ${props => props.theme.colors.body};
			z-index: 5;
			
			&__video {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			&__options {
				display: flex;
				flex-direction: column;
				row-gap: 1rem;
				position: absolute;
				top: 1rem;
				right: 1rem;
				
				.option {
					width: 30px;
					height: 30px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: .5rem;
					background-color: ${props => transparentize(.5, props.theme.colors.body)};
					color: ${props => props.theme.colors.container};
					font-size: ${props => props.theme.font.iconSize};
					color: ${props => props.theme.colors.text};
					
					&-grab {
						cursor: grab;
					}
				}
			}

			${props => !props.isUsingVideo && 'transition: .3s ease all; opacity: 0'};
		}
		
		&__content {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 1rem;

			.empty {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				flex-direction: column;
				row-gap: 2rem;
				text-align: center;

				&__title {
					margin-bottom: .25rem;
					font-size: ${props => props.theme.font.h1Size};
				}

				&__message {
					color: ${props => props.theme.colors.textLight};
				}
			}
		}

		.guest {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 1090px;
			max-height: 100%;
			overflow: hidden;
			border-radius: 1rem;
			border: 3px solid ${props => props.theme.colors.container};

			&__video {
				width: 100%;
			} 

			&__data {
				display: flex;
				align-items: center;
				column-gap: .5rem;
				position: absolute;
				bottom: 1rem;
				left: 1rem;
				background-color: ${props => transparentize(.5, props.theme.colors.body)};
				padding: .5rem;
				border-radius: .5rem;
			}

			&__id {
				font-size: ${props => props.theme.font.smallSize};
			}
		}

		&__footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 3.25rem;
			height: ${props => props.theme.defaults.footerHeight};
			background-color: ${props => props.theme.colors.container};
		}

		&__data {
			display: flex;
			align-items: center;
			column-gap: 1rem;

			&-divider {
				height: 15px;
				width: 1px;
				background-color: ${props => props.theme.colors.textLight};
				border-radius: 1rem;
			}
		}

		&__time {
			font-size: ${props => props.theme.font.h3Size};
		}

		&__name {
			font-weight: ${props => props.theme.font.semiBold};
			font-size: ${props => props.theme.font.h3Size};
		}

		&__actions {
			display: flex;
			align-items: center;
			column-gap: 1rem;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);

			.action {
				position: relative;

				&__button {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 40px;
					height: 40px;
					border-radius: 100%;
					border: 1px solid ${props => props.theme.colors.primary};
					background-color: ${props => props.theme.colors.primary};
					font-size: ${props => props.theme.font.iconSize};
					color: ${props => props.theme.colors.text};
					transition: .3s;
					
					&:active {
						transform: scale(0.9);
					}

					&-hangup {
						border-color: ${props => props.theme.colors.red};
						background-color: ${props => props.theme.colors.red};

						&:hover {
							border-color: ${props => darken(.2, props.theme.colors.red)} !important;
							background-color: ${props => darken(.2, props.theme.colors.red)} !important;
						}
					}

					${props => props.isSharingScreen && css`
						&-sharing {
							border-color: ${props => props.theme.colors.green};
							background-color: ${props => props.theme.colors.green};

							&:hover {
								border-color: ${props => darken(.2, props.theme.colors.green)} !important;
								background-color: ${props => darken(.2, props.theme.colors.green)} !important;
							}
						}
					`};
				}

				&__tooltip {
					position: absolute;
					top: -45px;
					left: 50%;
					transform: translateX(-50%);
					transition: .3s;
					opacity: 0;
					cursor: default;
					padding: .5rem;
					border-radius: .5rem;
					text-align: center;
					white-space: nowrap;
					font-size: ${props => props.theme.font.smallerSize};
					color: ${props => props.theme.colors.textLight};
					background-color: ${props => props.theme.colors.container};
					box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
				}

				&__button:hover + .action__tooltip {
					transition: .3s;
					opacity: 1;
				}
			}
		}

		&__options {
			display: flex;
			align-items: center;
			column-gap: 1rem;
		}

		&__option {
			width: 30px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .5rem;
			background-color: ${props => props.theme.colors.body};
			color: ${props => props.theme.colors.container};
			font-size: ${props => props.theme.font.iconSize};
			color: ${props => props.theme.colors.text};
		}

		&__id {
			color: ${props => props.theme.colors.textLight};
			font-size: ${props => props.theme.font.smallSize};
		}
	} 
`;
