import styled from 'styled-components';

export const Chat = styled.div<{ visible: boolean; }>`
	position: fixed;
	top: 0;
	bottom: 0;
	width: 100%;
	right: -100%;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
	background-color: ${props => props.theme.colors.container};
	transition: .3s;
	z-index: 10;

	${props => props.visible && 'right: 0;'};

	.chat__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
	}

	.chat__title {
		font-size: ${props => props.theme.font.h2Size};
	}

	.chat__content {
		height: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		row-gap: .5rem;
		padding: 1.5rem;
		border-top: 1px solid ${props => props.theme.colors.body};
		border-bottom: 1px solid ${props => props.theme.colors.body};

		::-webkit-scrollbar {
			width: 5px;
		}
		::-webkit-scrollbar-track {
			background: transparent;
		}
		::-webkit-scrollbar-thumb {
			background: #555;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #2d2d2d;
		}
	}

	.chat__message {
		padding: 1rem;
		max-width: 90%;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		background-color: ${props => props.theme.colors.body};
		
		&-left {
			align-self: flex-start;
			border-bottom-right-radius: 1rem;
		}
		
		&-right {
			align-self: flex-end;
			border-bottom-left-radius: 1rem;
		}

		&-link {
			cursor: pointer;
			text-decoration: underline;
			color: ${props => props.theme.colors.primary};
		}
	}

	.chat__footer {
		display: flex;
		padding: 1.5rem;
	}

	.chat__form {
		flex: 1;
		display: flex;
		align-items: center;
		column-gap: 1.25rem;
		border: 1px solid ${props => props.theme.colors.body};
		background-color: ${props => props.theme.colors.body};
		padding: 0 1.25rem;
		height: 48px;
		border-radius: 1rem;
		transition: .3s;
	}

	.chat__field {
		flex: 1;
		height: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		color: ${props => props.theme.colors.text};
	}

	.chat__send {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${props => props.theme.colors.primary};
		font-size: ${props => props.theme.font.iconSize};
		background-color: transparent;
		transition: .3s;
	}

	@media screen and (min-width: 768px) {
		width: 400px;
		right: -400px;

		${props => props.visible && 'right: 0;'};
	}
`;
