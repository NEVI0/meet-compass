import styled from 'styled-components';
import { transparentize, darken } from 'polished';

type TMeetContainer = {
	isUsingVideo: boolean;
	isSharingScreen: boolean;
	isOtherUserVideoStopped: boolean;
};

export const MeetContainer = styled.div<TMeetContainer>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		padding: 0 2rem;
		background-color: ${props => props.theme.colors.container};
		transition: .3s;

		&__title {
 			font-size: ${props => props.theme.font.h2Size};
		}
	}

	.user {
		position: fixed;
		right: 1rem;
		bottom: calc(80px + 1rem);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 150px;
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

		${props => !props.isUsingVideo && 'transition: .3s ease all; opacity: 0'};
	}

	.meet {
		flex: 1;
		margin-top: 60px;
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: .3s;
	}

	.otheruser {
		align-self: flex-start;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 1rem;
		border: 3px solid ${props => props.theme.colors.container};
		background-color: transparent;
		position: relative;

		&__video {
			width: auto;
			height: calc(100vh - 60px - 80px - 4rem);
			opacity: 1;

			${props => props.isOtherUserVideoStopped && 'opacity: 0;'};
		}

		&__data {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			bottom: 1rem;
			left: 1rem;
			padding: .5rem;
			column-gap: .5rem;
			border-radius: .5rem;
			background-color: ${props => transparentize(.5, props.theme.colors.body)};
		}

		&__name {
			font-size: ${props => props.theme.font.smallSize};
		}

		&__user-icon {
			font-size: 8rem;
			color: ${props => props.theme.colors.primary};
			position: absolute;
		}

		&__mic-icon {
			color: ${props => props.theme.colors.text};
		}

		&__fullscreen {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			bottom: 1rem;
			right: 1rem;
			padding: .5rem;
			column-gap: .5rem;
			border-radius: .5rem;
			background-color: ${props => transparentize(.5, props.theme.colors.body)};
			color: ${props => props.theme.colors.text};
		}
	}

	.calling {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 2rem;
		text-align: center;

		&__title {
			margin-bottom: .25rem;
			font-size: ${props => props.theme.font.h1Size};
		}

		&__message {
			color: ${props => props.theme.colors.textLight};

			> a {
				cursor: pointer;
				color: ${props => props.theme.colors.red};

				&:hover {
					color: ${props => darken(.2, props.theme.colors.red)};
					text-decoration: underline;
				}
			}
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

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80px;
		padding: 0 2rem;
		background-color: ${props => props.theme.colors.container};
		z-index: 5;
		transition: .3s;

		&__title {
			display: none;
 			font-size: ${props => props.theme.font.h2Size};
		}

		&__actions {
 			display: flex;
 			align-items: center;
 			column-gap: 1rem;
 			position: absolute;
 			left: 50%;
 			transform: translateX(-50%);
		}

		&__more {
			display: flex;
			align-items: center;
			column-gap: 1rem;
			display: none;
		}

		&__meetid {
 			color: ${props => props.theme.colors.textLight};
 			font-size: ${props => props.theme.font.smallSize};
		}
	}

	@media screen and (min-width: 768px) {
		.header {
			top: -80px;
		}

		.user {
			width: 300px;
			height: 175px;
		}

		.meet {
			margin-top: 0;
		}

		.otheruser {
			align-self: center;
			width: auto;
			height: auto;

			&__video {
				width: auto;
				height: calc(100vh - 80px - 4rem);
			}
		}

		.footer {
			&__title {
				display: block;
			}

			&__more {
				display: flex;
				align-items: center;
				column-gap: 1rem;
			}

			&__menu {
				width: 30px;
				height: 30px;
				border-radius: .5rem;
			}
		}
	}
`;

export const MenuItem = styled.a`
	display: flex;
	align-items: center;
	column-gap: 1rem;
	padding: .5rem 0;
	color: ${props => props.theme.colors.textLight};
	cursor: pointer;
	transition: .3s;

	.menuitem__icon {
		color: ${props => props.theme.colors.primary};
		font-size: 1.5rem;
	}

	&:hover, &:focus {
		color: ${props => props.theme.colors.text};
	}
`;

export const ActionButton = styled.div`
	position: relative;

	.action__button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 100%;
		font-size: ${props => props.theme.font.iconSize};
		background-color: ${props => props.theme.colors.primary};
		color: ${props => props.theme.colors.text};
		transition: .3s;
		
		&:active {
			transform: scale(0.9);
		}

		&.action__button-hangup {
			background-color: ${props => props.theme.colors.red};

			&:hover {
				background-color: ${props => darken(.2, props.theme.colors.red)};
			}
		}

		&.action__button-sharing {
			background-color: ${props => props.theme.colors.green};

			&:hover {
				background-color: ${props => darken(.2, props.theme.colors.green)};
			}
		}
	}

	.action__tooltip {
		position: absolute;
		top: -45px;
		left: 50%;
		transform: translateX(-50%);
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
		transition: .3s;
	}

	.action__button:hover:not(:focus) + .action__tooltip {
		opacity: 1;
	}
`;
