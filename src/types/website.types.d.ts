export type MenuLink = {
    title: string;
    url: string;
    external: boolean;
    target?: '_blank' | '_top' | '_self'
}

type ModalHandle = {
    open: () => void;
    close: () => void;
};