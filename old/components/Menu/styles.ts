import styled from 'styled-components';

export const Menu = styled.menu<{ visible: boolean; }>`
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

	.menu__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 1.5rem;
	}

	.menu__title {
		font-size: ${props => props.theme.font.h2Size};
	}

	.menu__subtitle {
		font-weight: 500;
		font-size: ${props => props.theme.font.h3Size};
		color: ${props => props.theme.colors.textLight};
	}

	.menu__content {
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

	.menu__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
	}

	.menu__language {
		color: ${props => props.theme.colors.textLight};
		font-size: ${props => props.theme.font.smallSize};
	}

	@media screen and (min-width: 768px) {
		width: 400px;
		right: -400px;

		${props => props.visible && 'right: 0;'};
	}
`;
