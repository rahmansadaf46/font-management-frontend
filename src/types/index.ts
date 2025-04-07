export interface LayoutProps {
  children: React.ReactNode;
}

export interface Font {
    _id: string;
    name: string;
    isActive?: boolean;
}

export interface FontGroupRow {
    fontName: string;
    fontId: string;
    specificSize: string;
    priceChange: string;
}

export interface FontGroup {
    _id: string;
    name: string;
    fonts: Font[];
    path?: string;
}

export interface EditFontGroupModalProps {
    show: boolean;
    currentGroup: FontGroup;
    handleClose: () => void;
}