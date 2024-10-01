import styled, { css } from 'styled-components';

export const RenameMeetModal = styled.div<{ visible: boolean; }>`
 	position: fixed;
 	inset: 0;
 	display: flex;
 	align-items: center;
 	justify-content: center;
 	background-color: rgba(0, 0, 0, 0.25);
 	transition: .3s;
 	visibility: hidden;
 	opacity: 0;
 	z-index: ${props => props.theme.defaults.fixed};

 	${props => props.visible && css`
 		visibility: visible;
 		opacity: 1;
 	`};

 	.renamemeet {
 		display: flex;
 		flex-direction: column;
 		row-gap: 1rem;
 		padding: 1.5rem;
 		background-color: ${props => props.theme.colors.container};
 		box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
 		border-radius: 1rem;
 		transition: .3s;
 		width: 90%;

 		&__header {
 			display: flex;
 			align-items: center;
 			justify-content: space-between;
 		}

 		&__title {
 			font-size: ${props => props.theme.font.h2Size};
 		}

		&__content {
			display: flex;
			flex-direction: column;
			row-gap: .75rem;
 		}
 	}

 	@media screen and (min-width: 576px) {
 		.renamemeet {
 			width: 450px;
 		}
 	}
`;
