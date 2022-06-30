import { Card as CardHOC } from './Card';
import { CardHOCProps } from '../../../interfaces/HOC';

import { CardTitle } from './CardTitle';
import { CardBody } from './CardBody';
import { CardButton } from './CardButton';

export { CardTitle } from './CardTitle';
export { CardBody } from './CardBody';
export { CardButton } from './CardButton';

export const Card: CardHOCProps = Object.assign(CardHOC, {
    Title: CardTitle,
    Body: CardBody,
    Button: CardButton,
})

export default Card;