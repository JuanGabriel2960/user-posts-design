import { Props as CardProps } from '../user/components/card/Card';
import { Props as CardTitleProps } from '../user/components/card/CardTitle';
import { Props as CardBodyProps } from '../user/components/card/CardBody';
import { Props as CardButtonProps } from '../user/components/card/CardButton';
import { Post } from './posts';

export interface CardHOCProps {
    ({ children }: CardProps): JSX.Element;
    Title: (Props: CardTitleProps) => JSX.Element;
    Body: (Props: CardBodyProps) => JSX.Element;
    Button: (Props: CardButtonProps) => JSX.Element;
}

export interface CardContextProps {
    post: Post;
}