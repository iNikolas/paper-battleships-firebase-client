export interface NavigationLink {
  to: string;
  text: string;
}

export interface NavigationProps {
  links: Array<NavigationLink>;
}
