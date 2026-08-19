import { Home, User, FolderKanban, FileText, Mail, type LucideIcon } from "lucide-react";

export type DockItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const dockItems: DockItem[] = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Resume", href: "#resume", icon: FileText },
  { label: "Contact", href: "#contact", icon: Mail },
];
