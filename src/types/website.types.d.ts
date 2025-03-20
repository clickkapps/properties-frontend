

export type MenuLink = {
    title: string;
    icon?: ElementType;
    url: string;
    external: boolean;
    target?: '_blank' | '_top' | '_self'
}

type ModalHandle = {
    open: () => void;
    close: () => void;
};