import styled from 'styled-components';
import { transparentize } from 'polished';

export const MeetContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;

	.meet {
		flex: 1;
		display: flex;
		flex-direction: column;

		.webcam {
			position: fixed;
			right: 1rem;
			bottom: calc(100px + 1rem);
			width: 300px;
			height: 180px;
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

			&__move {
				position: absolute;
				top: 1rem;
				right: 1rem;
				width: 30px;
				height: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: .5rem;
				background-color: ${props => transparentize(.5, props.theme.colors.body)};
				color: ${props => props.theme.colors.container};
				font-size: ${props => props.theme.font.iconSize};
				transition: .3s;

				&:hover {
					color: #FFF;
				}
			}
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
		}

		&__footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 3.25rem;
			height: 100px;
			background-color: ${props => props.theme.colors.container};

			.actions {
				display: flex;
				align-items: center;
				column-gap: 1rem;

				.action {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 45px;
					height: 45px;
					border-radius: 100%;
					border: 1px solid ${props => props.theme.colors.primary};
					background-color: ${props => props.theme.colors.primary};
					font-size: ${props => props.theme.font.iconSize};
					color: ${props => props.theme.colors.text};
					transition: .3s;
					
					&:hover:not(&-hangup), &:focus:not(&-hangup) {
						border-color: ${props => props.theme.colors.secondary};
						background-color: ${props => props.theme.colors.secondary};
					}

					&-hangup {
						border-color: ${props => props.theme.colors.red};
						background-color: ${props => props.theme.colors.red};
					}
				}
			}
		}

		&__name {
			font-size: ${props => props.theme.font.h2Size};
		}
	} 
`;
