import styled from 'styled-components';
import { transparentize, darken } from 'polished';

export const MeetContainer = styled.div<{ isUsingVideo: boolean; }>`
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
					color: #FFF;
					
					&-grab {
						cursor: grab;
					}
				}
			}

			${props => !props.isUsingVideo && 'transition: .3s ease all; opacity: 0'};
		}
		
		&__content {
			flex: 1;
			padding: 1rem;

			display: grid;
			grid-template-columns: auto auto;
			align-items: center;
			justify-content: center;
			gap: 1rem;

			.guest {
				height: 400px;
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				border-radius: 1rem;
				border: 3px solid ${props => props.theme.colors.container};

				&__video {
					width: 100%;
					height: 100%;
				}
			}

			.empty {
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

		&__footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 3.25rem;
			height: ${props => props.theme.defaults.footerHeight};
			background-color: ${props => props.theme.colors.container};
			position: relative;
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
				
				&:hover:not(&-hangup) {
					border-color: ${props => props.theme.colors.secondary};
					background-color: ${props => props.theme.colors.secondary};
				}

				&:active {
					transform: scale(0.9);
				}

				&-hangup {
					border-color: ${props => props.theme.colors.red};
					background-color: ${props => props.theme.colors.red};

					&:hover {
						border-color: ${props => darken(.2, props.theme.colors.red)};
						background-color: ${props => darken(.2, props.theme.colors.red)};
					}
				}
			}
		}

		&__id {
			color: ${props => props.theme.colors.textLight};
			font-size: ${props => props.theme.font.smallSize};
		}
	} 
`;
